import { Router } from "express";
import { uploadFile } from "../controllers/fileUpload.controller";


const router = Router ()

router.post('/', uploadFile)


export default router