import React, { useState, useEffect } from "react";

const steps = [
  "Aggiungi l’acqua nella caldaia",
  "Aggiungi la miscela di caffè nel filtro a imbuto",
  "Inserisci il filtro nel bollitore",
  "Avvita il bricco sulla parte superiore stringendo bene",
  "Metti la moka sulla fonte di calore e regola la temperatura al massimo",
  "Spegni il fuoco quando l’espresso smette di fuoriuscire dal camino"
];

const incorrectSteps = [
  "Incartare la macchinetta con un giornale",
  "Accendere il computer",
  "Tenere la moka al sole finchè non sale il caffè"
];

const shuffleArray = (array) => {
  const shuffledArray = array.slice();
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};

const App = () => {
  const [shuffledSteps, setShuffledSteps] = useState([]);
  const [selectedSteps, setSelectedSteps] = useState([]);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    if (selectedSteps.length === steps.length) {
      const isCorrect = selectedSteps.every((step, index) => step === steps[index]);
      if (isCorrect) {
        setCompleted(true);
      }
    }
  }, [selectedSteps]);

  useEffect(() => {
    setShuffledSteps(shuffleArray([...steps, ...incorrectSteps]));
  }, []);

  const handleStepClick = (step) => {
    setSelectedSteps((prevSelectedSteps) => [...prevSelectedSteps, step]);
  };

  return (
    <div>
      <h1>Preparazione del caffè</h1>
      <ol>
        {shuffledSteps.map((step, index) => (
          <li>
            <button
              onClick={() => handleStepClick(step)}
              disabled={selectedSteps.includes(step) || completed}
            >
              {step}
            </button>
          </li>
        ))}
      </ol>

      {completed && <p>Procedura completata con successo!</p>}

    </div>
  );
};

export default App;