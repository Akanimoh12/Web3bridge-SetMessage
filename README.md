# Smart Contract Messenger

A simple React application that interacts with an Ethereum smart contract to set and retrieve messages stored on the blockchain. The app uses `ethers.js` for blockchain interaction, Tailwind CSS for a modern and sleek UI, and supports dark/light theme toggling.

## Features
- **Set Message**: Allows users to input and store a message on the blockchain via a smart contract.
- **Get Message**: Retrieves and displays the current message stored in the smart contract.
- **Modern UI**: Styled with Tailwind CSS, featuring a responsive card layout, gradient buttons, and theme toggle.
- **MetaMask Integration**: Connects to MetaMask for blockchain transactions.

## Prerequisites
- [Node.js](https://nodejs.org/) (LTS version recommended)
- [MetaMask](https://metamask.io/) browser extension
- A deployed smart contract (e.g., on Sepolia testnet) with the provided ABI
- Testnet ETH on Lisk (e.g., from [Sepolia Faucet](https://sepolia-faucet.com/))

## Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/Akanimoh12/Web3bridge-SetMessage.git
   cd Web3bridge-SetMessage