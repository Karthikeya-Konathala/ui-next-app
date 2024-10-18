// 'use client'
// import React, { useState, useEffect } from 'react';
// import Question from './Question';
// import Timer from './Timer';
// import Confetti from 'react-confetti';
// import { FaQuestionCircle } from 'react-icons/fa';

// interface Question {
//   question: string;
//   options: string[];
//   correctAnswer: string;
// }

// interface QuizProps {
//   questions: Question[];
// }

// const Quiz: React.FC<QuizProps> = ({ questions }) => {
//   const [currentQuestion, setCurrentQuestion] = useState(0);
//   const [answers, setAnswers] = useState<{ question: string; selected: string | null }[]>([]);
//   const [timeUp, setTimeUp] = useState(false);
//   const [quizCompleted, setQuizCompleted] = useState(false);
//   const [documentHeight, setDocumentHeight] = useState(0);

//   const handleAnswer = (answer: string | null) => {
//     setAnswers([...answers, { question: questions[currentQuestion].question, selected: answer }]);
//     setTimeUp(false);
//     if (currentQuestion < questions.length - 1) {
//       setCurrentQuestion(currentQuestion + 1);
//     } else {
//       setCurrentQuestion(-1);
//       setQuizCompleted(true);
//     }
//   };

//   const handleTimeUp = () => {
//     setTimeUp(true);
//     handleAnswer(null);
//   };

//   useEffect(() => {
//     setDocumentHeight(document.documentElement.scrollHeight);
//   }, [quizCompleted]);

//   const score = answers.filter(answer => {
//     const question = questions.find(q => q.question === answer.question);
//     return question && answer.selected === question.correctAnswer;
//   }).length;

//   return (
//     <div className="max-w-xl mx-auto p-4">
//       {currentQuestion >= 0 ? (
//         <>
//           <Timer key={currentQuestion} onTimeUp={handleTimeUp} />
//           <div className="flex items-center mb-4">
//             <FaQuestionCircle className="text-2xl text-blue-600 mr-2" />
//             <span className="text-xl font-bold text-black">Question: {currentQuestion + 1}/{questions.length}</span>
//           </div>
//           <Question question={questions[currentQuestion]} onAnswer={handleAnswer} timeUp={timeUp} />
//         </>
//       ) : (
//         <div className="text-center p-4 bg-white rounded shadow-md">
//           {quizCompleted && <Confetti width={window.innerWidth} height={documentHeight} />}
//           <h2 className="text-3xl font-bold text-black mb-4">Quiz Completed</h2>
//           <div className="mt-4">
//             <h3 className="text-2xl font-semibold text-blue-600 mb-4">Your Results: {score}/{questions.length}</h3>
//             <ul className="space-y-4">
//               {questions.map((q, index) => {
//                 const userAnswer = answers[index]?.selected;
//                 const isCorrect = userAnswer === q.correctAnswer;
//                 const isNotAttempted = userAnswer === null;
                
//                 return (
//                   <li key={index} className="p-4 bg-gray-100 rounded shadow flex justify-between items-center">
//                     <div className="text-left">
//                       <p className="text-lg font-medium text-black mb-2">{q.question}</p>
//                       <p className={`text-base ${isCorrect ? 'text-green-600' : isNotAttempted ? 'font-bold text-black' : 'text-red-600'}`}>
//                         Your answer: {userAnswer || 'No option selected'}
//                       </p>
//                       <p className="text-base text-gray-700">Correct answer: <span className="font-semibold text-green-600">{q.correctAnswer}</span></p>
//                     </div>
//                   </li>
//                 );
//               })}
//             </ul>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Quiz;

//implemented local storage
'use client'
import React, { useState, useEffect } from 'react';
import Question from './Question';
import Timer from './Timer';
import Confetti from 'react-confetti';
import { FaQuestionCircle } from 'react-icons/fa';

interface Question {
  question: string;
  options: string[];
  correctAnswer: string;
}

