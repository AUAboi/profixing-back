const express = require("express");
const Route = express.Router();
// const productSchema = require("./model/productmodel")
const Product = require("../model/productmodel");
const ErrorHandler = require("../utils/errorhandle");
const ApiFeatures = require("../utils/apifeatures");
const {isauthantication, authorizedRoles} = require("../middleware/authentication");
// const catchAsyncerror = require("../middleware/catchAsyncerror")
// For getting All Products
Route.get("/", async(req,res,next)=>{

    try {
        let resultperpage = 5;
        const productcount = await Product.countDocuments()
     const apiFeatures = new  ApiFeatures(Product.find(),req.query).search().filter().pagination(resultperpage)
        const products = await apiFeatures.query;
        res.status(201).json({
            success:true,
            products,
            productcount
        })
        
    } catch (e) {
        return next(new ErrorHandler("Product Not found"+e,404))
    }
} )
// For specific product
Route.get("/product/:id", async(req,res,next)=>{
    try {
        const product = await Product.findById(req.params.id)
        
        res.status(200).json({
            success:true,
            product
        })
        
    } catch (e) {
        return next(new ErrorHandler("Product Not found"+e,404))
        
    }
}) 
// For posting data
Route.post("/api1/p1", async(req,res,next)=>{
    try{
    
        const product = await Product.create(req.body);
        res.status(201).json({
            success:true,
            product
        })

    }catch (e) {
        return next(new ErrorHandler("Product Not found"+e,404))
    }
}) 
// For Updating PRoduct
Route.post("/product/:id",isauthantication,authorizedRoles("admin"), async(req,res,next)=>{
    try {
        let product = await Product.findById(req.params.id)
        
        product = await Product.findByIdAndUpdate(req.params.id,req.body,{new:true})
        res.status(201).json({
            success:true,
            product
        })
    } catch (e) {
        return next(new ErrorHandler("Product Not found"+e,404))
    }
}) 
//Product delete
Route.delete("/product/:id",isauthantication,authorizedRoles("admin"), async(req,res,next)=>{
    try {
        const product = await Product.findById(req.params.id)
        await product.remove()
        res.status(200).json({
            success:true,
            message:"Your Product has been deleted"
        })
        
    } catch (e) {
        return next(new ErrorHandler("Product Not found"+e,404))
        
    }
}) 
Route.get('/usr', function (req, res) {
   
 
    console.log(req.cookies);
    res.send();
});
module.exports=Route   