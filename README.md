# vares

<p align="center">
  <img src="https://img.shields.io/badge/Platform-Web3-blueviolet?style=for-the-badge&logo=web3.js" alt="Platform: Web3" />
  <img src="https://img.shields.io/badge/AI%20Infrastructure-remade.ai-00FFCC?style=for-the-badge" alt="Infrastructure: remade.ai" />
  <img src="https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge" alt="License: MIT" />
  <img src="https://img.shields.io/badge/Build-Passing-brightgreen?style=for-the-badge" alt="Build Status" />
</p>

---

## Welcome to vares 🎨✨

**vares** is a beautiful, decentralized, full-stack ecosystem designed to turn raw imagination into immutable, on-chain digital assets. We bridge the gap between cutting-edge generative AI models and blockchain tech, allowing anyone to generate high-fidelity digital art and instantly mint it as an ERC-721 token (NFT) in seconds.

Built using optimized **christosantono** design patterns and powered by the robust **remade.ai** infrastructure, vares strips away the typical friction of decentralized apps. No corporate web2 accounts, no tedious setup—just pure web3-native creativity.

---

## Key Features

* 🔌 **Frictionless Web3 Modal Access:** No traditional usernames, passwords, or corporate social logins. Authenticate instantly using a sleek Web3 modal framework with your existing Ethereum wallet.
* 🧠 **Engineered by remade.ai:** Leverages enterprise-grade tech from the `remade.ai` stack to orchestrate complex AI pipelines and handle heavy generation streams smoothly under the hood.
* 📦 **Decentralized from Birth:** Your art belongs entirely to you. vares automates the multi-step pipeline of metadata formatting, pinning your media assets to IPFS, and executing the smart contract transaction.

---

## Architecture Overview

Here it is. Zero chat intro, zero chat outro—just the raw, valid Markdown inside a single copy-paste block ready for your repository.

Markdown
# vares

<p align="center">
  <img src="https://img.shields.io/badge/Platform-Web3-blueviolet?style=for-the-badge&logo=web3.js" alt="Platform: Web3" />
  <img src="https://img.shields.io/badge/AI%20Infrastructure-remade.ai-00FFCC?style=for-the-badge" alt="Infrastructure: remade.ai" />
  <img src="https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge" alt="License: MIT" />
  <img src="https://img.shields.io/badge/Build-Passing-brightgreen?style=for-the-badge" alt="Build Status" />
</p>

---

## Welcome to vares 🎨✨

**vares** is a beautiful, decentralized, full-stack ecosystem designed to turn raw imagination into immutable, on-chain digital assets. We bridge the gap between cutting-edge generative AI models and blockchain tech, allowing anyone to generate high-fidelity digital art and instantly mint it as an ERC-721 token (NFT) in seconds.

Built using optimized **christosantono** design patterns and powered by the robust **remade.ai** infrastructure, vares strips away the typical friction of decentralized apps. No corporate web2 accounts, no tedious setup—just pure web3-native creativity.

---

## Key Features

* 🔌 **Frictionless Web3 Modal Access:** No traditional usernames, passwords, or corporate social logins. Authenticate instantly using a sleek Web3 modal framework with your existing Ethereum wallet.
* 🧠 **Engineered by remade.ai:** Leverages enterprise-grade tech from the `remade.ai` stack to orchestrate complex AI pipelines and handle heavy generation streams smoothly under the hood.
* 📦 **Decentralized from Birth:** Your art belongs entirely to you. vares automates the multi-step pipeline of metadata formatting, pinning your media assets to IPFS, and executing the smart contract transaction.

---

## Architecture Overview

The stack uses a highly decoupled architecture optimized for low latency and pure decentralization:

| Component | Technology | Responsibility |
| :--- | :--- | :--- |
| **Frontend Client** | React.js, Ethers.js, Web3 Modal | Handles dynamic prompt engineering, generation layouts, wallet states, and EVM contract execution. |
| **Backend Gateway** | Node.js, Express.js | Implements `christosantono` modules via `remade.ai` to securely process AI generation loops and stream assets. |
| **Decentralized Storage** | IPFS (Pinata SDK) | Guarantees permanent, tamper-proof hosting for raw images and ERC-721 JSON metadata. |
| **Smart Contract Layer** | Solidity (`^0.8.0`), Hardhat | Pure ERC-721 ledger handling unique token URIs, on-chain provenance, and minting. |

---

## Prerequisites

Before kicking off your local setup, ensure you have the following environments configured globally:

* **Node.js:** `v16.x` or higher
* **Package Manager:** `npm v8.x+` or `yarn v1.22.x+`
* **Web3 Wallet:** MetaMask extension or any WalletConnect compatible wallet
* **Local Testnet:** Hardhat Network or Anvil (for local EVM orchestration)

---

## Installation & Configuration

### 1. Repository Setup
Clone the code base and step inside the root folder:
```bash
git clone [https://github.com/christosantono/vares.git](https://github.com/christosantono/vares.git)
cd vares

2. Backend Environment & Dependencies
The backend handles the core pipelines out to the remade.ai infrastructure. Move into the server directory, fetch your dependencies, and configure your secrets.

Bash
cd server
npm install
Create a .env file at the root of the server/ directory:

Bash
touch .env
Populate .env with your operational credentials:

Code snippet
PORT=5000
OPENAI_API_KEY=your_openai_api_key_here
PINATA_API_KEY=your_pinata_api_key_here
PINATA_SECRET_API_KEY=your_pinata_secret_here
Launch the gateway server in development mode:

Bash
npm run dev
🛰️ Backend Live: The server will successfully bind to http://localhost:5000.

3. Smart Contract Deployment
Before booting the interface, deploy your contract locally to get its live address and ABI definition.

In a new terminal split, start a local Hardhat node:

Bash
npx hardhat node
Deploy the contract script to your running testnet:

Bash
npx hardhat run scripts/deploy.js --network localhost
💡 Developer Note: Copy the generated Contract Address and locate your compiled JSON ABI file inside the newly generated artifacts/ folder.

4. Frontend Setup
Navigate to the client app directory, install your package dependencies, and link your contract configurations.

Bash
cd ../client
npm install
Open up src/config/contractDetails.js and link your contract settings:

JavaScript
export const CONTRACT_ADDRESS = "0xYourDeployedContractAddressHere";

export const CONTRACT_ABI = [
  // Paste your compiled JSON ABI array here
];

export const BACKEND_URL = "http://localhost:5000";
Fire up your local React web server:

Bash
npm start
Interface Live: Your browser will automatically launch the canvas framework at http://localhost:3000.
