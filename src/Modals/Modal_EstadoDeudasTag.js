import React from 'react';
import './Modal.css';
import "./tabla.css";

const Modal_EstadoDeudasTag = ({ showModal, handleCloseModal, deudas_rut }) => {

  return (
    <>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleCloseModal}>
              &times;
            </span>
            <h2>Deudas de Autopistas (TAG)</h2>
            <br></br>
            <h3>Una lista con las deudas con las autopistas.</h3>
            <ul>
              <li>Nombre: {deudas_rut.nombre}</li>
              <li>Rut: {deudas_rut.rut}</li>
            </ul>
            <br></br>
            <h3>TAGs</h3>
            <table>
                <thead>
              <tr>
                <th>Autopista</th>
                <th>Deuda Actual</th>
              </tr>
            </thead>
              <tbody>
                {deudas_rut.deudas.map((deuda) => (
                  <tr key={deuda.nombre_tag}>
                    <td>{deuda.nombre_tag}</td>
                    <td className="saldo">$ {deuda.monto}</td>
                  </tr>
                ))}
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

export default Modal_EstadoDeudasTag;