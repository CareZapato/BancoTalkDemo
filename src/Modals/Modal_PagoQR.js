import React from 'react';
import './Modal.css';
import './modal_qr.css';
import QR from '../img/QR_code.png';

const Modal_PagoQR = ({ showModal, handleCloseModal, pago }) => {
  return (
    <>
      {showModal && (
        <div className="modal-content">
        <span className="close" onClick={handleCloseModal}>
          &times;
        </span>
        <h2>Pago QR</h2>
        <br />
        <img src={QR} width="350" height="350" />
        <ul>
          <li>MONTO: ${pago.monto}</li>
        </ul>
        <button onClick={handleCloseModal}>Cancelar</button>
        <button>Confirmar</button>
      </div>
      )}
    </>
  );
};

export default Modal_PagoQR;
