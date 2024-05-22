import React from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import { useNavigate } from 'react-router-dom'

function NotAMember() {
    const nav = useNavigate();
    return (
        <div>
            <Navbar />
            <div className='h-[70vh] w-full flex flex-col justify-center items-center'>
                <img alt='not-a-member' src='member.png' className='w-48' />
                <h1 className='font-bold text-2xl text-center'>You are not a member of this community</h1>
                <button onClick={()=>nav('/')} className='px-6 py-3 font-semibold rounded-lg hover:scale-105 transition-all ease-in-out duration-300 bg-black text-white mt-2'>Back To Home</button>
            </div>
        </div>
    )
}

export default NotAMember