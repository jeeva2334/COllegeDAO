import React from 'react'
import { Link } from 'react-router-dom'

function ProposalCards({e,link}) {
    return (
        <>
            {console.log(e)}
            <Link to={`${link}/${e.id}`} className='bg-gray-100 shadow-md flex flex-col justify-between items-start cursor-pointer p-10 rounded-lg hover:scale-105 duration-300 transition-all'>
                {!e?.isOpen ? <div className='rounded px-2 py-1 text-sm mb-2 bg-red-400 text-red-700'>Closed</div> : e?.isFinished ? <div className='rounded px-2 py-1 text-sm mb-2 bg-red-400 text-red-700'>Finished</div> : <div className='rounded px-2 py-1 text-sm mb-2 bg-green-400 text-green-700'>Active</div>}
                <div>
                    <h1 className='font-bold text-xl'>{e?.title}</h1>
                    <p className='font-semibold text-sm mt-1 text-gray-800'>{e?.desc}</p>
                    <p className='font-semibold text-sm mt-1 text-gray-800'>Published by <span className='text-blue-800'>{e?.owner}</span></p>
                </div>
            </Link>
        </>
    )
}

export default ProposalCards