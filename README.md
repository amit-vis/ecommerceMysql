# Ecommerce API
I made an eCommerce API. It has a category feature, where you can add products by giving a category id and you can also check the product list and details with an ID. Users have a signup and login page. To keep things secure, certain sections like the cart and order placement need authentication.

The cart lets users add, update quantity, and remove items. You can view details of the products in the cart. The order placement section allows users to place orders from the cart. They can also check their order history and details.

## Installation
Install My Projects Using npm
```bash
    git clone https://github.com/amit-vis/ecommerceMysql.git
    npm install
    cd ecommerceMysql
```

## Running Test
To run tests, run the following command
```bash
    npm start
```

## Routes
### category routes
    1. get the all the category list: [get]: /category/view
    2. create the category: [post]: /category/add
    3. get the product list category wise : [get]: /category/category-wise/:id

### product routes
    1. fetch all the products list: [get]: /product/list
    2. add new product: [post]: /product/create
    3. get the product details by product id: [get]: /product/details/:id
    4. change the product stocks or availability: [put]: /product//update-stock/:id'

### user routes
    1. register the user: [post]: /user/create
    2. signin the user: [post]: /user/signin

### cart routes
    1. add the item into cart: [post]: /cart/add/:id
    2. get the item list which is available in the cart: [get]: /cart/view-cart
    3. delete the item from the cart: [delete]: /cart/delete-item/:id

### order routes
    1. place the order from the cart: [post]: /order/place/:id
    2. check the orders history: [get]: /order/history
    3. check the order details by order id: /order/details/:id

## Folder Structure
* config
    - limitter.js
    - mongoose.js
    - passport-jwt.js
    - secure.js
    - swagger.js
* controllers
    - cartCotroller.js
    - categoryController.js
    - homeController.js
    - orderPlaceController.js
    - productController.js
    - userController.js
* models
    - cart.js
    - category.js
    - orderplace.js
    - product.js
    - user.js
* routes
    - cart.js
    - category.js
    - index.js
    - order.js
    - product.js
    - user.js
- index.js
- .gitignore
- index.js
- package-lock.json
- package.json