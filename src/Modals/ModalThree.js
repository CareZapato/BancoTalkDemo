import React from 'react';
import './Modal.css';

const ModalThree = ({ showModal, handleCloseModal }) => {
  return (
    <>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleCloseModal}>
              &times;
            </span>
            <h2>Modal Three</h2>
            <p>This is the content of Modal Three</p>
          </div>
        </div>
      )}
    </>
  );
};

export default ModalThree;