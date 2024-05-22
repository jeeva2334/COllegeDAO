import React, { useContext, useEffect } from 'react'
import Navbar from '../../../Components/Navbar/Navbar'
import { BlockchainContext } from '../../../context/BlockchainContext'
import ProposalCards from '../../../Components/ProposalCards/ProposalCards'
import NoProposalCard from '../../../Components/NoProposalCard/NoProposalCard'

function AllProposals() {
    const { allPropsals } = useContext(BlockchainContext)
    return (
        <div className='mt-20'>
            <Navbar />
            <div className='p-8'>
                <h1 className='font-bold text-2xl'>All Proposals</h1>
                <p className='text-gray-500 text-sm'>View & appropve / close an proposal</p>
                <div className='mt-8 px-4 grid md:grid-cols-2 grid-cols-1 gap-7'>
                    {allPropsals?.length > 0 ? allPropsals?.map((e)=>(
                        <ProposalCards e={e} key={e?.id} link={"/proposals/approve"} />
                    )):<NoProposalCard />}
                </div>
            </div>
        </div>
    )
}

export default AllProposals