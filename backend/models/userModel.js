import mongoose from "mongoose";


const userShema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true,unique:true },
    password: { type: String, required: true },
    cartdata: { type: Object, default: {} },
  
    
},{minimize:false})

const userModel=mongoose.models.user || mongoose.model('user',userShema)
export default userModel