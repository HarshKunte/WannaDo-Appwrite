import React, { useContext, useEffect } from 'react';
import Card from '../components/Card';
import Navbar from '../components/Navbar';
import {FaPlus} from 'react-icons/fa';
import {IoMdAddCircle} from 'react-icons/io';
import TodosContext from '../TodosContext';
import axios from 'axios'

import Modal from '../components/Modal';
function Home() {
    const {todos, updateTodos} = useContext(TodosContext);

    const getTodosFromDb = async()=>{

    //checking if context is empty to prevent unnecessary DB calls
    if(!todos || todos.length==0){
       const {data} =  await axios.get('/api/getTodos')

       const newTodos = data.todos
       //update context
       updateTodos(newTodos)
        }
      
        
    }

    

    useEffect(()=>{
        getTodosFromDb()
    },[])

    

    return ( 
        <div className='px-4 md:px-10 lg:px-28 xl:px-32 py-6'>
            <Navbar/>
            <div className='px-6 py-8 xl:px-16 xl:py-8'>
                <div className='w-full mb-12'>
                <div className="flex flex-col w-full border-opacity-50">
  <div className="divider">Your Lists</div>
</div>
                    <label htmlFor="my-modal-3" className="hidden md:flex btn btn-sm bg-base-300 text-base-content  float-right">
                        <FaPlus className='mr-2'/>
                        Create new list
                    </label>
                </div>
                <div className='flex flex-wrap w-full justify-around '>
                {todos.map((todo, index) =>
                    <Card todo={todo} key={index}/>
                    )
                    }
                
                </div>
                
            </div>

            <div className="btm-nav md:hidden">

  <button className="text-error active">
    <IoMdAddCircle className='w-8 h-8'/>
  </button>

</div>


            {/* Enter title Modal  */}
            <Modal/>

        </div>

        
     );
}

export default Home;