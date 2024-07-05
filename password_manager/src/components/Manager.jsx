import React, { useEffect, useState } from 'react';
import { MdRemoveRedEye } from "react-icons/md";
import { IoEyeOffSharp } from "react-icons/io5";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setform] = useState({site: "" , username: "" , password: ""})
  const [passwordArray, setPasswordArray] = useState([])

  useEffect(() => {
    let passwords = localStorage.getItem("password");
    if(passwords){
      setPasswordArray(JSON.parse(passwords))
    }
    
  }, [])

  const copyText = (text) => { 
    toast('Copied to clipboard 👍', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      });
    navigator.clipboard.writeText(text)
  }
  

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const savePassword = () => {
    if(form.site.length > 3 && form.username.length > 3 && form.password.length > 3){
    setPasswordArray([...passwordArray, {...form, id:uuidv4()}])
    localStorage.setItem("password", JSON.stringify([...passwordArray, {...form, id:uuidv4()}]))
    console.log([...passwordArray, form])
    setform({site: "" , username: "" , password: ""})
    }

    else{
      toast('Error: Credentials should be atleast 4 characters long 😿');
    }
    
  }

  const deletePassword = (id) => {
    let c = confirm("Do you really want to delete it ?")
    if(c){
      setPasswordArray(passwordArray.filter(item=>item.id!==id))
      localStorage.setItem("password", JSON.stringify(passwordArray.filter(item=>item.id!==id)))
      
    }

    // console.log([...passwordArray, form])

  }

  const editPassword = (id) => {

     setform(passwordArray.filter(i=>i.id===id)[0])
     setPasswordArray(passwordArray.filter(item=>item.id!==id))
    // localStorage.setItem("password", JSON.stringify([...passwordArray, form]))
    // console.log([...passwordArray, form])

  }
 

  const handleChange = (e) => {
    setform({...form, [e.target.name]: e.target.value})
  }

  return (
    <>

        <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition= "Bounce"
        />
        {/* Same as */}
        <ToastContainer />

      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_800px_at_100%_200px,#a3e635,transparent)]">
        </div>
      </div>

      <div className="p-2 md:p-0 md:mycontainer min-h-[89vh]">
        <h1 className='text-4xl font-bold text-center'>
          <span className='text-green-700'>&lt;</span>
          Pass
          <span className='text-green-700'>Man/&gt;</span>
        </h1>
        <p className='text-green-900 text-lg text-center'>Your password Manager</p>

        <div className="flex flex-col p-4 text-black gap-8 items-center">
          <input value={form.site} onChange={handleChange} placeholder='Enter website URL' className='rounded-full border border-green-500 w-full px-4 py-1' type="text" name="site" id="site" />
          <div className="flex flex-col md:flex-row w-full justify-between gap-8">
            <input value={form.username} onChange={handleChange} placeholder='Enter Username' className='rounded-full border border-green-500 w-full px-4 py-1' type="text" name="username" id="username" />

            <div className="relative">
              <input value={form.password} onChange={handleChange} placeholder='Enter Password' className='rounded-full border border-green-500 w-full px-4 py-1' type={showPassword ? 'text' : 'password'} name="password" id="password" />
              <span className="absolute right-1 top-2 cursor-pointer" onClick={togglePasswordVisibility}>
                {showPassword ?  <MdRemoveRedEye /> : <IoEyeOffSharp /> }
              </span>
            </div>
          </div>

          <button onClick={savePassword} className='flex justify-center items-center gap-2 bg-green-500 hover:bg-green-300 rounded-full px-9 py-2 w-fit'>
            <lord-icon src="https://cdn.lordicon.com/jgnvfzqg.json" trigger="hover"></lord-icon>
            Save Password
          </button>
        </div>
        <div className="passwords">
          <h2 className='font-bold text-2xl py-4'>Your Passwords</h2>
          {passwordArray.length === 0 && <div>No passwords to show</div>}
          {passwordArray.length != 0 && 
          <table className="table-auto w-full rounded-md overflow-hidden">
          <thead className='bg-green-800 text-white'>
            <tr>
              <th className='py-2'>Site</th>
              <th className='py-2'>Username</th>
              <th className='py-2'>Password</th>
              <th className='py-2'>Actions</th>
            </tr>
          </thead>
          <tbody className='bg-green-100'>
            {passwordArray.map((item, index)=>{
              return <tr key={index}>
              <td className='text-center  py-2'>
              <div className=" flex items-center justify-center">
              <a href={item.site} target='_blank'>{item.site}</a>
              <div className='lordiconcopy cursor-pointer' onClick={()=>{copyText(item.site)}}>
                <lord-icon
                style={{"width":"25px" , "height":"25px" , "paddingTop":"3px" , "paddingLeft":"3px"}}
                src="https://cdn.lordicon.com/depeqmsz.json"
                trigger="hover">
                </lord-icon>
              </div>
              </div>
              </td>
              <td className=' justify-center py-2  text-center'>
              <div className=" flex items-center justify-center">
                <span>{item.username}</span>
              <div className='lordiconcopy cursor-pointer' onClick={()=>{copyText(item.username)}}>
                <lord-icon
                style={{"width":"25px" , "height":"25px" , "paddingTop":"3px" , "paddingLeft":"3px"}}
                src="https://cdn.lordicon.com/depeqmsz.json"
                trigger="hover">
                </lord-icon>
              </div>
              </div>
              </td>
              <td className=' justify-center py-2  text-center'>
              <div className=" flex items-center justify-center">
                <span>{item.password}</span>
              <div className='lordiconcopy cursor-pointer' onClick={()=>{copyText(item.password)}}>
                <lord-icon
                style={{"width":"25px" , "height":"25px" , "paddingTop":"3px" , "paddingLeft":"3px"}}
                src="https://cdn.lordicon.com/depeqmsz.json"
                trigger="hover">
                </lord-icon>
              </div>
              </div>
              </td>
              <td className=' justify-center py-2  text-center'>
                  <span className='cursor-pointer mx-2' onClick={()=>{editPassword(item.id)}}>
                  <lord-icon
                  src="https://cdn.lordicon.com/yixbkspi.json"
                  trigger="hover"
                  style={{"width":"25px","height":"25px"}}>
                  </lord-icon>
                  </span>
                  <span className='cursor-pointer mx-2' onClick={()=>{deletePassword(item.id)}}>
                  <lord-icon
                  src="https://cdn.lordicon.com/skkahier.json"
                  trigger="hover"
                  style={{"width":"25px","height":"25px"}}>
                  </lord-icon>
                  </span>
              </td>
            </tr>
            })}
            
          </tbody>
        </table>
        }
        </div>
      </div>
    </>
  );
}

export default Manager;
