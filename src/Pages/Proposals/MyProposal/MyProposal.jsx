import React, { useContext } from 'react'
import Navbar from '../../../Components/Navbar/Navbar'
import { BlockchainContext } from '../../../context/BlockchainContext'
import NoProposalCard from '../../../Components/NoProposalCard/NoProposalCard'
import ProposalCards from '../../../Components/ProposalCards/ProposalCards'
import { Link } from 'react-router-dom'

function MyProposal() {
    const { myProposal } = useContext(BlockchainContext)
    return (
        <div className='mt-20'>
            <Navbar />
            <div className='p-10'>
                <div className='flex items-center'>
                    <Link className='mr-5 text-blue-400 font-semibold' to="/proposals">Go Back</Link>
                    <h1 className='font-bold text-2xl'>My Proposals</h1>
                </div>
                {
                    myProposal.length > 0 ?
                    <div className='mt-10'>
                        <div className='mt-8 px-4 grid md:grid-cols-2 grid-cols-1 gap-7'>
                            {myProposal?.map((e,index)=>(
                                <ProposalCards e={e} link="/view" key={index} />
                            ))}
                        </div>
                    </div>
                    :<NoProposalCard />
                }
            </div>
        </div>
    )
}

export default MyProposal