const Quiz: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ question: string; selected: string | null }[]>([]);
  const [timeUp, setTimeUp] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [documentHeight, setDocumentHeight] = useState(0);
  const [selectedQuestions, setSelectedQuestions] = useState<Question[]>([]);
  const [remainingTime, setRemainingTime] = useState(15);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [selectedAnswerDisplay, setSelectedAnswerDisplay] = useState(false);

  useEffect(() => {
    const savedQuestions = localStorage.getItem('selectedQuestions');
    const savedCurrentQuestion = localStorage.getItem('currentQuestion');
    const savedAnswers = localStorage.getItem('answers');
    const savedRemainingTime = localStorage.getItem('remainingTime');

    if (savedQuestions && savedCurrentQuestion && savedAnswers && savedRemainingTime) {
      const parsedQuestions = JSON.parse(savedQuestions);
      const parsedCurrentQuestion = JSON.parse(savedCurrentQuestion);
      const parsedAnswers = JSON.parse(savedAnswers);
      const parsedRemainingTime = JSON.parse(savedRemainingTime);

      setSelectedQuestions(parsedQuestions);
      setCurrentQuestion(parsedCurrentQuestion);
      setAnswers(parsedAnswers);
      setRemainingTime(parsedRemainingTime);
    } else {
      const initialQuestions = JSON.parse(localStorage.getItem('selectedQuestions') || '[]');
      setSelectedQuestions(initialQuestions);
      localStorage.setItem('currentQuestion', JSON.stringify(currentQuestion));
      localStorage.setItem('answers', JSON.stringify(answers));
      localStorage.setItem('remainingTime', JSON.stringify(remainingTime));
    }
  }, []);

  const handleAnswer = (answer: string | null) => {
    setSelectedAnswer(answer); 
    setSelectedAnswerDisplay(true);
    const newAnswers = [...answers, { question: selectedQuestions[currentQuestion].question, selected: answer }];
    setAnswers(newAnswers);
    setTimeUp(false);

    setTimeout(()=>{
    setSelectedAnswerDisplay(false);
    if (currentQuestion < selectedQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setRemainingTime(15);
      localStorage.setItem('currentQuestion', JSON.stringify(currentQuestion + 1));
      localStorage.setItem('remainingTime', JSON.stringify(15));
    } else {
      setCurrentQuestion(-1);
      setQuizCompleted(true);
      localStorage.removeItem('selectedQuestions');
      localStorage.removeItem('currentQuestion');
      localStorage.removeItem('answers');
      localStorage.removeItem('remainingTime');
    }
    localStorage.setItem('answers', JSON.stringify(newAnswers));
  }, 2000);
};

  const handleTimeUp = () => {
    setTimeUp(true);
    handleAnswer(null);
  };

  const handleTimerUpdate = (time: number) => {
    setRemainingTime(time);
    localStorage.setItem('remainingTime', JSON.stringify(time));
  }

  useEffect(() => {
    setDocumentHeight(document.documentElement.scrollHeight);
  }, [quizCompleted]);

  const score = answers.filter(answer => {
    const question = selectedQuestions.find(q => q.question === answer.question);
    return question && answer.selected === question.correctAnswer;
  }).length;

  return (
    <div className="max-w-xl mx-auto p-4">
      {currentQuestion >= 0 ? (
        <>
          <Timer key={currentQuestion} initialTime={remainingTime} onTimeUp={handleTimeUp} onTimerUpdate={handleTimerUpdate} />
          <div className="flex items-center mb-4">
            <FaQuestionCircle className="text-2xl text-blue-600 mr-2" />
            <span className="text-xl font-bold text-black">Question: {currentQuestion + 1}/{selectedQuestions.length}</span>
          </div>
          {selectedQuestions[currentQuestion] && (
            <>
              <Question question={selectedQuestions[currentQuestion]} onAnswer={handleAnswer} timeUp={timeUp} />
              {selectedAnswerDisplay && selectedAnswer && (
                <div className="mt-4 p-4 bg-gray-100 rounded shadow">
                  <p className="text-lg font-medium text-black">Marked Answer: {selectedAnswer}</p>
                </div>
              )}
            </>
          )}
        </>
      ) : (
        <div className="text-center p-4 bg-white rounded shadow-md">
          {quizCompleted && <Confetti width={window.innerWidth} height={documentHeight} />}
          <h2 className="text-3xl font-bold text-black mb-4">Quiz Completed</h2>
          <div className="mt-4">
            <h3 className="text-2xl font-semibold text-blue-600 mb-4">Your Results: {score}/{selectedQuestions.length}</h3>
            <ul className="space-y-4">
              {selectedQuestions.map((q, index) => {
                const userAnswer = answers[index]?.selected;
                const isCorrect = userAnswer === q.correctAnswer;
                const isNotAttempted = userAnswer === null;

                return (
                  <li key={index} className="p-4 bg-gray-100 rounded shadow flex justify-between items-center">
                    <div className="text-left">
                      <p className="text-lg font-medium text-black mb-2">{q.question}</p>
                      <p className={`text-base ${isCorrect ? 'text-green-600' : isNotAttempted ? 'font-bold text-black' : 'text-red-600'}`}>
                        Your answer: {userAnswer || 'No option selected'}
                      </p>
                      <p className="text-base text-gray-700">Correct answer: <span className="font-semibold text-green-600">{q.correctAnswer}</span></p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Quiz;