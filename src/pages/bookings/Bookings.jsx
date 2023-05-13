import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Providers/AuthProvider';
import BookingRow from './BookingRow';
import { UNSAFE_DataRouterStateContext, useNavigate } from 'react-router-dom';

const Bookings = () => {
    const { user } = useContext(AuthContext);
    const [bookings, setBookings] = useState([]);
    const [reload, setReload] = useState(false);
    const navigate = useNavigate();
    console.log(bookings)

    const url = `http://localhost:5000/bookings?email=${user?.email}`;

    useEffect(() => {
        fetch(url,{
            method: 'GET',
            headers: {
                authorization: `Bearer ${localStorage.getItem('car-token')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if(!data.error){

                    setBookings(data)
                }else{
                    navigate('/');
                }
                
            })
    }, [reload])


    const handleBookingConfirm = id => {
        fetch(`http://localhost:5000/bookings/${id}`,{
            method: "PATCH",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({status: 'confirm'})

          })
        .then( res => res.json())
        .then( data => {
            console.log(data);
            if(data.modifiedCount > 0){
                const remaining = bookings.filter( book => book._id !== id);
                const updated = bookings.find( book => book._id === id);
                updated.status = 'confirm';
                const newBooking = [updated, ...remaining];
                setBookings(newBooking);


                // 2nd method
                // setReload(true)
            }
        })
    }

    return (
        <div>

            <h1 className='text-3xl text-bold text-center mb-10'>Your Bookings: {bookings.length}</h1>



            <div className="overflow-x-auto w-full">
                <table className="table w-full">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>
                                <label>
                                    <input type="checkbox" className="checkbox" />
                                </label>
                            </th>
                            <th>Image</th>
                            <th>Service</th>
                            <th>Price</th>
                            <th>Date</th>
                            <th>Order Status</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            bookings.map(booking => <BookingRow
                            key={booking._id}
                            booking={booking}
                            setReload={setReload}
                            handleBookingConfirm={handleBookingConfirm}
                            ></BookingRow>)
                        }

                    </tbody>


                </table>
            </div>



        </div>
    );
};

export default Bookings;