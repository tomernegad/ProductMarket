import express from "express";
import helmet from "helmet";
import morgan from "morgan";



const app = express();
app.use(helmet());

app.get("/",(req,res)=>{
    console.log(res.getHeaders());
    res.send("hello from backend");
})

app.listen(3000,()=>{
    console.log("The server is run on port 3000");
}
)