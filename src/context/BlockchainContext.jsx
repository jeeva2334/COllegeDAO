import React, { createContext, useState, useContext, useEffect } from 'react';
import { ethers } from "ethers";
import { DAOAddress, KiTEToken } from '../configs/address';
import { DAOAbi, TokenAbi } from '../configs/abi';
import { useNavigate } from 'react-router-dom';
import { Bounce, toast } from 'react-toastify';

export const BlockchainContext = createContext();

function BlockchainProvider({ children }) {
    const nav = useNavigate()
    const [hello, setHello] = useState("hello");
    const [loading,setLoading] = useState(false)
    const [allMembers,setAllMember] = useState([])
    const [address,setAddress] = useState("")
    const [showAddress,setShowAddress] = useState("")
    const [isMember,setIsMember] = useState()
    const [isChairMan,setIsChairMan] = useState()
    const [allPropsals,setAllProposals] = useState([])
    const [approveLoading,setApproveLoading] = useState(false)
    const [openProposal,setOpenProposal] = useState([])
    const [isVoting,setIsVoting] = useState(false)
    const [myProposal,setMyProposal] = useState([])

    useEffect(()=>{
        connectWallet()
        getAllProposal()
        getAllMembers() 
        handleGetOpenProposal()
    },[])
    
    const connectWallet = async() =>{
        const allAddress = await window.ethereum.request({ method: "eth_requestAccounts" }) 
        console.log(allAddress[0])
        setAddress(allAddress[0])
        handleIsMember(allAddress[0])
        HandleIsChairPerson(allAddress[0])
        handleGetMyProposals(allAddress[0])
        handleGetOpenProposal()
    }

    const disconnectWallet = async() => {
        await window.ethereum.request({
            method: "wallet_requestPermissions",
            params: [
              {
                eth_accounts: {}
              }
            ]
        });
        setAddress("")
        setShowAddress("")
    }
    
    const handleIsMember = async(add) => {
        console.log("Is member")
        const provider = new ethers.BrowserProvider(window.ethereum)
        // const img = await provider.getAvatar()
        // console.log("Image ",img)
        const contract = new ethers.Contract(DAOAddress,DAOAbi,provider)
        const IsMem = await contract.isMember(add)
        console.log("got member")
        console.log(IsMem)
        setIsMember(IsMem)
        if(!IsMem){
            nav("/not-a-member")
        }else{
            var start = add.substring(0, 3);
            var end = add.substring(add.length - 2);
            console.log(start+ "..." +end)
            setShowAddress(start + "..." + end)
            console.log("yes")
        }
        return IsMem
    }

    const HandleIsChairPerson = async(add) => {
        try {
            const provider = new ethers.BrowserProvider(window.ethereum)
            // const img = await provider.getAvatar()
            // console.log("Image ",img)
            const contract = new ethers.Contract(DAOAddress,DAOAbi,provider)
            const IsChair = await contract.isBoardMembers(add)
            console.log(IsChair)
            setIsChairMan(IsChair)
        } catch (error) {
            console.error(error)
        }
    }

    const handleAddMember = async(form,s,l) => {
        try {
            if( form.name === "" || form.age === 0 || form.address === "" ){
                toast.error("All feilds are required",{
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                })
                return
            }
            l(true)
            const provider = new ethers.BrowserProvider(window.ethereum)
            const signer = await provider.getSigner()
            const contract = new ethers.Contract(DAOAddress,DAOAbi,signer)
            await contract.addVoter(form.address,form.name,Number(form.age),Boolean(form.isBoard))
            toast.success("Member Added Succesfully!",{
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            })
            s(1)
            l(false)
        } catch (error) {
            console.error(error)
            toast.error("Something went wrong!",{
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            })
            l(false)
        }
    }

    const handleAddToken = async(add,token,l) => {
        try {
            if( token === 0 ){
                return toast.error("Enter an amount to send",{
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                })
            }
            l(true)
            const fullToken = ethers.parseUnits(token, 18)
            console.log(fullToken)
            const provider = new ethers.BrowserProvider(window.ethereum)
            const signer = await provider.getSigner()
            const contract = new ethers.Contract(KiTEToken,TokenAbi,signer)
            await contract.transfer(add,fullToken);
            toast.success("Token Sent Succesfully!",{
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            })
            l(false)
            getAllMembers();
            nav("/community")
        } catch (error) {
            console.error(error)
            toast.error("Something went wrong!",{
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            })
            return
        }
    }

    const getAllMembers = async() => {
        setLoading(true)
        try {
            console.log("all members")
            const provider = new ethers.BrowserProvider(window.ethereum)
            const contract = new ethers.Contract(DAOAddress,DAOAbi,provider)
            const allMem = await contract.getAllMembers();
            console.log("Members: ",allMem)
            const resultArray = allMem?.map(proxy => {
                console.log(proxy[0])
                return {
                    name: proxy[1],
                    address: proxy[0],
                    age: Number(proxy[2])
                }
            });
            console.log(resultArray)
            setAllMember(resultArray)
            setLoading(false)
        } catch (error) {
            console.error(error)
            setLoading(false)
            return
        }
    }

    const handleAddProposals = async(form,start,end,nav) => {
        setLoading(true)
        try {
            if( form.title === "" || form.desc === 0 || start === "" || end === "" ){
                toast.error("All feilds are required",{
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                })
                return
            }
            if ( start === end ){
                toast.error("Proposal Cant be closed on the same day",{
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                })
                return
            }
            const provider = new ethers.BrowserProvider(window.ethereum)
            const signer = await provider.getSigner()
            const contract = new ethers.Contract(DAOAddress,DAOAbi,signer)
            await contract.addProposal(form.title,form.desc,start,end);
            getAllProposal();
            handleGetOpenProposal();
            handleGetMyProposals(address)
            nav("/proposals")
            toast.success("Added Proposal Succesfully!",{
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            })
            setLoading(false)
        } catch (error) {
            console.error(error[0].data.message)
            setLoading(false)
        }
    }

    const getAllProposal = async() => {
        setLoading(true)
        try {
            const provider = new ethers.BrowserProvider(window.ethereum)
            const contract = new ethers.Contract(DAOAddress,DAOAbi,provider)
            const allProp = await contract.getAllProposals();
            console.log(allProp)
            const resultArray = allProp.map(proxy => {
                try {
                    return {
                        id: proxy[0],
                        title: proxy[1],
                        desc: proxy[2],
                        start: proxy[6],
                        end: proxy[7],
                        isOpen: proxy[8],
                        isCLose: proxy[9],
                        owner: proxy[10]
                    }
                } catch (error) {
                    console.log(error)
                }
            }).filter(item => item !== undefined);
            console.log(resultArray)
            setAllProposals(resultArray)
            setLoading(false)
        } catch (error) {
            setLoading(false)
            console.error(error[0].data.message)
        }
    }

    const handleGetOneProposals = async(id) => {
        try {
            const provider = new ethers.BrowserProvider(window.ethereum);
            const contract = new ethers.Contract(DAOAddress,DAOAbi,provider);
            const oneProposal = await contract.getOneProposal(id);
            console.log(oneProposal);
            return oneProposal
        } catch (error) {
            console.log(error[0].data.message)
        }
    }

    const handleApproveProposal = async(id,nav) => {
        try {
            setApproveLoading(true)
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner()
            const contract = new ethers.Contract(DAOAddress,DAOAbi,signer);
            await contract.openVoting(id);
            getAllProposal();
            handleGetOpenProposal()
            setApproveLoading(false)
            nav("/proposals/all")
            toast.success("Approved Proposal Succesfully!",{
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            })
        } catch (error) {
            setApproveLoading(false)
            console.log(error)
            toast.error("Something went wrong!",{
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            })
        }
    }

    const handleDisApproveProposal = async(id,nav) => {
        try {
            setApproveLoading(true)
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner()
            const contract = new ethers.Contract(DAOAddress,DAOAbi,signer);
            await contract.cancelProposal(id);
            getAllProposal();
            setApproveLoading(false)
            nav("/proposals/all")  
            handleGetOpenProposal()
            toast.success("Proposal DisApproved Succesfully!",{
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            })
        } catch (error) {
            setApproveLoading(false)
            toast.error("Something went wrong!",{
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            })
        }
    }

    const handleCloseProposal = async(id,nav) => {
        try {
            setApproveLoading(true)
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner()
            const contract = new ethers.Contract(DAOAddress,DAOAbi,signer);
            await contract.closeVoting(id);
            getAllProposal();
            setApproveLoading(false)
            nav("/proposals/all")
            handleGetOpenProposal()
            toast.success("Proposal closed succesfully!",{
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            })
        } catch (error) {
            setApproveLoading(false)
            toast.error("Something went wrong!",{
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            })
        }
    }

    const handleGetOpenProposal = async() => {
        try {
            setLoading(true)
            const provider = new ethers.BrowserProvider(window.ethereum);
            const contract = new ethers.Contract(DAOAddress,DAOAbi,provider);
            const oneProposal = await contract.getAllOpenProposals()
            console.log("open :",oneProposal)
            const resultArray = oneProposal?.map(proxy => {
                try {
                    return {
                        id: proxy[0],
                        title: proxy[1],
                        desc: proxy[2],
                        start: proxy[6],
                        end: proxy[7],
                        isOpen: proxy[8],
                        isFinished: proxy[9],
                        isCLose: proxy[10],
                        owner: proxy[11]
                    }
                } catch (error) {
                    console.log(error)
                }
            }).filter(item => item !== undefined);
            console.log(resultArray)
            setOpenProposal(resultArray)
        } catch (error) {
            console.log(error)
            toast.error("Something went wrong!",{
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            })
        }
    }

    const handleGetAlreadyVoted = async(id) => {
        try {
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner()
            const contract = new ethers.Contract(DAOAddress,DAOAbi,signer);
            const res = await contract.getHasVoted(address,id)
            console.log(res)
            return res
        } catch (error) {
            console.log(error)
            toast.error("Something went wrong!",{
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            })
        }
    }

    const handleVote = async(id,option,nav) => {
        try {
            setIsVoting(true)
            console.log(option === NaN);
            if(option === ""){
                toast.error("Choose an option to vote!",{
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                })
                return
            }
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner()
            const contract = new ethers.Contract(DAOAddress,DAOAbi,signer);
            await contract.vote(id,Number(option));
            nav("/proposals")
            setIsVoting(false)
            toast.success("Vote Submitted Succesfully!",{
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            })
        } catch (error) {
            console.log(error)
            setIsVoting(false)
            toast.error("Something went wrong!",{
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            })
        }
    }

    const handleIsVotingClosed = async(id) => {
        try {
            const provider = new ethers.BrowserProvider(window.ethereum);
            const contract = new ethers.Contract(DAOAddress,DAOAbi,provider);
            const res = await contract.hasVotingEnded(id)
            console.log(res)
            return res
        } catch (error) {
            console.log(error)
            toast.error("Something went wrong!",{
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            })
        }
    }

    const handleFinishVoting = async(id,nav) => {
        try {
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner()
            const contract = new ethers.Contract(DAOAddress,DAOAbi,signer);
            await contract.finishVoting(id)
            toast.success("Vote Period finished Succesfully!",{
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            })
            nav("/proposals/all")
        } catch (error) {
            console.log(error)
            toast.error("Something went wrong!",{
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            })
        }
    }

    const handleGetWinning = async(id) => {
        try {
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner()
            const contract = new ethers.Contract(DAOAddress,DAOAbi,signer);
            const option = await contract.winningOption(id)
            return option
        } catch (error) {
            console.log(error)
            toast.error("Something went wrong!",{
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            })
        }
    }

    const handleGetMyProposals = async(add) => {
        try {
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner()
            const contract = new ethers.Contract(DAOAddress,DAOAbi,signer);
            const myProp = await contract.getProposalsByUser(add)
            const resultArray = myProp?.map(proxy => {
                try {
                    if (Number(proxy[0]) === 0) return;
                    return {
                        id: proxy[0],
                        title: proxy[1],
                        desc: proxy[2],
                        start: proxy[6],
                        end: proxy[7],
                        isOpen: proxy[8],
                        isCLose: proxy[9],
                        owner: proxy[10]
                    }
                } catch (error) {
                    console.log(error)
                }
            }).filter(item => item !== undefined);
            console.log(resultArray)
            setMyProposal(resultArray)
        } catch (error) {
            console.log(error)
            toast.error("Something went wrong!",{
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            })
        }
    }

    return (
        <BlockchainContext.Provider value={{ hello,connectWallet,address,handleIsMember,showAddress,disconnectWallet,isMember,isChairMan,handleAddMember,handleAddToken,allMembers,loading,handleAddProposals,getAllProposal,allPropsals,handleGetOneProposals,handleApproveProposal,approveLoading,handleDisApproveProposal,handleCloseProposal,openProposal,handleGetAlreadyVoted,handleVote,handleIsVotingClosed,isVoting,handleFinishVoting,handleGetWinning,myProposal }}>
            {children}
        </BlockchainContext.Provider>
    );
}

export default BlockchainProvider;
