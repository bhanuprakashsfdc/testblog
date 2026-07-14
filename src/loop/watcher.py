import logging
import time
from typing import Any, Dict, Optional

logger = logging.getLogger(__name__)


class LoopWatcher:
    def __init__(self, runner: Any) -> None:
        self.runner = runner
        self.running = False

    def watch(self, poll_interval: int = 60) -> None:
        self.running = True
        logger.info("Starting loop watcher with poll interval %ss", poll_interval)
        while self.running:
            try:
                merged = self._check_for_merged_pr()
                if merged:
                    logger.info("Detected merged PR, starting new execution")
                    self.runner.run()
            except Exception as e:
                logger.error("Watcher error: %s", e)
            time.sleep(poll_interval)

    def _check_for_merged_pr(self) -> bool:
        return False

    def stop(self) -> None:
        self.running = False
