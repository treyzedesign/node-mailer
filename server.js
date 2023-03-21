const express = require('express')
const server = express()
const cors = require('cors')
const nodemailer = require("nodemailer");
require('dotenv').config()
const Port = 4000
let transporter = nodemailer.createTransport({
    service : "gmail",
    port: 587,
    secure: false,
    host: "smtp.gmail.com",
    tls: {
        rejectUnauthorized: false,
        minVersion: "TLSv1.2"
    },
    auth: {
        user: process.env.USER,
        pass: process.env.PASS
    }
})
server.use(express.json())
server.use(cors())
// server.get("/mail", async(req,res)=>{
//     res.send("okay")
// })
server.get("/mail", async(req,res)=>{
    try {
        const email = "prcenturionboy@gmail.com"
        let info = await transporter.sendMail({
                from : process.env.USER,
                to: email,
                subject : `hello ${email}`,
                html: `<p>welcome sir</p>
                        <h1>BE HAPPY AT CYCLOBOLD</h1>`
            })
            if(info){
                res.status(200).json({
                    message: "email sent successfully"
                });
            }
    } catch (error) {
        res.status(500).json({
            message: error
        })
    }
})

server.listen(Port, console.log(`server is running on port ${Port}`))

