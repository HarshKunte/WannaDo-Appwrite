import React, { useContext } from 'react';
import {FaRunning} from 'react-icons/fa'
import {BiArrowBack} from 'react-icons/bi';
import {GiHamburgerMenu} from 'react-icons/gi';
import {RxAvatar} from 'react-icons/rx';
import { useNavigate } from 'react-router-dom';
import TodosContext from '../TodosContext';
import account from '../config/appwrite'
import { toast } from 'react-hot-toast';
function Navbar({back}) {

  const {user, updateUser, updateTodos} = useContext(TodosContext);

  const navigate = useNavigate()
  const goBack = () =>{
    navigate(-1)
  }

  const logOut = () =>{
    const promise = account.deleteSessions();

    promise.then(function (response) {
        //SUCCESS, update user in context
        updateUser()

        //set todos to empty
        updateTodos([])

        navigate('/')
    }, function (error) {
      toast.error("Logout failed")
    });
  }
    return ( 
    <div className="navbar bg-base-100 px-4 md:px-inherit">
        
            <div className="flex-1">
            {!back?(
            <>
                
                <p className="btn btn-ghost normal-case  text-2xl font-bold">
                Wanna<span className='text-primary'>DO</span>
                <span><FaRunning className='pl-1 text-primary'/></span></p>
            </>
            ):(
                <>
                <label htmlFor='my-drawer-2' className='lg:hidden drawer-button'><GiHamburgerMenu className='w-5 h-5'/></label>
                <p onClick={goBack} className='cursor-pointer hidden lg:flex items-center normal-case text-base'><BiArrowBack className='mr-2'/> Back</p>
                </>
              )
            }
          </div>
        
    
    <div className="flex-none">
      
    {user && <div className="dropdown dropdown-end">
        <label tabIndex="0" className="btn btn-ghost btn-circle avatar">
          <div className="w-10 rounded-full">
          <RxAvatar className='w-full h-full'/>
          </div>
        </label>
         <ul tabIndex="0" className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-300 rounded-box w-52">
          <li onClick={logOut}><p>Logout</p></li>
        </ul>
      </div>}
    </div>
  </div> );
}

export default Navbar;