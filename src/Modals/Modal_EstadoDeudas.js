import React from 'react';
import './Modal.css';
import "./tabla.css";

const Modal_EstadoDeudas = ({ showModal, handleCloseModal, deudas }) => {

  return (
    <>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleCloseModal}>
              &times;
            </span>
            <h2>Deudas de Servicios</h2>
            <br></br>
            <ul>
              <li>Nombre: {deudas.perfil.nombre}</li>
              <li>Rut: {deudas.perfil.rut}</li>
            </ul>
            <table>
                <thead>
              <tr>
                <th>Tipo de cuenta</th>
                <th>Empresa</th>
                <th>F. vencimiento</th>
                <th>Deuda</th>
              </tr>
            </thead>
              <tbody>
                {deudas.cuentas.map((deuda) => (
                  <tr key={deuda.servicio}>
                    <td>{deuda.servicio}</td>
                    <td>{deuda.empresa}</td>
                    <td>{deuda.fch_vencimiento}</td>
                    <td className="saldo">{deuda.deuda}</td>
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

export default Modal_EstadoDeudas;