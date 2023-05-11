import React, { useEffect, useState } from 'react';
import ServiceCard from './ServiceCard';

const Services = () => {

    const [services, setServices] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/services')
            .then(res => res.json())
            .then(data => setServices(data))
    }, [])


    return (
        <div className='mt-4'>
            <div className='text-center'>
                <h3 className='text-2xl font-bold text-orange-600'>Our Services</h3>
                <h2 className='text-5xl'>Our Services Area</h2>
                <p>
                    the majority have suffered alteration in some form, by injected humour, or randomised <br /> words which don't look even slightly believable.
                </p>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 p lg:grid-cols-3 gap-6'>
                {
                    services.map(service => <ServiceCard service={service} key={service._id}></ServiceCard>)
                }
            </div>
        </div>
    );
};

export default Services;