from dataclasses import dataclass, field
from typing import Callable, Dict, List, Optional


@dataclass
class Step:
    name: str
    func: Callable
    dependencies: List[str] = field(default_factory=list)
    retryable: bool = True
    independent: bool = False
    output_key: Optional[str] = None
