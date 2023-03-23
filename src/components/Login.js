import React, { useState } from 'react';
import {Button, Form } from 'react-bootstrap';
import { postLogin } from '../Service/LoginApiService';
import { useNavigate } from "react-router-dom";
import { validateRUT } from 'validar-rut';

const Login = () => {

	  const navigate = useNavigate();
		const [rut, setRut] = useState('');
		const [password, setPassword] = useState('');

		const onSubmit = async (e) => {
			e.preventDefault();
			console.log(Form)
	
			const isValid = validateRUT(rut);
			if (isValid) {
				localStorage.setItem('rut', rut);
				localStorage.setItem('password', password);
			
				const response = await postLogin({rut, password})
				if (response.code === "200") {
					localStorage.setItem('user', JSON.stringify(response.data));
					navigate("/chat");
				}
			} else {
				alert('El rut ingresado no es válido');
			}
		}

		return (
				<>
						<div className={'container'}>
								<figure>
										<img src="/logoClaveUnica.png" alt="logo clave única"/>
								</figure>
								<figure className={"mx-5 text-center"}>
										<img src="/titleClaveUnica.png" alt="title clave única"/>
								</figure>
								<Form onSubmit={onSubmit}>
										<div>
												<Form.Group className="mb-3" controlId="rut">
														<Form.Label>Ingresa tu RUN</Form.Label>
														<Form.Control type="text" placeholder="9999999-9" defaultValue={rut} onChange={e => setRut(e.target.value)} />
												</Form.Group>
										</div>

										<Form.Group className="mb-3" controlId="password">
												<Form.Label>Ingresa tu ClaveÚnica</Form.Label>
												<Form.Control type="password" placeholder="Ab12345" value={password} onChange={e => setPassword(e.target.value)}/>
										</Form.Group>
										<Button variant="primary" type="submit">
												Ingresa
										</Button>
								</Form>
						</div>
				</>
		);
};

export default Login;
