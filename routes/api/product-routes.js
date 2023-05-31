const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// NOTE: This code works at the `/api/products` endpoint/ MY WORK!

// GET all products, including their associated Category and Tag data
router.get('/', async (req, res) => {
  try {
    const productData = await Product.findAll({
      include: [{ model: Category}, { model: Tag, through: ProductTag}]
    });
    res.status(200).json(productData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET a single product by id, including its associated Category and Tag data
router.get('/:id', async (req, res) => {
  try {
    const productData = await Product.findByPk(req.params.id, {
      include: [{ model: Category}, { model: Tag, through: ProductTag}]
    });
    if (!productData) {
      res.status(404).json({ message: 'No product found with this id!' });
      return;
    }
    res.status(200).json(productData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// CREATE a a new product (I created this before realizing that the original file was in fact working just fine. Anyhow, too lare for regrets...)
router.post('/', async (req, res) => {
  try {
    const productData = await Product.create(req.body);
    if (req.body.tagIds.length) {
      const productTagIdArr = req.body.tagIds.map((tag_id) => ({
        product_id: productData.id,
        tag_id,
      }));
      await ProductTag.bulkCreate(productTagIdArr);
    }
    res.status(200).json(productData);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

// Update product data: switched provided code into asyncawait form!
router.put('/:id', async (req, res) => {
  try {
    // Update product data
    await Product.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    // Find all associated tags from ProductTag
    const productTags = await ProductTag.findAll({
      where: {
        product_id: req.params.id,
      },
    });

    // Get list of current tag_ids
    const productTagIds = productTags.map(({ tag_id }) => tag_id);

    // Create filtered list of new tag_ids
    const newProductTags = req.body.tagIds
      .filter((tag_id) => !productTagIds.includes(tag_id))
      .map((tag_id) => ({
        product_id: req.params.id,
        tag_id,
      }));

    // Figure out which ones to remove
    const productTagsToRemove = productTags
      .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
      .map(({ id }) => id);

    // Run both actions
    await Promise.all([
      ProductTag.destroy({ where: { id: productTagsToRemove } }),
      ProductTag.bulkCreate(newProductTags),
    ]);

    res.status(200).json({ message: 'Product and associated tags updated successfully!' });
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

// delete one product by its `id` value
router.delete('/:id', async (req, res) => {
  try {
    // Delete the product
    const deletedProductCount = await Product.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (deletedProductCount === 0) {
      // No product found with the specified id
      return res.status(404).json({ message: 'No product found with that id!' });
    }

    // Delete associated product tags
    await ProductTag.destroy({
      where: {
        product_id: req.params.id,
      },
    });

    res.status(200).json({ message: 'Product and associated tags deleted successfully!' });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});



module.exports = router;
