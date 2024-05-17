import { useState, useEffect } from "react";

export const useDisclosure = (initialState = false) => {
  const [isOpen, setIsOpen] = useState(initialState);

  useEffect(() => {
    if (isOpen !== initialState) {
      setIsOpen(initialState);
    }
  }, [initialState]);

  const onOpen = () => {
    setIsOpen(true);
  };

  const onClose = () => {
    setIsOpen(false);
  };

  const toggle = () => (isOpen ? onOpen() : onClose());

  return { isOpen, onOpen, onClose, toggle };
};
