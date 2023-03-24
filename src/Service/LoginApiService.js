export const postLogin = async ({ rut, password }) => {
	const payload = {
		rut,
		password
	}
	try {
		const response = await fetch('http://localhost:3800/api/auth', {
				method: 'POST',
				headers: {
						'Content-Type': 'application/json'
				},
				body: JSON.stringify(payload)
		});
		const result = await response.json();
		return result;
	} catch (error) {
		console.log(error);
	}
};

