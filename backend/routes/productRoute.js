import express from 'express';
import {
  cancelOrder,
  completeOrder,
  sellerOrders,
  sellerDashboard,
  sellerItemList,
  sellerProfile,
  loginSeller,
  updateSellerProfile
} from '../controllers/sellerController.js';
import authSeller from '../middlewares/authSeller.js';

const sellerRouter = express.Router();

sellerRouter.get('/items', sellerItemList);
sellerRouter.post('/login', loginSeller);
sellerRouter.get('/orders', authSeller, sellerOrders);
sellerRouter.post('/complete-order', authSeller, completeOrder);
sellerRouter.post('/cancel-order', authSeller, cancelOrder);
sellerRouter.get('/dashboard', authSeller, sellerDashboard);
sellerRouter.get('/profile', authSeller, sellerProfile);
sellerRouter.post('/update-profile', authSeller, updateSellerProfile);

export default sellerRouter;
