export const API_KEY = '';

export const RUT_LOGUEADO = "16870871-8";

export const FORMATO_RESPUESTAS = "Se entregará un texto del cual se puede deducir que quiere una de las 5 opciones: Depositar; Invertir; Preguntar estado de cuenta; Depositar a un contacto de mi lista; Pago QR"+ 
"En caso de que quiera Depositar extraeremos la información en el formato: ;Dep;Nombre_completo;Rut;Banco;Tipo_de_cuenta;Numero_de_cuenta;Cantidad."+ 
"En caso de que sea Invertir extraeremos la información en el formato: ;Inv;tipo_deposito;Cantidad;Dias."+
"En caso de que sea Preguntar el estado de cuenta, su perfil personal, o su saldo (sus saldos), nos entregara el valor exacto: ;Ver;"+
"En caso de que sea Depositar a un contacto de mi lista extraeremos la información de un texto que incluye el alias. La respuesta debe ser en el formato: ;Con;alias;monto."+
"En caso de que sea generar Pago QR por un monto o cantidad de dinero, extraemos la informacion en el formato : ;PQR;monto"+
"Recuerda que sólo debe entregarme una de las 5 opciones y el rut es formato chileno.";