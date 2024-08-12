import axios from 'axios';
import React, { useState, useEffect } from 'react';
import config from '../config';

const QuestionForm = ({ questions, setQuestions }) => {
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');

    const [blur, setBlur] = useState('blur-0');

    const Submit = async (e) => {

        setBlur('blur-sm')
        if (question == '' & answer == '') {
            alert("fields shouls not be empty..");
            setBlur('blur-0')
            return;
        }
        if (question == '') {
            alert("add question...should not empty!")
            setBlur('blur-0')
            return;
        };
        if (answer == '') {
            alert("answer should not be empty");
            setBlur('blur-0')
            return;
        }

        const sentQue = await axios.post(`${config.API_URL}/insertQue`, { question: question, answer: answer });

        if (sentQue.data == "duplicateQue") {
            alert("Question already present , add another or update the existing...");
            setBlur('blur-0');
            if (question && answer) {
                setQuestion('');
                setAnswer('');
            }
            return;
        }

        console.log("sentque res;", sentQue);
        if (sentQue.data == "ok") alert("added successfully..");

        setBlur('blur-0');


        location.reload();
        if (sentQue.data == "error") {
            alert("Duplicate question not allowed...");
        }


        // setQuestions((prev) => prev.push({questions:question , answer:answer}));

        if (question && answer) {
            setQuestion('');
            setAnswer('');
        }
    };

    return (
        <div className={`${blur}`}>
            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">Question:</label>
                <input
                    type="text"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">Answer:</label>
                <textarea
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                ></textarea>
            </div>
            <button

                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
                onClick={Submit}
            >
                Add Question
            </button>


        </div>
    );
};

export default QuestionForm;
