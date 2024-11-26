import React, { useEffect, useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import "./ChartAnalysis.css";

const botImage = `${process.env.PUBLIC_URL}/chatbot.png`;


const ChartAnalysis = ({ chart }) => {
    const [analysis, setAnalysis] = useState(""); // Estado para el análisis de la gráfica
    const [userQuestion, setUserQuestion] = useState("");  // Estado para la pregunta del usuario
    const [botResponse, setBotResponse] = useState("");  // Estado para la respuesta del bot
    const [isLoading, setIsLoading] = useState(true); // Estado para saber si está cargando

    // Función para obtener el análisis de la gráfica
    const fetchAnalysis = async () => {
        setIsLoading(true); // Comienza la carga del análisis
        setBotResponse("");
        try {
            const response = await axios.post(
                "https://api.cohere.ai/v1/generate",
                {
                    model: "command-xlarge-nightly",
                    prompt: `Analiza esta gráfica: ${chart.title}. Proporciona un análisis detallado que incluya tendencias y posibles conclusiones. Sus datos son ${JSON.stringify(chart.data)}.`,
                    max_tokens: 500,
                    temperature: 0.5,
                },
                {
                    headers: {
                        Authorization: `Bearer yAIU2kaQ6bxd4iDgoHklSbHOW320JXwDugv8CRcL`,
                        "Content-Type": "application/json",
                    },
                }
            );
            setAnalysis(response.data.generations[0].text);
        } catch (error) {
            setAnalysis("Error al generar el análisis.");
        } finally {
            setIsLoading(false); // Finaliza la carga
        }
    };

    // Llamada inicial para obtener el análisis cuando se selecciona una gráfica
    useEffect(() => {
        fetchAnalysis();
    }, [chart]); // Solo se vuelve a cargar cuando cambia la gráfica seleccionada

    // Función para manejar la pregunta del usuario
    const handleQuestionSubmit = async (event) => {
        event.preventDefault(); // Evita que la página se recargue

        try {
            const response = await axios.post(
                "https://api.cohere.ai/v1/generate",
                {
                    model: "command-xlarge-nightly",
                    prompt: `Pregunta sobre esta gráfica: ${chart.title}. La pregunta es: ${userQuestion}. Los datos de la gráfica son ${JSON.stringify(chart.data)}.`,
                    max_tokens: 500,
                    temperature: 0.5,
                },
                {
                    headers: {
                        Authorization: `Bearer yAIU2kaQ6bxd4iDgoHklSbHOW320JXwDugv8CRcL`,
                        "Content-Type": "application/json",
                    },
                }
            );
            setBotResponse(response.data.generations[0].text);
        } catch (error) {
            setBotResponse("Error al generar la respuesta.");
        }
    };

    // Formatear el análisis
    const formatAnalysis = (text) => {
        if (!text) return null;

        return (
            <ReactMarkdown remarkPlugins={[remarkGfm]} className="markdown-content">
                {text}
            </ReactMarkdown>
        );
    };

    return (
        <div className="chart-analysis">
            {/* Imagen del bot */}
            <div className="chart-bot">
                <img src={botImage} alt="Bot IA" className="bot-image" />
                {/* Formulario para enviar preguntas */}
                <form onSubmit={handleQuestionSubmit} className="question-form">
                    <textarea
                        placeholder="¿Tienes una pregunta sobre esta gráfica?"
                        value={userQuestion}
                        onChange={(e) => setUserQuestion(e.target.value)}
                        className="question-input"
                        maxLength={200}  // Limita a 200 caracteres
                    />
                    <button type="submit" className="question-submit">
                        Enviar
                    </button>
                </form>
            </div>
            {/* Solo mostrar respuesta del bot si existe */}
            {botResponse && (
                <div className="question-response">
                    <div>
                        <h4>Respuesta del Bot:</h4>
                        <p>{formatAnalysis(botResponse)}</p>
                    </div>
                </div>
            )}

            <h3 className="chart-title">
                Análisis: {chart.title}
            </h3>

            {/* Mostrar análisis o respuesta del bot */}
            <div className="chart-content">
                {isLoading ? (
                    <p className="chart-loading">Generando contenido...</p>
                ) : (
                    <>
                        {analysis && (
                            <div>
                                <h4>Análisis:</h4>
                                {formatAnalysis(analysis)}
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default ChartAnalysis;
