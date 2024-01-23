export function Collection<T extends { id: string }>(
  items: T[],
  activeRecordClass: (item: T) => T,
) {
  const collection = items as T[] & {
    first: () => T | null;
    findIndexById: (id: string) => number;
  };

  collection.first = () => {
    if (collection.length) {
      return activeRecordClass(collection[0]);
    }

    return null;
  };

  collection.findIndexById = (id: string) => {
    return collection.findIndex((item) => item.id === id);
  };

  return collection;
}
