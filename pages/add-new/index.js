import React , {useState , useRef} from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';



const AddNew = () => {

    const router = useRouter();
    const [items , setItems] = useState([]);

    const senderAddress = useRef('');
    const senderCity = useRef('');
    const senderPincode = useRef('');
    const senderState = useRef('');
    
    const clientName = useRef('');
    const clientEmail = useRef('');
    const clientAddress = useRef('');
    const clientCity = useRef('');
    const clientPincode = useRef('');
    const clientState = useRef('');
  
    const description = useRef('');
    const createdAt = useRef('');
    const paymentTerms = useRef('');




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

    // Submit the Data to the Database
    const createInvoice = async status => {
        try {
            const res = await fetch('/api/add-new' , {
                method: 'POST' ,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    senderAddress: senderAddress.current.value,
                    senderCity: senderCity.current.value,
                    senderPincode: senderPincode.current.value,
                    senderState: senderState.current.value,
                    clientName: clientName.current.value,
                    clientEmail: clientEmail.current.value,
                    clientAddress: clientAddress.current.value,
                    clientCity: clientCity.current.value,
                    clientPincode: clientPincode.current.value,
                    clientState: clientState.current.value,
                    description : description.current.value,
                    createdAt: createdAt.current.value,
                    paymentDue: createdAt.current.value,
                    paymentTerms: paymentTerms.current.value,
                    status: status,
                    items: items,
                    total: totalAmount,

                }),

                
            })

            const data = await res.json();
            // console.log(data);
            router.push("/");
            toast.success(data.message);
        } catch (error) {
            // console.log("Something went Wrong..!!");
            toast.error("Something went Wrong..!!");
        }
    }

  return (
    <>
        <div className="radialBackground"></div>

    <div className="main__container">
        <div className="new__invoice">
            <div className="new__invoice-header">
                <h3>New Invoice</h3>
            </div>

            {/* -------- New Invoice Body -------- */}
            <div className="new__invoice-body">
                {/* -------- Bill From -------- */}
                <div className="bill__from">
                    <p className="bill_title">Bill from</p>
                    <div className="form__group">
                        <p>Address</p>
                        <input type="text" ref={senderAddress}/>
                    </div>

                    <div className="form__group inline__form-group">
                        <div>
                            <p>City</p>
                            <input type="text" ref={senderCity}/>
                        </div>

                        <div>
                            <p>Pincode</p>
                            <input type="text" ref={senderPincode}/>
                        </div>

                        <div>
                            <p>State</p>
                            <input type="text" ref={senderState}/>
                        </div>
                    </div>
                </div>

                {/* ----- Bill To -----*/}
                <div className="bill__to">
                    <p className="bill_title">Bill to</p>
                    <div className="form__group">
                        <p>Client Name</p>
                        <input type="text" ref={clientName}/>
                    </div>

                    <div className="form__group">
                        <p>Client Email</p>
                        <input type="email" ref={clientEmail}/>
                    </div>

                    <div className="form__group">
                        <p>Address</p>
                        <input type="text" ref={clientAddress}/>
                    </div>


                    <div className="form__group inline__form-group">
                        <div>
                            <p>City</p>
                            <input type="text" ref={clientCity}/>
                        </div>

                        <div>
                            <p>Pincode</p>
                            <input type="text" ref={clientPincode}/>
                        </div>

                        <div>
                            <p>State</p>
                            <input type="text" ref={clientState}/>
                        </div>
                    </div>

                    <div className="form__group inline__form-group">
                        <div className="inline__group">
                            <p>Invoice Date</p>
                            <input type="date" ref={createdAt}/>
                        </div>

                        <div className="inline__group">
                            <p>Payment Terms</p>
                            <input type="text" ref={paymentTerms}/>
                        </div>
                    </div>

                    <div className="form__group">
                        <p>Description</p>
                        <input type="text" ref={description}/>
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
                                <input type="text" name="name" onChange={e=>handlerChange(e,i)}/>
                            </div>

                            <div>
                                <p>Qty</p>
                                <input type="number" name="quantity" onChange={e=>handlerChange(e,i)}/>
                            </div>

                            <div>
                                <p>Price</p>
                                <input type="number" name="price" onChange={e=>handlerChange(e,i)}/>
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

                <div className="new__invoice__btns">
                    <button className="edit__btn" onClick={() => {router.push('/')}}>Discard</button>
                    <div>
                        <button className="draft__btn" onClick={() => createInvoice('draft')}>Save as Draft</button>

                        <button className="mark__as-btn" onClick={() => createInvoice('pending')}>Send & Save</button>
                    </div>
                </div>

            </div>
        </div>
    </div>
    </>
  )
}

export default AddNew;