import copy
import importlib.util
import json
import unittest
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
VALIDATOR_PATH = ROOT / "scripts" / "validate-vocabulary.py"
SPEC = importlib.util.spec_from_file_location("validate_vocabulary", VALIDATOR_PATH)
validator = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(validator)


@unittest.skipUnless(
    importlib.util.find_spec("jsonschema"),
    "install jsonschema to run vocabulary schema tests",
)
class VocabularyValidationTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.schema = json.loads(validator.SCHEMA_PATH.read_text(encoding="utf-8"))
        cls.dataset = json.loads(validator.DATA_PATH.read_text(encoding="utf-8"))

    def errors_for(self, dataset):
        return (
            validator.validate_schema(self.schema, dataset)
            + validator.validate_dataset(dataset)
        )

    def test_seed_dataset_is_valid_and_unreviewed_phonetics_stay_null(self):
        self.assertEqual(self.errors_for(self.dataset), [])
        for entry in self.dataset["entries"]:
            self.assertEqual(entry["reviewStatus"], "pending")
            self.assertIsNone(entry["syllables"])
            self.assertIsNone(entry["stressSyllable"])
            self.assertIsNone(entry["phoneticFamily"])

    def test_rejects_duplicate_and_malformed_ids(self):
        dataset = copy.deepcopy(self.dataset)
        dataset["entries"][1]["id"] = dataset["entries"][0]["id"]
        dataset["entries"][2]["id"] = "Invalid ID"

        errors = self.errors_for(dataset)
        self.assertTrue(any("duplicate ID" in message for _, message in errors))
        self.assertTrue(any("kebab-case" in message for _, message in errors))

    def test_rejects_stress_index_past_syllable_count(self):
        dataset = copy.deepcopy(self.dataset)
        entry = dataset["entries"][0]
        entry.update(
            syllables=["má", "gi", "co"],
            stressSyllable=4,
            reviewStatus="reviewed",
            phoneticFamily="reviewed-by-human",
        )

        errors = self.errors_for(dataset)
        self.assertTrue(any("exceeds the 3 syllables" in message for _, message in errors))

    def test_rejects_incomplete_review_and_malformed_entry_fields(self):
        dataset = copy.deepcopy(self.dataset)
        dataset["entries"][0].update(
            reviewStatus="reviewed",
            syllables=None,
            stressSyllable=True,
            phoneticFamily=None,
            unexpected="not allowed",
        )

        errors = self.errors_for(dataset)
        self.assertGreaterEqual(len(errors), 3)

    def test_rejects_non_object_entries(self):
        dataset = copy.deepcopy(self.dataset)
        dataset["entries"][0] = "not an entry object"

        errors = self.errors_for(dataset)
        self.assertTrue(any(path == "entries/0" for path, _ in errors))


if __name__ == "__main__":
    unittest.main()
