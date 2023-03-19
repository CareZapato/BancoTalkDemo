import {cuentas_agregadas} from '../Models/Cuentas';
import {perfil} from '../Models/Perfil';
import {API_KEY, RUT_LOGUEADO} from '../constants';

async function getOpenAIInfo(prompt) {
  console.log("API_KEY: "+API_KEY);
  const response = await fetch('https://api.openai.com/v1/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${API_KEY}`
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
                "tipo_cuenta":splitInfo[5],
                "n_cuenta":splitInfo[6],
                "monto":splitInfo[7],
            }
            return jsonAccion;
        case 'Inv':
            
            jsonAccion = {
                "modo":splitInfo[1],
                "tipo_deposito":splitInfo[2],
                "monto":splitInfo[3],
                "dias":splitInfo[4]
            }
            console.log("jsonAccion:",jsonAccion);
            return jsonAccion;
        case 'Ver':
            jsonAccion = {
                "modo":splitInfo[1],
                "rut":RUT_LOGUEADO
            }
            perfil.modo = splitInfo[1];
            return perfil;
        case 'Con':
            jsonAccion = {
                "aliasNombre":splitInfo[2]
            }
            const cuentasCoincidentes = 
                cuentas_agregadas.filter(
                    cuenta => jsonAccion.aliasNombre.includes(cuenta.alias)
                );
            cuentasCoincidentes[0].modo = "Dep";
            cuentasCoincidentes[0].monto= splitInfo[3];
            return cuentasCoincidentes[0];
        default:
          console.log(`Lo siento, no existe ${splitInfo[1]}.`);
    }
}


export { getOpenAIInfo };