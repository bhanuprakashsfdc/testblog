import json
import os
from datetime import datetime, timezone
from typing import Any, Dict, Optional


class StateManager:
    STATE_FILE = "automation/state.json"

    DEFAULT_STATE = {
        "execution_id": None,
        "workflow_id": None,
        "current_iteration": 0,
        "current_step": None,
        "completed_steps": [],
        "pending_steps": [],
        "failed_steps": [],
        "retry_count": 0,
        "last_successful_timestamp": None,
        "current_blog": None,
        "current_branch": None,
        "repository_commit": None,
        "deployment_status": None,
        "indexing_status": None,
        "social_status": None,
    }

    def __init__(self) -> None:
        self._state: Dict[str, Any] = self._load()

    def _load(self) -> Dict[str, Any]:
        if os.path.exists(self.STATE_FILE):
            with open(self.STATE_FILE, "r") as f:
                return {**self.DEFAULT_STATE, **json.load(f)}
        return dict(self.DEFAULT_STATE)

    def save(self) -> None:
        os.makedirs(os.path.dirname(self.STATE_FILE), exist_ok=True)
        with open(self.STATE_FILE, "w") as f:
            json.dump(self._state, f, indent=2)

    def get(self, key: str, default: Any = None) -> Any:
        return self._state.get(key, default)

    def set(self, key: str, value: Any) -> None:
        self._state[key] = value
        self.save()

    def update(self, updates: Dict[str, Any]) -> None:
        self._state.update(updates)
        self.save()

    def reset(self) -> None:
        self._state = dict(self.DEFAULT_STATE)
        self.save()

    def mark_step_completed(self, step_name: str) -> None:
        completed = self._state.setdefault("completed_steps", [])
        if step_name not in completed:
            completed.append(step_name)
        failed = self._state.setdefault("failed_steps", [])
        if step_name in failed:
            failed.remove(step_name)
        self._state["last_successful_timestamp"] = datetime.now(timezone.utc).isoformat().replace("+00:00", "Z")
        self.save()

    def mark_step_failed(self, step_name: str) -> None:
        failed = self._state.setdefault("failed_steps", [])
        if step_name not in failed:
            failed.append(step_name)
        self.save()

    def is_step_completed(self, step_name: str) -> bool:
        return step_name in self._state.get("completed_steps", [])

    def is_step_failed(self, step_name: str) -> bool:
        return step_name in self._state.get("failed_steps", [])
