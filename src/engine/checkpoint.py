import json
import os
from datetime import datetime, timezone
from typing import Any, Dict, Optional


class CheckpointManager:
    CHECKPOINT_DIR = "automation/checkpoints"

    def __init__(self, execution_id: str) -> None:
        self.execution_id = execution_id
        os.makedirs(self.CHECKPOINT_DIR, exist_ok=True)

    def _checkpoint_path(self, step_name: str) -> str:
        return os.path.join(self.CHECKPOINT_DIR, f"{self.execution_id}_{step_name}.json")

    def save(self, step_name: str, data: Dict[str, Any]) -> None:
        payload = {
            "execution_id": self.execution_id,
            "step_name": step_name,
            "timestamp": datetime.now(timezone.utc).isoformat().replace("+00:00", "Z"),
            "data": data,
        }
        with open(self._checkpoint_path(step_name), "w") as f:
            json.dump(payload, f, indent=2)

    def load(self, step_name: str) -> Optional[Dict[str, Any]]:
        path = self._checkpoint_path(step_name)
        if not os.path.exists(path):
            return None
        with open(path, "r") as f:
            return json.load(f)

    def exists(self, step_name: str) -> bool:
        return os.path.exists(self._checkpoint_path(step_name))

    def list_completed(self) -> list:
        completed = []
        prefix = f"{self.execution_id}_"
        suffix = ".json"
        for filename in os.listdir(self.CHECKPOINT_DIR):
            if filename.startswith(prefix) and filename.endswith(suffix):
                step_name = filename[len(prefix):-len(suffix)]
                completed.append(step_name)
        return completed
