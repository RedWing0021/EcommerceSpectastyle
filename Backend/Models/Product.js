import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'ecommerceUser',
  },
  text: {
    type: String,
    required: true,
  },
});

const productSchema = new Schema({
  productName: {
    type: String,
    required: true,
  },
  productMrp: {
    type: Number,
    required: true,
  },
  discountPercent: {
    type: Number,
    required: true,
    default: 0,
  },
  publishDate: {
    type: Date,
    default: Date.now,
  },
  category: {
    type: String,
    required: true,
  },
  productDescription: {
    type: String,
  },
  productImage: {
    type: String,
  },
  status: {
    type: String,
  },
  views: {
    type: Number,
    default: 0,
  },
  reviews: [ReviewSchema],
});

productSchema.virtual('productPrice').get(function () {
  return this.productMrp - (this.productMrp * (this.discountPercent / 100));
});

productSchema.set('toJSON', { virtuals: true });

const Product = mongoose.model('Product', productSchema);
export default Product;