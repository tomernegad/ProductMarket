import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());
app.use(helmet());// secure middlware that help protect my app by setting varios HTTP headers.
app.use(morgan("dev")); // log the requests

app.get("/",(req,res)=>{
    res.send("hello from backend");
})

app.listen(PORT,()=>{
    console.log(`The server is run on port ${PORT}`);
}
)