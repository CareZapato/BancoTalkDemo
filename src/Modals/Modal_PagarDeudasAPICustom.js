import React from 'react';
import './Modal.css';
import "./tabla.css";

const Modal_EstadoDeudasApiCustom = ({ showModal, handleCloseModal, deudas }) => {

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
              <li>Nombre: {deudas.deuda_api.data.name}</li>
              <li>Rut: {deudas.deuda_api.data.rut}</li>
            </ul>
            <br></br>
            <h3>Deudas.</h3>
            <table>
              <thead>
                <tr>
                  <th>Empresa</th>
                  <th>Deuda Actual</th>
                  <th>Deuda</th>
                </tr>
              </thead>
              <tbody>
                {deudas.deuda_api.data.directDebt.map((debt) => (
                  <tr key={debt.institution}>
                    <td>{debt.institution}</td>
                    <td className="saldo">$ {debt.currentDebt}</td>
                    <td className="saldo">$ {debt.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <table>
              <tbody>
                <td>Total</td>
                <td className="saldo">$ {deudas.deuda_api.data.directDebt.totalDeudas}</td>
              </tbody>
            </table>
            
            <button onClick={handleCloseModal}>Cancelar</button>
            <button>Confirmar</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal_EstadoDeudasApiCustom;