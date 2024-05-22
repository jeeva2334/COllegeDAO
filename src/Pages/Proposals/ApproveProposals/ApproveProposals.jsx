import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../../../Components/Navbar/Navbar'
import { useNavigate, useParams } from 'react-router-dom'
import { BlockchainContext } from '../../../context/BlockchainContext';

function ApproveProposals() {
    const { id } = useParams();
    const { handleGetOneProposals,handleApproveProposal,approveLoading,handleCloseProposal,handleDisApproveProposal,handleFinishVoting,loading } = useContext(BlockchainContext)
    const nav = useNavigate();
    const [proposal,setProposal] = useState()
    const [isLoading,setLoading] = useState(false)

    useEffect(()=>{
        console.log(approveLoading);
        getOne()
    },[])

    const getOne = async() => {
        setLoading(true)
        try {
            const prop = await handleGetOneProposals(id);
            const format = {
                id: prop[0],
                title: prop[1],
                desc: prop[2],
                isOpen: prop[8],
                isFinished: prop[9],
                isClose: prop[10],
                proposedBy: prop[11]
            }
            setProposal(format)
            console.log(format)
            setLoading(false)
        } catch (error) {
            setLoading(false)
            console.log(error)
        }
    }

    return (
        <div className='mt-20'>
            <Navbar />
            {isLoading?<div className='flex justify-center items-center h-[70vh] flex-col'>
                <div className="loader">
                    <div className="bar1"></div>
                    <div className="bar2"></div>
                    <div className="bar3"></div>
                    <div className="bar4"></div>
                    <div className="bar5"></div>
                    <div className="bar6"></div>
                    <div className="bar7"></div>
                    <div className="bar8"></div>
                    <div className="bar9"></div>
                    <div className="bar10"></div>
                    <div className="bar11"></div>
                    <div className="bar12"></div>
                </div>
                <h1 className='font-semibold'>Loading ...</h1>
            </div>:
            <div className='p-10'>
                <h1 className='font-bold text-xl'>Approve Proposal</h1>
                <p className='font-semibold mt-5 flex items-center'>Proposal State - {!proposal?.isOpen ? <div className='ml-2 mr-2 w-2 h-2 rounded-full bg-red-600'></div> : <div className='ml-2 mr-2 w-2 h-2 rounded-full bg-green-600'></div>} {proposal?.isOpen ? "Open" : proposal?.isClose ? "Rejected" : "Closed"}</p>
                <p>Note: If the proposal is disapproved it cannot be reapproved</p>
                {proposal?.isFinished === true && <p className='text-2xl mt-2 font-bold'>Proposal Has been Over</p>}
                <div className='bg-gray-100 mt-10 p-6 rounded-md'>
                    <h1 className='text-2xl font-semibold'>{proposal?.title}</h1>
                    <p className='mt-2 font-semibold'>{proposal?.desc}</p>
                    <div className="mt-6 radio-buttons">
                        <label className="radio-button">
                            <input type="radio" name="option" value="option1" />
                            <div className="radio-circle"></div>
                            <span className="radio-label">Yes</span>
                        </label>
                        <label className="radio-button">
                            <input type="radio" name="option" value="option2" />
                            <div className="radio-circle"></div>
                            <span className="radio-label">No</span>
                        </label>
                        <label className="radio-button">
                            <input type="radio" name="option" value="option3" />
                            <div className="radio-circle"></div>
                            <span className="radio-label">Abstain</span>
                        </label>
                    </div>
                    <div className='mt-3 flex justify-end items-center'>
                        {proposal?.isOpen && !proposal?.isFinished && !proposal?.isClose && <button onClick={()=>handleFinishVoting(id,nav)} disabled={approveLoading || !proposal?.isOpen} className={`mr-2 bg-red-500 text-white hover:scale-105 duration-150 transition-all ease-in-out py-3 px-7 rounded ${approveLoading || !proposal?.isOpen ? "bg-red-400 cursor-not-allowed" :""}`}>
                            {!approveLoading ? "Finish Voting":<div className="animate-spin ease-linear rounded-full w-10 h-10 border-t-2 border-b-2 border-purple-500"></div>}
                        </button>}
                        {proposal?.isOpen && !proposal?.isFinished && !proposal?.isClose && <button onClick={()=>handleCloseProposal(id,nav)} disabled={approveLoading || !proposal?.isOpen} className={`mr-2 bg-red-500 text-white hover:scale-105 duration-150 transition-all ease-in-out py-3 px-7 rounded ${approveLoading || !proposal?.isOpen ? "bg-red-400 cursor-not-allowed" :""}`}>
                            {!approveLoading ? "Close Voting":<div className="animate-spin ease-linear rounded-full w-10 h-10 border-t-2 border-b-2 border-purple-500"></div>}
                        </button>}
                        {!proposal?.isOpen && !proposal?.isFinished && !proposal?.isClose && <button onClick={()=>handleDisApproveProposal(id,nav)} disabled={approveLoading || proposal?.isClose} className={`mr-2 bg-red-500 text-white hover:scale-105 duration-150 transition-all ease-in-out py-3 px-7 rounded ${approveLoading || proposal?.isClose ? "bg-red-400 cursor-not-allowed" :""}`}>
                            {!approveLoading ? "DisApprove":<div className="animate-spin ease-linear rounded-full w-10 h-10 border-t-2 border-b-2 border-purple-500"></div>}    
                        </button>}
                        {!proposal?.isOpen && !proposal?.isFinished && !proposal?.isClose && <button onClick={()=>handleApproveProposal(id,nav)} disabled={approveLoading || proposal?.isClose || proposal?.isOpen} className={`ml-5 bg-green-500 text-white hover:scale-105 duration-150 transition-all ease-in-out py-3 px-7 rounded ${approveLoading || proposal?.isOpen ? "bg-green-400 cursor-not-allowed" :""}`}>
                            {!approveLoading ? "Approve":<div className="animate-spin ease-linear rounded-full w-10 h-10 border-t-2 border-b-2 border-purple-500"></div>}
                        </button>}
                    </div>
                </div>
            </div>}
        </div>
    )
} 

export default ApproveProposals