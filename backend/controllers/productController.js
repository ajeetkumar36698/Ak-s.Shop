import { json } from "express"
import productModel from "../models/productModel.js"

const addProduct = async (req, res) => {
    try {
        const { name, description, price, category, subCategory, sizes, bestseller } = req.body
        const image1 = req.files.image1 && req.files.image1[0]
        const image2 = req.files.image2 && req.files.image2[0]
        const image3 = req.files.image3 && req.files.image3[0]
        const image4 = req.files.image4 && req.files.image4[0]
        // const images = [
        //     image1?.path,
        //     image2?.path,
        //     image3?.path,
        //     image4?.path
        // ].filter(Boolean); // removes undefined if any image is not uploaded
        const images = [];

        ['image1', 'image2', 'image3', 'image4'].forEach(key => {
            const fileArray = req.files[key];
            if (fileArray && fileArray[0]) {
                images.push(`${req.protocol}://${req.get('host')}/uploads/${fileArray[0].filename}`);
            }
        });
        const productdata = {
            name, description, category, price: Number(price), subCategory,
            bestseller: bestseller === 'true' || bestseller === true,
            sizes: JSON.parse(sizes),
            image: images,
            date: Date.now()
        }
        console.log(productdata,"helll  I Am ajeet")
        const product = new productModel(productdata)
        console.log(product)
        await product.save()

        res.json({ success: true, message: "product added" })



    } catch (error) {
        res.json({ success: false, message: error.message })

    }




}
const listProduct = async (req, res) => {
    try {
        const product = await productModel.find({})
        res.json({ success: true, product })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })

    }


}
const removeProduct = async (req, res) => {
    try {
        await productModel.findByIdAndDelete(req.body.id)
        res.json({ success: true, message: "product Remove" })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })


    }

}
const singleProduct = async (req, res) => {
    try {
        const { productId } = req.body
        const product = await productModel.findById(productId)
        res.json({ success: true, product })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })



    }

}
export { addProduct, listProduct, removeProduct, singleProduct }