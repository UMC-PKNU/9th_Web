import { useState, useEffect } from "react";

export default function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);
// debouncedValue : debounce 결과로 최종 확정된 값

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]); // value 변하면 debounce 다시 적용

  return debouncedValue;
}
