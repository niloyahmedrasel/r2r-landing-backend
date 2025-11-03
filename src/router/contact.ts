import express from "express";
import {ContactController} from "../controller/contact";

const router = express.Router();

router.post("/",new ContactController().create);
router.get("/",new ContactController().get);
router.get("/:id",new ContactController().getById);
router.delete("/:id",new ContactController().delete);
router.put("/:id",new ContactController().update);

export default router;