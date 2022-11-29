import {MongoClient , ObjectId} from "mongodb";

async function handler(req,res)  {


    const {invoiceId} = req.query;

    const client = await MongoClient.connect(process.env.MONGO_URL , {useNewUrlParser:true});

    const db = client.db()
    const collection = db.collection('allInvoices')

    if(req.method == 'PUT'){
        await collection.updateOne({
            _id: ObjectId(invoiceId)
        } , {
            $set:{
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
                total : req.body.total,
            }
        })

        res.status(200).json({message: 'Invoice Updated Successfully'})
    }

    client.close();
}


export default handler;