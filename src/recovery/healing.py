import logging
from typing import Any, Callable, Dict, Optional

from .retry import FailureRecovery, retry

logger = logging.getLogger(__name__)


class SelfHealingExecutor:
    def __init__(self, state_manager: Any) -> None:
        self.state = state_manager

    def execute_with_healing(
        self,
        func: Callable[..., Any],
        context: Dict[str, Any],
        step_name: str,
        max_retries: int = 3,
    ) -> Any:
        last_error = None
        for attempt in range(1, max_retries + 1):
            try:
                return func(context, self.state)
            except Exception as e:
                last_error = e
                logger.warning("Self-healing attempt %s/%s for step %s", attempt, max_retries, step_name)
                if not FailureRecovery.attempt_repair(e, context):
                    logger.error("Unrecoverable error in step %s: %s", step_name, e)
                    raise
        raise last_error or RuntimeError(f"Step {step_name} failed after healing attempts")
