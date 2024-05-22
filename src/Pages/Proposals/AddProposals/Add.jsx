import React, { useContext, useState } from 'react'
import Navbar from '../../../Components/Navbar/Navbar'
import { BlockchainContext } from '../../../context/BlockchainContext'
import { useNavigate } from 'react-router-dom';
import Stepper from "react-stepper-horizontal";
import { MetaMaskAvatar } from 'react-metamask-avatar';

function Add() {
    const { loading,handleAddProposals,address,showAddress } = useContext(BlockchainContext)
    const nav = useNavigate()

    const steps = [
        {title: "Create Proposal"},
        {title: "Set Duration"},
        {title: "Review"}
    ]
    const [step,setSteps] = useState(0)
    const [formData,setFormdata] = useState({
        title: "",
        desc: "",
        start: "",
        end: ""
    })
    
    const handleFormChange = async(e) => {
        setFormdata({...formData,[e.target.name]:e.target.value})
    }
    
    const handleIncreaceSteps = () => {
        step === 0 ? setSteps(1) : step === 1 && setSteps(2)
    }

    const handleDecreaseSteps = () => {
        step === 2 ? setSteps(1) : step === 1 && setSteps(0)
    }

    const handleSubmitProposals = async() => {
        try {
            const days = [Number(formData.start),Number(formData.end)]
            const currentDate = new Date();
            const startDate = new Date(currentDate.getTime() + days[0] * 24 * 60 * 60 * 1000);
            const endDate = new Date(currentDate.getTime() + days[1] * 24 * 60 * 60 * 1000);
            const startTs = Math.floor(new Date(startDate).getTime()/1000.0)
            const endTs = Math.floor(new Date(endDate).getTime()/1000.0)
            handleAddProposals(formData,startTs,endTs,nav)
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <div className='mt-16'>
            <Navbar />
            <div className='p-10'>
                <h1 className='font-bold text-2xl'>Adding Proposals</h1>
                <div>
                    <Stepper steps={steps} activeStep={step} />
                </div>
                <div className='p-10 flex'>
                    {step === 0 ?
                        <div className='md:w-3/4 w-full mt-1'>
                            <h1 className='mb-6 font-bold text-2xl'>Create Proposal</h1>
                            <div className='flex flex-col w-full'>
                                <label htmlFor='' className='text-sm font-semibold text-gray-700'>Author</label>
                                <button className='px-6 py-3 font-semibold rounded-lg bg-gray-100 w-fit mt-6 mb-5 flex items-center'><MetaMaskAvatar address={address}  /> <span className='ml-2'>{showAddress}</span></button>
                            </div>
                            <div className='flex flex-col w-full'>
                                <label htmlFor='' className='text-sm font-semibold text-gray-700'>Title</label>
                                <input name='title' value={formData.title} onChange={handleFormChange} className='border px-2 rounded py-1 border-gray-300 focus:outline-blue-700 mt-2' />
                            </div>
                            <div className='mt-8 flex flex-col w-full'>
                                <label htmlFor='' className='text-sm font-semibold text-gray-700'>Description</label>
                                <textarea name='desc' value={formData.desc} onChange={handleFormChange} className='border px-2 rounded py-1 border-gray-300 focus:outline-blue-700 mt-2' />
                            </div>
                            <button onClick={handleIncreaceSteps} className='px-7 text-white mt-3 py-2 font-semibold rounded-lg hover:scale-105 transition-all ease-in-out duration-300 bg-black' disabled={loading}>Next</button>
                        </div>
                    :
                    step === 1 ?
                        <div className='md:w-3/4 w-full mt-1'>
                            <h1 className='mb-6 font-bold text-2xl'>Duration</h1>
                            <div className='mt-8 flex flex-col w-full'>
                                <label htmlFor='' className='text-sm font-semibold text-gray-700'>Start Time (In Days)</label>
                                <input name='start' value={formData.start} onChange={handleFormChange} className='border px-2 rounded py-1 border-gray-300 focus:outline-blue-700 mt-2' />
                            </div>
                            <div className='mt-8 flex flex-col w-full'>
                                <label htmlFor='' className='text-sm font-semibold text-gray-700'>End Time (In Days)</label>
                                <input name='end' value={formData.end} onChange={handleFormChange} className='border px-2 rounded py-1 border-gray-300 focus:outline-blue-700 mt-2' />
                            </div>
                            <div>
                                <button onClick={handleDecreaseSteps} className='px-7 text-white mt-3 py-2 font-semibold rounded-lg hover:scale-105 transition-all ease-in-out duration-300 bg-black mr-4' disabled={loading}>previous</button>
                                <button onClick={handleIncreaceSteps} className='px-7 text-white mt-3 py-2 font-semibold rounded-lg hover:scale-105 transition-all ease-in-out duration-300 bg-black' disabled={loading}>Next</button>
                            </div>
                        </div>
                    :step === 2 &&
                        <div>
                            <h1 className='mb-6 font-bold text-2xl'>Review</h1>
                            <p className='mt-4 text-gray-500'>&#9432; Note: The proposal will start after once it has been approved</p>
                            <h1 className='mt-6 mb-4 font-bold text-2xl'>{formData.title}</h1>
                            <h1 className='mt-2 mb-4 font-semibold text-gray-500 text-sm'>{formData.desc}</h1>
                            <h1 className='mt-2 mb-4 font-semibold text-gray-500 text-sm'>Published by <span className='text-blue-500'>You</span></h1>
                            <div className='bg-gray-100 w-[70vw] rounded-lg p-6 h-fit'>
                                <h1 className='font-bold text-xl'>Voting</h1>
                                <h1 className='font-bold text-md'>Rules of Decision</h1>
                                <div>
                                    <div className='mt-7 flex justify-between items-center'>
                                        <h1 className='font-semibold'>Options :</h1>
                                        <p className='font-semibold'>Yes, No, Abstrain</p>
                                    </div>
                                    <div className='mt-2 flex justify-between items-center'>
                                        <h1 className='font-semibold'>Winning Threshold :</h1>
                                        <p className='font-semibold'> {">50%"}</p>
                                    </div>
                                    <div className='mt-2 flex justify-between items-center'>
                                        <h1 className='font-semibold'>Proposal Start's in :</h1>
                                        <p className='font-semibold'> {formData.start} days</p>
                                    </div>
                                    <div className='mt-2 flex justify-between items-center'>
                                        <h1 className='font-semibold'>Proposal End's in :</h1>
                                        <p className='font-semibold'> {formData.end} days</p>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <button onClick={handleDecreaseSteps} className='px-7 text-white mt-3 py-2 font-semibold rounded-lg hover:scale-105 transition-all ease-in-out duration-300 bg-black mr-4' disabled={loading}>{loading ? 
                                    <div className="animate-spin ease-linear rounded-full w-10 h-10 border-t-2 border-b-2 border-purple-500"></div>
                                :"Previous"}</button>
                                <button onClick={handleSubmitProposals} className='px-7 text-white mt-3 py-2 font-semibold rounded-lg hover:scale-105 transition-all ease-in-out duration-300 bg-black' disabled={loading}>{loading ? 
                                    <div className="animate-spin ease-linear rounded-full w-10 h-10 border-t-2 border-b-2 border-purple-500"></div>
                                :"Submit"}</button>
                            </div>
                        </div>
                    }
                    <div className='w-1/2 hidden md:block'></div>
                </div>
            </div>
        </div>
    )
}

export default Add