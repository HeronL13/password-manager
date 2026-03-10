const express = require("express")
const bcrypt = require("bcrypt")
const path = require("path")
const { Pool } = require("pg")

const app = express()

app.use(express.json())
app.use(express.static(path.join(__dirname, "../public")))

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "passwor-manager",
    password: "123456",
    port: 5432
})

pool.connect()
.then(()=>{
    console.log("Conectado ao PostgreSQL")
})
.catch(err=>{
    console.log("Erro ao conectar no banco:", err)
})



app.post("/register", async (req,res)=>{

const {name,email,password} = req.body

try{


const userExists = await pool.query(
"SELECT * FROM users WHERE email = $1",
[email]
)

if(userExists.rows.length > 0){

return res.json({
message:"Usuário já existe"
})

}

const hashedPassword = await bcrypt.hash(password,10)

await pool.query(
"INSERT INTO users (name,email,password) VALUES ($1,$2,$3)",
[name,email,hashedPassword]
)

res.json({
message:"Usuário cadastrado com sucesso 🔐"
})

}catch(error){

console.log(error)

res.status(500).json({
error:"Erro no servidor"
})

}

})


app.post("/login", async (req,res)=>{

const {email,password} = req.body

try{

const result = await pool.query(
"SELECT * FROM users WHERE email = $1",
[email]
)

if(result.rows.length === 0){

return res.json({
message:"Usuário não encontrado"
})

}

const user = result.rows[0]

const validPassword = await bcrypt.compare(password,user.password)

if(!validPassword){

return res.json({
message:"Senha incorreta"
})

}

res.json({
message:"Login realizado com sucesso 🚀"
})

}catch(error){

console.log(error)

res.status(500).json({
error:"Erro no servidor"
})

}

})



app.get("/users", async (req,res)=>{

const result = await pool.query("SELECT * FROM users")

res.json(result.rows)

})



app.listen(3000,()=>{

console.log("Servidor rodando em http://localhost:3000")

})