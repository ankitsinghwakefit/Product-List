var express = require('express');
var router = express.Router();
var Category = require("../model/categories");
var Product = require("../model/products");

/* GET for adding category. */
router.get('/addcategorie', function(req, res, next) {
  res.render('home');
});

/* GET for Home. */
router.get('/', function(req, res, next) {
  // finding all the listed categories
  Category.find({},(err,productCategories)=>{
    if(!err){
      // rendering categorielist and passing data 
      res.render("categorielist",{productCategories})
    }else {
      // error handeling
      console.log(err);
    }
  })
});

/* GET for finding category details. */
router.get("/categorydetails/:id", (req,res)=>{
  // finding targeted category using id
  Category.findById(req.params.id)
  // populating category with products
  .populate("products")
  .exec((err,proCat)=>{
    console.log(proCat);
    if(!err){
      // rendering showcategorydetails and passing data 
      res.render("showcategorydetails",{
        existingdata : proCat,
      })
    }
    // error handeling
    else{console.log(err)}
  })
});

// GET for Deleting the category 
router.get("/delete/:id",(req,res)=>{
  // getting targeted category by id and deleting it
  Category.findByIdAndDelete(req.params.id,(err,data)=>{
    // error handeling
    if(err){console.log(err)}
    res.redirect("/");
  })
})

/* POST for adding products. */
router.post("/product",(req,res)=>{
  let categorieId = req.body._id;
  const { text, details, price } = req.body;
  // passing all the required fields to create product 
  Product.create({text, details, price, categorieId: req.body._id },(err, createdproduct)=>{
    if(err){console.log(err)}
    Category.findByIdAndUpdate(
      categorieId,
      {$push: {products:createdproduct.id}},
      (err,cate) =>{
        if(err) next(err);
        res.redirect('/categorydetails/' + req.body._id)
      }
    )
  })
})

/* POST for adding categorie. */
router.post('/', function(req, res, next) {
  // creating category 
  Category.create(req.body,(err,newCategorie)=>{
    if( err ){console.log(err)};
    res.redirect("/");
  })
});

module.exports = router;
