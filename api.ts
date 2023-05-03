import { Response,Request } from "express";
require("dotenv").config();
const express= require("express");
const mongoose = require("mongoose");
const app =express();
const port =3000;
var bodyParser = require('body-parser')
mongoose.connect("mongodb+srv://Lenilk:0952603272Ln@refriguratorapp.hegckog.mongodb.net/Refrigurator");
const databased = mongoose.connection
const InRefrigurator=require("./model/inRefriguratorModel");
const Want=require("./model/wantModel");
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
const multer=require("multer")

databased.on('error', (error:Error) => {
    console.log(error)
})

databased.once('connected', () => {
    console.log('Database Connected');
})


app.get("/getRf",async(req:Request,res:Response)=>{
    try{
        const data = await InRefrigurator.find();
        res.json(data)
    }
    catch(error:any){
        res.status(500).json({message: error.message})
    }
})

app.get("/getWant",async(req:Request,res:Response)=>{
    try{
        const data = await Want.find();
        res.json(data)
    }
    catch(error:any){
        res.status(500).json({message: error.message})
    }
})


app.post("/postRf", async(req:Request,res:Response)=>{
    const data= InRefrigurator({
        name:req.body.name,
        Amount:req.body.Amount
    })
    try {
        const dataToSave =  await data.save();
        res.status(200).json(dataToSave)
    }
    catch (error:any) {
        res.status(400).json({message: error.message})
    }
})

app.post("/postWant",async(req:Request,res:Response)=>{
    const data= Want({
        name:req.body.name,
        Amount:req.body.Amount,
        Comment:req.body.Comment
    })
    try {
        const dataToSave =  await data.save();
        res.status(200).json(dataToSave)
    }
    catch (error:any) {
        res.status(400).json({message: error.message})
    }
})


app.delete("/deleteRf/:id",async(req:Request,res:Response)=>{
    try {
        const id = req.params.id;
        const data = await InRefrigurator.findByIdAndDelete(id)
        res.send(`Document with ${data.name} has been deleted..`)
    }
    catch (error:any) {
        res.status(400).json({ message: error.message })
    }
})

app.delete("/deleteWant/:id",async(req:Request,res:Response)=>{
    try {
        const id = req.params.id;
        const data = await Want.findByIdAndDelete(id)
        res.send(`Document with ${data.name} has been deleted..`)
    }
    catch (error:any) {
        res.status(400).json({ message: error.message })
    }
})

app.patch('/updateRf/:id', async (req:Request, res:Response) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };

        const result = await InRefrigurator.findByIdAndUpdate(
            id, updatedData, options
        )

        res.send(result)
    }
    catch (error:any) {
        res.status(400).json({ message: error.message })
    }
})

app.patch('/updateWant/:id', async (req:Request, res:Response) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };

        const result = await Want.findByIdAndUpdate(
            id, updatedData, options
        )

        res.send(result)
    }
    catch (error:any) {
        res.status(400).json({ message: error.message })
    }
})

app.listen(port,()=>{
    console.log(`start in ${port}`);
})