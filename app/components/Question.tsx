// import React from 'react';

// interface QuestionProps {
//   question: {
//     question: string;
//     options: string[];
//   };
//   onAnswer: (answer: string) => void;
//   timeUp: boolean;
// }

// const Question: React.FC<QuestionProps> = ({ question, onAnswer, timeUp }) => {
//   return (
//     <div className="p-4 bg-white rounded shadow-md flex flex-col items-center justify-center">
//       <h3 className="text-2xl font-bold text-black mb-4 text-center">{question.question}</h3>
//       {!timeUp && question.options.map((option, index) => (
//         <button 
//           key={index} 
//           className="block w-full p-2 my-2 text-white bg-blue-500 rounded hover:bg-blue-700"
//           onClick={() => onAnswer(option)}
//         >
//           {option}
//         </button>
//       ))}
//     </div>
//   );
// };

// export default Question;


import React from 'react';

interface QuestionProps {
  question: {
    question: string;
    options: string[];
  };
  onAnswer: (answer: string) => void;
  timeUp: boolean;
}

const Question: React.FC<QuestionProps> = ({ question, onAnswer, timeUp }) => {
  if (!question) {
    return null;
  }
  return (
    <div className="p-4 bg-white rounded shadow-md flex flex-col items-center justify-center">
      <h3 className="text-2xl font-bold text-black mb-4 text-center">{question.question}</h3>
      {!timeUp && question.options.map((option, index) => (
        <button 
          key={index} 
          className="block w-full p-2 my-2 text-white bg-blue-500 rounded hover:bg-blue-700"
          onClick={() => onAnswer(option)}
        >
          {option}
        </button>
      ))}
    </div>
  );
};

export default Question;