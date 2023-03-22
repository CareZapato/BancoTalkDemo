function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateRandomData(rut) {
    const institutions = [
      "Banco de Chile",
      "Banco del Sur",
      "Banco Central",
      "Banco Estado",
      "Banco BBVA",
    ];
  
    const getRandomInstitution = () => {
      const index = getRandomInt(0, institutions.length - 1);
      return institutions[index];
    };
  
    const generateDirectDebt = () => {
      return {
        institution: getRandomInstitution(),
        currentDebt: getRandomInt(1000000, 50000000).toString(),
        between30To89Days: getRandomInt(0, 50000).toString(),
        over90Days: getRandomInt(0, 200000).toString(),
        total: getRandomInt(1000000, 50000000).toString(),
      };
    };
  
    const generateLine = () => {
      return {
        institution: getRandomInstitution(),
        direct: getRandomInt(1000000, 50000000).toString(),
        indirect: getRandomInt(0, 3000000).toString(),
      };
    };
  
    const directDebtCount = getRandomInt(2, 4);
    const linesCount = getRandomInt(2, 4);
  
    const directDebt = [];
    for (let i = 0; i < directDebtCount; i++) {
      directDebt.push(generateDirectDebt());
    }
  
    const lines = [];
    for (let i = 0; i < linesCount; i++) {
      lines.push(generateLine());
    }
  
    return {
      rut: rut,
      directDebt: directDebt,
      lines: lines,
    };
}

function getRandomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
}
  
function generateRandomName() {
    const firstNames = [
      "María", "José", "Antonio", "Juana", "Francisco", "Manuel", "Pedro",
      "Carmen", "Luis", "Angélica", "Miguel", "Susana", "Jorge", "Laura",
    ];
  
    const secondNames = [
      "Fernando", "Isabel", "Roberto", "Patricia", "Carlos", "Ana", "Gabriel",
      "Teresa", "Pablo", "Esther", "Diego", "Marta", "Ricardo", "Sofía",
    ];
  
    const paternalSurnames = [
      "González", "Rodríguez", "Pérez", "Sánchez", "Ramírez", "Torres",
      "Hernández", "López", "García", "Martínez", "Díaz", "Castillo",
    ];
  
    const maternalSurnames = [
      "Mendoza", "Vargas", "Guzmán", "Ortega", "Rojas", "Rivera", "Figueroa",
      "Alvarado", "Moreno", "Núñez", "Romero", "Salazar",
    ];
  
    return `${getRandomElement(firstNames)} ${getRandomElement(secondNames)} ${getRandomElement(paternalSurnames)} ${getRandomElement(maternalSurnames)}`;
}
  
  // Uso de la función:
export function generateDeudaAPI(rut) {
    const randomData = generateRandomData(rut);
    const currentDate = new Date().toISOString().split('T')[0];
    const randomName = generateRandomName();
  
    return {
      code: "200",
      msg: "OK",
      caseid: "24caf908-2cc9-4125-82bd-284a053d2f84",
      data: {
        name: randomName,
        rut: rut,
        updated: currentDate,
        directDebt: randomData.directDebt,
        indirectDebt: [],
        credits: {
          lines: randomData.lines,
          others: [],
        },
      },
    };
  }