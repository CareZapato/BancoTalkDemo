export const API_KEY = '';

export const RUT_LOGUEADO = "16870871-8";

export const FORMATO_RESPUESTAS = "Se entregará un texto que lo llamaremos TextoEntrada del cual se puede deducir que quiere una de las 2 opciones: A) Pagar deudas de servicios basicos; B) Preguntar la deuda por servicios; De ambas quiero obtener un TextoSalida con unos formato específicos descritos a continuación:"+ 
"A) En caso de que el TextoEntrada contenga algo referente a pagar deudas o servicios basicos, necesito extraer la lista de los servicios a pagar y cuanto pagara de el. Considerar las siguientes instrucciones:"+
"1) El texto puede decir explicitamente que queire pagar las deudas de sus servicios basicos, o incluso que quiere pagar sus servicios basicos solamente."+
"2) El texto tambien puede decir que quiere pagar sus deudas y tendra el mismo resultado."+
"3) El texto tambien puede contener el monto que se desea pagar. Si dice que quiere pagar el total de las cuentas, todos los valores diran 'total'. Si dice un monto, ese monto ocupara ese lugar. Si no dice nada, se asume que es el 'total'."+
"4) El resultado (TextoSalida) que espero de regreso debe tener el siguiente formato considerando que pueda tener n servicios se espera este estricto formato del TextoSalida. El TextoSalida debe ser el siguiente texto sin nada mas y sin un texto que lo acompañe para ser presentado: ;Ser-P;nombre_servicio_01;monto_servicio_01;nombre_servicio_02;monto_servicio_02;nombre_servicio_03;monto_servicio_03;nombre_servicio_n;monto_servicio_n."+ 
"B) En caso de que el TextoEntrada pregunta por una lista de sus deudas, por servicios basicos o el estado de sus servicios basicos. El TextoSalida debe ser el siguiente texto sin nada mas y sin un texto que lo acompañe para ser presentado. El texto de salida debe comenzar con un punto y coma, el string Ser-V y punta y coma nuevamente: ;Ser-V;"+
"Recuerda que sólo debe entregarme una de las 2 opciones A o B.";

// export const FORMATO_RESPUESTAS = "Se entregará un texto del cual se puede deducir que quiere una de las 5 opciones: Depositar; Invertir; Preguntar estado de cuenta; Depositar a un contacto de mi lista; Pago QR"+ 
// "En caso de que quiera Depositar extraeremos la información en el formato: ;Dep;Nombre_completo;Rut;Banco;Tipo_de_cuenta;Numero_de_cuenta;Cantidad."+ 
// "En caso de que sea Invertir extraeremos la información en el formato: ;Inv;tipo_deposito;Cantidad;Dias."+
// "En caso de que sea Preguntar el estado de cuenta, su perfil personal, o su saldo (sus saldos), nos entregara el valor exacto: ;Ver;"+
// "En caso de que sea Depositar a un contacto de mi lista extraeremos la información de un texto que incluye el alias. La respuesta debe ser en el formato: ;Con;alias;monto."+
// "En caso de que sea generar Pago QR por un monto o cantidad de dinero, extraemos la informacion en el formato : ;PQR;monto"+
// "Recuerda que sólo debe entregarme una de las 5 opciones y el rut es formato chileno.";