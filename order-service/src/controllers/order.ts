import express from 'express';
import { OrderModel } from '../model/orderSchema';
import { NatsConnect } from '../events/connection';
import {  JSONCodec } from 'nats';
const jc = JSONCodec()


export const listeningFunction =async () => {
    try {
        const connection = new NatsConnect();

        connection.subscribe('buyProduct').then(async (product: Uint8Array) => {
            const data = jc.decode(product);
            const { name, price } = JSON.parse(data.toString());


            const newOrder = new OrderModel({
                name,
                total_price: price,
                payment:false,
            });
            console.log(newOrder);
            
            newOrder.save();

           

        })



        connection.subscribe('payment').then(async(payment:Uint8Array | undefined)=>{
                const data = jc.decode(payment);
            const { orderId, status } = JSON.parse(data.toString());
            console.log(data);
            
            
            

            
            await OrderModel.findByIdAndUpdate(orderId, {payment:status});




    
        })
    } catch (error) {
        console.error(error);
    }

}

export const getOrder = async(req: express.Request, res: express.Response) => {
    try {
        const allOrder = await OrderModel.find();
        console.log(allOrder);
        
        res.send(allOrder)
    } catch (error) {
        console.error(error);
        
        res.sendStatus(500);
    }
}