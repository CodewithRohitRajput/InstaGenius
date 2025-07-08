const { GoogleGenerativeAI } = require('@google/generative-ai')
const express = require('express')
const router = express.Router()
require('dotenv').config();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API)
const model = genAI.getGenerativeModel({model : 'gemini-2.5-flash'})

router.post('/ask' , async (req,res)=>{
    const {prompt} = req.body;

    const result = await model.generateContent(prompt)

    const response = result.response.text();
    res.json({reply : response})

})


module.exports = router