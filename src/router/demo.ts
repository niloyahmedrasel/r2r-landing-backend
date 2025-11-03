import express from "express";
import {DemoController} from "../controller/demo";

const router = express.Router();

router.post("/",new DemoController().createDemo);
router.get("/",new DemoController().getDemo);
router.get("/:id",new DemoController().getDemoById);
router.put("/:id",new DemoController().updateDemo);
router.delete("/:id",new DemoController().deleteDemo);

export default router;
