const express = require('express');
const router = express.Router();


// Read products from JSON file
const products = require('../products.json');


// Route to get all products
router.get('/show', (req, res) => {
  res.json(products);
});

// Route to get a product by ID
router.get('/:id', (req, res) => {
    const productId = req.params.id;
   
  
      res.json(products[req.params.id]);
  
});

router.get('find/:id/:qt', (req, res) => {
    const { id, qt } = req.params;
  
    // Recherchez le produit dans la base de données en fonction de l'ID
    const product = products[id];
  
    if (!product) {
      // Si le produit n'est pas trouvé, retournez une erreur 404
      res.status(404).send('Produit non trouvé');
      return;
    }
  
    // Calcul du prix total
    const totalPrice = product.price * qt;
  
    // Retourne le prix total au client
    res.send(`Le prix total pour ${qt} ${product.name} est de ${totalPrice} euros.`);
  });
  
  router.get('/instock/:qt', (req, res) => {
    const { qt } = req.params;
  
    const inStockProducts = Object.values(products).filter(product => product.stock >= qt);

    // Return the in-stock products to the client
    res.send(inStockProducts);
  });
 
  
  
  
  
  
  
  


module.exports = router;