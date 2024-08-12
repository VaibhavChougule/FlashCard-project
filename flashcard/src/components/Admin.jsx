import React, { useState } from 'react';
import QuestionForm from './QuestionForm';
import QuestionList from './QuestionList';

const AdminDashboard = () => {
    const [questions, setQuestions] = useState([]);

    console.log("qeu:" ,questions);
    

   

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Admin Dashboard</h1>
            <div className="max-w-4xl mx-auto">
                <QuestionForm questions = {questions} setQuestions={setQuestions}/>
                <QuestionList questions = {questions} setQuestions={setQuestions}/>
                <div className="mt-8">
                    <h2 className="text-2xl font-bold">Array of Questions and Answers</h2>
                    <pre className="bg-gray-900 text-white p-4 rounded-lg overflow-scroll shadow-md mt-4">
                        {JSON.stringify(questions, null, 2)}
                    </pre>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
