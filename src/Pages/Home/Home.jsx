import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../Components/Navbar/Navbar';
import { BlockchainContext } from '../../context/BlockchainContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenSquare, faShieldAlt, faUserGraduate } from '@fortawesome/free-solid-svg-icons';
import { MetaMaskAvatar } from 'react-metamask-avatar';

const Home = () => {
  const { connectWallet,showAddress,address } = useContext(BlockchainContext)
    return (
        <>
            <Navbar />
            <div className="bg-gray-100 flex flex-col z-40">
                {/* Hero Section */}
                <section className="flex md:flex-row flex-col h-[80vh] md:items-center items-start justify-center bg-cover p-4">
                    <div className='md:w-1/2 w-full md:p-14'>
                        <h1 className='font-bold text-5xl'>Shape the Future with CollegeDAO</h1>
                        <p className='text-lg mt-5'>Join the Pioneers of Decentralized Governance and Innovation in Higher Education</p>
                        {showAddress ?<button className='px-6 py-3 font-semibold rounded-lg hover:scale-105 transition-all ease-in-out duration-300 bg-[#2E3093] text-white flex items-center'><MetaMaskAvatar address={address}  /> <span className='ml-2'>{showAddress}</span></button>:<button onClick={connectWallet} className='px-6 py-3 font-semibold rounded-lg hover:scale-105 transition-all ease-in-out duration-300 bg-[#2E3093] text-white'>Connect Wallet</button>}
                    </div>
                    <div className='w-1/2 hidden md:block'>
                        <img src='group.png' />
                    </div>
                </section>

                {/* About Section */}
                <section className="bg-white py-16 px-4" id="about">
                    <div className="max-w-7xl mx-auto">
                        <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">About CollegeDAO</h2>
                        <div className="grid md:grid-cols-2 gap-12">
                        <div className="space-y-6">
                            <p className="text-gray-600 text-lg leading-relaxed">
                                Welcome to CollegeDAO, a groundbreaking platform where students take the helm in shaping the future of their college. By leveraging blockchain technology, we provide a transparent and democratic environment where every student has a voice.
                            </p>
                            <p className="text-gray-600 text-lg leading-relaxed">
                                At CollegeDAO, students can actively participate in the decision-making processes of the college. Through our decentralized governance model, you can propose new ideas, vote on key issues, and collaborate with peers to drive meaningful change.
                            </p>
                            <p className="text-gray-600 text-lg leading-relaxed">
                                Our mission is to foster a vibrant and inclusive academic community where innovation and collaboration thrive. Whether it's introducing new programs, enhancing campus facilities, or organizing events, CollegeDAO empowers you to make a difference.
                            </p>
                            <p className="text-gray-600 text-lg leading-relaxed">
                                Join us in pioneering a new era of student-led governance. Together, we can create a more responsive, innovative, and dynamic educational environment.
                            </p>
                        </div>
                        <div className="flex items-center justify-center">
                            <img src="group2.png" alt="About CollegeDAO" className="rounded-lg"/>
                        </div>
                        </div>
                    </div>
                </section>

                {/* Features Section */}

                <section className="py-16 bg-gray-100">
                    <div className="max-w-7xl mx-auto px-4">
                        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Key Features</h2>
                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="flex flex-col items-center">
                                <FontAwesomeIcon icon={faUserGraduate} className='text-4xl text-[#2E3093] mb-4' />
                                <h3 className="text-xl font-semibold mb-2 text-gray-800">Student Involvement</h3>
                                <p className="text-gray-600 text-center">Empower students to actively participate in college decisions and governance.</p>
                            </div>
                            <div className="flex flex-col items-center">
                                <FontAwesomeIcon icon={faPenSquare} className='text-4xl text-[#2E3093] mb-4' />
                                <h3 className="text-xl font-semibold mb-2 text-gray-800">Proposal Submission</h3>
                                <p className="text-gray-600 text-center">Enable students to submit proposals and vote on initiatives to improve the college experience.</p>
                            </div>
                            <div className="flex flex-col items-center">
                                <FontAwesomeIcon icon={faShieldAlt} className='text-4xl text-[#2E3093] mb-4' />
                                <h3 className="text-xl font-semibold mb-2 text-gray-800">Blockchain Security</h3>
                                <p className="text-gray-600 text-center">Ensure the security and transparency of all transactions and decision-making processes through blockchain technology.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="bg-[#2E3093] text-white py-8">
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="grid md:grid-cols-2 gap-8">
                            {/* CollegeDAO Info */}
                            <div>
                                <img className='mb-5 w-28' src='kitelogo.png' />
                                <p className="text-gray-300 w-1/2">Empowering students to shape the future of their college through decentralized governance and transparent decision-making.</p>
                            </div>
                            {/* Links */}
                            <div>
                                <h4 className="text-xl font-bold mb-4">Quick Links</h4>
                                <ul>
                                    <li className="mb-2">
                                        <Link to="/proposals" className="hover:text-gray-300 transition duration-300">Proposals</Link>
                                    </li>
                                    <li className="mb-2">
                                        <Link to="/community" className="hover:text-gray-300 transition duration-300">Community</Link>
                                    </li>
                                </ul>
                            </div>
                            
                        </div>
                        <div className="text-center mt-8">
                            <p>&copy; 2024 CollegeDAO. All rights reserved.</p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
};

export default Home;