import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import RegistrationForm from './RegistrationForm';

function RegistrationFormModal({ event }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className="nav-link" onClick={() => setShowModal(true)}>
        Register
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <RegistrationForm event={event} />
        </Modal>
      )}
    </>
  );
}

export default RegistrationFormModal;
