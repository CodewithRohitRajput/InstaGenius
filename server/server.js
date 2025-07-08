const express = require('express')
const app = express();
const port = 3000;
const cors = require('cors')
const bot = require('./gemini/bot')

app.use(cors())
app.use(express.json())
app.use(cors({origin : 'https://www.instagenius.xyz', 
methods : ['POST' , 'GET'],
credentials : 'true'
}))
app.use('/' , bot)

app.listen(port , ()=>{
    console.log("Server is running on port 3000")
})


