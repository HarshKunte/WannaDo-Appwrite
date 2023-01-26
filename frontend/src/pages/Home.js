import React, { useContext, useEffect, useState } from 'react';
import Card from '../components/Card';
import Navbar from '../components/Navbar';
import {FaPlus} from 'react-icons/fa';
import {IoMdAddCircle} from 'react-icons/io';
import { IoCloseSharp} from 'react-icons/io5';
import TodosContext from '../TodosContext';
import EmptyList from '../images/empty.svg'
import axios from 'axios'

import Modal from '../components/Modal';
import SearchBar from '../components/SearchBar';
import toast from 'react-hot-toast';
import LoginSignup from '../components/LoginSignup';
function Home() {
    const {todos, user, updateUser, updateTodos} = useContext(TodosContext);
    const [searchedTodos, setSearchedTodos] = useState([])


    const searchTodos = async(text) =>{
        if(text){
        console.log("searched todos callled");
            const {data} =  await axios.get(`/api/searchTodos/${user.id}?q=${text}`)
                            .catch(err =>{
                                toast.error("Something went wrong!")
                            })
        setSearchedTodos(data.todos);   
                        }            
        
    }

    async function getTodosFromDb(){

    //checking if context is empty to prevent unnecessary DB calls
    
        if(!todos || todos.length===0){
        const {data} =  await axios.get(`/api/getTodos/${user.id}`)
                        .catch(err =>{
                            toast.error("Something went wrong!")
                        })

        const newTodos = data.todos
        //update context
        updateTodos(newTodos)
            }
      
        
    }

    

    useEffect(()=>{
        if(user)
        getTodosFromDb()
    },[searchedTodos, user, getTodosFromDb])
    useEffect( ()=>{
       updateUser();
    },[updateUser])

    if(!user){
        return(
            <div className='px-4 md:px-10 lg:px-28 xl:px-32 py-6'>
            <Navbar/>
            <LoginSignup/>
            </div>
        )
    }

    
    
    return ( 
        <div className='px-4 md:px-10 lg:px-28 xl:px-32 py-6'>
            <Navbar />
            <SearchBar searchTodos={searchTodos}/>
            <div className='px-6 py-8 xl:px-16 xl:py-4'>
                <div className='w-full mb-12'>
                <div className="flex flex-col w-full border-opacity-50">
  <div className="divider">Your Lists</div>
</div>
                    {searchedTodos.length>0 && <button onClick={()=>setSearchedTodos([])} className="flex btn btn-sm bg-base-300 text-accent  float-left">
                        <IoCloseSharp className='mr-2'/>
                        Close search
                    </button>
                    }
                    <label htmlFor="my-modal-3" className="hidden md:flex btn btn-sm bg-base-300 text-base-content  float-right">
                        <FaPlus className='mr-2'/>
                        Create new list
                    </label>
                </div>
                <div className='flex flex-wrap w-full justify-around '>
                    {
                        todos.length===0 && <div className='w-full flex text-center flex-col items-center'>
                        <p className='text-white text-xl mb-3'>Hello <span className="text-error"> {user.name}</span>👋, you dont have any lists created yet!!!`</p>
                        <p className='text-white text-md'>Be more productive by deciding and organizing what you want to do.</p>
                        <img alt='empty' src={EmptyList} className="w-40 h-40 mt-10"/>
                    </div>
                    }
                    {
                        searchedTodos.length>0 && searchedTodos.map((todo, index) =>
                                <Card todo={todo} key={index}/>
                                )
                                
                    }
                            {searchedTodos.length===0 && todos.map((todo, index) =>
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