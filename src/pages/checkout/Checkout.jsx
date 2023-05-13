import React, { useContext } from 'react';
import { useLoaderData } from 'react-router-dom';
import { AuthContext } from '../../Providers/AuthProvider';

const Checkout = () => {

    const service = useLoaderData();
    const {user}  = useContext(AuthContext);

    const { title, price, _id, img } = service;

    const handleBookService = event => {
        event.preventDefault();
        const form = event.target;
        const date = form.date.value;
        const email = form.email.value;
        const name = form.name.value;
        const due = form.due.value;
        console.log(name,email,date,due)


        const order = {
            customerName: name,
            email,
            date,
            service: title,
            service_id: _id,
            price,
            img
        }

     fetch('https://car-doctor-server-mu-teal.vercel.app/bookings', {
        method: 'POST',
        headers: {
            'content-type' : 'application/json'
        },
        body: JSON.stringify(order)
     })
     .then( res => res.json())
     .then( data => {
        console.log(data)
        if(data.insertedId){
            alert('Order Confirmed')
        }
     })
    }



    return (
        <div>
            <h1 className='text-center text-3xl mb-6'>Book Service: {title}</h1>



            <form onSubmit={handleBookService} >

               <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
               <div className="form-control">
                    <label className="label">
                        <span className="label-text">Name</span>
                    </label>
                    <input type="text" placeholder="name" name='name' className="input input-bordered" />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Date</span>
                    </label>
                    <input type="date" name='date'className="input input-bordered" />

                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input type="text" defaultValue={user?.email} name='email' placeholder="email" className="input input-bordered" />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Due Amount</span>
                    </label>
                    <input type="number" name='due' readOnly defaultValue={price} placeholder="Due Amount" className="input input-bordered" />

                </div>
               </div>
                <div className="form-control mt-6">
                  
                    <input className="btn btn-primary btn-block" type="submit" value="Order Confirm" />
                </div>

            </form>


            <div className="card-body">

            </div>
        </div>

    );
};

export default Checkout;