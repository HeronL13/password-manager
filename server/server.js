const express = require("express")
const bcrypt = require("bcrypt")
const path = require("path")

const app = express()

app.use(express.json())

app.use(express.static(path.join(__dirname,"../public")))


app.post("/register", async (req,res)=>{

const {name,email,password} = req.body

const userExists = users.find(user => user.email === email)

if(userExists){

return res.json({
message:"Usuário já existe"
})

}

const hashedPassword = await bcrypt.hash(password,10)

users.push({
name,
email,
password:hashedPassword
})

res.json({
message:"Usuário cadastrado com sucesso 🔐"
})

})



app.post("/login", async (req,res)=>{

const {email,password} = req.body

const user = users.find(user => user.email === email)

if(!user){

return res.json({
message:"Usuário não encontrado"
})

}

const validPassword = await bcrypt.compare(password,user.password)

if(!validPassword){

return res.json({
message:"Senha incorreta"
})

}

res.json({
message:"Login realizado com sucesso 🚀"
})

})

app.get("/users",(req,res)=>{

res.json(users)

})



app.listen(3000,()=>{

console.log("Servidor rodando em http://localhost:3000")

})