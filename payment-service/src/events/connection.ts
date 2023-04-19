import { connect, JSONCodec, Msg } from 'nats';
const jc = JSONCodec()
export class NatsConnect {
    stan;
    constructor() {
        this.stan = connect({ servers: "0.0.0.0:4222" })
        this.stan.then(() => {
            console.log("Nats connected");
        })
            .catch(() => {
                console.log("Nats Not Connected");

            })
    }
    async publish(subject: string, data: any) {
        (await this.stan).publish(subject, jc.encode(data))
        console.log(subject, "published");

    }
    subscribe(subject: string) {
        return new Promise(async(resolve,reject)=>{
                (await this.stan).subscribe(subject, {
                    callback: (err: any, msg: Msg) => {
                        const data = msg.data;
                        
                        resolve(data);
                    }
                });
        })
    } 


}