import express from 'express';
import { isAuthenticated } from '@ecom_microservice/isauthenticated'

import { createProduct, buyProduct  } from '../controllers/product';
export default (router: express.Router) => {

    router.post('/create',isAuthenticated ,createProduct);
    router.get('/buy/:id', isAuthenticated,buyProduct);
   
}