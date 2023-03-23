import React, {useEffect, useState} from 'react';
import Modal_Deposito from '../Modals/Modal_Deposito';
import Modal_Inversion from '../Modals/Modal_Inversion';
import Modal_Estado from '../Modals/Modal_Estado';
import Modal_PagoQR from '../Modals/Modal_PagoQR';
import Modal_PagarDeudas from '../Modals/Modal_PagarDeudas';
import Modal_EstadoDeudas from '../Modals/Modal_EstadoDeudas';
import Modal_EstadoDeudasApi from '../Modals/Modal_EstadoDeudasAPI';
import IonIcon from '@reacticons/ionicons';
import {languagesList} from '../languages';
import {modosPromptList} from '../modos';
import {getOpenAIInfo} from '../Service/OpenAiService';
import '../style.css';


function SpeechToText() {
		let SpeechRecognition =
						window.SpeechRecognition || window.webkitSpeechRecognition,
				recognition,
				recording = false;

		const recordBtn = document.querySelector(".record"), // Seleccionar el botón de grabación
				downloadBtn = document.querySelector(".download"), // Seleccionar el botón de descarga
				inputLanguage = document.querySelector("#language"), // Seleccionar el menú desplegable de idiomas
				inputModo = document.querySelector("#modo"), // Seleccionar el menú desplegable de idiomas
				clearBtn = document.querySelector(".clear"), // Seleccionar el botón de borrar texto
				resultObj = document.querySelector(".result"); // Seleccionar el elemento donde se mostrará el texto convertido

		const [languages, setLanguages] = useState([]); // Estado para almacenar los idiomas
		const [modosPrompt, setModosPrompt] = useState([]); // Estado para almacenar los modos

		const [showModalOne, setShowModalOne] = React.useState(false);
		const [showModalTwo, setShowModalTwo] = React.useState(false);
		const [showModalThree, setShowModalThree] = React.useState(false);
		const [showModalFour, setShowModalFour] = React.useState(false);
		const [showModalFive, setShowModalFive] = React.useState(false);
		const [showModalSix, setShowModalSix] = React.useState(false);
		const [showModalSeven, setShowModalSeven] = React.useState(false);

		const [resultado, setResultado] = React.useState({});


		useEffect(() => {
				setLanguages(languagesList); // Obtener la lista de idiomas desde un archivo externo y almacenarla en el estado
				setModosPrompt(modosPromptList);
		}, []);


		async function handleOpenAI(texto, modo) {
				if(texto){
						const openaiResponse = await getOpenAIInfo(texto, modo);
						switch (openaiResponse.modo) {
								case 'Dep':
										setResultado(openaiResponse);
										handleOpenModalOne();
										break;
								case 'Inv':
										setResultado(openaiResponse);
										handleOpenModalTwo();
										break;
								case 'Ver':
										setResultado(openaiResponse);
										handleOpenModalThree();
										break;
								case 'PQR':
										setResultado(openaiResponse);
										handleOpenModalFour();
										break;
								case 'Ser-P':
										setResultado(openaiResponse);
										handleOpenModalFive();
										break;
								case 'Ser-V':
										setResultado(openaiResponse);
										handleOpenModalSix();
										break;
								case 'Deu-V':
										setResultado(openaiResponse);
										handleOpenModalSeven();
										break;
								default:
										console.log(`Lo siento, no existe ${openaiResponse.modo}.`);
						}
				}
		}

		// Función para manejar el botón de grabación
		function handleRecordButton() {
				if (!recording) {
						speechToText(); // Si no se está grabando, iniciar la grabación
						recording = true;
				} else {
						stopRecording(); // Si se está grabando, detener la grabación
				}
		}

		// Función para manejar el botón de borrar texto
		function handleClearButton() {
				resultObj.innerHTML = ""; // Limpiar el texto convertido
		}

		const handleOpenModalOne = () => {
				setShowModalOne(true);
		};

		const handleOpenModalTwo = () => {
				setShowModalTwo(true);
		};

		const handleOpenModalThree = () => {
				setShowModalThree(true);
		};

		const handleOpenModalFour = () => {
				setShowModalFour(true);
		};

		const handleOpenModalFive = () => {
				setShowModalFive(true);
		};

		const handleOpenModalSix = () => {
				setShowModalSix(true);
		};

		const handleOpenModalSeven = () => {
				setShowModalSeven(true);
		};

		const handleCloseModal = () => {
				setShowModalOne(false);
				setShowModalTwo(false);
				setShowModalThree(false);
				setShowModalFour(false);
				setShowModalFive(false);
				setShowModalSix(false);
				setShowModalSeven(false);
		};

		// Función que realiza la conversión de voz a texto
		function speechToText() {
				try {
						recognition = new SpeechRecognition(); // Inicializar la API de reconocimiento de voz
						recognition.lang = inputLanguage.value; // Establecer el idioma seleccionado en el menú desplegable
						recognition.interimResults = true; // Habilitar los resultados provisionales
						recordBtn.classList.add("recording"); // Añadir la clase 'recording' al botón de grabación
						recordBtn.querySelector("p").innerHTML = "Escuchando..."; // Cambiar el texto del botón de grabación a 'Listening...'
						recognition.start(); // Iniciar la grabación
						recognition.onresult = (event) => {
								const speechResult = event.results[0][0].transcript; // Obtener el texto convertido
								// Detectar si los resultados son finales
								if (event.results[0].isFinal) {
										resultObj.innerHTML += " " + speechResult; // Añadir el texto convertido al elemento correspondiente
										resultObj.querySelector("p").remove(); // Quitar el elemento provisional
								} else {
										// Si aún no hay un elemento provisional, crearlo
										if (!document.querySelector(".interim")) {
												const interim = document.createElement("p");
												interim.classList.add("interim");
												resultObj.appendChild(interim);
										}
										// Actualizar el elemento provisional con el texto convertido
										document.querySelector(".interim").innerHTML= " " + speechResult;
								}
								downloadBtn.disabled = false; // Habilitar el botón de descarga
						};
						recognition.onspeechend = () => {
								speechToText(); // Reiniciar la grabación
						};
						recognition.onerror = (event) => {
								stopRecording();
								if (event.error === "no-speech") {
										//alert("No speech was detected. Stopping...");
								} else if (event.error === "audio-capture") {
										alert(
												"No se encuentra el microfono. Asegurate que el microfono este conectado."
										);
								} else if (event.error === "not-allowed") {
										alert("Permission to use microphone is blocked.");
								} else if (event.error === "aborted") {
										alert("Escucha detenida.");
								} else {
										alert("Ocurrio un error al grabar: " + event.error);
								}
						};
				} catch (error) {
						recording = false;
						console.log(error);
				}
		}

		function stopRecording() {
				recognition.stop();
				handleOpenAI(resultObj ? resultObj.innerHTML : '', inputModo.value);
				recordBtn.querySelector("p").innerHTML = "Escuchando...";
				recordBtn.classList.remove("recording");
				recording = false;
		}

		function handleDownloadButton() {
				const text = resultObj.innerText;
				const filename = "speech.txt";

				const element = document.createElement("a");
				element.setAttribute(
						"href",
						"data:text/plain;charset=utf-8," + encodeURIComponent(text)
				);
				element.setAttribute("download", filename);
				element.style.display = "none";
				document.body.appendChild(element);
				element.click();
				document.body.removeChild(element);
		}

		return (
				<div className="container">
						<p className="heading">VoiceBank</p>
						<div className="options">
								<div className="language">
										<p>Idioma</p>
										<select name="input-language" id="language">
												{languages.map((language) => (
														<option key={language.code} value={language.code}>
																{language.name}
														</option>
												))}
										</select>
										<p>Modo</p>
										<select name="input-modo" id="modo">
												{modosPrompt.map((modo) => (
														<option key={modo.no} value={modo.no}>
																{modo.name}
														</option>
												))}
										</select>
								</div>
						</div>
						<div className="line"></div>
						<button className={`btn record ${recording ? 'active' : ''}`} onClick={handleRecordButton}>
								<div className="icon">
										<IonIcon name="mic-outline" />
										<img src="bars.svg" alt="" />
								</div>
								<p>{recording ? 'Detener la escucha' : 'Escuchar'}</p>
						</button>
						<p className="heading">Petición:</p>
						<div
								className="result"
								spellCheck="false"
								placeholder="Text will be shown here"
						>
								<p className="interim"></p>
						</div>
						<div className="buttons">
								<button className="btn clear" onClick={handleClearButton}>
										<IonIcon name="trash-outline" />
										<p>Borrar</p>
								</button>
								<button className="btn download" onClick={handleDownloadButton}>
										<IonIcon name="cloud-download-outline" />
										<p>Descargar</p>
								</button>
						</div>
						<Modal_Deposito showModal={showModalOne} handleCloseModal={handleCloseModal} cuenta={resultado} />
						<Modal_Inversion showModal={showModalTwo} handleCloseModal={handleCloseModal} inversion={resultado}/>
						<Modal_Estado showModal={showModalThree} handleCloseModal={handleCloseModal} perfil={resultado}/>
						<Modal_PagoQR showModal={showModalFour} handleCloseModal={handleCloseModal} pago={resultado}/>
						<Modal_PagarDeudas showModal={showModalFive} handleCloseModal={handleCloseModal} pagar={resultado}/>
						<Modal_EstadoDeudas showModal={showModalSix} handleCloseModal={handleCloseModal} deudas={resultado}/>
						<Modal_EstadoDeudasApi showModal={showModalSeven} handleCloseModal={handleCloseModal} deudas={resultado}/>
				</div>
		);
}

export default SpeechToText;
