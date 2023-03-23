export const autopistas = [
    "Autopista Central",
    "Autopista Nororiente",
    "Costanera Norte",
    "Ruta del Maipo",
    "Vespucio Norte",
    "Vespucio Sur"
];

// Función que genera un arreglo de N JSONs
function generateClientsData(N, ruts) {
    const clientsData = [];
  
    function getRandomRut() {
      const index = Math.floor(Math.random() * ruts.length);
      const rut = ruts[index];
      ruts.splice(index, 1);
      return rut;
    }
  
    function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
  
    function getRandomFutureDate() {
      const today = new Date();
      const futureDate = new Date(today.setDate(today.getDate() + 25));
      return futureDate.toISOString().split("T")[0];
    }
  
    for (let i = 0; i < N; i++) {
      const clientData = {
        cliente: getRandomRut(),
        saldo: getRandomInt(30000, 400000),
        fecha_vencimiento: getRandomFutureDate(),
      };
      clientsData.push(clientData);
    }
  
    return clientsData;
}
  
// Función que genera una lista con la morosidad de varios clientes para varias autopistas
export function addMorosidadToAutopistas(N) {
    
    let tags_clientes = [];
    for (let index = 0; index < autopistas.length; index++) {
        const ruts = [
            "12678433-2",
            "15489624-3",
            "18099772-5",
            "22776342-7",
            "19909233-5",
            "21456378-1",
            "15546897-9",
            "20899462-0",
            "17358224-8",
            "16870871-8",
            "24681012-3",
        ];
        const morosidad = generateClientsData(N, ruts);
        const tags = {
            nombre: autopistas[index],
            clientes: morosidad
        };
        tags_clientes.push(tags);
    }
    return tags_clientes;
}

export const Tags_Clientes = addMorosidadToAutopistas(10);


  