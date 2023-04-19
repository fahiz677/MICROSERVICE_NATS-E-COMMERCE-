import express from 'express';
import { NatsConnect } from '../events/connection'


export  const createPayment =async (req:express.Request,res:express.Response) => {
    try {
        const orderId = req.params?.id;

        const topic = "payment"

        const connection = new NatsConnect();

        await connection.publish(topic, JSON.stringify({orderId, status: true}));
        
        res.sendStatus(200);
    } catch (error) {
        console.error(error);
        
        res.sendStatus(500);

    }
}