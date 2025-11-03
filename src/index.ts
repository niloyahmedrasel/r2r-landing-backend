import express from "express";
import {connectDB} from "./config/db"; 
import demoRouter from "./router/demo";
import contactRouter from "./router/contact";
import eventRouter from "./router/event";
import blogRouter from "./router/blog";
import teamRouter from "./router/team";
const app = express();
app.use(express.json());
connectDB();

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.use("/demo", demoRouter);
app.use("/contact", contactRouter);
app.use("/event", eventRouter);
app.use("/blog", blogRouter);
app.use("/team", teamRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));