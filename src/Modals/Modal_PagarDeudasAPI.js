import React from 'react';
import './Modal.css';
import "./tabla.css";

const Modal_PagarDeudas = ({ showModal, handleCloseModal, pagar }) => {

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
            <table>
                <thead>
              <tr>
                <th>Tipo de cuenta</th>
                <th>Empresa</th>
                <th>Monto a pagar</th>
                <th>Deuda</th>
                <th>Saldo esperado</th>
              </tr>
            </thead>
              <tbody>
                {pagar.cuentas ? pagar.cuentas.map((deuda) => 
                deuda.monto_pago > 0 ? (
                (
                  <tr key={deuda.servicio}>
                    <td>{deuda.servicio}</td>
                    <td>{deuda.empresa}</td>
                    <td className="saldo">{deuda.monto_pago}</td>
                    <td className="saldo">{deuda.deuda}</td>
                    <td className="saldo">{deuda.deuda - deuda.monto_pago}</td>
                  </tr>
                )) : null
                ): null
              }
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

export default Modal_PagarDeudas;