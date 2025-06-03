import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  sku: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  image: { type: String, required: true },
  category: { type: String, required: true },
  brand: { type: String, required: true },
  warranty: { type: String, required: true },
  description: { type: String, required: true },
  inStock: { type: Boolean, default: true },
  price: { type: Number, required: true },
  location: { type: Object, required: true },
  addedOn: { type: Number, required: true },
  bookings: { type: Object, default: {} },
}, { minimize: false });

const productModel = mongoose.models.product || mongoose.model('product', productSchema);

export default productModel;
