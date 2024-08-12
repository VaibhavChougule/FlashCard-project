import React, { useEffect, useState } from 'react'
import axios from 'axios';
import config from '../config';


export default function Card() {

    const [isFlipped, setIsFlipped] = useState(false);

    const [state, setState] = useState('flip-card');

    const [cardObject, setCardObject] = useState([{ questions: "que", answer: "ans" }]);


    useEffect(() => {
        async function startTest() {
            const questions = await axios.get(`${config.API_URL}/questionList`);
            console.log(questions.data);
            setCardObject(questions.data);
        }
        startTest();
    }, [])

    const handleFlip = () => {
        setIsFlipped(!isFlipped);
        console.log(isFlipped);
        if (!isFlipped) {
            setState('flip-card2');
        }
        else {
            setState('flip-card')
        }
    };

    // let carddObject = [
    //     {
    //         question:"que1",
    //         answer:"ans1"
    //     },
    //     {
    //         question:"que2",
    //         answer:"ans2"
    //     },
    //     {
    //         question:"que3",
    //         answer:"ans3"
    //     },
    //     {
    //         question:"que4",
    //         answer:"ans4"
    //     }
    // ]


    const [questioNumber, setQuestionNumber] = useState(0);

    const nextQue = () => {
        console.log(cardObject.length, questioNumber);

        if (isFlipped) {
            handleFlip();
        }

        if (questioNumber < cardObject.length - 1) {
            setTimeout(() => {
                //timeout for prevent loading answer when already flipped to answer
                setQuestionNumber(questioNumber + 1);
            }, 200);
        }
        else {
            alert("reached last queston!")
        }
    }
    const preQue = () => {
        // console.log(cardObject.length , questioNumber);
        if (isFlipped) {
            handleFlip();
        }
        if (questioNumber > 0) {

            setTimeout(() => {
                setQuestionNumber(questioNumber - 1);

            }, 200);

        }
        else {
            alert("reached first queston!")
        }
    }



    return (
        <>
            <div className='flex justify-center items-center h-screen box-border border-4 rounded-lg bg-gradient-to-r from-slate-800 to-slate-600'>
                <div className={`${state}`} >
                    <div className="flip-card-inner rounded-lg" onClick={handleFlip}>
                        <div className="flip-card-front h-40 w-52 border-b-orange-300" >
                            {/* <p alt="Avatar" style={{width:'300px' , height:'400px'}}/> */}
                            <h1 className='font-bold text-white text-lg'>Answer:</h1>
                            <h1 className='text-white'>{cardObject[questioNumber].answer}</h1>
                        </div>
                        <div className="flip-card-back">
                            <h1 className='text-lg font-bold'>Question:</h1>
                            <h2>{cardObject[questioNumber].questions}</h2>
                        </div>
                    </div>
                    <button className='relative w-16 float-left mt-2 border-2 bg-green-100 hover:bg-slate-300 border-slate-800 rounded-md' onClick={preQue}>Previous</button>
                    <button className='relative w-16 float-right mt-2 border-2 bg-green-100 hover:bg-slate-300 border-slate-800 rounded-md' onClick={nextQue}>Next</button>
                </div>
            </div>

            <div className='absolute bottom-3 right-5 h-32 w-80 bg-slate-50 rounded-sm -skew-x-6 -skew-y-3 border-2 border-red-500'>
                <b>Instructions:</b><p className='px-4 font-semibold'>:-Click the Card to reveal answer</p>
                <p className='px-4 font-semibold'>:-Use Admin Dashboard to manage Question and Answers</p>
            </div>
        </>
    )
}
