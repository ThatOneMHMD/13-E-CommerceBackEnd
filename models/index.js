// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag'); 

// Products belongsTo Category/ MY WORK (each product has only one category)
Product.belongsTo(Category, {
  foreignKey: 'category_id',
  onDelete: 'CASCADE'
});
// Categories have many Products/ MY WORK (each category can have many products)
Category.hasMany(Product, {
  foreignKey: 'category_id',
  onDelete: 'CASCADE'
});

// Products belongToMany Tags (through ProductTag)/ MY WORK (each prduct can have many tags)
Product.belongsToMany(Tag, {
  through: {
    model: ProductTag,
    foreignKey: 'product_id',
    unique: false
  },
});
// Tags belongToMany Products (through ProductTag)/ MY WORK (each tag can have many products)
Tag.belongsToMany(Product, {
  through: {
    model: ProductTag,
    foreignKey: 'tag_id',
    unique: false
  },
});

// export models after defining the associations between them
module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};