import React from 'react';
import './Modal.css';

const ModalTwo = ({ showModal, handleCloseModal }) => {
  return (
    <>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleCloseModal}>
              &times;
            </span>
            <h2>Modal Two</h2>
            <p>This is the content of Modal Two</p>
          </div>
        </div>
      )}
    </>
  );
};

export default ModalTwo;