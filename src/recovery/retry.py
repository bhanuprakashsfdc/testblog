import logging
import os
import time
from functools import wraps
from typing import Any, Callable, TypeVar

F = TypeVar("F", bound=Callable[..., Any])

logger = logging.getLogger(__name__)


def retry(
    max_attempts: int = 4,
    initial_delay: float = 1.0,
    backoff_factor: float = 2.0,
    exceptions: tuple = (Exception,),
) -> Callable[[F], F]:
    def decorator(func: F) -> F:
        @wraps(func)
        def wrapper(*args: Any, **kwargs: Any) -> Any:
            delay = initial_delay
            last_exception = None
            for attempt in range(1, max_attempts + 1):
                try:
                    return func(*args, **kwargs)
                except exceptions as e:
                    last_exception = e
                    logger.warning(
                        "Attempt %s/%s failed for %s: %s",
                        attempt,
                        max_attempts,
                        func.__name__,
                        e,
                    )
                    if attempt < max_attempts:
                        time.sleep(delay)
                        delay *= backoff_factor
            logger.error("All %s attempts failed for %s", max_attempts, func.__name__)
            raise last_exception or RuntimeError(f"{func.__name__} failed after {max_attempts} attempts")

        return wrapper  # type: ignore[return-value]

    return decorator


class FailureRecovery:
    @staticmethod
    def diagnose(error: Exception) -> str:
        message = str(error).lower()
        if "timeout" in message:
            return "timeout"
        if "rate" in message or "429" in message:
            return "rate_limit"
        if "network" in message or "connection" in message:
            return "network"
        if "memory" in message or "oom" in message:
            return "memory"
        return "unknown"

    @staticmethod
    def attempt_repair(error: Exception, context: Dict[str, Any]) -> bool:
        cause = FailureRecovery.diagnose(error)
        if cause == "timeout":
            return True
        if cause == "rate_limit":
            return True
        return False
