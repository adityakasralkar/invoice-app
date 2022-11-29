import { MongoClient , ObjectId } from 'mongodb';
import React , {useState , useEffect} from 'react';
import { useRouter } from 'next/router';
import {toast} from "react-toastify";


const EditItem = (props) => {

    const invoice = props.data;

    const router = useRouter();

    const [items , setItems] = useState(invoice.items);

    const [senderAddress , setSenderAddress] = useState('');
    const [senderCity , setSenderCity] = useState('');
    const [senderPincode , setSenderPincode] = useState('');
    const [senderState , setSenderState] = useState('');
    
    const [clientName ,setClientName] = useState('');
    const [clientEmail , setClientEmail] = useState('');
    const [clientAddress  , setClientAddress] = useState('');
    const [clientCity ,setClientCity] = useState('');
    const [clientPincode ,setClientPincode] = useState('');
    const [clientState ,setClientState] = useState('');
  
    const [description , setDescription] = useState('');
    const [createdAt , setCreatedAt] = useState('');
    const [paymentTerms , setPaymentTerms] = useState('');


    //add product item
    const addItem = () => {
        setItems([...items , {name: '' , quantity : 0 , price: 0 , total : 0 }]);
        console.log(items);
    }

    //handler change
    const handlerChange = ( event , i ) =>{
        const{name , value} = event.target;
        const list = [...items];
        list[i][name] = value;
        list[i]['total'] = list[i]['quantity'] * list[i]['price'];
        setItems(list)
    }

    //Delete Product Items
    const deleteItem = (i) => {
        const inputData = [...items]
        inputData.splice(i,1);
        setItems(inputData);
    }

    //Total Amount of All Product Items
    const totalAmount = items.reduce(( acc,curr) => (acc+ curr.total) , 0);

    // Update invoice in Database
    const updateInvoice = async (invoiceId ,status) => {
        try {
             const res = await fetch(`/api/edit/${invoiceId}` , {
                method: 'PUT',
                headers:{
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify({
                    senderAddress: senderAddress,
                    senderCity: senderCity,
                    senderPincode: senderPincode,
                    senderState: senderState,
                    clientName: clientName,
                    clientEmail: clientEmail,
                    clientAddress: clientAddress,
                    clientCity: clientCity,
                    clientPincode: clientPincode,
                    clientState: clientState,
                    description : description,
                    createdAt: createdAt,
                    paymentDue: createdAt,
                    paymentTerms: paymentTerms,
                    status: status,
                    items: items,
                    total: totalAmount,
                })
             })

             const data = await res.json();

             router.push(`/invoices/${invoiceId}`);
             toast.success(data.message);
        } catch (error) {
            toast.error('Something went Wrong..!!');
        }
    }

    // Set-Up Input Data (DEFAULT)
    useEffect(() => {
        setSenderAddress(invoice.senderAdd.address)
        setSenderCity(invoice.senderAdd.city)
        setSenderPincode(invoice.senderAdd.pincode)
        setSenderState(invoice.senderAdd.state)
        
        setClientAddress(invoice.clientAdd.address)
        setClientCity(invoice.clientAdd.city)
        setClientPincode(invoice.clientAdd.pincode)
        setClientState(invoice.clientAdd.state)

        setClientName(invoice.clientName)
        setClientEmail(invoice.clientEmail)
        setDescription(invoice.description)
        setCreatedAt(invoice.createdAt)
        setPaymentTerms(invoice.paymentTerms)


    } , [invoice])

  return (
    <>
    <div className="main__container">
        <div className="new__invoice">
            <div className="new__invoice-header">
                <h3>Edit #{invoice.id.substr(0,6).toUpperCase()}</h3>
            </div>

            {/* -------- New Invoice Body -------- */}
            <div className="new__invoice-body">
                {/* -------- Bill From -------- */}
                <div className="bill__from">
                    <p className="bill_title">Bill from</p>
                    <div className="form__group">
                        <p>Address</p>
                        <input type="text" value={senderAddress} onChange= {e => setSenderAddress(e.target.value)}/>
                    </div>

                    <div className="form__group inline__form-group">
                        <div>
                            <p>City</p>
                            <input type="text" value={senderCity} onChange= {e => setSenderCity(e.target.value)}/>
                        </div>

                        <div>
                            <p>Pincode</p>
                            <input type="text" value={senderPincode} onChange= {e => setSenderPincode(e.target.value)} />
                        </div>

                        <div>
                            <p>State</p>
                            <input type="text" value={senderState} onChange= {e => setSenderState(e.target.value)}/>
                        </div>
                    </div>
                </div>

                {/* ----- Bill To -----*/}
                <div className="bill__to">
                    <p className="bill_title">Bill to</p>
                    <div className="form__group">
                        <p>Client Name</p>
                        <input type="text" value={clientName} onChange={e => setClientName(e.target.value)}/>
                    </div>

                    <div className="form__group">
                        <p>Client Email</p>
                        <input type="email" value={clientEmail} onChange={e => setClientEmail(e.target.value)}/>
                    </div>

                    <div className="form__group">
                        <p>Address</p>
                        <input type="text" value={clientAddress} onChange={e => setClientAddress(e.target.value)}/>
                    </div>


                    <div className="form__group inline__form-group">
                        <div>
                            <p>City</p>
                            <input type="text" value={clientCity} onChange={e => setClientCity(e.target.value)}/>
                        </div>

                        <div>
                            <p>Pincode</p>
                            <input type="text" value={clientPincode} onChange={e => setClientPincode(e.target.value)}/>
                        </div>

                        <div>
                            <p>State</p>
                            <input type="text" value={clientState} onChange={e => setClientState(e.target.value)}/>
                        </div>
                    </div>

                    <div className="form__group inline__form-group">
                        <div className="inline__group">
                            <p>Invoice Date</p>
                            <input type="date" value={createdAt} onChange={e => setCreatedAt(e.target.value)}/>
                        </div>

                        <div className="inline__group">
                            <p>Payment Terms</p>
                            <input type="text" value={paymentTerms} onChange={e => setPaymentTerms(e.target.value)}/>
                        </div>
                    </div>

                    <div className="form__group">
                        <p>Description</p>
                        <input type="text" value={description} onChange={e => setDescription(e.target.value)}/>
                    </div>

                </div>

                {/* -------- Invoice Product Items -------- */}
                <div className="invoice__items">
                    <h3>Item List</h3>
                    {
                        items?.map((item,i)=>(
                        <div className="item" key={i}>
                        <div className="form__group inline__form-group">
                            <div>
                                <p>Item Name</p>
                                <input type="text" name="name" value={item.name} onChange={e=>handlerChange(e,i)}/>
                            </div>

                            <div>
                                <p>Qty</p>
                                <input type="number" name="quantity" value={item.quantity} onChange={e=>handlerChange(e,i)}/>
                            </div>

                            <div>
                                <p>Price</p>
                                <input type="number" name="price" value={item.price} onChange={e=>handlerChange(e,i)}/>
                            </div>

                            <div>
                                <p>Total</p>
                                <h4>₹{item.total}</h4>
                            </div>

                            <button className="edit__btn" onClick={() => deleteItem(i)}>Delete</button>
                        </div>
                    </div>
                        ))
                    }
                    
                </div>

                <button className="add__item-btn" onClick={addItem}>Add New Item</button>

                <div className="new__invoice__btns" style={{justifyContent:'end'}}>
                    
                    <div>
                        <button className="draft__btn" onClick={() => router.push(`/invoices/${invoice.id}`)}>Cancel</button>

                        <button className="mark__as-btn" onClick={() => updateInvoice(invoice.id , invoice.status)}>Save Changes</button>
                    </div>
                </div>

            </div>
        </div>
    </div>
    </>
  )
}

export default EditItem;

export async function getStaticPaths(){

    const client = await MongoClient.connect(process.env.MONGO_URL , {useNewUrlParser:true});
    
    const db  = client.db();
    const collection = db.collection('allInvoices');

    const invoices = await collection.find({} , {_id:1}).toArray()

    return{
        fallback: 'blocking',
        paths: invoices.map(invoice => ({
            params:{
                invoiceId: invoice._id.toString()
            }
        }))
    }

}
 
export async function getStaticProps(context){

    const { invoiceId} = context.params;

    const client = await MongoClient.connect(process.env.MONGO_URL , {useNewUrlParser:true});
    
    const db  = client.db();
    const collection = db.collection('allInvoices');

    const invoice = await collection.findOne({_id: ObjectId(invoiceId)});

    return {
        props:{
            data:{
                id: invoice._id.toString(),
                senderAdd : invoice.senderAdd,
                clientAdd : invoice.clientAdd,
                clientName: invoice.clientName,
                clientEmail: invoice.clientEmail,
                description: invoice.description,
                createdAt: invoice.createdAt,
                paymentDue: invoice.paymentDue,
                items: invoice.items,
                total: invoice.total,
                status : invoice.status,
                paymentTerms: invoice.paymentTerms
            }
        },
        revalidate:1

    }

}