const express = require("express")
const app = express()

require("dotenv").config()

const mongoose = require("./mongoose_config")
const AddToCart = require("./add_to_card_schema")
const User = require("./user_schema")
const port = 5000
app.use(express.urlencoded({extended:true}))
// app.use(express.json())

app.post("/user/addToCart",async (req,res) => {
    try{
        let item = await AddToCart.findOne({"user_id": req.body.user_id,"product_id": req.body.product_id,"type": req.body.type})
        if(item){
            item.quantity += parseInt(req.body.quantity)
        } else{
            item = new AddToCart({
                "product_id": req.body.product_id,
                "quantity": req.body.quantity,
                "user_id": req.body.user_id,
                "type": req.body.type
            })
        }

        await item.save()
        
        return res.json({"msg": "successfully added"})
    } catch(err){
        console.log(`error occured in add to cart route ${err}`)
        return res.json({msg: "error occured in add to cart"})
    }
})

app.post("/user/deleteFromCart",async (req,res) => {
    try{
        await AddToCart.findOneAndDelete({user_id: req.body.user_id,product_id: req.body.product_id,type: req.body.type})
        
        return res.json({"msg": "successfully deleted"})
    } catch(err){
        console.log(`error occured in delete from cart route ${err}`)
        return res.json({msg: "error occured in delete from cart"})
    }
})

app.post("/user/changeInCart",async (req,res) => {
    try{
        if(req.body.quantity == 0){
            await AddToCart.findOneAndDelete({user_id: req.body.user_id,product_id: req.body.product_id})
        } else{
            await AddToCart.findOneAndUpdate({user_id: req.body.user_id,product_id: req.body.product_id},{quantity: req.body.quantity})
        }
        res.set('Access-Control-Allow-Origin', '*');
        return res.json({"msg": "successfully updated"})
    } catch(err){
        console.log(`error occured in change in cart route ${err}`)
        res.set('Access-Control-Allow-Origin', '*');
        return res.json({msg: "error occured in change in cart"})
    }
})

app.get("/cart/items",async (req,res) => {
    try{
        const items = await AddToCart.find({})

        res.set('Access-Control-Allow-Origin', '*');
        return res.json({"items": items})
    } catch(err){
        console.log(`error in get cart items ${err}`)
        res.set('Access-Control-Allow-Origin', '*');
        return res.json({msg: "error occured in get cart items"})
    }
})

app.get("/user/checkDetails",async(req,res) => {
    try{
        let isPresent = await User.findOne({user_id: req.query.user_id})
        res.set('Access-Control-Allow-Origin', '*');
        return res.json({"user": isPresent})
    } catch(err){
        console.log("error occured in checking user details")
        res.set('Access-Control-Allow-Origin', '*');
        return res.json({"STATUS":"ERROR","msg":"error occured in checking details"})
    }
})

app.post("/user/addDetails",async (req,res) => {
    try{

        let details = await User.findOne({user_id: req.body.user_id})

        if(details){
            details.name = req.body.name
            details.email_id = req.body.email_id
            details.address = {
                "country": req.body.country,
                "state": req.body.state,
                "district": req.body.district,
                "pincode": req.body.pincode,
                "house_no": req.body.house_no
            }
        } else{
            details = new User({
                user_id: req.body.user_id,
                name: req.body.name,
                email_id: req.body.email_id,
                address: {
                    "country": req.body.country,
                    "state": req.body.state,
                    "district": req.body.district,
                    "pincode": req.body.pincode,
                    "house_no": req.body.house_no
                }
            })
        }

        await details.save()
        return res.json({msg: "user detail successfully saved"})
    } catch(err){
        console.log(`error occured in add Details route ${err}`)
        return res.json({msg: "error occured in adding Details"})
    }
})

app.listen(port,(err) => {
    if(err){
        console.log(`Error in running the server: ${err}`);
        return;
    }
    console.log(`Server is running at port: ${port}`);
})



