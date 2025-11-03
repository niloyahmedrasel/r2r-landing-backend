import express from "express";
import {TeamController} from "../controller/team";
import { upload } from "../middleware/upload";

const router = express.Router();

router.post("/",upload.single("image"),new TeamController().create);
router.get("/",new TeamController().getAll);
router.get("/:id",new TeamController().getById);
router.delete("/:id",new TeamController().delete);
router.put("/:id",upload.single("image"),new TeamController().update);

export default router;