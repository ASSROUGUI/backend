const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Product = require('./models/product');

app.use(express.json());

mongoose.connect('mongodb://localhost:27017/shopp', { useNewUrlParser: true });
mongoose.connection.once('open', () => {
  console.log('connected to mongo');
});

// INDEX
app.get('/products', (req, res) => {
    Product.find({}, (err, allProducts) => {
    if (err) { console.log(err) }
    res.json(allProducts);
  });
});

// SHOW
app.get('/products/:id', (req, res) => {
    Product.findById(req.params.id, (err, foundProduct) => {
    if (err) { console.log(err) }
    res.json(foundProduct);
  });
});

//CREATE
app.post('/products', (req, res)=>{
 
  Product.create(req.body, (error, createdProduct)=>{
      res.json(createdProduct);
  });
});

// UPDATE
app.put('/products/:id', (req, res) => {

  Product.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, updatedModel) => {
    res.json(updatedModel);
  });
});


// DELETE
app.delete('/products/:id', (req, res) => {
    Product.findByIdAndRemove(req.params.id, (err, data) => {
    if (err) { console.log(err) }
    res.json(data);
  });
});



// Products SEED ROUTE
app.get('/products/seed', (req, res) => {
    Product.insertMany([
    {
      name: 'T_shirt',
      color: 'pink',
      price:33,
      description:'T_shirt'
    },
    {
      name: 'T_shirt',
      color: 'purple',
      price:77,
      description:'T_shirt'
    },
    {
      name: 'T_shirt',
      color: 'green',
      price:55,
      description:'T_shirt'
    }
  ], (err, Products) => {
    res.json(Products);
  })
});


app.listen(3010, () => {
  console.log('listening');
});