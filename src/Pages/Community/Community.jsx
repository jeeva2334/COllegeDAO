import React, { useContext, useState } from 'react';
import Navbar from '../../Components/Navbar/Navbar';
import { BlockchainContext } from '../../context/BlockchainContext';

function Community() {
    const { allMembers,loading } = useContext(BlockchainContext)
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5); // Default items per page

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = allMembers?.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = pageNumber => setCurrentPage(pageNumber);

    const handleChangeItemsPerPage = (e) => {
        setItemsPerPage(parseInt(e.target.value));
        setCurrentPage(1); // Reset to the first page when changing items per page
    };

    return (
        <div className='mt-20'>
            <Navbar />
            <h1 className='text-center mt-10 mb-6 font-semibold text-2xl'>Community</h1>
            <div className='w-full flex justify-center items-center'>
                {loading?<div className='flex justify-center items-center h-[70vh] flex-col'>
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
                <div className="relative overflow-x-auto md:w-[70%] w-[90%] mt-10">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs rounded-t-lg text-white bg-[#2E3093]">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Member Name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Age
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Wallet Address
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems?.length > 0 ?currentItems.map((item, index) => (
                                <tr key={index} className={`${index % 2 === 0 ? "bg-gray-100" :"bg-white"} border-b text-black`}>
                                    <th scope="row" className="px-6 py-4 font-medium text-black">
                                        {item.name}
                                    </th>
                                    <td className="px-6 py-4">
                                        {item.age}
                                    </td>
                                    <td className="px-6 py-4">
                                        {item.address}
                                    </td>
                                </tr>
                            )):<tr className="bg-gray-100 border-b text-center p-2 text-black">
                                    <td colSpan={"4"}>No members</td>
                                </tr>}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colSpan="4" className="px-4 py-2">
                                    <div className="flex justify-between items-center">
                                        <div className=''>
                                            <button 
                                                onClick={() => paginate(currentPage - 1)} 
                                                disabled={currentPage === 1} 
                                                className="mr-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg"
                                            >
                                                Previous
                                            </button>
                                            <button 
                                                onClick={() => paginate(currentPage + 1)} 
                                                disabled={indexOfLastItem >= allMembers.length} 
                                                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg"
                                            >
                                                Next
                                            </button>
                                        </div>
                                        <div>
                                            <label htmlFor="itemsPerPage" className="mr-2">Items per page:</label>
                                            <select 
                                                id="itemsPerPage" 
                                                value={itemsPerPage} 
                                                onChange={handleChangeItemsPerPage} 
                                                className="px-2 py-1 bg-gray-200 text-gray-700 rounded-md"
                                            >
                                                <option value="5">5</option>
                                                <option value="10">10</option>
                                                <option value="15">15</option>
                                                <option value="25">25</option>
                                                <option value="50">50</option>
                                            </select>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </div>}
            </div>
            <div className="flex justify-center mt-4">
                
            </div>
        </div>
    );
}

export default Community;
