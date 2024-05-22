// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Token.sol";

contract GovernanceVoting {
    KiTEDAO public tokenContract; 
    struct Voter {
        address member;
        string name;
        uint256 age;
        bool boardMember;
    }

    struct Proposal {
        uint256 id;
        string name;
        string details;
        uint256 voteCountFor;
        uint256 voteCountAgainst;
        uint256 voteCountAbstain;
        uint256 startTime;
        uint256 endTime;
        bool isOpen;
        bool isFinished;
        bool isCanceled;
        address proposedBy;
    }

    address public chairperson;
    uint256 public proposalCount;
    
    mapping(address => Voter) public voters;
    mapping(uint256 => Proposal) public proposals;
    mapping(address => mapping(uint256 => bool)) public hasVoted;
    address[] public voterAddresses;

    constructor(address _tokenAddress) {
        chairperson = msg.sender;
        tokenContract = KiTEDAO(_tokenAddress);
        voters[msg.sender].member = msg.sender;
        voters[msg.sender].name = "Chair person"; 
        voters[msg.sender].age = 20;
        voters[msg.sender].boardMember = true;
    }

    modifier onlyChairperson() {
        require(msg.sender == chairperson, "Only chairperson can perform this action");
        _;
    }

    modifier onlyBoardMembers(){
        require(voters[msg.sender].boardMember,"Only board members can perform this action");
        _;
    }

    function addProposal(string memory name, string memory details, uint256 startTime, uint256 endTime) public {
        proposals[proposalCount] = Proposal({
            id: proposalCount,
            name: name,
            details: details,
            voteCountFor: 0,
            voteCountAgainst: 0,
            voteCountAbstain: 0,
            startTime: startTime,
            endTime: endTime,
            isOpen: false,
            isFinished: false,
            isCanceled: false,
            proposedBy: msg.sender
        });
        proposalCount++;
    }

    function addVoter(address voter, string memory _name, uint256 _age, bool _isBoardMember) public onlyBoardMembers {
        voters[voter] = Voter({
            member: voter,
            name: _name,
            age: _age,
            boardMember: _isBoardMember
        });
        voterAddresses.push(voter);
    }

    function cancelProposal(uint256 proposalId) public {
        proposals[proposalId].isCanceled = true;
    }

    function closeVoting(uint256 proposalId) public onlyBoardMembers {
        proposals[proposalId].isOpen = false;
    }

    function finishVoting(uint256 _id) public onlyBoardMembers {
        proposals[_id].isFinished = true;
    }

    function openVoting(uint256 proposalId) public onlyBoardMembers {
        proposals[proposalId].isOpen = true;
    }

    function vote(uint256 proposalId, uint256 voteOption) public {
        require(!hasVoted[msg.sender][proposalId], "Already voted");
        require(proposals[proposalId].isOpen, "Voting is not open");

        hasVoted[msg.sender][proposalId] = true;

        if (voteOption == 0) {
            proposals[proposalId].voteCountFor++;
        } else if (voteOption == 1) {
            proposals[proposalId].voteCountAgainst++;
        } else if (voteOption == 2) {
            proposals[proposalId].voteCountAbstain++;
        }
    }

    function balance() public view {
       
    }

    function getAllMembers() public view returns (Voter[] memory) {
        Voter[] memory members = new Voter[](voterAddresses.length);
        for (uint256 i = 0; i < voterAddresses.length; i++) {
            members[i] = voters[voterAddresses[i]];
        }
        return members;
    }

    function getAllOpenProposals() public view returns (Proposal[] memory) {
        uint256 count = 0;
        for (uint256 i = 0; i < proposalCount; i++) {
            if (proposals[i].isOpen) {
                count++;
            }
        }

        Proposal[] memory openProposals = new Proposal[](count);
        uint256 index = 0;
        for (uint256 i = 0; i < proposalCount; i++) {
            if (proposals[i].isOpen) {
                openProposals[index] = proposals[i];
                index++;
            }
        }
        return openProposals;
    }

    function getAllProposals() public view returns (Proposal[] memory) {
        Proposal[] memory allProposals = new Proposal[](proposalCount);
        for (uint256 i = 0; i < proposalCount; i++) {
            allProposals[i] = proposals[i];
        }
        return allProposals;
    }

    function getHasVoted(address _user, uint256 _proposalid) public view returns (bool) {
        return hasVoted[_user][_proposalid];
    }
    
    function getOneProposal(uint256 _id) public view returns (Proposal memory) {
        return proposals[_id];
    }

    function getProposalsByUser(address user) public view returns (Proposal[] memory) {
        uint256 count = 0;
        for (uint256 i = 0; i < proposalCount; i++) {
            if (proposals[i].proposedBy == user) {
                count++;
            }
        }

        Proposal[] memory userProposals = new Proposal[](count);
        uint256 index = 0;
        for (uint256 i = 0; i < proposalCount; i++) {
            if (proposals[i].proposedBy == user) {
                userProposals[index] = proposals[i];
                index++;
            }
        }
        return userProposals;
    }

    function hasVotingEnded(uint256 _id) public view returns (bool res) {
        return proposals[_id].endTime <= block.timestamp;
    }

    function isBoardMembers(address _member) public view returns (bool) {
        return voters[_member].boardMember;
    }

    function isChairMan(address _address) public view returns (bool) {
        return _address == chairperson;
    }

    function isMember(address _member) public view returns(bool){
        return tokenContract.balanceOf(_member) > 0;
    }

    function winningOption(uint256 proposalId) public view returns (uint256 wo) {
        Proposal memory proposal = proposals[proposalId];
        if (proposal.voteCountFor > proposal.voteCountAgainst && proposal.voteCountFor > proposal.voteCountAbstain) {
            return 1; // For
        } else if (proposal.voteCountAgainst > proposal.voteCountFor && proposal.voteCountAgainst > proposal.voteCountAbstain) {
            return 2; // Against
        } else if (proposal.voteCountAbstain > proposal.voteCountFor && proposal.voteCountAbstain > proposal.voteCountAgainst) {
            return 3; // Abstain
        }else if(proposal.voteCountFor == proposal.voteCountAgainst || proposal.voteCountFor == proposal.voteCountAbstain || proposal.voteCountAgainst == proposal.voteCountFor || proposal.voteCountAgainst == proposal.voteCountAbstain || proposal.voteCountAbstain == proposal.voteCountFor || proposal.voteCountAbstain == proposal.voteCountAgainst) {
            return 0;
        }
    }
}