import React from "react";
import { Link, json } from "react-router-dom";
import { useState, useEffect } from "react";
import { faFileWord, faFilePdf } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Navbar from "../components/Navbar";
import { useAuth } from "../auth/authProvider";
//import Toastify from "toastify-js";
//import "toastify-js/src/toastify.css";
import { Temporal } from "@js-temporal/polyfill";

export default function FormAnalysis() {
  const [title, setTitle] = useState("");
  const [files, setFiles] = useState([]);
  const [keys, setKeys] = useState([]);
  const [keyOptions, setKeyOptions] = useState([]);
  const [freeAIs, setFreeAIs] = useState([]);
  const [freeAIsOptions, setFreeAIsOptions] = useState([]);
  const [tags, setTags] = useState([]);
  const [tagsOptions, setTagsOptions] = useState([]);
  const [formPass, setFormPass] = useState(false);
  const [processStarted, setProcessStarted] = useState(false);
  const [processFinished, setProcessFinished] = useState(false);
  const [badProcessEnding, setBadProcessEnding] = useState(false);
  const [currentDate, setCurrentDate] = useState("");
  const [currentTime, setCurrentTime] = useState("");
  const [endDate, setEndDate] = useState("");
  const [endTime, setEndTime] = useState("");
  const [resultMessage, setResultMessage] = useState("");
  const [originalityDisplayCount, setOriginalityDisplayCount] = useState("0%");
  const [chatGPTDisplayCount, setChatGPTDisplayCount] = useState("0%");
  const [fastDetectGPTDisplayCount, setFastDetectGPTDisplayCount] = useState("0%");
  const [lmWatermarkingDisplayCount, setLmWatermarkingDisplayCount] = useState("0%");
  const [item, setItem] = useState(null); //Análisis creado
  const [usedAIs, setUsedAIs] = useState([]);
  const user = useAuth();

  useEffect(() => {
    fetch(`http://localhost:3333/api/final/key/user/${user.idUser}`)
      .then((response) => response.json())
      .then((data) => setKeyOptions(data))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    fetch("http://localhost:3333/api/final/ai/free")
      .then((response) => response.json())
      .then((data) => setFreeAIsOptions(data))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    fetch(`http://localhost:3333/api/final/tag/user/${user.idUser}`)
      .then((response) => response.json())
      .then((data) => setTagsOptions(data))
      .catch((error) => console.log(error));
  }, []);

  const handleTitleChange = (event) => {
    const t = event.target.value;
    setTitle(t);
  };

  const handleKeyChange = (event) => {
    const id = event.target.id;
    const checked = event.target.checked;

    if (checked) {
      setKeys([...keys, keyOptions.find(key => key.id.toString() === id.toString())]);
    } else {
      setKeys(keys.filter(key => key.id.toString() !== id.toString()));
    }
  };

  const handleFreeAIChange = (event) => {
    const id = event.target.id;
    const checked = event.target.checked;

    if (checked) {
      setFreeAIs([...freeAIs, freeAIsOptions.find(ai => ai.id.toString() === id.toString())]);
    } else {
      setFreeAIs(freeAIs.filter(ai => ai.id.toString() !== id.toString()));
    }
  };

  useEffect(() => {
    const keysIAs = keys.map(key => key.ai.name);
    const freeAIsNames = freeAIs.map(ai => ai.name);
    const allAIs = keysIAs.concat(freeAIsNames);
    setUsedAIs(allAIs);
  }, [keys, freeAIs])

  const handleTagChange = (event) => {
    const id = event.target.id;
    const checked = event.target.checked;

    if (checked) {
      setTags([...tags, tagsOptions.find(tag => tag.id.toString() === id.toString())]);
    } else {
      setTags(tags.filter(tag => tag.id.toString() !== id.toString()));
    }
  };

  const handleFileInputChange = (event) => {
    const files = event.target.files;
    setFiles(files);
  };

  useEffect(() => {
    const AI_count = freeAIs.length + keys.length;
    const isTitleEmpty = title === "";
    const isFilesEmpty = files.length === 0;
    const pass = AI_count > 0 && !isTitleEmpty && !isFilesEmpty;
    setFormPass(pass);
  }, [title, files, keys, freeAIs]);

  function extractJSON(inputString) {
    let jsonStart = inputString.indexOf('{');
    while (jsonStart !== -1) {
      let stack = [];
      for (let i = jsonStart; i < inputString.length; i++) {
        if (inputString[i] === '{') {
          stack.push('{');
        } else if (inputString[i] === '}') {
          stack.pop();
          if (stack.length === 0) {
            let jsonString = inputString.substring(jsonStart, i + 1);
            try {
              let jsonObject = JSON.parse(jsonString);
              return jsonObject;
            } catch (e) {
              console.error("Extracted string is not a valid JSON:", e);
            }
          }
        }
      }
      jsonStart = inputString.indexOf('{', jsonStart + 1);
    }
    console.error("No valid JSON object found in the input string.");
    return null;
  }

  //FUNCION PRINCIPAL: PROCESO DE ANÁLISIS
  async function handleSubmit(event) {
    event.preventDefault();
    setProcessStarted(true);
    const nowDate = Temporal.Now.plainDateISO();
    const nowTime = Temporal.Now.plainTimeISO();
    const nowTimeWithoutMiliseconds = nowTime.toString().split(".")[0];
    setCurrentDate(nowDate.toString());
    setCurrentTime(nowTimeWithoutMiliseconds);
    try {
      //Crear formData
      let formData = new FormData();
      formData.append("title", title);
      formData.append("keys", JSON.stringify(keys));
      formData.append("freeAIs", JSON.stringify(freeAIs));
      formData.append("tags", JSON.stringify(tags));

      for (let i = 0; i < files.length; i++) {
        formData.append("documents", files[i]);
      }

      console.log(formData.get("title"));
      console.log(formData.get("keys"));
      console.log(formData.get("freeAIs"));
      console.log(formData.get("tags"));
      console.log(formData.getAll("documents"));

      //Inicio proceso
      //Rescatar identificadores
      const api_originality = keys.find(key => key.ai.name === "Originality")?.api_key;
      const api_chatGPT = keys.find(key => key.ai.name === "ChatGPT (GPT-4)")?.api_key;

      const originality_id = keys.find(key => key.ai.name === "Originality")?.ai?.id;
      const chatgpt_id = keys.find(key => key.ai.name === "ChatGPT (GPT-4)")?.ai?.id;
      const fastDetectGPT_id = freeAIs.find(ai => ai.name === "Fast Detect GPT")?.id;
      const lmWatermarking_id = freeAIs.find(ai => ai.name === "Lm Watermarking")?.id;

      /* 
      let verifyOriginality = null;
      try {
        verifyOriginality = await fetch("http://localhost:3333/api/final/check/originality", {
          method: "POST",
          body: JSON.stringify({
            api_key: api_originality
          })
        });
        const dataVerifyOriginality = await verifyOriginality.json();
        console.log(dataVerifyOriginality);
      } catch (error) {
        console.log("Error:", error);
        console.log("Error de disponibilidad en Originality. Código: " + error.code);
        IAs = usedAIs.filter(ia => ia !== "Originality");
        setUsedAIs(IAs);
      }
      let verifyChatGPT = null;
      try {
        verifyChatGPT = await fetch("http://localhost:3333/api/final/check/chatgpt", {
          method: "POST",
          body: JSON.stringify({
            api_key: api_chatGPT
          })
        });
        const dataVerifyChatGPT = await verifyChatGPT.json();
        console.log(dataVerifyChatGPT);
      } catch (error) {
        console.log("Error:", error);
        console.log("Error de disponibilidad en ChatGPT.");
        IAs = usedAIs.filter(ia => ia !== "ChatGPT (GPT-4)");
        setUsedAIs(IAs);
      }*/

      var timeTextExtraction = performance.now();
      let textsExtracted = null;
      try {
        textsExtracted = await fetch("http://localhost:3333/api/final/files", {
          method: "POST",
          body: formData
        });
      } catch (error) {
        console.log("Error:", error);
        //No puede fallar esta parte (Sin los textos, es imposible proceder)
        //Si falla, se bota todo el proceso
        setProcessFinished(true);
        setBadProcessEnding(true);
        setResultMessage("Proceso finalizado con errores: " + error);
        return;
      }

      const dataTexts = await textsExtracted.json();
      console.log(dataTexts);
      const texts = dataTexts.texts;
      const texts_8192 = dataTexts.texts_8192;
      const texts_2048 = dataTexts.texts_2048;
      var timeTextExtractionEnd = performance.now();
      console.log("Tiempo de extracción de texto: " + (timeTextExtractionEnd - timeTextExtraction) + " ms");
      console.log("Largo textos: " + texts.length);
      console.log("Largo subtextos 8192: " + texts_8192.length);
      console.log("Largo subtextos 2048: " + texts_2048.length);
      //Si la extracción de texto fué exitosa, se crea el análisis
      const nowDate = Temporal.Now.plainDateISO().toString();
      let new_analysis = null;
      try {
        new_analysis = await fetch("http://localhost:3333/api/final/analysis", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            title: title,
            tags: tags,
            user_id: user.idUser,
            created: nowDate
          })
        });
      } catch (error) {
        //Creación fallida, no se puede continuar
        console.log("Error:", error);
        setProcessFinished(true);
        setBadProcessEnding(true);
        setResultMessage("Proceso finalizado con errores: " + error);
        return;
      }
      const analysis = await new_analysis.json();
      console.log(analysis);
      setItem(analysis);
      const analysis_id = analysis.id;

      //Contadores de documentos procesados por detectores
      let originalityCount = 0;
      let chatGPTCount = 0;
      let fastDetectGPTCount = 0;
      let lmWatermarkingCount = 0;

      var fullTimeAnalysis = performance.now();

      //Algoritmo textos
      for (let i = 0; i < texts.length; i++) {
        console.log("Largo textos: " + texts.length);
        var timeTextAnalysis = performance.now();

        //Se crea el documento
        let new_document = null;
        try {
          new_document = await fetch("http://localhost:3333/api/final/document", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              title: texts[i].title,
              analysis_id: analysis_id
            })
          });
        } catch (error) {
          console.log("Error:", error);
          setProcessFinished(true);
          setBadProcessEnding(true);
          setResultMessage("Proceso finalizado con errores: " + error);
          return;
        }

        const document = await new_document.json();
        console.log(document);
        const document_id = document.id;

        //Resultados
        if (usedAIs.includes("Originality")) {
          //console.log(usedAIs.includes("Originality"));
          var originality_performance = performance.now();
          let originality_response = null
          try {
            originality_response = await fetch("https://api.originality.ai/api/v1/scan/ai",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  "X-OAI-API-KEY": api_originality
                },
                body: JSON.stringify({
                  title: texts[i].title,
                  content: texts[i].text
                })
              });

          } catch (error) {
            console.log("Error:", error);
          }
          let originality_data = await originality_response.json();
          const ai_score_originality = originality_data.score.ai * 100;
          const result_originality = ai_score_originality < 50 ? "Human" : "AI";
          //Se crea el resultado
          let new_result_originality = null;
          try {
            new_result_originality = await fetch("http://localhost:3333/api/final/result", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                ai_score: ai_score_originality,
                ai_result: result_originality,
                document_id: document_id,
                ai_id: originality_id,
              })
            });

            originalityCount = originalityCount + 1;
            // Calculate the progress percentage
            const progressPercentage = ((originalityCount / texts.length) * 100).toFixed(2) + "%";
            setOriginalityDisplayCount(progressPercentage);
          } catch (error) {
            console.log("Error:", error);
            setProcessFinished(true);
            setBadProcessEnding(true);
            setResultMessage("Proceso finalizado con errores: " + error);
            return;
          }

          var originality_performance_end = performance.now();
          console.log("Tiempo de análisis originality.ai para documento " + texts[i].title + ": " + (originality_performance_end - originality_performance) + " ms");
        }

        if (usedAIs.includes("ChatGPT (GPT-4)")) {
          //console.log(usedAIs.includes("ChatGPT (GPT-4)"));
          var chatgpt_performance = performance.now();
          let prompt = 'Quiero que actúes como un clasificador experto en detección de textos generados por LLM. Te daré un texto, el cual clasificarás si fué hecho por un modelo de lenguaje de gran escala (LLM) o un humano. Quiero que las salidas sólo sean la etiqueta de clasificación ("Human" o "AI") ("label") con su porcentaje respectivo entre 0 y 100 ("ai_score"), esto en formato JSON. Este es el texto: ';
          let mean_score_chatgpt = 0;
          for (let j = 0; j < texts_8192[i].text.length; j++) {
            console.log("Largo subtexto actual: " + texts_8192[i].text[j].length)
            let chatgpt_response = null;
            try {
              chatgpt_response = await fetch(
                "https://api.openai.com/v1/chat/completions",
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + api_chatGPT,
                  },
                  body: JSON.stringify({
                    model: "gpt-4",
                    messages: [
                      {
                        role: "user",
                        content: prompt + texts[i].text[j]
                      }
                    ]
                  }),
                }
              );
            } catch (error) {
              console.log("Error:", error);
            }
            const chatgpt_data = await chatgpt_response.json();
            console.log(chatgpt_data)
            const data = chatgpt_data.choices[0].message.content;
            console.log(data)
            const jsonData = extractJSON(data);
            if (jsonData === null) { //ChatGPT no entregó un JSON válido, largo texto
              jsonData.ai_score = (data.length/texts[i].text[j].length)*100;
            }
            mean_score_chatgpt = mean_score_chatgpt + (jsonData.ai_score / texts_8192[i].text.length);
          }

          const result_chatGPT = mean_score_chatgpt < 50 ? "Human" : "AI";

          let new_result_chatgpt = null;
          try {
            new_result_chatgpt = await fetch("http://localhost:3333/api/final/result", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                ai_score: mean_score_chatgpt,
                ai_result: result_chatGPT,
                document_id: document_id,
                ai_id: chatgpt_id,
              })
            });

            chatGPTCount = chatGPTCount + 1;
            // Calculate the progress percentage
            const progressPercentage = ((chatGPTCount / texts.length) * 100).toFixed(2) + "%";
            setChatGPTDisplayCount(progressPercentage);
          } catch (error) {
            console.log("Error:", error);
            setProcessFinished(true);
            setBadProcessEnding(true);
            setResultMessage("Proceso finalizado con errores: " + error);
            return;
          }

          var chatgpt_performance_end = performance.now();
          console.log("Tiempo de análisis ChatGPT para documento " + texts[i].title + ": " + (chatgpt_performance_end - chatgpt_performance) + " ms");
        }
        if (usedAIs.includes("Fast Detect GPT")) {
          //console.log(usedAIs.includes("Fast Detect GPT"));
          //Se crea el resultado
          var fastDetectGPT_performance = performance.now();
          let fastDetectGPT_response = null;
          var mean_score_fastDetectGPT = 0;
          for (let j = 0; j < texts_2048[i].text.length; j++) {
            console.log("Largo subtexto actual: " + texts_2048[i].text[j].length);
            try {
              fastDetectGPT_response = await fetch("http://localhost:8001/api/fast-detect-gpt/detect", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  text: texts_2048[i].text[j]
                })
              });
            } catch (error) {
              console.log("Error:", error);
              setProcessFinished(true);
              setBadProcessEnding(true);
              setResultMessage("Proceso finalizado con errores: " + error);
              return;
            }
            let fastDetectGPT_data = await fastDetectGPT_response.json();
            console.log(fastDetectGPT_data);
            // Remove curly braces, single quotes, and split the string by commas
            let splitString = fastDetectGPT_data.replace(/[{}']/g, '').split(',');
            // Find the element containing 'ai_score'
            let aiScoreElement = splitString.find(element => element.includes('ai_score'));
            // Extract the number after 'ai_score' and parse it as float
            let aiScore = parseFloat(aiScoreElement.split(':')[1]);
            //console.log(aiScore);

            mean_score_fastDetectGPT = mean_score_fastDetectGPT + (aiScore / texts_2048[i].text.length);
          }

          const result_fastDetectGPT = mean_score_fastDetectGPT < 50 ? "Human" : "AI";

          let new_result_fast_detect_gpt = null;
          try {
            new_result_fast_detect_gpt = await fetch("http://localhost:3333/api/final/result", {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                ai_score: mean_score_fastDetectGPT,
                ai_result: result_fastDetectGPT,
                document_id: document_id,
                ai_id: fastDetectGPT_id,
              })
            });
            console.log("Resultado escrito exitoso para documento " + texts[i].title);
            fastDetectGPTCount = fastDetectGPTCount + 1;
            // Calculate the progress percentage
            const progressPercentage = ((fastDetectGPTCount / texts.length) * 100).toFixed(2) + "%";
            setFastDetectGPTDisplayCount(progressPercentage);
          } catch (error) {
            console.log("Error:", error);
            setProcessFinished(true);
            setBadProcessEnding(true);
            setResultMessage("Proceso finalizado con errores: " + error);
            return;
          }

          var fastDetectGPT_performance_end = performance.now();
          console.log("Tiempo de análisis Fast Detect GPT para documento " + texts[i].title + ": " + (fastDetectGPT_performance_end - fastDetectGPT_performance) + " ms");
        }

        if (usedAIs.includes("Lm Watermarking")) {
          //console.log(usedAIs.includes("Lm Watermarking"));
          const lmWatermarking_performance = performance.now();
          let lmWatermarking_response = null;
          let mean_score_lmWatermarking = 0;
          for (let j = 0; j < texts_2048[i].text.length; j++) {
            console.log("Largo subtexto actual: " + texts_2048[i].text[j].length);
            try {
              lmWatermarking_response = await fetch("http://localhost:8002/api/lm-watermarking/detect", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  text: texts_2048[i].text[j]
                })
              });
            } catch (error) {
              console.log("Error:", error);
              setProcessFinished(true);
              setBadProcessEnding(true);
              setResultMessage("Proceso finalizado con errores: " + error);
              return;
            }
            let lmWatermarking_data = await lmWatermarking_response.json();
            console.log("Lm watermarking data:", lmWatermarking_data);
            //console.log(typeof lmWatermarking_data);
            let lmw_data = JSON.parse(lmWatermarking_data.replace(/'/g, '"'));
            console.log("Lmw data, prediction: ", lmw_data.Prediction);
            let modifiedOutput;
            if (lmw_data.Prediction === "Human/Unwatermarked") {
              modifiedOutput = "Human";
            } else {
              console.log("Lmw data, confidence: ", lmw_data.Confidence)
              modifiedOutput = "AI";
            }

            let current_text_score = modifiedOutput === "AI" ? parseInt(lmw_data.Confidence.replace('%', '')) : 0;
            mean_score_lmWatermarking = mean_score_lmWatermarking + current_text_score / (texts_2048[i].text.length);
          }

          const result_lmWatermarking = mean_score_lmWatermarking < 50 ? "Human" : "AI";

          //Se crea el resultado
          let new_result_lm_watermarking = null;
          try {
            new_result_lm_watermarking = await fetch("http://localhost:3333/api/final/result", {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                ai_score: mean_score_lmWatermarking,
                ai_result: result_lmWatermarking,
                document_id: document_id,
                ai_id: lmWatermarking_id,
              })
            });

            lmWatermarkingCount = lmWatermarkingCount + 1;
            // Calculate the progress percentage
            const progressPercentage = ((lmWatermarkingCount / texts.length) * 100).toFixed(2) + "%";
            setLmWatermarkingDisplayCount(progressPercentage);
          } catch (error) {
            console.log("Error:", error);
            setProcessFinished(true);
            setBadProcessEnding(true);
            setResultMessage("Proceso finalizado con errores: " + error);
            return;
          }

          const lmWatermarking_performance_end = performance.now();
          console.log("Tiempo de análisis Lm Watermarking para documento " + texts[i].title + ": " + (lmWatermarking_performance_end - lmWatermarking_performance) + " ms");
        }

        var timeTextAnalysisEnd = performance.now();
        console.log("Tiempo de análisis de texto " + texts[i].title + ": " + (timeTextAnalysisEnd - timeTextAnalysis) + " ms");
      }
      var fullTimeAnalysisEnd = performance.now();
      console.log("Tiempo total de análisis: " + (fullTimeAnalysisEnd - fullTimeAnalysis) + " ms");
      setProcessFinished(true);
      setBadProcessEnding(false);
      setResultMessage("Proceso finalizado exitósamente")
      const nowDateEnd = Temporal.Now.plainDateISO();
      const nowTimeEnd = Temporal.Now.plainTimeISO();
      const nowTimeEndWithoutMiliseconds = nowTimeEnd.toString().split(".")[0];
      setEndDate(nowDateEnd.toString());
      setEndTime(nowTimeEndWithoutMiliseconds);
    } catch (error) { //No debería llegar aquí, es sólo para evitar una posible caida del sistema
      console.log("Error inesperado:");
      console.log(error);
      setProcessFinished(true);
      setBadProcessEnding(true);
      setResultMessage("Proceso finalizado con errores: " + error);
      return;
    }
  }

  return (
    <>
      <Navbar user={user} />
      {!processStarted ? (
        <div className="flex justify-center items-center h-screen">
          <div className="w-1/3 bg-white p-8 rounded-lg shadow-2xl transition duration-500 hover:scale-105">
            <h1 className="text-2xl font-semibold text-center mb-6">Realizar análisis</h1>

            <form onSubmit={handleSubmit} className="align-items-center">
              <div className="mb-4">
                <label htmlFor="title" className="block text-gray-600">
                  Título
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                  value={title}
                  onChange={handleTitleChange}
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-600">
                  API keys (IAs pagadas)
                </label>
                {keyOptions.map((option) => (
                  <div key={option.id}>
                    <input
                      type="checkbox"
                      id={option.id}
                      name={option.api_key}
                      value={option}
                      checked={keys.some(key => key.id.toString() === option.id.toString())}
                      onChange={handleKeyChange}
                    />
                    <label htmlFor={option.id} className="ml-2">
                      {`${option.api_key.substring(0, 5)}********** (${option.ai.name})`}
                    </label>
                  </div>
                ))}
              </div>

              <div className="mb-4">
                <label className="block text-gray-600">
                  IAs gratuitas
                </label>
                {freeAIsOptions.map((option) => (
                  <div key={option.id}>
                    <input
                      type="checkbox"
                      id={option.id}
                      name={option.name}
                      value={option}
                      checked={freeAIs.some(key => key.id.toString() === option.id.toString())}
                      onChange={handleFreeAIChange}
                    />
                    <label htmlFor={option.id} className="ml-2">
                      {`${option.name}`}
                    </label>
                  </div>
                ))}
              </div>

              <div className="mb-4">
                <label className="block text-gray-600">
                  Categorías
                </label>
                {tagsOptions.map((option) => (
                  <div key={option.id}>
                    <input
                      type="checkbox"
                      id={option.id}
                      name={option.name}
                      value={option}
                      checked={tags.some(key => key.id.toString() === option.id.toString())}
                      onChange={handleTagChange}
                    />
                    <label htmlFor={option.id} className="ml-2">
                      {`${option.name}`}
                    </label>
                  </div>
                ))}
              </div>

              <div className="mb-4">
                <label htmlFor="files" className="block text-gray-600">
                  Documentos <FontAwesomeIcon icon={faFileWord} />{" "} <FontAwesomeIcon icon={faFilePdf} />
                </label>
                <input
                  type="file"
                  id="files"
                  name="files"
                  multiple
                  accept=".pdf, .docx"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                  onChange={handleFileInputChange}
                />
              </div>

              <button
                type="submit"
                className={`w-full py-2 border rounded-xl ${formPass ? "border-green-500 bg-white text-green-500 transition duration-500 ease-in-out hover:bg-green-500 hover:text-white" : "border-gray-300 bg-gray-300 text-gray-500"}`}
                disabled={!formPass}
              >
                Realizar análisis
              </button>
              <Link
                to="/loggedin"
                className="w-full py-2 mt-2 rounded-xl border border-black text-black text-center block"
              >
                Volver
              </Link>
            </form>
          </div>
        </div>
      ) : (
        <>
          <div className="container mx-auto py-6">
            <div className="flex justify-center text-2xl font-bold">¡Análisis inicializado!</div>
          </div>
          <div className="container mx-auto py-3">
            <div className="font-bold">Información del análisis</div>
            <div>
              <ul>
                <li>Título: <span className="font-semibold">{title}</span></li>
                <li>Fecha inicio: <span className="font-semibold">{currentDate}</span></li>
                <li>Hora inicio: <span className="font-semibold">{currentTime}</span></li>
                <li>Cantidad archivos: <span className="font-semibold">{files.length}</span></li>
                <li>IAs usadas:
                  {usedAIs && usedAIs.map((ai, index) => (
                    <span key={index} className="font-semibold text-white rounded-xl bg-black inline-block ml-2 mb-2 px-2">
                      {ai}
                    </span>))}
                </li>
                <li>Categorías:
                  {tags && tags.map((tag, index) => (
                    <span className="font-semibold text-white rounded-xl bg-black inline-block ml-2 mb-2 px-2">
                      {tag.name}
                    </span>))}</li>
                <li>Estado: <span className="font-semibold">{!processFinished ? ("En proceso") : ("Finalizado")}</span></li>
                <li>Fecha término: <span className="font-semibold">{endDate}</span></li>
                <li>Hora término: <span className="font-semibold">{endTime}</span></li>
                <li>Resultado: <span className="font-semibold">{resultMessage}</span></li>
              </ul>
            </div>
          </div>
          <div className="mx-8">

            <div className="flex justify-between mb-1 py-2">
              <span className="text-base font-medium text-purple-700 dark:text-white">Originality</span>
              <span className="text-sm font-medium text-purple-700 dark:text-white">{files.length > 0 ? originalityDisplayCount : "0%"}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
              <div className="bg-purple-600 h-2.5 rounded-full" style={{ width: files.length > 0 ? originalityDisplayCount : "0%" }}></div>
            </div>

            <div className="flex justify-between mb-1 py-2">
              <span className="text-base font-medium text-green-700 dark:text-white">ChatGPT (GPT-4)</span>
              <span className="text-sm font-medium text-green-700 dark:text-white">{files.length > 0 ? chatGPTDisplayCount : "0%"}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
              <div className="bg-green-600 h-2.5 rounded-full" style={{ width: files.length > 0 ? chatGPTDisplayCount : "0%" }}></div>
            </div>

            <div className="flex justify-between mb-1 py-2">
              <span className="text-base font-medium text-red-700 dark:text-white">Fast Detect GPT</span>
              <span className="text-sm font-medium text-red-700 dark:text-white">{files.length > 0 ? fastDetectGPTDisplayCount : "0%"}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
              <div className="bg-red-600 h-2.5 rounded-full" style={{ width: files.length > 0 ? fastDetectGPTDisplayCount : "0%" }}></div>
            </div>

            <div className="flex justify-between mb-1 py-2">
              <span className="text-base font-medium text-sky-700 dark:text-white">Lm Watermarking</span>
              <span className="text-sm font-medium text-sky-700 dark:text-white">{files.length > 0 ? lmWatermarkingDisplayCount : "0%"}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
              <div className="bg-sky-600 h-2.5 rounded-full" style={{ width: files.length > 0 ? lmWatermarkingDisplayCount : "0%" }}></div>
            </div>

          </div>
          {processFinished &&
            <div className="grid grid-cols-1 sm:grid-cols-2 justify-between px-4 gap-4">
              <Link to={`/analysis/${item.id}`} state={{ item }} className="text-center mt-4 p-2 text-blue-500 bg-white border border-blue-500 rounded-xl transition ease-in-out duration-500 hover:bg-blue-500 hover:text-white">
                <button>Ver análisis</button>
              </Link>
              <Link to={`/loggedin`} className="text-center mt-4 p-2 text-blue-500 bg-white border border-blue-500 rounded-xl transition ease-in-out duration-500 hover:bg-blue-500 hover:text-white">
                <button>Volver</button>
              </Link>
            </div>
          }
        </>
      )}
    </>
  );
}
//Arreglar boton ver