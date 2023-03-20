import React from 'react';
import './Modal.css';

const Modal_Deposito = ({ showModal, handleCloseModal, cuenta }) => {
  return (
    <>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleCloseModal}>
              &times;
            </span>
            <h2>Confirmar transferencia bancaria</h2>
            <p>Por favor, confirme los siguientes datos:</p>
            <ul>
              <li>Nombre: {cuenta.nombre}</li>
              <li>RUT: {cuenta.rut}</li>
              <li>Banco: {cuenta.banco}</li>
              <li>Tipo de cuenta: {cuenta.tipo_cuenta}</li>
              <li>Número de cuenta: {cuenta.n_cuenta}</li>
              <li>Alias: {cuenta.alias}</li>
              <li>Monto a transferir: ${cuenta.monto}</li>
            </ul>
            <button onClick={handleCloseModal}>Cancelar</button>
            <button>Confirmar</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal_Deposito;
