# VARES: AI-Powered Web3 Image Generation Platform

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Build Status](https://img.shields.io/badge/build-passing-brightgreen.svg)]()
[![Platform: Web3](https://img.shields.io/badge/Platform-Web3-blue.svg)]()

VARES is a decentralized, full-stack application that bridges generative artificial intelligence with blockchain technology. The platform enables users to generate unique high-resolution digital imagery using state-of-the-art text-to-image AI models and seamlessly mint those creations as ERC-721 Non-Fungible Tokens (NFTs) directly onto Ethereum-compatible networks.

---

## Architecture Overview

The application utilizes a decoupled client-server architecture paired with decentralized storage and blockchain layers:

* **Frontend Client (React/Ethers.js):** Provides a responsive interface for prompt engineering, batch image viewing, wallet connection abstraction, and contract execution.
* **Backend Server (Node.js/Express):** Functions as a secure API gateway that interfaces with external generative AI model endpoints (e.g., OpenAI API), manages API keys, and streams assets back to the client.
* **Decentralized Storage (IPFS/Pinata):** Ensures immutable, persistent hosting for image binaries and corresponding JSON metadata schemas.
* **Smart Contract Layer (Solidity):** Implements the ERC-721 standard to handle ownership assignment, unique token URIs, and secure on-chain minting operations.

---

## Prerequisites

Ensure the following environments are installed and configured globally on your local machine:

* **Node.js:** v16.x or higher
* **Package Manager:** npm v8.x or higher / yarn v1.22.x
* **Web3 Wallet:** MetaMask browser extension
* **Development Network:** Hardhat or Anvil (for local EVM testing)

---

## Installation and Configuration

Follow these steps sequentially to configure the repository, establish environmental variables, and boot both application layers.

### 1. Repository Setup

Clone the repository and inspect the directory tree:

```bash
git clone [https://github.com/christosantono/vares.git](https://github.com/christosantono/vares.git)
cd vares
2. Backend Environment and Dependencies
The backend layer manages sensitive API communication. Navigate to the server root, install dependencies, and configure environment variables.

Bash
cd server
npm install
Create a .env file in the root of the server/ directory:

Bash
touch .env
Populate the .env file with your credentials:

Code snippet
PORT=5000
OPENAI_API_KEY=your_openai_api_key_here
PINATA_API_KEY=your_pinata_api_key_here
PINATA_SECRET_API_KEY=your_pinata_secret_here
Start the backend server in development mode:

Bash
npm run dev
The server will bind to http://localhost:5000.

3. Smart Contract Deployment
Before initializing the frontend, you must deploy the ERC-721 smart contract to your target network to obtain the contract address and ABI definition.

If utilizing a local testnet:

Bash
# In a new terminal window from the root repository
npx hardhat node
Deploy the contract script:

Bash
npx hardhat run scripts/deploy.js --network localhost
Copy the generated Contract Address and the compiled ABI JSON file outputted to the artifacts/ folder.

4. Frontend Environment and Dependencies
Navigate to the client application directory, install package dependencies, and link your contract deployment details.

Bash
cd ../client
npm install
Open src/config/contractDetails.js (or the equivalent module defining your Web3 configuration) and bind your local deployment values:

JavaScript
export const CONTRACT_ADDRESS = "0xYourDeployedContractAddressHere";
export const CONTRACT_ABI = [
  // Paste your compiled JSON ABI array here
];
export const BACKEND_URL = "http://localhost:5000";
Initialize the React development server:

Bash
npm start
The browser will automatically open to http://localhost:3000.

Operational Guide
Step 1: Establish Web3 Authentication
Click the Connect Wallet action button located within the interface navigation bar. The application will initiate a connection request via the injected window.ethereum provider. Approve the permissions inside the MetaMask prompt. Ensure your active wallet network matches the network hosting your deployed smart contract.

Step 2: Prompt Engineering and Generation
Input a descriptive text prompt into the primary generation field.

Adjust optional hyper-parameters (e.g., aspect ratio, resolution parameters, variations count) if exposed by the UI layout.

Submit the form. The client dispatches a POST request to the Express backend, which processes the AI generation loop and returns the resolved content URIs.

Step 3: IPFS Staging and NFT Minting
Select the generated asset variation you wish to persist on-chain.

Input asset metadata parameters (Token Name, Description tags) into the staging panel.

Click Mint Asset. The frontend executes a multi-step routine:

Uploads the raw asset binary to IPFS.

Generates a compliant ERC-721 metadata JSON schema containing the asset's IPFS CID.

Uploads the JSON metadata file to IPFS to extract the definitive tokenURI.

Invokes the contract's mint function passing the tokenURI using Ethers.js.

Sign the state-changing transaction in your MetaMask extension and wait for the block confirmation receipt.

Tech Stack Specification
Runtime Environment: Node.js

Frontend Framework: React.js, Context API

Backend Framework: Express.js

Blockchain Interoperability: Ethers.js v5/v6

Smart Contract Language: Solidity ^0.8.0

Compilation/Deployment Suite: Hardhat

Storage Architecture: InterPlanetary File System (IPFS) via Pinata SDK
