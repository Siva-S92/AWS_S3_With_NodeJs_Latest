import express from 'express';
import { fileuploadToS3 } from '../controllers/upload.js';
import multer from 'multer'


const router = express.Router();

const upload = multer({})

router.post("/getuploaded-files",upload.single('file'), fileuploadToS3)


export const fileRouter = router
