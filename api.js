"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 3000;
var bodyParser = require('body-parser');
mongoose.connect("mongodb+srv://Lenilk:0952603272Ln@refriguratorapp.hegckog.mongodb.net/Refrigurator");
const databased = mongoose.connection;
const InRefrigurator = require("./model/inRefriguratorModel");
const Want = require("./model/wantModel");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const multer = require("multer");
databased.on('error', (error) => {
    console.log(error);
});
databased.once('connected', () => {
    console.log('Database Connected');
});
app.get("/getRf", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield InRefrigurator.find();
        res.json(data);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}));
app.get("/getWant", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield Want.find();
        res.json(data);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}));
app.post("/postRf", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = InRefrigurator({
        name: req.body.name,
        Amount: req.body.Amount
    });
    try {
        const dataToSave = yield data.save();
        res.status(200).json(dataToSave);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
}));
app.post("/postWant", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = Want({
        name: req.body.name,
        Amount: req.body.Amount,
        Comment: req.body.Comment
    });
    try {
        const dataToSave = yield data.save();
        res.status(200).json(dataToSave);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
}));
app.delete("/deleteRf/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const data = yield InRefrigurator.findByIdAndDelete(id);
        res.send(`Document with ${data.name} has been deleted..`);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
}));
app.delete("/deleteWant/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const data = yield Want.findByIdAndDelete(id);
        res.send(`Document with ${data.name} has been deleted..`);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
}));
app.patch('/updateRf/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };
        const result = yield InRefrigurator.findByIdAndUpdate(id, updatedData, options);
        res.send(result);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
}));
app.patch('/updateWant/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };
        const result = yield Want.findByIdAndUpdate(id, updatedData, options);
        res.send(result);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
}));
app.listen(port, () => {
    console.log(`start in ${port}`);
});
