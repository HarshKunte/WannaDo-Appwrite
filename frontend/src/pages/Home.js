import React from 'react';
import Card from '../components/Card';
import Navbar from '../components/Navbar';
import {FaPlus} from 'react-icons/fa';

import Modal from '../components/Modal';
function Home() {
    return ( 
        <div className='px-4 md:px-10 lg:px-28 xl:px-32 py-6'>
            <Navbar/>
            <div className='px-6 py-8 xl:px-16 xl:py-8'>
                <div className='w-full mb-12'>
                    <label htmlFor="my-modal-3" className="btn btn-sm text-base-content  float-right">
                        <FaPlus className='mr-2'/>
                        Create new list
                    </label>
                </div>
                <div className='flex flex-wrap w-full justify-between'>
                <Card/>
                <Card/>
                <Card/>
                <Card/>
                </div>
                
            </div>

            <Modal/>

        </div>

        
     );
}

export default Home;