import { useState } from 'react';

const useModalState = ({ initialOpen = false } = {}) => {
  const [isOpen, setIsOpen] = useState(initialOpen);

  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);
  const onToggle = () => setIsOpen(!isOpen);

  return { onOpen, onClose, isOpen, onToggle };
};

export default useModalState;
