import React, { useState } from 'react';
import Modal from 'react-modal';  // Import the Modal component from react-modal
import { Button } from 'react-bootstrap';  // Import Button from react-bootstrap (if using React Bootstrap)

Modal.setAppElement('#root'); // Required for accessibility reasons

const OpenModalButton = () => {
  const [isOpen, setIsOpen] = useState(false);  // State for modal visibility

  const toggleModal = () => {
    setIsOpen(!isOpen);  // Toggle modal visibility
  };

  return (
    <div>
      <Button onClick={toggleModal}>Open Modal</Button>
      <Modal 
        isOpen={isOpen} 
        onRequestClose={toggleModal} 
        contentLabel="Example Modal"
      >
        <h2>Modal Content</h2>
        <Button onClick={toggleModal}>Close Modal</Button>
      </Modal>
    </div>
  );
};

export default OpenModalButton;
