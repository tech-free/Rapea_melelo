#!/usr/bin/env python3
"""Validate Rapea's local vocabulary schema and its cross-entry invariants."""

import json
import re
from collections import Counter
from pathlib import Path

ID_PATTERN = re.compile(r"^[a-z0-9]+(?:-[a-z0-9]+)*$")

ROOT = Path(__file__).resolve().parents[1]
SCHEMA_PATH = ROOT / "data" / "vocabulary.schema.json"
DATA_PATH = ROOT / "data" / "vocabulary.json"


def validate_schema(schema, dataset):
    try:
        from jsonschema import Draft202012Validator
    except ImportError:
        print("Install the validator dependency with: python3 -m pip install jsonschema")
        raise SystemExit(2)

    Draft202012Validator.check_schema(schema)
    validator = Draft202012Validator(schema)
    return [
        (
            "/".join(map(str, error.absolute_path)) or "<root>",
            error.message,
        )
        for error in sorted(
            validator.iter_errors(dataset),
            key=lambda error: list(map(str, error.absolute_path)),
        )
    ]


def validate_dataset(dataset):
    errors = []
    ids = []
    entries = dataset.get("entries", [])
    if not isinstance(entries, list):
        return errors

    for index, entry in enumerate(entries):
        if not isinstance(entry, dict):
            continue
        entry_path = f"entries/{index}"
        entry_id = entry.get("id")
        if isinstance(entry_id, str):
            ids.append(entry_id)
            if not ID_PATTERN.fullmatch(entry_id):
                errors.append((f"{entry_path}/id", "must be lowercase kebab-case"))

        stress = entry.get("stressSyllable")
        syllables = entry.get("syllables")
        if (
            type(stress) is int
            and isinstance(syllables, list)
            and stress > len(syllables)
        ):
            errors.append((
                f"{entry_path}/stressSyllable",
                f"{stress} exceeds the {len(syllables)} syllables for {entry_id}",
            ))

    duplicates = sorted(entry_id for entry_id, count in Counter(ids).items() if count > 1)
    if duplicates:
        errors.append(("entries", f"duplicate ID(s): {', '.join(duplicates)}"))
    return errors


def main():
    schema = json.loads(SCHEMA_PATH.read_text(encoding="utf-8"))
    dataset = json.loads(DATA_PATH.read_text(encoding="utf-8"))
    if not isinstance(schema, dict) or not isinstance(dataset, dict):
        print("Schema and vocabulary files must contain JSON objects.")
        return 1
    errors = validate_schema(schema, dataset)
    if isinstance(dataset.get("entries"), list):
        errors.extend(validate_dataset(dataset))
    if errors:
        for location, message in errors:
            print(f"{DATA_PATH.relative_to(ROOT)}:{location}: {message}")
        return 1

    if dataset.get("schemaVersion") != 1:
        print("Unsupported vocabulary schema version.")
        return 1
    print(
        f"Vocabulary valid: schema v{dataset['schemaVersion']}, "
        f"{len(dataset['entries'])} unique entries."
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
