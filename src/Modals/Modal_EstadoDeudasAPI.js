import React from 'react';
import './Modal.css';
import "./tabla.css";

const Modal_EstadoDeudasApi = ({ showModal, handleCloseModal, deudas }) => {

  if (deudas.deuda_api && deudas.deuda_api.flag === true) {
  return (
    <>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleCloseModal}>
              &times;
            </span>
            <h2>Deudas de Instituciones Bancarias</h2>
            <br></br>
            <h3>Una lista con las deudas con entidades.</h3>
            <ul>
              <li>Nombre: {deudas.deuda_api.name}</li>
              <li>Rut: {deudas.deuda_api.rut}</li>
            </ul>
            <br></br>
            <h3>Débito.</h3>
            <table>
                <thead>
              <tr>
                <th><b>Empresa</b></th>
                <th><b>Deuda Actual</b></th>
              </tr>
            </thead>
              <tbody>
                {deudas.deuda_api.directDebt.map((debt) => (
                  <tr key={debt.institution}>
                    <td>{debt.institution}</td>
                    <td className="saldo">$ {debt.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <br></br>
            <h3>Crédito.</h3>
            <table>
                <thead>
              <tr>
                <th><b>Total</b></th>
                <th>{deudas.deuda_api.totalDeudas}</th>
              </tr>
            </thead>
            </table>
            <button onClick={handleCloseModal}>Cancelar</button>
            <button>Confirmar</button>
          </div>
        </div>
      )}
    </>
  );
} else {
  return (
    <>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleCloseModal}>
              &times;
            </span>
            <h2>{deudas.deuda_api.message}</h2>
            <button onClick={handleCloseModal}>Cerrar</button>
          </div>
        </div>
      )}
    </>
  );
}
};


export default Modal_EstadoDeudasApi;