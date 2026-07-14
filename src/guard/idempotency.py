from typing import Any, Dict


class IdempotencyGuard:
    @staticmethod
    def ensure_not_duplicate(state_manager: Any, action: str, check_fn: Any) -> bool:
        if check_fn(state_manager):
            return False
        return True

    @staticmethod
    def blog_exists(state_manager: Any) -> bool:
        return bool(state_manager.get("current_blog"))

    @staticmethod
    def pr_exists(state_manager: Any) -> bool:
        return bool(state_manager.get("current_branch"))

    @staticmethod
    def social_posted(state_manager: Any) -> bool:
        return state_manager.get("social_status") == "completed"

    @staticmethod
    def gsc_submitted(state_manager: Any) -> bool:
        return state_manager.get("indexing_status") == "submitted"
