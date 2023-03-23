async function postAll() {
		const response = await fetch('http://localhost:3800/api/general/all', {
				method: 'POST',
				headers: {
						'Content-Type': 'application/json'
				},
				body: JSON.stringify({'rut': '19202480-3', 'password': 'xxxxxxx'})
		});
		const result = await response.json();
		console.log('responsev ', result);
		return result.payload;
};

export {postAll};
