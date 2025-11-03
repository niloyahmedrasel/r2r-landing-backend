import express from "express";
import {BlogController} from "../controller/blog";
import { upload } from "../middleware/upload";

const router = express.Router();

router.post("/",upload.array("images", 5), new BlogController().create);
router.get("/",new BlogController().getAll);
router.get("/:id",new BlogController().getById);
router.delete("/:id",new BlogController().delete);
router.put("/:id",upload.array("images", 5),new BlogController().update);

export default router;