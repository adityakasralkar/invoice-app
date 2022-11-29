
import { MongoClient} from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

async function handler(req,res){

const client = await MongoClient.connect(process.env.MONGO_URL , {useNewUrlParser:true});

if(req.method == 'POST'){
    const invoice = {
        senderAdd : {
            address: req.body.senderAddress,
            city: req.body.senderCity,
            pincode: req.body.senderPincode,
            state: req.body.senderState
        },

        clientName: req.body.clientName,
        clientEmail: req.body.clientEmail,
        clientAdd : {
            address: req.body.clientAddress,
            city: req.body.clientCity,
            pincode: req.body.clientPincode,
            state: req.body.clientState
        },
        createdAt: req.body.createdAt,
        paymentDue: req.body.createdAt,
        paymentTerms: req.body.paymentTerms,
        description: req.body.description,
        status: req.body.status,
        items: req.body.items,
        total : req.body.total
    }

    const db = client.db();
    const collection = db.collection('allInvoices');
    await collection.insertOne(invoice);

    res.status(200).json({message: 'Invoice Added Successfully'});

    client.close();
}

}

export default handler;