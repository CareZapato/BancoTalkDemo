import React, { useState, useEffect } from 'react';
import './style.css';
import { languagesList } from './languages.js';
import { trashOutline, cloudDownloadOutline } from 'ionicons/icons';
import IonIcon from '@reacticons/ionicons';

import ModalOne from './Modals/ModalOne';
import ModalTwo from './Modals/ModalTwo';
import ModalThree from './Modals/ModalThree';

import { getOpenAIInfo } from './Service/OpenAiService';

function SpeechToText() {
  let SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition,
  recognition,
  recording = false;

  const recordBtn = document.querySelector(".record"), // Seleccionar el botón de grabación
    downloadBtn = document.querySelector(".download"), // Seleccionar el botón de descarga
    inputLanguage = document.querySelector("#language"), // Seleccionar el menú desplegable de idiomas
    clearBtn = document.querySelector(".clear"), // Seleccionar el botón de borrar texto
    resultObj = document.querySelector(".result"); // Seleccionar el elemento donde se mostrará el texto convertido

  const [languages, setLanguages] = useState([]); // Estado para almacenar los idiomas

  const [showModalOne, setShowModalOne] = React.useState(false);
  const [showModalTwo, setShowModalTwo] = React.useState(false);
  const [showModalThree, setShowModalThree] = React.useState(false);

  const [resultado, setResultado] = React.useState({});


  useEffect(() => {
    setLanguages(languagesList); // Obtener la lista de idiomas desde un archivo externo y almacenarla en el estado
  }, []);

  async function handleOpenAI(texto) {
    if(texto){
      const formato = "Se entregará un texto del cual se puede deducir que quiere una de las 4 opciones: Depositar; Invertir; Preguntar estado de cuenta; Depositar a un contacto de mi lista"+ 
      "En caso de que quiera Depositar extraeremos la información en el formato: ;Dep;Nombre_completo;Rut;Banco;Tipo_de_cuenta;Numero_de_cuenta;Cantidad."+ 
      "En caso de que sea Invertir extraeremos la información en el formato: ;Inv;tipo_deposito;Cantidad;Dias."+
      "En caso de que sea Preguntar el estado de cuenta nos entregara un valor: ;Ver;$50000;Deposito a plazo."+
      "En caso de que sea Depositar a un contacto de mi lista extraeremos la información en el formato: ;Con;alias_o_nombre;monto.";
      const prompt = formato+ "Recuerda que sólo debe entregarme una de las 4 opciones y el rut es formato chileno. El texto es el siguiente: "+texto;
      const openaiResponse = await getOpenAIInfo(prompt);
      switch (openaiResponse[0].modo) {
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
        default:
          console.log(`Lo siento, no existe ${openaiResponse.modo}.`);
      }
      console.log(openaiResponse);
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
  
  const handleCloseModal = () => {
    setShowModalOne(false);
    setShowModalTwo(false);
    setShowModalThree(false);
  };

  // Función que realiza la conversión de voz a texto
  function speechToText() {
    try {
      recognition = new SpeechRecognition(); // Inicializar la API de reconocimiento de voz
      recognition.lang = inputLanguage.value; // Establecer el idioma seleccionado en el menú desplegable
      recognition.interimResults = true; // Habilitar los resultados provisionales
      recordBtn.classList.add("recording"); // Añadir la clase 'recording' al botón de grabación
      recordBtn.querySelector("p").innerHTML = "Listening..."; // Cambiar el texto del botón de grabación a 'Listening...'
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
            "No microphone was found. Ensure that a microphone is installed."
          );
        } else if (event.error === "not-allowed") {
          alert("Permission to use microphone is blocked.");
        } else if (event.error === "aborted") {
          alert("Listening Stopped.");
        } else {
          alert("Error occurred in recognition: " + event.error);
        }
      };
    } catch (error) {
      recording = false;
      console.log(error);
    }
  }

  function stopRecording() {
    recognition.stop();
    handleOpenAI(resultObj ? resultObj.innerHTML : '');
    recordBtn.querySelector("p").innerHTML = "Start Listening";
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
      <p className="heading">Speech to Text</p>
      <div className="options">
        <div className="language">
          <p>Language</p>
          <select name="input-language" id="language">
            {languages.map((language) => (
              <option key={language.code} value={language.code}>
                {language.name}
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
        <p>{recording ? 'Stop Listening' : 'Start Listening'}</p>
      </button>
      <p className="heading">Result :</p>
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
          <p>Clear</p>
        </button>
        <button className="btn download" onClick={handleDownloadButton}>
          <IonIcon name="cloud-download-outline" />
          <p>Download</p>
        </button>
      </div>
      <ModalOne showModal={showModalOne} handleCloseModal={handleCloseModal} cuenta={resultado[0]} />
      <ModalTwo showModal={showModalTwo} handleCloseModal={handleCloseModal} />
      <ModalThree showModal={showModalThree} handleCloseModal={handleCloseModal} />
    </div>
  );
}

export default SpeechToText;
