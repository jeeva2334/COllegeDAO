import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import { BlockchainContext } from '../../context/BlockchainContext'
import { useNavigate } from 'react-router-dom';
import Stepper from "react-stepper-horizontal";
import { MetaMaskAvatar } from 'react-metamask-avatar';

function Addmember() {
    const { handleAddMember,handleAddToken,handleIsMember,address,showAddress } = useContext(BlockchainContext);
    const nav = useNavigate()
    const [steps,setSteps] = useState(0);
    const [loading,setLoading] = useState(false)
    const [formData,setFormData] = useState({
        name: "",
        age: 1,
        address: "",
        isBoard: false
    })
    const [tokens,setTokens] = useState(1)
    const step = [
        {title: "Add Details"},
        {title: "Tokenomics"},
    ]

    useEffect(()=>{
        if(!handleIsMember()){
            nav("/404")
        }
    },[])

    const handleChangeForm = async(e) => {
        // console.log({[e.target.name]:e.target.checked})
        setFormData({...formData,[e.target.name]:e.target.value})
    }

    const handleMemberSubmit = async() => {
        console.log(formData)
        try {
            await handleAddMember(formData,setSteps,setLoading)
        } catch (error) {
            console.log(error)
            return
        }
    }

    const handleTokenSubmit = async() => {
        try {
            await handleAddToken(formData.address,tokens,setLoading)
        } catch (error) {
            console.log(error)
            return
        }
    }

    return (
        <div>
            <Navbar />
            <div className='p-10 mt-20 flex w-screen'>
                <div className='mr-7 w-1/4 hidden md:block'></div>
                <div className='md:w-3/4 w-full mt-5'>
                    {steps === 0 ?
                        <>
                            <h1 className='font-bold text-xl'>Add Member</h1>
                            <Stepper steps={step} activeStep={steps} />
                            
                            <div className='mt-8 flex flex-col w-full'>
                                <label htmlFor='' className='text-sm font-semibold text-gray-700'>Name</label>
                                <input name='name' value={formData.name} onChange={handleChangeForm} className='border px-2 rounded py-1 border-gray-300 focus:outline-blue-700 mt-2' />
                            </div>
                            <div className='mt-8 flex flex-col w-full'>
                                <label htmlFor='' className='text-sm font-semibold text-gray-700'>Age</label>
                                <input name="age" value={formData.age} onChange={handleChangeForm} className='border px-2 rounded py-1 border-gray-300 focus:outline-blue-700 mt-2' type='number' />
                            </div>
                            <div className='mt-8 flex flex-col w-full'>
                                <label htmlFor='' className='text-sm font-semibold text-gray-700'>Contract Address</label>
                                <input name='address' value={formData.address} onChange={handleChangeForm} className='border px-2 rounded py-1 border-gray-300 focus:outline-blue-700 mt-2' />
                            </div>
                            <div className='mt-8 flex w-full'>
                                <input type='checkbox' onChange={(e)=>setFormData({...formData,isBoard:e.target.checked})} checked={formData.isBoard} name='isBoard' id="isBoard" />
                                <label htmlFor='isBoard' className='text-sm ml-2 font-semibold text-gray-700'>Add him as Board Member</label>
                            </div>
                            <div className='flex justify-end'>
                                <button onClick={handleMemberSubmit} className='px-7 text-white mt-3 py-2 font-semibold rounded-lg hover:scale-105 transition-all ease-in-out duration-300 bg-black' disabled={loading}>{loading ? 
                                    <div className="animate-spin ease-linear rounded-full w-10 h-10 border-t-2 border-b-2 border-purple-500"></div>
                                :"Next"}</button>
                            </div>
                        </>
                        :steps === 1 &&
                        <>
                            <h1 className='font-bold text-xl'>Send Tokens</h1>
                            <Stepper steps={step} activeStep={steps} />
                            <div className='mt-8 flex flex-col w-full'>
                                <label htmlFor='' className='text-sm font-semibold text-gray-700'>Contract Address</label>
                                <input name='address' value={formData.address} onChange={handleChangeForm} className='border px-2 rounded py-1 border-gray-300 focus:outline-blue-700 mt-2' disabled />
                            </div>
                            <div className='mt-8 flex flex-col w-full'>
                                <label htmlFor='' className='text-sm font-semibold text-gray-700'>Tokens</label>
                                <input name='weight' value={tokens} onChange={(e)=>setTokens(e.target.value)} className='border px-2 rounded py-1 border-gray-300 focus:outline-blue-700 mt-2' type='number' />
                            </div>
                            <div className='flex justify-end'>
                                <button onClick={handleTokenSubmit} className='px-7 text-white mt-3 py-2 font-semibold rounded-lg hover:scale-105 transition-all ease-in-out duration-300 bg-black' disabled={loading}>{loading ? 
                                    <div className="animate-spin ease-linear rounded-full w-10 h-10 border-t-2 border-b-2 border-purple-500"></div>
                                :"Next"}</button>
                            </div>
                        </>
                    }
                </div>
                <div className='w-1/2 hidden md:block'></div>
            </div>
        </div>
    )
}

export default Addmember