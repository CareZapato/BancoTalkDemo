import React from 'react';
import {Button, Form} from 'react-bootstrap';
import {useForm} from '../hooks/useForm';
import { validateRUT } from "validar-rut";

const Login = () => {

		const {rut, password, onInputChange } = useForm({
				rut: '26565996-9',
				password: '123456'
		});

		const onSubmit = (e) => {
				e.preventDefault();
				const valided = validateRUT(rut);
				console.log({rut, password});
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
												<Form.Group className="mb-3" controlId="rut" >
														<Form.Label>Ingresa tu RUN</Form.Label>
														<Form.Control type="text" placeholder="9999999-9" value={rut} onChange={onInputChange}/>
												</Form.Group>
										</div>

										<Form.Group className="mb-3" controlId="password">
												<Form.Label>Ingresa tu ClaveÚnica</Form.Label>
												<Form.Control type="password" placeholder="Ab12345" value={password} onChange={onInputChange}/>
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
