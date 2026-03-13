//src/components/Modal.tsx


import React from 'react';
import ReactDOM from 'react-dom'

interface ModalProps {
isOpen: boolean;
onClose: () => void;
onConfirm: () => void;
title: string;
children:React.ReactNode;
} ;

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onConfirm, title, children }) => {
  
  // 2. The rest of your logic is perfect
  if (!isOpen) return null;

  const modalRoot = document.getElementById('modal-root');
  if (!modalRoot) return null;

  return ReactDOM.createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>{title}</h2>
        <div className="modal-body">{children}</div>
        <div className="modal-actions">
          <button onClick={onClose}>Cancel</button>
          <button className="confirm-btn" onClick={onConfirm}>Confirm</button>
        </div>
      </div>
    </div>,
    modalRoot 
  );
};

export default Modal