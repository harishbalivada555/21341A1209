const express=require("express")
const mongoose=require("mongoose")
require("dotenv").config()
const cors=require("cors")
const bodyParser=require("body-parser");
const { v4: uuidv4 } = require('uuid');
const getauthtoken = require("./controllers/authcontrollers");

const app=express();

app.use(cors());
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));


function sortproducts(products,order,option){
    if(order=="ascending"){
    return products.sort((a,b)=>a[option] - b[option])
    }
    else if(order=="descending"){
        return products.sort((a,b)=>b[option] - a[option])
    }
   
}



app.post("/categories/:categoryname/products",async(req,res,next)=>{

    try{
    
    let Category=req.params.categoryname;
    let {order,option,company,minPrice,maxPrice,pages}=req.body;
    console.log(order,option,company)
   
    
    const token=await getauthtoken()

    let data = await fetch(`http://20.244.56.144/test/companies/${company}/categories/${Category}/products?top=${pages}&minPrice=${minPrice}&maxPrice=${maxPrice}`, {
        method: 'GET', 
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
     if(data){
        console.log(data)
        data=await data.json();
        await data.forEach(async(item)=>{

            item.id=uuidv4()

        })
        if(option){
            products=await sortproducts(data,order,option)
   
            return res.json({products})
        }
        console.log(data)
        return res.json({data})
     }}
     catch(err){
        console.log(err)
     }
})









app.listen(5000,()=>{
    console.log("port is running on 5000")
})



