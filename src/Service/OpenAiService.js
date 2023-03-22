import {cuentas_agregadas} from '../Models/Cuentas';
import {deudas_servicios} from '../Models/Deudas';
import {deudaAPI} from '../Models/DeudaAPI';
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

function arrayDeudas(servicios) {
    const nuevas_deudas_servicios = [];
    for (let i = 0; i < deudas_servicios.length; i++) {
        const deuda = deudas_servicios[i];
        for (let j = 0; j < servicios.length; j++) {
          const servicio = servicios[j];
          if (deuda.servicio.toLowerCase().includes(servicio.toLowerCase())) {
            let monto_pago = 0;
            const siguiente_servicio = servicios[j+1];
            if (siguiente_servicio && siguiente_servicio.toLowerCase() === "total") {
              monto_pago = deuda.deuda;
            } else {
              const monto = Number(siguiente_servicio);
              if (!isNaN(monto)) {
                monto_pago = monto;
              }
            }
            nuevas_deudas_servicios.push({...deuda, monto_pago});
            break;
          }
        }
    }
    return nuevas_deudas_servicios;
}

function formatJson(splitInfo) {
    let jsonAccion = {};
    console.log("splitInfo: ",splitInfo);
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
            return jsonAccion;
        case 'Ver':
            jsonAccion = {
                "modo":splitInfo[1]
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
        case 'Ser-P':
            jsonAccion = {
                "modo":splitInfo[1],
            }
            const deudasCoincidentes = arrayDeudas(splitInfo);
            jsonAccion.cuentas = deudasCoincidentes;
            jsonAccion.perfil = perfil;
            console.log("jsonAccion: ",jsonAccion);
            return jsonAccion;
        case 'Ser-V':
            jsonAccion = {
                "modo":splitInfo[1],
            }
            jsonAccion.cuentas = deudas_servicios;
            jsonAccion.perfil = perfil;
            console.log("jsonAccion: ",jsonAccion);
            return jsonAccion;
        case 'PQR':
            jsonAccion = {
                "modo":splitInfo[1],
                "monto":splitInfo[2],
            };
            return jsonAccion;
        case 'Deu-V':
            jsonAccion = {
                "modo":splitInfo[1],
                "rut":splitInfo[2]
            };
            jsonAccion.rut = splitInfo[2];
            jsonAccion.deuda_api = deudaAPI;
            console.log("jsonAccion:",jsonAccion);
            return jsonAccion;
        default:
          console.log(`Lo siento, no existe ${splitInfo[1]}.`);
    }
}


export { getOpenAIInfo };