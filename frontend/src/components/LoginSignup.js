import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import account from "../config/appwrite";
import TodosContext from "../TodosContext";
import {ID} from 'appwrite'
function LoginSignup() {
  const {updateUser} = useContext(TodosContext);
  const [currentAction, setCurrentAction] = useState("login");
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")


  const login = async(e) =>{
    e.preventDefault();
    if(!email || !password ){
      return toast.error("All fields are necessary.")
    }
    const promise = account.createEmailSession(
      email,
      password
  );
  promise.then(function (res) {
      toast.success("Welcome")
      //update user in context
      updateUser()    
  }, function (error) {
    toast.error(error.message);
      })
  
}

  const signUp = async (e) =>{
    e.preventDefault()
    if(!email || !password || !name){
      return toast.error("All fields are necessary.")
    }
    console.log("signup called");
    //create account using appwrite
    const promise = account.create(
      ID.unique(),
      email,
      password,
      name,
      );
  
      promise.then(function (user) {
        toast.success("Account created")
        setEmail("")
        setPassword("")
        setCurrentAction('login')
      }, function (error) {
        toast.error(error.message)
      })

  }

  return (
    <div className="w-full flex flex-col items-center mt-10">
      <div className="w-full rounded-lg text-accent shadow md:mt-0 sm:max-w-md xl:p-0 bg-base-300">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          {currentAction=="login"?(<h1 className="text-xl font-bold leading-tight tracking-tight  md:text-2xl text-primary">
            Sign in to your account
          </h1>):(
            <h1 className="text-xl font-bold leading-tight tracking-tight  md:text-2xl text-primary">
            Create your account
          </h1>)}
          <form className="space-y-4 md:space-y-6" onSubmit={currentAction=='login'? login: signUp} >
            {currentAction=='signup' && <div>
              <label
                for="name"
                className="block mb-2 text-sm font-medium "
              >
                Your name
              </label>
              <input
                type="name"
                name="name"
                id="name"
                value={name}
                onChange={(e)=>setName(e.target.value)}
                className="bg-base-100 border border-gray-300 text-white sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                placeholder="name@company.com"
                required
              />
            </div>}
            <div>
              <label
                for="email"
                className="block mb-2 text-sm font-medium "
              >
                Your email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                className="bg-base-100 border border-gray-300 text-white sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                placeholder="name@company.com"
                required
              />
            </div>
            <div>
              <label
                for="password"
                className="block mb-2 text-sm font-medium text-white"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                placeholder="••••••••"
                className="bg-base-100 border border-gray-300 text-white sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                required
              />
            </div>
            
            {currentAction=="login"?(<button
              type="submit"
              className="w-full text-base-100 bg-error focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center" onClick={login}
            >
              Sign in
            </button>):(<button
              type="submit"
              className="w-full text-base-100 bg-error focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center" onClick={signUp}
            >
              Sign Up
            </button>)}
            {currentAction=="login"?(
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
              Don’t have an account yet?{" "}
              <a onClick={()=>setCurrentAction('signup')} className="cursor-pointer font-medium text-primary-600 hover:underline dark:text-primary-500">
                Sign up
              </a>
            </p>):(<p className="text-sm font-light text-gray-500 dark:text-gray-400">
              Already have an account?{" "}
              <a onClick={()=>setCurrentAction('login')} className="cursor-pointer font-medium text-primary-600 hover:underline dark:text-primary-500">
                Sign in
              </a>
            </p>)}
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginSignup;
