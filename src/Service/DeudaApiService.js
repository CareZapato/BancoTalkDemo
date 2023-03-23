async function postAll() {
	try {
		let response = await fetch('http://localhost:3800/api/general/all', {
		method: 'POST',
		headers: {
				'Content-Type': 'application/json'
		},
		body: JSON.stringify({"rut": "26247043-1", "password": "xxxxxx"})
		});

		const result = await response.json() ? await response.json() : response;
		response = {...result.payload ? result.payload : response, flag: true };

return response.payload;

	} catch (errores) {
		const error = {
			code: 400,
			message: 'En este momento no podemos procesar tu solicitud.',
			flag: false
		}
		return error;
	}
};

export { postAll };