import express from "express";
import {EventController} from "../controller/event";
import { upload } from "../middleware/upload";

const router = express.Router();

router.post("/",upload.array("images", 5),new EventController().create);
router.get("/",new EventController().getAll);
router.get("/:id",new EventController().getById);
router.delete("/:id",new EventController().delete);
router.put("/:id",upload.array("images", 5),new EventController().update);

export default router;