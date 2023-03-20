import React from 'react';
import './Modal.css';

const Modal_Inversion = ({ showModal, handleCloseModal, inversion }) => {
  function getFechaConDias(dias) {
    const fecha = new Date(); // Fecha actual
    fecha.setDate(fecha.getDate() + dias); // Agregamos la cantidad de días
    const dia = fecha.getDate().toString().padStart(2, '0'); // Obtenemos el día y lo formateamos como cadena de 2 dígitos
    const mes = (fecha.getMonth() + 1).toString().padStart(2, '0'); // Obtenemos el mes (se le suma 1 porque los meses empiezan en 0) y lo formateamos como cadena de 2 dígitos
    const anio = fecha.getFullYear().toString(); // Obtenemos el año como cadena de 4 dígitos
    return `${dia}/${mes}/${anio}`; // Devolvemos la fecha formateada
  }
  return (
    <>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleCloseModal}>
              &times;
            </span>
            <h2>Confirmar inversión bancaria</h2>
            <p>Por favor, confirme los siguientes datos:</p>
            <ul>
              <li>Tipo depósito: {inversion.tipo_deposito}</li>
              <li>Días: {inversion.dias}</li>
              <li>Fecha de vencimiento: {getFechaConDias(inversion.dias)}</li>
              <li>Monto a invertir: {inversion.monto}</li>
            </ul>
            <button onClick={handleCloseModal}>Cancelar</button>
            <button>Confirmar</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal_Inversion;