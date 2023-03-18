import React from 'react';
import './Modal.css';

const ModalOne = ({ showModal, handleCloseModal }) => {
  return (
    <>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleCloseModal}>
              &times;
            </span>
            <h2>Modal One</h2>
            <p>This is the content of Modal One</p>
          </div>
        </div>
      )}
    </>
  );
};

export default ModalOne;
