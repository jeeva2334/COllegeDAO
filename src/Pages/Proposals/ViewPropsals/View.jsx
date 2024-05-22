import React, { useContext } from 'react'
import Navbar from '../../../Components/Navbar/Navbar'
import { Link, useNavigate } from 'react-router-dom'
import { BlockchainContext } from '../../../context/BlockchainContext';
import ProposalCards from '../../../Components/ProposalCards/ProposalCards';
import NoProposalCard from '../../../Components/NoProposalCard/NoProposalCard';

function View() {
    const nav = useNavigate();
    const { openProposal,isChairMan } = useContext(BlockchainContext)
    return (
        <div className='mt-16'>
            <Navbar />
            <div className='p-10'>
                <div className='flex md:flex-row flex-col md:justify-between md:items-center justify-start'>
                    <div>
                        <h1 className='text-2xl font-bold'>Proposals</h1>
                        <p className='text-gray-500'>Vote for the proposals</p>
                    </div>
                    <div className='flex md:flex-row flex-col'>
                        <Link to="/my-proposals" className='px-4 text-black mt-3 py-2 font-semibold rounded-lg hover:scale-105 transition-all ease-in-out duration-300 '>Get My Proposals</Link>
                        {isChairMan && <Link to="/proposals/all" className='px-7 text-black mt-3 py-2 font-semibold rounded-lg hover:scale-105 transition-all ease-in-out duration-300 '>View All Proposals</Link>}
                        <Link to="/proposals/add" className='px-7 text-white mt-3 py-2 font-semibold rounded-lg hover:scale-105 transition-all ease-in-out duration-300 bg-black'>Add Proposals</Link>
                    </div>
                </div>
                <div className='mt-10'>
                    <div className='mt-8 px-4 grid md:grid-cols-2 grid-cols-1 gap-7'>
                    {openProposal?.length > 0?
                        openProposal?.map((e)=>(
                            <ProposalCards e={e} link="/proposals" />
                        ))
                    :<NoProposalCard />}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default View