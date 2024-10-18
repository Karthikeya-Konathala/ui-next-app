// import React from 'react';
// import Quiz from './components/Quiz';
// import './globals.css';

// const questionsPool = [
//   { question: 'What does the abbreviation “ACC” stand for in the context of AT&T?', options: ['AT&T Communication Center', 'AT&T Corporate Channel', 'AT&T Client Console', 'AT&T Customer Connect'], correctAnswer: 'AT&T Customer Connect' },
//   { question: 'What does the abbreviation "AIA" stand for in the context of AT&T?', options: ['AT&T Internet Access', 'AT&T Internal Affairs', 'AT&T Information Archive', 'AT&T Internet Air'],correctAnswer: 'AT&T Internet Air'},
//   { question: 'What does the abbreviation "BU" stand for in the context of AT&T?', options: ['Business Utility', 'Business Unit', 'Business User', 'Business Upgrade'], correctAnswer: 'Business Unit' },
//   { question: 'What does the abbreviation "CaRS" stand for in the context of AT&T?', options: ['Consumer and Retail Services', 'Customer and Retail Solutions', 'Consumer and Retail Systems', 'Consumer and Retail Solutions'], correctAnswer: 'Consumer and Retail Solutions' },
//   { question: 'What does the abbreviation "CDEX" stand for in the context of AT&T?', options: ['Centralized Data Exchange', 'Customer Data Exchange', 'Centralized Defect Exchange', 'Centralized Delivery Exchange'], correctAnswer: 'Centralized Defect Exchange' },
//   { question: 'What does the abbreviation "CTX" stand for in the context of AT&T?', options: ['Consumer Technology eXperience', 'Corporate Technology eXchange', 'Creative Tech eXpo', 'Computer Tech eXhibition'], correctAnswer: 'Consumer Technology eXperience' },
//   { question: 'What does the abbreviation "ADO" stand for in the context of AT&T?', options: ['Active Data Object', 'Application Development Office', 'Automated Deployment Operations', 'Azure DevOps'], correctAnswer: 'Azure DevOps' },
//   { question: 'What does the abbreviation "ATS" stand for in the context of AT&T?', options: ['AT&T Telecom Solutions', 'AT&T Technology Services', 'AT&T Technical Support', 'AT&T Technical Systems'], correctAnswer: 'AT&T Technology Services' },
//   { question: 'What does the abbreviation "ATO" stand for in the context of AT&T?', options: ['AT&T Technology and Operations', 'AT&T Telecom Operations', 'AT&T Technical Office', 'AT&T Technical Organization'], correctAnswer: 'AT&T Technology and Operations' },
//   { question: 'What does the abbreviation "CQE" stand for in the context of AT&T?', options: ['Customer Quality Evaluation', 'Continuous Quality Enhancement', 'Certified Quality Expert', 'Consumer Quality Engineering'], correctAnswer: 'Consumer Quality Engineering' },
// ];

// const Home = () => {
//   const selectedQuestions = [...questionsPool].sort(() => 0.5 - Math.random()).slice(0,5);
//   return (
//     <div className="min-h-screen p-6 flex items-center justify-center">
//       <div className="max-w-2xl w-full bg-white bg-opacity-90 p-6 rounded-lg shadow-lg">
//       <h1 className="text-4xl font-bold text-center text-blue-600 mb-6">AT&T Knowledge Check</h1>
//       <Quiz questions={selectedQuestions} />
//     </div>
//     </div>
//   );
// };

// export default Home;

//implemented local storage to store the selected questions
'use client'
import React, { useEffect } from 'react';
import Quiz from './components/Quiz';
import './globals.css';

const questionsPool = [
  { question: 'What does the abbreviation “ACC” stand for in the context of AT&T?', options: ['AT&T Communication Center', 'AT&T Corporate Channel', 'AT&T Client Console', 'AT&T Customer Connect'], correctAnswer: 'AT&T Customer Connect' },
  { question: 'What does the abbreviation "AIA" stand for in the context of AT&T?', options: ['AT&T Internet Access', 'AT&T Internal Affairs', 'AT&T Information Archive', 'AT&T Internet Air'], correctAnswer: 'AT&T Internet Air' },
  { question: 'What does the abbreviation "BU" stand for in the context of AT&T?', options: ['Business Utility', 'Business Unit', 'Business User', 'Business Upgrade'], correctAnswer: 'Business Unit' },
  { question: 'What does the abbreviation "CaRS" stand for in the context of AT&T?', options: ['Consumer and Retail Services', 'Customer and Retail Solutions', 'Consumer and Retail Systems', 'Consumer and Retail Solutions'], correctAnswer: 'Consumer and Retail Solutions' },
  { question: 'What does the abbreviation "CDEX" stand for in the context of AT&T?', options: ['Centralized Data Exchange', 'Customer Data Exchange', 'Centralized Defect Exchange', 'Centralized Delivery Exchange'], correctAnswer: 'Centralized Defect Exchange' },
  { question: 'What does the abbreviation "CTX" stand for in the context of AT&T?', options: ['Consumer Technology eXperience', 'Corporate Technology eXchange', 'Creative Tech eXpo', 'Computer Tech eXhibition'], correctAnswer: 'Consumer Technology eXperience' },
  { question: 'What does the abbreviation "ADO" stand for in the context of AT&T?', options: ['Active Data Object', 'Application Development Office', 'Automated Deployment Operations', 'Azure DevOps'], correctAnswer: 'Azure DevOps' },
  { question: 'What does the abbreviation "ATS" stand for in the context of AT&T?', options: ['AT&T Telecom Solutions', 'AT&T Technology Services', 'AT&T Technical Support', 'AT&T Technical Systems'], correctAnswer: 'AT&T Technology Services' },
  { question: 'What does the abbreviation "ATO" stand for in the context of AT&T?', options: ['AT&T Technology and Operations', 'AT&T Telecom Operations', 'AT&T Technical Office', 'AT&T Technical Organization'], correctAnswer: 'AT&T Technology and Operations' },
  { question: 'What does the abbreviation "CQE" stand for in the context of AT&T?', options: ['Customer Quality Evaluation', 'Continuous Quality Enhancement', 'Certified Quality Expert', 'Consumer Quality Engineering'], correctAnswer: 'Consumer Quality Engineering' },
];

const Home = () => {
  useEffect(() => {
    const selectedQuestions = JSON.parse(localStorage.getItem('selectedQuestions') || '[]');
    if (selectedQuestions.length === 0) {
      const randomQuestions = [...questionsPool].sort(() => 0.5 - Math.random()).slice(0, 5);
      localStorage.setItem('selectedQuestions', JSON.stringify(randomQuestions));
    }
  }, []);

  return (
    <div className="min-h-screen p-2.5 flex items-center justify-center">
      <div className="max-w-2xl w-full bg-white bg-opacity-90 p-6 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-center text-blue-600 mb-6">AT&T Knowledge Check</h1>
        <Quiz />
      </div>
    </div>
  );
};

export default Home;