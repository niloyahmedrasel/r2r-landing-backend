import express from "express";
import {connectDB} from "./config/db"; 
import cors from "cors";
import demoRouter from "./router/demo";
import contactRouter from "./router/contact";
import eventRouter from "./router/event";
import blogRouter from "./router/blog";
import teamRouter from "./router/team";
const app = express();
app.use(express.json());

app.use(cors({
  origin: [
    "http://localhost:3000",
    "https://r2r-blond.vercel.app"

  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"]
}));

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