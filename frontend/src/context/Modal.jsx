
import { useRef, useState, useContext, createContext } from 'react';
import ReactDOM from 'react-dom';

// Create the Modal Context
const ModalContext = createContext();

/**
 * ModalProvider component to wrap around the application.
 * Provides modal state and functions via context.
 */
export function ModalProvider({ children }) {
  const modalRef = useRef(); // Reference to the DOM node where the modal will be rendered
  const [modalContent, setModalContent] = useState(null); // Holds the content of the modal
  const [onModalClose, setOnModalClose] = useState(null); // Optional callback for when the modal closes

  // Function to close the modal
  const closeModal = () => {
    setModalContent(null); // Clear modal content
    if (typeof onModalClose === 'function') {
      onModalClose(); // Call the onModalClose callback if provided
      setOnModalClose(null); // Reset the callback
    }
  };

  // Value provided by the context
  const contextValue = {
    modalRef,
    modalContent,
    setModalContent,
    setOnModalClose,
    closeModal,
  };

  return (
    <>
      <ModalContext.Provider value={contextValue}>
        {children}
      </ModalContext.Provider>
      {/* Div where the modal will be rendered */}
      <div ref={modalRef} />
    </>
  );
}

/**
 * Modal component to render the modal content.
 * It uses React Portal to render the modal outside the usual DOM hierarchy.
 */
export function Modal() {
  const { modalRef, modalContent, closeModal } = useContext(ModalContext);

  // Return null if modal isn't ready to render
  if (!modalRef?.current || !modalContent) return null;

  return ReactDOM.createPortal(
    <div id="modal">
      {/* Background to close modal on click */}
      <div id="modal-background" onClick={closeModal} />
      {/* Modal content */}
      <div id="modal-content">{modalContent}</div>
    </div>,
    modalRef.current // Render the modal into the referenced DOM node
  );
}

// Export useModal hook to access modal functions
export function useModal() {
  const { closeModal, setModalContent, setOnModalClose } = useContext(ModalContext);
  return { closeModal, setModalContent, setOnModalClose };
}
