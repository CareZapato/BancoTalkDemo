async function postAll(data) {
	try {
		let response = await fetch('http://localhost:3800/api/general/all', {
		method: 'POST',
		headers: {
				'Content-Type': 'application/json'
		},
		body: JSON.stringify({"rut": formatRut(data.rut), "password": data.password})
		});

		let result = await response.json();
		result = {...result.payload, flag: true };
return result;

	} catch (errores) {
		const error = {
			code: 400,
			message: 'En este momento no podemos procesar tu solicitud.',
			flag: false
		}
		return error;
	}
};

function formatRut(data) { 
	return data.slice(0, -1) + "-" +  data.slice(-1);
};

export {postAll};