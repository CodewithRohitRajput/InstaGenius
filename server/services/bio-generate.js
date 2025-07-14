// const { create } = require('domain');
const express = require('express')
const router = express.Router();
const {GoogleGenerativeAI} =require('@google/generative-ai')
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_2)
const model = genAI.getGenerativeModel({model : 'gemini-2.5-flash'})

router.post('/bio' , async (req , res)=>{
    const {prompt} = req.body;
    
    const result = await model.generateContent(prompt)
    const response = result.response.text();
    res.json({success : true , reply :  response});

})

module.exports = router