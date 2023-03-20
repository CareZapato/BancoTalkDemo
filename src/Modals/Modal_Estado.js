import React from 'react';
import './Modal.css';
import "./tabla.css";

const Modal_Estado = ({ showModal, handleCloseModal, perfil }) => {

  return (
    <>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleCloseModal}>
              &times;
            </span>
            <h2>Estado de Cuenta</h2>
            <br></br>
            <ul>
              <li>Nombre: {perfil.nombre}</li>
              <li>Rut: {perfil.rut}</li>
              <li>Banco: {perfil.banco}</li>
              <li>Alias: {perfil.alias}</li>
            </ul>
            <table>
                <thead>
              <tr>
                <th>Tipo de cuenta</th>
                <th>Número de cuenta</th>
                <th>Saldo</th>
              </tr>
            </thead>
              <tbody>
                {perfil.cuentas.map((cuenta) => (
                  <tr key={cuenta.n_cuenta}>
                    <td>{cuenta.tipo_cuenta}</td>
                    <td>{cuenta.n_cuenta}</td>
                    <td className="saldo">{cuenta.saldo}</td>
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

export default Modal_Estado;