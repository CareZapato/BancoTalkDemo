import React from 'react';
import './Modal.css';

const ModalThree = ({ showModal, handleCloseModal, perfil }) => {
  return (
    <>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleCloseModal}>
              &times;
            </span>
            <h2>Estado de Cuenta</h2>
            <p>A continuación, sus distintas cuentas:</p>
            <ul>
              <li>Nombre {}: {perfil.nombre}</li>
              <li>Rut: {perfil.rut}</li>
            </ul>
            <button onClick={handleCloseModal}>Cancelar</button>
            <button>Confirmar</button>
          </div>
        </div>
      )}
    </>
  );
};

export default ModalThree;