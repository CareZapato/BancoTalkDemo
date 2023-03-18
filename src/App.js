import React, { useState, useEffect } from 'react';
import './style.css';
import { languagesList } from './languages.js';
import { trashOutline, cloudDownloadOutline } from 'ionicons/icons';
import IonIcon from '@reacticons/ionicons';


function SpeechToText() {
  let SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition,
  recognition,
  recording = false;

  const recordBtn = document.querySelector(".record"),
    downloadBtn = document.querySelector(".download"),
    inputLanguage = document.querySelector("#language"),
    clearBtn = document.querySelector(".clear"),
    resultObj = document.querySelector(".result");

  const [languages, setLanguages] = useState([]); // idioma por defecto

  useEffect(() => {
    setLanguages(languagesList);
  }, []);

  // Función para manejar el botón de grabación
  function handleRecordButton() {
    if (!recording) {
      speechToText();
      recording = true;
    } else {
      stopRecording();
    }
  }

  // Función para manejar el botón de grabación
  function handleClearButton() {
    resultObj.innerHTML = "";
  }

  function speechToText() {
    try {
      recognition = new SpeechRecognition();
      recognition.lang = inputLanguage.value;
      recognition.interimResults = true;
      recordBtn.classList.add("recording");
      recordBtn.querySelector("p").innerHTML = "Listening...";
      recognition.start();
      recognition.onresult = (event) => {
        const speechResult = event.results[0][0].transcript;
        //detect when intrim results
        if (event.results[0].isFinal) {
          resultObj.innerHTML += " " + speechResult;
          resultObj.querySelector("p").remove();
        } else {
          //creative p with class interim if not already there
          if (!document.querySelector(".interim")) {
            const interim = document.createElement("p");
            interim.classList.add("interim");
            resultObj.appendChild(interim);
          }
          //update the interim p with the speech result
          document.querySelector(".interim").innerHTML= " " + speechResult;
        }
        downloadBtn.disabled = false;
      };
      recognition.onspeechend = () => {
        speechToText();
      };
      recognition.onerror = (event) => {
        stopRecording();
        if (event.error === "no-speech") {
          alert("No speech was detected. Stopping...");
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
        class="result"
        spellcheck="false"
        placeholder="Text will be shown here"
      >
        <p class="interim"></p>
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
    </div>
  );
}

export default SpeechToText;
