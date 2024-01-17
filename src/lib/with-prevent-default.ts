export function withPreventDefault(fn: (e: KeyboardEvent) => void) {
  return (e: KeyboardEvent) => {
    e.preventDefault();
    fn(e);
  };
}
