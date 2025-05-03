import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import BASE from '@/url/baseurl';

const LoginForm = () => {

  let navigate = useNavigate()

  let token = localStorage.getItem('token')
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  
  useEffect(()=>{
    async function checkRole() {
      let res=await axios.get(`${BASE}/user/role`,{
        headers:{
          'Content-Type':'application/json',
          'Authorization': `Bearer ${token}`
        }
      })
  
      if(res!=null){
        if(res.data === 'USER'){
          navigate('/user')
        }
        else if(res.data==='ADMIN'){
          navigate('/admin')
        }
        else{
          console.log('error')
        }
      }
      else{
        console.log('error')
      }
    }
    checkRole()
  },[])

  


  const handleSignIn = async () => {
    let response = await axios.post(`${BASE}/login`,{
      'email':formData.email,
      'password':formData.password
    })

    if(response.data.status === true){
      token = response.data.token
      localStorage.setItem('token',token)
      
      if(token!=null){

        console.log(token)

        let roleResponse = await axios.get(`${BASE}/user/role`,{
          headers:{
            'Content-Type':'application/json',
            'Authorization': `Bearer ${token}`
          }
        })
        console.log(roleResponse)
        if(roleResponse!=null){
          
          if(roleResponse.data==='USER'){
              navigate('/user')
          }
          else if(roleResponse.data==='ADMIN'){
              navigate('/admin')
          }
          else{
            console.log('error in getting role')
          }
        }

      }
      else{
        console.log("Token null in handle Sign")
      }
      
    }
    else{
      console.log('error inside handle sign in.')
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your login logic here
    console.log('Login form submitted:', formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-foreground">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          required
        />
      </div>
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-foreground">
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          required
        />
      </div>
      <button
        onClick={()=>{handleSignIn()}}
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-primary-foreground bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ring"
      >
        Sign in
      </button>
    </form>
  );
};

export default LoginForm; 