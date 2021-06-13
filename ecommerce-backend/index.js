const express = require('express');
const app = express();
const PORT = 5000;
var cors = require('cors');
var { initializeConnection } = require('./ConnectionDB/connectionDB')
var productApi = require('./Api/product');
var userApi = require('./Api/user');
var cartApi = require('./Api/cart');
var wishlistApi = require('./Api/wishlist');
var addressApi = require('./Api/address');
app.use(cors());



// connect with mongodb via mongooose
initializeConnection();

// product from DB
app.use('/products',productApi);
// user from DB
app.use('/users',userApi);
app.use('/carts',cartApi);
app.use('/wishlists',wishlistApi);
app.use('/address',addressApi);


app.get('/',(req,res)=>{
  res.status(200).json({message:"Hello World "})})


app.listen(process.env.PORT || PORT, () => {
  console.log(`server started at Port : ${PORT}`);
});







