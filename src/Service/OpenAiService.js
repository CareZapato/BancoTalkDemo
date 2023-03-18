import {cuentas_agregadas} from '../Models/Cuentas';

const OPENAI_API_KEY = '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';

async function getOpenAIInfo(prompt) {
  const response = await fetch('https://api.openai.com/v1/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: "text-davinci-003",
      prompt: prompt,
      max_tokens: 100
    })
  });

  const data = await response.json();
  const splitInfo = data.choices[0].text.trim().split(";");
  return formatJson(splitInfo);
}

function formatJson(splitInfo) {
    let jsonAccion = {};
    switch (splitInfo[1]) {
        case 'Dep':
            jsonAccion = {
                "modo":splitInfo[1],
                "nombre":splitInfo[2],
                "rut":splitInfo[3],
                "banco":splitInfo[4],
                "tipoCuenta":splitInfo[5],
                "monto":splitInfo[6],
            }
            return jsonAccion;
        case 'Inv':
            jsonAccion = {
                "modo":splitInfo[1],
                "tipoDeposito":splitInfo[2],
                "cantidad":splitInfo[3],
                "dias":splitInfo[4]
            }
            return jsonAccion;
        case 'Ver':
            jsonAccion = {
                "modo":splitInfo[1],
                "cantidad":splitInfo[2],
                "tipoDeposito":splitInfo[3],
            }
            return jsonAccion;
        case 'Con':
            jsonAccion = {
                "aliasNombre":splitInfo[2],
            }
            const cuentasCoincidentes = 
                cuentas_agregadas.filter(
                    cuenta => cuenta.alias === jsonAccion.aliasNombre || 
                    cuenta.nombre === jsonAccion.aliasNombre
                );
            cuentasCoincidentes[0].modo = "Dep";
            return cuentasCoincidentes;
        default:
          console.log(`Lo siento, no existe ${splitInfo[1]}.`);
    }
}


export { getOpenAIInfo };