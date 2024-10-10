import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { fileRouter } from './routes/router.js';

// dotenv config
dotenv.config();


// app config
const app = express();
const PORT = process.env.PORT || 3080


// middlewares
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())

// database connection


// routes
app.use("/api", fileRouter)

// server listern
app.listen(PORT, () => {
    console.log('server running onthe the port', PORT)
})