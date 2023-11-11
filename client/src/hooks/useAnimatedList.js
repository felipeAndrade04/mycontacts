import { useCallback, useState } from 'react';

export default function useAnimatedList(initialValue = []) {
  const [items, setitems] = useState(initialValue);
  const [pendingRemovalItemsIds, setPendingRemovalItemsIds] = useState([]);

  const handleRemoveItem = useCallback((id) => {
    setPendingRemovalItemsIds((prevState) => [...prevState, id]);
  }, []);

  const handleAnimationEnd = useCallback((id) => {
    setitems((prevState) => prevState.filter((item) => item.id !== id));
    setPendingRemovalItemsIds((prevState) =>
      prevState.filter((itemId) => itemId !== id)
    );
  }, []);

  return {
    pendingRemovalItemsIds,
    handleRemoveItem,
    handleAnimationEnd,
    items,
    setitems,
  };
}
