import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import express from 'express';
import { ContentModel, UserModel } from './db.js';
import { JWT_PASSWORD } from './config.js';
import { userMiddleware } from './middleware.js';

const app = express();

app.post("/api/v1/signup", async (req, res) => {

    // Todo : zod validation and hashing the password

    const username = req.body.username;
    const password = req.body.password;
    try {

        await UserModel.create({
            username: username,
            password: password
        })
        // error status code handling missing
        res.json({
            message: "User signed up successfully"
        })
    } catch (err) {
        res.status(411).json({
            message: "User already exists"
        })
    }
});

app.post("/api/v1/signin", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const existingUser = await UserModel.findOne({
        username, password
    });
    if (existingUser) {
        const token = jwt.sign({
            id: existingUser._id,
        }, JWT_PASSWORD)

        res.json({
            token
        })
    }
    else {
        res.status(403).json({
            message: "Incorrect credentials"
        })
    }
});

app.get("/api/v1/content", userMiddleware, async (req, res) => {
    const link = req.body.link;
    const type = req.body.type;
    await ContentModel.create({
        link,
        type,
        title: req.body.title,
        // @ts-ignore
        userId: req.userId,
        tags: []
    })

    res.json({
        message: "Content created successfully"
    });
});

app.delete("/api/v1/content", (req, res) => {

});

app.post("/api/v1/brain/share", (req, res) => {

});

app.get("/api/v1/brain/:shareLink", (req, res) => {

});

app.listen(3000); 
