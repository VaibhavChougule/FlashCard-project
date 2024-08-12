import React, { useRef, useState } from 'react';
import axios from 'axios'
import config from '../config.js';

import showlist from './showlist.js';

const QuestionList = (props) => {

    //const [questions, setQuestions] = useState([]);
    const questions = props.questions; 
    console.log(questions);
    let que = useRef(null);
    let ans = useRef(null);

    const [newQue, setNewQue] = useState('');
    const [newAns, setNewAns] = useState('');

    const [editing, setEditing] = useState("hidden");

    const [value, setValue] = useState('');
    const [value2  , setValue2] = useState('');

    const [blur, setBlur] = useState('blur-0');

    // const [x, setX] = useState(0);
    // const [y, setY] = useState(0);

    

    async function showlist() {
        console.log("called");

        const data = await axios.get(`${config.API_URL}/questionList`)
        console.log(data);
        props.setQuestions(data.data);
    }
    // async function updateList(){

    //     await showlist(setQuestions);
    //     console.log("updated....2");
    // }

    async function update() {
        console.log(value);
        console.log("curr:",que.current.value);
        
        console.log("new Que:" , newQue);
        console.log("new Ans:" , newAns);
        console.log("old Que:" , value);
        console.log("old Que:" , value2);
       
        
        if(value == que.current.value & value2 == ans.current.value) {
            alert("Question ans Anser not Updated..")
            setEditing("hidden");
            return;
        }
        const responseUpdate = await axios.post(`${config.API_URL}/updateQue`, { update: value, updateAns:value2, newQue: que.current.value, newAns: ans.current.value });
        console.log(responseUpdate);
        showlist();

        console.log("updated");
        setEditing('hidden');
        
    }

    function editQue(index, e) {
        // console.log(e.clientX);
        // console.log(e.clientY);

        setEditing('block');
        // setX(e.clientX);
        // setY(e.clientY);

        que.current.value = questions[index].questions;
        ans.current.value = questions[index].answer;


        console.log("editing:", questions[index].questions);


        //console.log("to be deleted:" , questions[currentIndex].question);
    }

   async function deleteQue(index){
        setBlur('blur-sm')
        console.log("deleting:" , questions[index].questions);
        let value = questions[index].questions;

        const responseDelete = await axios.post(`${config.API_URL}/deleteQue`, { delete: value});
        console.log(responseDelete);
        console.log("deleted");
        
        showlist();
        setTimeout(() => {
            setBlur('blur-0')
            
        }, 100);
        

    }



    return (
        <div className="mt-6 relative">
            <h2 className={`text-2xl font-bold mb-4 ${blur}`}>Questions List</h2>
            <div className={`bg-slate-400 ${editing} items-center sticky p-10 w-full z-10 top-4 rounded-md border-2 border-black`}>
                <p>Question:</p><input type="text" name="" id="" className='w-full rounded-sm h-8' ref={que} onChange={(e) => { setNewQue(e.target.value) }} />
                <br></br>
                <p>Answer:</p><input type="text" name="" id="" className='w-full rounded-sm h-8' ref={ans} onChange={(e) => { setNewAns(e.target.value) }} />
                <button onClick={update} className='h-10 w-20 bg-blue-500 rounded mt-4'>Update</button>
                <button onClick={()=>{setEditing('hidden')}} className='h-10 w-20 mx-2 bg-blue-500 rounded mt-4'>Cancel</button>
            </div>
            <button onClick={showlist} className='h-14 w-20 border-2 rounded-md border-teal-300 bg-red-500 hover:bg-slate-400 font-semibold text-lg'>show list</button>
            <ul className={`space-y-4 ${blur}`}>
                {questions.map((q, index) => (
                    <li key={index} className="bg-white p-4 rounded-lg shadow-md">
                        <p className="text-lg font-semibold"><strong>Q:</strong> {q.questions}</p>
                        <p className="text-gray-700"><strong>A:</strong> {q.answer}</p>
                        <div className="mt-4">
                            <button
                                className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600 transition duration-300"
                                onClick={(e) => {
                                    console.log(index, "ind");
                                    setValue(questions[index].questions)
                                    setValue2(questions[index].answer);
                                    editQue(index, e)
                                }}
                            >
                                Edit
                            </button>
                            <button
                                className="ml-2 bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition duration-300"
                                onClick={()=>{deleteQue(index)}}
                            >
                                Delete this
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default QuestionList;


