const Order = require('../model/order');
const Cart = require('../model/cart');

module.exports.placeOrder = async (req, res)=>{
    try {
        const findCart = await Cart.findCartById(req.params.id);
        const order = await Order.findOrderByCartId(findCart.id);
        const placeOrder = await Order.placeOrder({cart_id: findCart.id, status: req.body.status});
        return res.status(200).json({
            message: "Order Placed successFully",
            success: true,
            placeOrder
        })


    } catch (error) {
        console.log("Internal serever error in placing the order", error);
        return res.status(500).json({
            message: "Internal serever error in placing the order",
            error
        })
    }
}

module.exports.orderHistory = async (req, res)=>{
    try {
        const orderHistory = await Order.orderHistory({});
        if(orderHistory){
            return res.status(200).json({
                message: "Order History",
                success: true,
                orderHistory
            })
        }else{
            return res.status(200).json({
                message: "Order does not exist or not available",
                success: false
            })
        }
    } catch (error) {
        console.log("Internal serever error finding the order history", error);
        return res.status(500).json({
            message: "Internal serever error finding the order history",
            error
        })
    }
}

module.exports.orderDetails = async (req, res)=>{
    try {
        const orderDetails = await Order.orderDetails(req.params.id);
        if(orderDetails){
            return res.status(200).json({
                message: "Here is the order details",
                success: true,
                orderDetails
            })
        }else{
            return res.status(400).json({
                message: "order does not exist or not found",
                success: false,
            }) 
        }
    } catch (error) {
        console.log("Internal serever error finding the order details", error);
        return res.status(500).json({
            message: "Internal serever error finding the order details",
            error
        })
    }
}