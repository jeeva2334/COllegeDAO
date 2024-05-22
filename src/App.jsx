import React from 'react';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import BlockchainProvider from './context/BlockchainContext';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home/Home';
import NotAMember from './Pages/NotAMember/NotAMember';
import Addmember from './Pages/AddMember/Addmember';
import Community from './Pages/Community/Community';
import View from './Pages/Proposals/ViewPropsals/View';
import Add from './Pages/Proposals/AddProposals/Add';
import AllProposals from './Pages/Proposals/AllProposal/AllProposals';
import ApproveProposals from './Pages/Proposals/ApproveProposals/ApproveProposals';
import VoteProposal from './Pages/Proposals/VoteProposal/VoteProposal';
import MyProposal from './Pages/Proposals/MyProposal/MyProposal';
import ViewMyProposal from './Pages/Proposals/ViewMyProposal/ViewMyProposal';
import Navbar from './Components/Navbar/Navbar';

function App() {
  return (
    <BrowserRouter>
      <BlockchainProvider>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/add-member' element={<Addmember />}/>
          <Route path='/not-a-member' element={<NotAMember />} />
          <Route path='/community' element={<Community />} />
          <Route path='/proposals' element={<View />} />
          <Route path='/proposals/add' element={<Add />} />
          <Route path='/proposals/all' element={<AllProposals />} />
          <Route path='/proposals/approve/:id' element={<ApproveProposals />} />
          <Route path='/proposals/:id' element={<VoteProposal />} />
          <Route path='/my-proposals' element={<MyProposal />} />
          <Route path='/view/:id' element={<ViewMyProposal />} />
        </Routes>
      </BlockchainProvider>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;