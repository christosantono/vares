# vares

<p align="center">
  <a href="https://solana.com"><img src="https://img.shields.io/badge/Network-Solana-00FFA3?style=flat-square&logo=solana&logoColor=black" alt="Solana" /></a>
  <a href="https://remade.ai"><img src="https://img.shields.io/badge/Engine-remade.ai-00FFCC?style=flat-square" alt="remade.ai Engine" /></a>
  <a href="https://github.com/christosantono/vares/blob/main/LICENSE"><img src="https://img.shields.io/badge/License-MIT-flat?style=flat-square&color=yellow" alt="License: MIT" /></a>
  <img src="https://img.shields.io/badge/Build-Passing-brightgreen?style=flat-square" alt="Build Status" />
</p>

---

## Welcome to vares

vares is a decentralized, full-stack platform designed to transform creative concepts into high-utility digital assets on Solana. We wanted to build something that turns whatever’s in your head into digital assets on Solana, without all the usual crypto friction. It's basically a cracked AI image generation tool that hooks up directly to blockchain tech, so creators, builders, and community leads can spin up media, design whole memecoin ideas, and launch them on-chain in literally seconds.

---

## The core setup

* **Frictionless Web3 Authentication:** Say goodbye to legacy email logins. Authenticate instantly via a clean, unified Web3 modal fully optimized for wallet extensions and native Solana wallet adapters.
* **Powered by remade.ai:** Utilizes the advanced remade.ai engineering stack to orchestrate asynchronous text-to-image AI pipelines, handling rapid model queries without client-side lag.
* **Launchpad Ready:** Built explicitly for fast asset distribution. Automatically formats asset schemas, pins media configurations to IPFS, and preps assets for direct tokenization or NFT deployment.

---

The stack utilizes a decoupled, high-throughput pipeline designed for low latency:

| Component | Architecture | Core Responsibility |
| :--- | :--- | :--- |
| **Frontend UI** | React.js, `@solana/web3.js` | Directing generation inputs, wallet states, cluster communication, and UI layouts. |
| **Backend Gateway** | Node.js, Express.js | Core christosantono infrastructure layers handling AI generation logic and API keys securely. |
| **Decentralized Storage** | IPFS via Pinata SDK | Immutably pinning image binaries and standard token/NFT JSON metadata schemas. |
| **Blockchain Layer** | Solana Runtime Core | Fast transaction execution, asset distribution, and verifiable ownership recording. |

---

## System Requirements

Ensure you have the following software profiles running locally:

* **Node.js:** `v18.x` or higher
* **Package Manager:** `npm v9.x+` or `yarn v1.22.x+`
* **Web3 Wallet:** Phantom extension or any Solana-compatible ecosystem wallet
* **Local Environment:** Solana CLI tools (optional, for local validator clusters)

---

## Setup and Installation

### 1. Project Initialization
Clone the platform codebase and enter the working directory:
```bash
git clone [https://github.com/christosantono/vares.git](https://github.com/christosantono/vares.git)
cd vares
