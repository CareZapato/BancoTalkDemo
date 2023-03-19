export const API_KEY = '';

export const RUT_LOGUEADO = "16870871-8";

export const FORMATO_RESPUESTAS = "Se entregará un texto del cual se puede deducir que quiere una de las 4 opciones: Depositar; Invertir; Preguntar estado de cuenta; Depositar a un contacto de mi lista"+ 
"En caso de que quiera Depositar extraeremos la información en el formato: ;Dep;Nombre_completo;Rut;Banco;Tipo_de_cuenta;Numero_de_cuenta;Cantidad."+ 
"En caso de que sea Invertir extraeremos la información en el formato: ;Inv;tipo_deposito;Cantidad;Dias."+
"En caso de que sea Preguntar el estado de cuenta nos entregara un valor: ;Ver;$50000;Deposito a plazo."+
"En caso de que sea Depositar a un contacto de mi lista extraeremos la información de un texto que incluye el alias. La respuesta debe ser en el formato: ;Con;alias;monto."+
"Recuerda que sólo debe entregarme una de las 4 opciones y el rut es formato chileno.";