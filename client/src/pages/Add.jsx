import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';


const  Add=() =>{

  const[book,setBook]= useState({
    title:"",
    description:"",
    price:null,
    cover:"",
  });
  const navigate = useNavigate();
  const handleChange =(e) =>{
    setBook((prev)=>({...prev,[e.target.name]:e.target.value}));
    
  };
  const handleClick=async e =>{
    e.preventDefault()
    try{
        await axios.post("http://localhost:8800/",book)
        navigate("/")


    }catch(err){
         console.log(err)
    }
  }
  console.log(book);
  return (

    <div className='form'>
      <h1>Add NEW BOOK</h1>
        <input type="text"   placeholder='title'  onChange={handleChange} name="title"/>    
        <input type="text"   placeholder='description' onChange={handleChange} name="description"/> 
        <input type="number" placeholder='price' onChange={handleChange} name="price"/> 
        <input tyepe="text"  placeholder='cover' onChange={handleChange} name="cover"/>
        <button className='formButton'  onClick={handleClick}> Add</button>
    </div>
  )
}

export default Add
