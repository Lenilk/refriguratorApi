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
const cors = require("cors");
const multer = require("multer");
const path = require("path");
var bodyParser = require('body-parser');
mongoose.connect("mongodb+srv://Lenilk:0952603272Ln@refriguratorapp.hegckog.mongodb.net/Refrigurator");
const databased = mongoose.connection;
const InRefrigurator = require("./model/inRefriguratorModel");
const Want = require("./model/wantModel");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
var formidable = require('formidable');
var fs = require('fs');
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
app.get("/version", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield fs.readFile("appversion.txt", 'utf-8', (err, data) => __awaiter(void 0, void 0, void 0, function* () {
        let json = yield JSON.stringify({ "version": data });
        res.json(json);
        console.log(data);
    }));
}));
app.get("/updatePage", (req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write('<form action="updateApp" method="post" enctype="multipart/form-data">');
    res.write('<input type="text" name="version" placeholder="version"><br>');
    res.write('<input type="file" name="filetoupload"><br>');
    res.write('<input type="submit">');
    res.write('</form>');
    return res.end();
});
app.post("/updateApp", (req, res) => {
    var form = formidable({ multiples: true });
    console.log(form);
    form.parse(req, function (err, fields, files) {
        var oldpath = files.filetoupload.filepath;
        var version = fields["version"];
        var newpath = path.join(__dirname + "/App/" + files.filetoupload.originalFilename);
        fs.rename(oldpath, newpath, function (err) {
            if (err)
                throw err;
            res.write('File uploaded and moved!');
            res.end();
        });
        fs.writeFile('appversion.txt', String(version), function (err) {
            if (err)
                throw err;
            console.log('Saved!');
        });
    });
});
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
