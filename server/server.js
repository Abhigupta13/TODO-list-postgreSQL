const PORT= process.env.PORT|| 8000;
const {v4: uuidv4}= require('uuid');
 const express= require('express');
 const bcrypt= require('bcrypt');
 const jwt= require('jsonwebtoken');
 const cors = require('cors');
const app= express();
const pool = require('./db');
var bodyParser = require("body-parser");
// var urlencodedParser = bodyParser.urlencoded({extended: false});
app.use(cors());
app.use(express.json());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

//fetch todos
app.get('/todos/:userEmail',async(req,res)=>{
    const {userEmail}= req.params;
    try {
       const todos =await pool.query('SELECT * FROM todos WHERE user_email=$1',[userEmail]);
       res.json(todos.rows)
    } catch (error) {
        console.error(error);
    }
})
// create a todos object
app.post('/todos', async (req, res) => {
    const { user_email, title, progress, date } = req.body;
    console.log(user_email, title, progress, date);
    const id = uuidv4();
    try {
        const newTodo = await pool.query(
            'INSERT INTO todos(id, user_email, title, progress, date) VALUES($1, $2, $3, $4, $5)',
            [id, user_email, title, progress, date]
        );
        res.json(newTodo);
    } catch (err) {
        console.error(err);
    }
});
//edit a todo

app.put('/todos/:id', async (req, res) => {
    const {id} = req.params;
    const { user_email, title, progress, date } = req.body;
    // console.log(user_email, title, progress, date);
    try {
        const editTodo = await pool.query(
            'UPDATE todos SET user_email=$1,title=$2,progress=$3,date=$4 WHERE id=$5;',
            [user_email, title, progress, date,id]
        );
        res.json(editTodo);
    } catch (err) {
        console.error(err);
    }
});
//delete a todo
app.delete('/todos/:id', async (req, res) => {
    const {id} = req.params;
    // const { user_email, title, progress, date } = req.body;
    // console.log(user_email, title, progress, date);
    try {
        const deleteTodo = await pool.query(
            'DELETE FROM todos WHERE id=$1;',[id] );
        res.json(deleteTodo);
    } catch (err) {
        console.error(err);
    }
});
//signup
app.post('/signup',async(req, res) => {
    const {email,password} = req.body;
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password,salt);
    try {
        const signup = await pool.query(`INSERT INTO users (email,hashed_password) VALUES(&1,$2)`,[email,hashedPassword]);
        const token =jwt.sign({email},'select',{expiresIn:'1hr'})
        req.json({email,token})
    } catch (err) {
        console.error(err);
        if(err){
            res.json({detail:err.detail});
        }
    }
})
//login
app.post('/login',async(req, res) => {
    const {email,password} = req.body;
    try {
        
    } catch (error) {
        console.error(err);
    }
})

 app.listen(PORT,()=>{
    console.log(`Server running on PORT ${PORT}`);
 })