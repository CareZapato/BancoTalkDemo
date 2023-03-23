export const API_KEY = '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';

export const RUT_LOGUEADO = "16870871-8";


//*************************** DEUDAS Bancos con promp afinado por chatgpt ********************************** */
export const FORMATO_RESPUESTAS_Deudas_Bancos = "Se entregará un texto que explica la peticion de una persona donde que llamaremos TextoEntrada del cual se puede deducir que quiere una de las 2 opciones: A) Pagar deudas que tiene asociadas; B) Preguntas sobre sus deudas; De ambas quiero obtener un texto llamaremos TextoSalida con unos formato específicos descritos a continuación:"+ 
"A) En caso de que el TextoEntrada contenga algo referente a pagar deudas o pagar tarjetas, necesito extraer la lista de las deudas a pagar con un detalle de lo que quiere pagar y cuanto acompañado finalmente del rut de la persona, que puede estar dicho de muchas formas pero siempre tendra un formato similar a 11111111-1 (rut chileno). Para lograr eso necesito que consideres las siguientes instrucciones:"+
"1) El TextEntrada puede decir que quiere pagar todas sus deudas, como por ejemplo, 'necesito pagar todas mis deudas' o 'quiero liberarme de las tarjetas'. En este caso se asume que quiere pagar todo de todas las deudas que tenga asociado y el TextoSalida debe ser el siguiente: ;Deu-T;rut."+
"2) El TextEntrada puede decir que quiere pagar solo un monto de cierta deuda o tarjeta, los tipos de tarjeta pueden ser credito o debito,puede decirlo repetidamente si son distintas entidades, como por ejemplo, 'quiero pagar de la tarjeta visa de debito 3000 y de la tarjeta mastercard 10000 de credito .' o tambien agregar, 'Tambien el total de la tarjeta falabella'. Esto puede repetirse y variar dentro del texto varias veces nombrando distintas entidades y distintos montos de distintos tipos de tarjeta (Credito o Debito). En este caso el TextoSalida que necesito para N entidades ademas con tipo que puede ser 'Credito o Debito' espero: ;Deu-AM;nombre_entidad_01;tipo_01;monto_01;nombre_entidad_02;tipo_02;monto_02;nombre_entidad_03;tipo_03;monto_03;nombre_entidad_N;tipo_n;monto_n;rut. Tener en cuenta que si no nombra el monto se asume que es el total de la deuda de esa tarjeta y eso hara que el el valor monto sea reemplazado por 'total'. Lo mismo si dice que quiere pagar el total de la deuda. Si no dice el tipo, se asume que son credito y debito por separado, es decir que habria que agregar dos secuencias (;Banco Falabella;Credito;total;Banco Falabella;Debito;59999;)"+
"B) En caso de que el TextoEntrada pregunta por una lista de sus deudas, o un detalle de sus deudas, como por ejemplo, 'quiero saber cuales son todas mis deudas' o 'quiero saber cuanto debo', o tambien, 'quiero saber cuanto debo en las tarjetas', etc. El TextoSalida debe ser el siguiente texto sin nada mas y sin un texto que lo acompañe para ser presentado. El texto de salida debe comenzar con un punto y coma, el string Ser-V y punta y coma nuevamente: ;Deu-V;rut;"+
"Recuerda que sólo debe entregarme el TextoSalida dependiendo las descipciones descritas, no agregar mas información que la que aparezca en el TextoEntrada (no agregar mas valores, bancos, entidades, montos, etc). Además tener en cuenta la forma de hablar, es posible que diga 'quiero pagar la tarjeta de credito del banco...' o 'mi tarjeta del banco...' y quiere decir que el banco es de esa entidad. Los ejemplos pueden tener muchas variedades pero eso no debe haver variar el formato de TextoSalida esperado."+
"Dentro de las palabras claves del TextoEntrada estan: Banco de Chile, Banco Estado, Scotiakank, Banco Santander, Banco Falabella, Banco BCI (Credito de inversiones), Monto, Pagar, Deuda.";


//*************************** DEUDAS CUENTAS BASICAS ********************************** */
export const FORMATO_RESPUESTAS_Servicio_Basicos = "Se entregará un texto que lo llamaremos TextoEntrada del cual se puede deducir que quiere una de las 2 opciones: A) Pagar deudas de servicios basicos; B) Preguntar la deuda por servicios; De ambas quiero obtener un TextoSalida con unos formato específicos descritos a continuación:"+ 
"A) En caso de que el TextoEntrada contenga algo referente a pagar deudas o servicios basicos, necesito extraer la lista de los servicios a pagar y cuanto pagara de el. Considerar las siguientes instrucciones:"+
"1) El texto puede decir explicitamente que queire pagar las deudas de sus servicios basicos, o incluso que quiere pagar sus servicios basicos solamente."+
"2) El texto tambien puede decir que quiere pagar sus deudas y tendra el mismo resultado."+
"3) El texto tambien puede contener el monto que se desea pagar. Si dice que quiere pagar el total de las cuentas, todos los valores diran 'total'. Si dice un monto, ese monto ocupara ese lugar. Si no dice nada, se asume que es el 'total'."+
"4) El resultado (TextoSalida) que espero de regreso debe tener el siguiente formato considerando que pueda tener n servicios se espera este estricto formato del TextoSalida. El TextoSalida debe ser el siguiente texto sin nada mas y sin un texto que lo acompañe para ser presentado: ;Ser-P;nombre_servicio_01;monto_servicio_01;nombre_servicio_02;monto_servicio_02;nombre_servicio_03;monto_servicio_03;nombre_servicio_n;monto_servicio_n."+ 
"B) En caso de que el TextoEntrada pregunta por una lista de sus deudas, por servicios basicos o el estado de sus servicios basicos. El TextoSalida debe ser el siguiente texto sin nada mas y sin un texto que lo acompañe para ser presentado. El texto de salida debe comenzar con un punto y coma, el string Ser-V y punta y coma nuevamente: ;Ser-V;"+
"Recuerda que sólo debe entregarme una de las 2 opciones A o B.";


//**************************** PARA BANCOS ******************************************** */
export const FORMATO_RESPUESTAS_transacciones_bancarias = "Se entregará un texto del cual se puede deducir que quiere una de las 5 opciones: Depositar; Invertir; Preguntar estado de cuenta; Depositar a un contacto de mi lista; Pago QR"+ 
"En caso de que quiera Depositar extraeremos la información en el formato: ;Dep;Nombre_completo;Rut;Banco;Tipo_de_cuenta;Numero_de_cuenta;Cantidad."+ 
"En caso de que sea Invertir extraeremos la información en el formato: ;Inv;tipo_deposito;Cantidad;Dias."+
"En caso de que sea Preguntar el estado de cuenta, su perfil personal, o su saldo (sus saldos), nos entregara el valor exacto: ;Ver;"+
"En caso de que sea Depositar a un contacto de mi lista extraeremos la información de un texto que incluye el alias. La respuesta debe ser en el formato: ;Con;alias;monto."+
"En caso de que sea generar Pago QR por un monto o cantidad de dinero, extraemos la informacion en el formato : ;PQR;monto"+
"Recuerda que sólo debe entregarme una de las 5 opciones y el rut es formato chileno.";

//export const FORMATO_URL= "puedes explicarme esta noticia que esta en esta url: https://www.latercera.com/mundo/noticia/si-hay-que-asumir-la-impopularidad-hoy-la-asumire-macron-apuesta-a-que-reforma-de-pensiones-entre-en-vigor-este-ano/NVDDLYOPARGU5GHZKUX3AKAFC4/ ";
