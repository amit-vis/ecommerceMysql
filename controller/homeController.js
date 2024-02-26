module.exports.home = async (req, res)=>{
    try {
        return res.status(200).json({
            message: "e-commerce api",
            success: true
        })
    } catch (error) {
        console.log("Internal serever error in finding the home page", error);
        return res.status(500).json({
            message: "Internal serever error in finding the home page",
            error
        })
    }
}