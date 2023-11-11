import { createRef, useCallback, useEffect, useRef, useState } from 'react';

export default function useAnimatedList(initialValue = []) {
  const [items, setitems] = useState(initialValue);
  const [pendingRemovalItemsIds, setPendingRemovalItemsIds] = useState([]);

  const animatedRefs = useRef(new Map());
  const animationEndListeners = useRef(new Map());

  const handleAnimationEnd = useCallback((id) => {
    const removeListener = animationEndListeners.current.get(id);
    removeListener();

    animationEndListeners.current.delete(id);
    animatedRefs.current.delete(id);

    setitems((prevState) => prevState.filter((item) => item.id !== id));
    setPendingRemovalItemsIds((prevState) =>
      prevState.filter((itemId) => itemId !== id)
    );
  }, []);

  useEffect(() => {
    pendingRemovalItemsIds.forEach((id) => {
      const animatedRef = animatedRefs.current.get(id);
      const animatedElement = animatedRef?.current;
      const alreadyHasListener = animationEndListeners.current.has(id);

      if (animatedElement && !alreadyHasListener) {
        const onAnimationEnd = () => handleAnimationEnd(id);
        const removeListener = () => {
          animatedElement.removeEventListener('animationend', onAnimationEnd);
        };

        animatedElement.addEventListener('animationend', onAnimationEnd);
        animationEndListeners.current.set(id, removeListener);
      }
    });
  }, [pendingRemovalItemsIds, handleAnimationEnd]);

  useEffect(() => {
    const removeListeners = animationEndListeners.current;
    return () => {
      removeListeners.forEach((removeListener) => removeListener());
    };
  }, []);

  const handleRemoveItem = useCallback((id) => {
    setPendingRemovalItemsIds((prevState) => [...prevState, id]);
  }, []);

  const getAnimatedRef = useCallback((id) => {
    let animatedRef = animatedRefs.current.get(id);

    if (!animatedRef) {
      animatedRef = createRef();
      animatedRefs.current.set(id, animatedRef);
    }

    return animatedRef;
  }, []);

  const renderList = useCallback(
    (renderItem) =>
      items.map((item) => {
        const isLeaving = pendingRemovalItemsIds.includes(item.id);
        const animatedRef = getAnimatedRef(item.id);

        return renderItem(item, {
          isLeaving,
          animatedRef,
        });
      }),
    [items, pendingRemovalItemsIds, getAnimatedRef]
  );

  return {
    handleRemoveItem,
    items,
    setitems,
    renderList,
  };
}
