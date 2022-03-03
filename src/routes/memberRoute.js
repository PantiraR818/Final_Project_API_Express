const express = require('express');
const app = express.Router();
const memberController = require('../controllers/memberController');
const auth = require('../middleware/auth');

app.get("/", memberController.getMembers);

app.get("/:id",memberController.getMemberById);

app.get("/name/:name",memberController.getMemberByName);

app.post("/", memberController.addMember);

app.post("/login", memberController.login); 

app.put("/:id", memberController.editWholeMember);

app.delete("/:id", memberController.deleteMember);

// app.patch("/:id",memberController.editMember);
module.exports = app;