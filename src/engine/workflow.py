import uuid
from typing import Any, Dict, List, Optional

from .checkpoint import CheckpointManager
from .state import StateManager
from .step import Step


class WorkflowEngine:
    def __init__(self, workflow_id: str, steps: List[Step]) -> None:
        self.workflow_id = workflow_id
        self.steps = steps
        self.step_map = {s.name: s for s in steps}
        self.state = StateManager()
        self.checkpoint: Optional[CheckpointManager] = None

    def _ensure_execution(self) -> str:
        execution_id = self.state.get("execution_id")
        if not execution_id:
            execution_id = str(uuid.uuid4())
            self.state.update(
                {
                    "execution_id": execution_id,
                    "workflow_id": self.workflow_id,
                    "pending_steps": [s.name for s in self.steps],
                }
            )
        self.checkpoint = CheckpointManager(execution_id)
        return execution_id

    def _next_step(self) -> Optional[Step]:
        completed = set(self.state.get("completed_steps", []))
        failed = set(self.state.get("failed_steps", []))
        pending = self.state.get("pending_steps", [])
        if not pending:
            return None
        for step_name in pending:
            step = self.step_map[step_name]
            if step_name in failed:
                continue
            deps_met = all(dep in completed for dep in step.dependencies)
            if deps_met:
                return step
        return None

    def execute(self, context: Dict[str, Any]) -> Dict[str, Any]:
        execution_id = self._ensure_execution()
        self.state.set("current_step", None)

        while True:
            step = self._next_step()
            if step is None:
                break

            self.state.set("current_step", step.name)
            if self.checkpoint.exists(step.name) and self.state.is_step_completed(step.name):
                self._advance_pending(step.name)
                continue

            try:
                result = step.func(context, self.state)
            except Exception as e:
                self.state.mark_step_failed(step.name)
                if self.checkpoint:
                    self.checkpoint.save(step.name, {"error": str(e)})
                self._advance_pending(step.name)
                continue

            if result is not None and step.output_key:
                context[step.output_key] = result

            self.state.mark_step_completed(step.name)
            if self.checkpoint:
                self.checkpoint.save(step.name, {"result": result})
            self._advance_pending(step.name)

        return context

    def _advance_pending(self, completed_step: str) -> None:
        pending = self.state.get("pending_steps", [])
        if completed_step in pending:
            pending.remove(completed_step)
        self.state.set("pending_steps", pending)
