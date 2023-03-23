import {Tags_Clientes} from '../Models/Tags'

export function findDebtsByRut(rut) {
    const clientDebts = {
      rut: rut,
      nombre: '', // Puedes asignar el nombre aquí si lo tienes disponible
      deudas: [],
    };
    console.log("Tags_Clientes: ",Tags_Clientes);
    Tags_Clientes.forEach((tag) => {
      tag.clientes.forEach((cliente) => {
        if (cliente.cliente === rut) {
          const debt = {
            nombre_tag: tag.nombre,
            monto: cliente.saldo,
          };
          clientDebts.deudas.push(debt);
        }
      });
    });
    
    return clientDebts;
}