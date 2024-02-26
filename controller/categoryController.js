const { Category } = require('../model/category');
const Product = require('../model/product');

module.exports.viewCategory = async (req, res) => {
  try {
    const category = await Category.findAllCategory();
    if (category) {
      return res.status(200).json({
        message: "Here list of all categoris",
        success: true,
        category
      })
    } else {
      return res.status(400).json({
        message: "category not exist or not found",
        success: false
      })
    }

  } catch (error) {
    console.log('Error in creating the category!', error);
    return res.status(500).json({
      message: 'Error in getting the list of the category!',
      error,
    });
  }
}

module.exports.createCategory = async (req, res) => {
  try {
    const existCategory = await Category.findCategory(req.body.category);
    if (!existCategory) {
      const categoryId = await Category.create(req.body.category);
      return res.status(200).json({
        message: 'Category created successfully',
        success: true,
        categoryId,
      });
    } else {
      return res.status(200).json({
        message: 'Category already exists',
        success: true,
        existCategory,
      });
    }
  } catch (error) {
    console.log('Error in creating the category!', error);
    return res.status(500).json({
      message: 'Error in creating the category!',
      error,
    });
  }
}

// module.exports.categoryIdWiseProductData = async (req, res) => {
//   try {
//     const categoryId = await Category.findCategoryBYid(req.params.id);
//     const product = await Product.findAllProduct({ categoryId: categoryId });
//     if (categoryId && product.length > 0) {
//       return res.status(200).json({
//         message: "all product list by category",
//         success: true,
//         product
//       })
//     } else {
//       return res.status(400).json({
//         message: "product not found and no product in this category",
//         success: false
//       })
//     }
//   } catch (error) {
//     console.log("Error in finding the category data", error);
//     return res.status(500).json({
//       message: "Error in finding the category data",
//       error
//     })
//   }
// }

module.exports.categoryIdWiseProductData = async (req, res) => {
  try {
    const categoryId = await Category.findCategoryBYid(req.params.id);

    if (!categoryId) {
      return res.status(400).json({
        message: "Category not found",
        success: false
      });
    }

    // Assuming that you have a categoryId property in your Product model
    const products = await Product.findAllBycategoryId(categoryId.id);

    if (products.length>0) {
      return res.status(200).json({
        message: "All products by category",
        success: true,
        products
      });
    } else {
      return res.status(400).json({
        message: "No products found in this category",
        success: false
      });
    }
  } catch (error) {
    console.log("Error in finding the category data", error);
    return res.status(500).json({
      message: "Error in finding the category data",
      error
    });
  }
};