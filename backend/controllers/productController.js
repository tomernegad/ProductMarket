import { sql } from "../config/db.js";


export const getProducts = async(req,res)=>{
    try{
        const products = await sql`
        SELECT * FROM products ORDER BY create_at DESC
        `;
        console.log("fetched products",products)
        res.status(200).json({success: true, data: products});
    }
    catch(error){
        console.log("Error get products",error);
        res.status(500).json({success:false, message: error.message});
    }
};

export const createProduct = async(req,res)=>{
   const {name,image,price} = req.body;
   if(!name || !image || !price)
   {
    res.status(400).json({success:false,message:"All fields are required"});
   }
   try
   {
    const newProduct = await sql`INSERT INTO products (name,image,price) VALUES (${name},${image},${price}) RETURNING *`
    console.log("New product added: ",newProduct[0]);

    res.status(201).json({success:true,data:newProduct[0]});
   }
    catch(error){
        console.log("Error create product:",error);
        res.status(500).json({success:false,message:"Internal server Error"});
    }
};

export const getProduct = async(req,res)=>{
    const {id} = req.params;
    try{
        const product = await sql`SELECT * FROM products WHERE id = ${id}`;
        res.status(200).json({success:true,data:product[0]});
    }
    catch(error){
        console.log("Error in getProduct function",error);
        res.status(500).json({success:false,message:"Internal server Error"});
    }
};

export const updateProduct = async(req,res)=>{
    const {id} = req.params;
    const {name,image,price} = req.body;
    try{
        const updateProduct = await sql`UPDATE products SET name = ${name}, image = ${image}, price = ${price} WHERE id = ${id} RETURNING *`;
        if(updateProduct.length === 0)
        {
            res.status(404).json({success:false,message:"Product not found"});
        }
        res.status(200).json({success:true,data:updateProduct[0]});
    }
    catch(error)
    {
        console.log("Error in updateProduct function",error);
        res.status(500).json({success:false,message:"Internal server Error"});
    }
};

export const deleteProduct = async(req,res)=>{
    const {id} = req.params;
    try{
        const deleteProduct = await sql`
        DELETE FROM products WHERE id = ${id}
        RETURNING *
        `;
        if(deleteProduct.length === 0)
        {   
            res.status(404).json({success:false,message:"Product not found"});
        }
        res.status(200).json({success:true,data:deleteProduct[0]});
    }
    catch(error){
        console.log("Error in deleteProduct function: ",error)
        res.status(500).json({success:false,message:"internal server Error"});
    }
};

 