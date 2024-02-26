const Product = require('../model/product');

module.exports.getAllProducst = async (req, res) => {
    try {
        const product = await Product.getProductsWithCategory({});
        if (product) {
            return res.status(200).json({
                message: "Here is the list of all the product",
                success: true,
                product
            })
        } else {
            return res.status(400).json({
                message: "Products is not exist",
                success: false,
                error
            })
        }
    } catch (error) {
        console.log("Internal server error in getting list od the products", error);
        return res.status(500).json({
            message: "Internal server error in getting list od the products",
            error
        })
    }
}

module.exports.createProduct = async (req, res) => {
    try {
        const existProduct = await Product.findByTitle({ title: req.body.title });
        if (!existProduct) {
            const newProduct = await Product.create(req.body);
            return res.status(200).json({
                message: "Product added successfully",
                success: true,
                newProduct
            })
        } else {
            return res.status(200).json({
                message: "Product exist already",
                success: true,
                existProduct
            })
        }
    } catch (error) {
        console.log("Internal server in creating product", error);
        return res.status(500).json({
            message: "Internal server in creating product",
            error
        })
    }
}

module.exports.updateStock = async (req, res) => {
    try {
        const findProduct = await Product.updateStock(req.params.id);
        if (findProduct) {
            return res.status(200).json({
                message: "stock updated successfully",
                success: true,
                findProduct,
            })
        } else {
            return res.status(400).json({
                message: 'Product not found or update failed',
                success: false,
            });
        }

    } catch (error) {
        console.log('Internal server error in updating the stock of the product', error);
        return res.status(500).json({
            message: 'Internal server error in updating the stock of the product',
            error,
        });
    }
}

module.exports.productDetails = async (req, res)=>{
    try {
        const findProduct = await Product.findProductDetailsById(req.params.id);
        if(findProduct){
            return res.status(200).json({
                message: "Product details",
                success: true,
                findProduct
            })
        }else{
            return res.status(400).json({
                message: "product not found or product does not exist",
                error
            })
        }
    } catch (error) {
        console.log('Internal server getting product details by id', error);
        return res.status(500).json({
            message: 'Internal server getting product details by id',
            error,
        });
    }
}