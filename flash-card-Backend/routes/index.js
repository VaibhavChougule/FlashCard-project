import express from "express";
import dotenv from "dotenv";
import cors from 'cors'
//import bodyParser from "body-parser";
//import dbConnect from "../db/DBprovider.js";
//import { connect } from "../db/DBprovider.js";
import main from "../db/DBprovider.js";
//import { createConnection } from "mysql2/promise";

dotenv.config();
const app = express();

app.use(cors({
    origin: 'http://localhost:5173', // Replace with your client URL
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type,Authorization'
  }));
  
//console.log(connect);
//app.use(bodyParser);
//express.urlencoded({ extended: false });

app.use(express.json());

//const conn = await main();

app.get('/', (req, res) => {
    console.log("hello");
    res.send("hello");
})

app.post('/insertQue', async (req, res) => {

    console.log("req body:", req.body);


    // let cardObject = [
    //     {
    //         question: "que",
    //         answer: "ans"
    //     }]

    // let n = 0;
    // while (n < cardObject.length) {

    const conn = await main();

    let question = req.body.question;
    let answer = req.body.answer;

    const d = await conn.query(`SELECT * FROM questionSet;`);
    console.log("d", d);
    console.log("d endl");


    let x;
    for (x in d[0]) {
        console.log("x", d[0][x].questions);
        if (d[0][x].questions == question) {
            console.log('question already present');
            res.send("duplicateQue");
            return;
        }
    }


    try {
        const data = await conn.query(`INSERT INTO questionSet VALUES(? , ?)`, [question, answer]);
        console.log(data);
    }
    catch (err) {
        console.log("duplicate entry..")
        res.send('error');
        await conn.end();
        return;
    }

    await conn.end();
    res.send('ok');


})


app.post('/updateQue', async (req, res) => {

    let newQ = req.body.newQue;
    let newAns = req.body.newAns;
    let value = req.body.update;
    let value2 = req.body.updateAns;
    if (newQ === value && newAns === value2) {
        console.log("not changed...");
        res.send("ok updated");
        return;
    }

    const conn = await main();
    await conn.query(`UPDATE questionSet SET questions = ?, answer = ? WHERE questions = ?;`, [newQ, newAns, value]);
    console.log("updated...");

    await conn.end();
    res.send("ok updated");
})


app.post('/deleteQue', async (req, res) => {
    let que = req.body.delete;
    const conn = await main();
    await conn.query(`DELETE FROM questionSet WHERE questions = ?;`, [que]);
    console.log("deleted...");
    conn.end();
    res.send("ok deleted");
})


app.get('/questionList', async (req, res) => {
    console.log("finding");
    const conn = await main();
    const [data] = await conn.query(`SELECT * FROM questionSet;`)
    console.log(data);
    conn.end();
    res.send(data);

})


try {
    const conn = await main();
    app.listen(process.env.PORT, () => {
        console.log("Running server succesfully...");
    })
    conn.end();
}
catch (err) {

    console.log("error");
}

