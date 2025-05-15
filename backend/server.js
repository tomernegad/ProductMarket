import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import productRoutes from "./routes/productRoutes.js";
import {sql} from "./config/db.js"

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(helmet());// secure middlware that help protect my app by setting varios HTTP headers.
app.use(morgan("dev")); // log the requests

app.use("/api/products",productRoutes)

async function initDB(){
    try{
        await sql`
            CREATE TABLE IF NOT EXISTS products(
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            image VARCHAR(255) NOT NULL,
            price DECIMAL(10,2) NOT NULL,
            create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `;
    }
    catch(error){
        console.log("Error initDB",error);
    }
}

initDB().then(app.listen(PORT,()=>{
    console.log(`The server is run on port ${PORT}`);
}
));
