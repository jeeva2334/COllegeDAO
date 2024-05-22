import React, { useContext, useEffect, useState } from 'react';
import Navbar from '../../../Components/Navbar/Navbar';
import { useNavigate, useParams } from 'react-router-dom';
import { BlockchainContext } from '../../../context/BlockchainContext';

function VoteProposal() {
    const { id } = useParams();
    const { isVoting,handleGetOneProposals,handleGetAlreadyVoted,handleVote,handleIsVotingClosed,handleGetWinning } = useContext(BlockchainContext);
    const nav = useNavigate()
    const [proposal, setProposal] = useState();
    const [progress,setProgress] = useState({
        yes: 0,
        no: 0,
        abstain: 0,
        total: 0
    })
    const [selected, setSelected] = useState("");
    const [hasVoted,setHasVoted] = useState();
    const [loading,setLoading] = useState(false);
    const [winning,setWinning] = useState(0)
    const [isClosed,setIsClosed] = useState(false);

    useEffect(() => {
        handleIsVotingClosed(id).then((res)=>{
            console.log(res)
            setIsClosed(res)
            if(res === true){
                handleGetWinning(id).then((res)=>{
                    const opt = Number(res)
                    console.log(opt)
                    if(opt === 0){
                        setWinning(0)
                    }else if(opt === 1){
                        setWinning("Yes")
                    }else if(opt === 2){
                        setWinning("No")
                    }else if(opt === 3){
                        setWinning("Abstain")
                    }
                })
            }
        })
        handleGetAlreadyVoted(id).then((res)=>setHasVoted(res))
        getOne();
    }, []);

    const getOne = async () => {
        setLoading(true)
        const prop = await handleGetOneProposals(id);
        const format = {
            id: prop[0],
            title: prop[1],
            desc: prop[2],
            yes: Number(prop[3]),
            no: Number(prop[4]),
            abstain: Number(prop[5]),
            isOpen: prop[8],
            isFinished: prop[9],
            isClose: prop[10],
            proposedBy: prop[11]
        };
        const totalVotes = Number(prop[3]) + Number(prop[4]) + Number(prop[5])
        console.log(totalVotes)
        const yes = ( Number(prop[3]) / totalVotes ) * 100;
        const no = ( Number(prop[4]) / totalVotes ) * 100;
        const abstain = ( Number(prop[5]) / totalVotes ) * 100;
        setProgress({
            yes: yes,
            no: no,
            abstain: abstain,
            total: totalVotes
        })
        setProposal(format);
        console.log(format);
        setLoading(false)
    };

    const handleRadioChange = (e) => {
        const selectedValue = e.target.value;
        setSelected(selectedValue);
    };

    return (
        <div className='mt-16'>
            <Navbar />
            <div className='p-10'>
                <h1 className='font-bold text-xl'>Vote Proposal</h1>
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
                </div>:proposal?.isFinished === false?
                <div className='bg-gray-100 mt-10 p-6 rounded-md'>
                    <h1 className='text-2xl font-semibold'>{proposal?.title}</h1>
                    <p className='mt-2 font-semibold'>{proposal?.desc}</p>
                    {!hasVoted?<>
                        <div className="mt-6 radio-buttons">
                            <label className="radio-button">
                                <input type="radio" name="option" value="0" checked={selected === '0'} onChange={handleRadioChange} />
                                <div className="radio-circle"></div>
                                <span className="radio-label">Yes</span>
                            </label>
                            <label className="radio-button">
                                <input type="radio" name="option" value="1" checked={selected === '1'} onChange={handleRadioChange} />
                                <div className="radio-circle"></div>
                                <span className="radio-label">No</span>
                            </label>
                            <label className="radio-button">
                                <input type="radio" name="option" value="2" checked={selected === '2'} onChange={handleRadioChange} />
                                <div className="radio-circle"></div>
                                <span className="radio-label">Abstain</span>
                            </label>
                        </div>
                        <div className='mt-3 flex justify-end items-center'>
                            <button onClick={()=>handleVote(id,selected,nav)} disabled={hasVoted || isVoting} className={`px-7 text-white mt-3 py-2 font-semibold rounded-lg hover:scale-105 transition-all ease-in-out duration-300 ${hasVoted || isVoting ?"cursor-not-allowed":"cursor-pointer"} bg-black`}>{hasVoted?"Already Voted":"Vote"}</button>
                        </div>
                    </>:
                    <div className='mt-10'>
                        <div className='mt-7 font-bold mb-4 flex justify-between items-center w-full'>
                            <h1>Yes</h1>
                            <p>{proposal?.yes}</p>
                        </div>
                        <div className="w-full rounded-full h-2.5 mb-4 bg-gray-400">
                            <div style={{
                                width: `${progress.yes}%`
                            }} 
                            className={`bg-black h-2.5 rounded-full`}></div>
                        </div>
                        <div className='mt-7 font-bold mb-4 flex justify-between items-center w-full'>
                            <h1>No</h1>
                            <p>{proposal?.no}</p>
                        </div>
                        <div className="w-full rounded-full h-2.5 mb-4 bg-gray-400">
                            <div style={{
                                width: `${progress.no}%`
                            }} 
                            className={`bg-black h-2.5 rounded-full`}></div>
                        </div>
                        <div className='mt-7 font-bold mb-4 flex justify-between items-center w-full'>
                            <h1>Abstain</h1>
                            <p>{proposal?.abstain}</p>
                        </div>
                        <div className="w-full rounded-full h-2.5 mb-4 bg-gray-400">
                            <div style={{
                                width: `${progress.abstain}%`
                            }} 
                            className={`bg-black h-2.5 rounded-full`}></div>
                        </div>
                        <div className='mt-3 flex justify-end items-center'>
                            <button disabled={hasVoted || isVoting} className={`px-7 text-white mt-3 py-2 font-semibold rounded-lg hover:scale-105 transition-all ease-in-out duration-300 ${hasVoted || isVoting ?"cursor-not-allowed":"cursor-pointer"} bg-black`}>
                                {hasVoted?"Already Voted":hasVoted || isVoting?<div className="animate-spin ease-linear rounded-full w-10 h-10 border-t-2 border-b-2 border-purple-500"></div>:"Vote"}
                            </button>
                        </div>
                    </div>
                    }
                </div>: 
                <div className='bg-gray-100 mt-10 p-6 rounded-md'>
                    <h1 className='mb-6 font-semibold text-2xl'>The Voting has been Ended</h1>
                    <h1 className='text-2xl font-semibold'>{proposal?.title}</h1>
                    <p className='mt-2 font-semibold'>{proposal?.desc}</p>
                    <div>
                        <h1 className='mt-4 font-bold'>{winning === 0 ?"The Voting is Draw":`The option Won was ${winning}`}</h1>
                    </div>
                    <div className='mt-10'>
                        <div className='mt-7 font-bold mb-4 flex justify-between items-center w-full'>
                            <h1>Yes</h1>
                            <p>{proposal?.yes}</p>
                        </div>
                        <div className="w-full rounded-full h-2.5 mb-4 bg-gray-400">
                            <div style={{
                                width: `${progress.yes}%`
                            }} 
                            className={`bg-black h-2.5 rounded-full`}></div>
                        </div>
                        <div className='mt-7 font-bold mb-4 flex justify-between items-center w-full'>
                            <h1>No</h1>
                            <p>{proposal?.no}</p>
                        </div>
                        <div className="w-full rounded-full h-2.5 mb-4 bg-gray-400">
                            <div style={{
                                width: `${progress.no}%`
                            }} 
                            className={`bg-black h-2.5 rounded-full`}></div>
                        </div>
                        <div className='mt-7 font-bold mb-4 flex justify-between items-center w-full'>
                            <h1>Abstain</h1>
                            <p>{proposal?.abstain}</p>
                        </div>
                        <div className="w-full rounded-full h-2.5 mb-4 bg-gray-400">
                            <div style={{
                                width: `${progress.abstain}%`
                            }} 
                            className={`bg-black h-2.5 rounded-full`}></div>
                        </div>
                    </div>
                </div>
                }
            </div>
        </div>
    );
}

export default VoteProposal;