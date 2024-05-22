import React from 'react'
import file from "../../assets/filesearch.png"

function NoProposalCard() {
    return (
        <div className='flex flex-col justify-center items-center w-[90vw]'>
            <img className='w-[40%]' src={file} alt='no proposals found' />
            <h1 className='font-bold text-2xl'>No Proposals Found</h1>
        </div>
    )
}

export default NoProposalCard