# RacingWagers 🏆⚡

**Encrypted Racing Bets That Stay Private Until Race Day**

A revolutionary racing platform where your wagers remain completely hidden until race completion, preventing manipulation and ensuring fair competition through advanced cryptographic technology.

## ⚡ Core Innovation

### 🎯 The Problem We Solve
Traditional racing betting platforms expose all wagers before races, allowing coordinated manipulation and insider trading. RacingWagers keeps your bets encrypted and private until the race finishes.

### 🔒 Privacy-First Betting
- **Hidden Wagers**: Your betting amounts are encrypted using cutting-edge FHE technology
- **Private Performance**: Race participant data remains confidential until race completion
- **Manipulation-Proof**: No one can see or influence betting patterns before races

### 🏁 Racing Excellence
- **Create Events**: Set up racing competitions with custom rules and parameters
- **Join Races**: Participate in events with encrypted performance tracking
- **Smart Betting**: Place wagers that remain private until race results are final
- **Fair Competition**: Transparent race outcomes with encrypted betting history

## 🛠️ Technology Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **shadcn/ui** for UI components
- **RainbowKit** for wallet connection
- **Wagmi** for Ethereum interactions

### Smart Contracts
- **Solidity 0.8.24** with FHE support
- **Zama FHEVM** for homomorphic encryption
- **OpenZeppelin** for security standards
- **Hardhat** for development and deployment

### Blockchain
- **Ethereum Sepolia** testnet
- **FHE-enabled** smart contracts
- **Encrypted data** storage and computation

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Git
- MetaMask or compatible wallet
- Sepolia ETH for testing

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/torstein84/secret-speed-stakes.git
   cd secret-speed-stakes
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Update `.env` with your configuration:
   ```env
   # Chain Configuration
   NEXT_PUBLIC_CHAIN_ID=11155111
   NEXT_PUBLIC_RPC_URL=your_sepolia_rpc_url
   
   # Wallet Connect Configuration
   NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=your_wallet_connect_project_id
   
   # Private Key for Deployment (DO NOT COMMIT)
   PRIVATE_KEY=your_private_key_here
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

## 🔧 Smart Contract Development

### Compile Contracts
```bash
npm run compile
```

### Run Tests
```bash
npm run test
```

### Deploy to Sepolia
```bash
npm run deploy
```

### Deploy Locally
```bash
npm run deploy:local
```

## 📁 Project Structure

```
secret-speed-stakes/
├── contracts/              # Smart contracts
│   └── SecretSpeedStakes.sol
├── scripts/                # Deployment scripts
│   └── deploy.ts
├── src/
│   ├── components/         # React components
│   │   ├── ui/            # Reusable UI components
│   │   ├── RacingHeader.tsx
│   │   ├── RacingDashboard.tsx
│   │   ├── RaceCard.tsx
│   │   └── WalletConnect.tsx
│   ├── config/            # Configuration files
│   │   ├── wagmi.ts       # Wallet configuration
│   │   └── contract.ts    # Contract configuration
│   ├── lib/               # Utility functions
│   │   ├── fhe-utils.ts   # FHE utilities
│   │   └── utils.ts
│   ├── pages/             # Page components
│   │   ├── Index.tsx      # Home page
│   │   └── NotFound.tsx
│   ├── App.tsx            # Main application
│   └── main.tsx           # Application entry point
├── public/                # Static assets
├── hardhat.config.ts      # Hardhat configuration
└── package.json
```

## 🔐 FHE Architecture

### Encryption Process
1. **Client-Side Encryption**: Stake amounts and performance scores are encrypted using FHE
2. **On-Chain Storage**: Encrypted data is stored on the blockchain
3. **Homomorphic Computation**: Calculations are performed on encrypted data
4. **Decryption**: Results are decrypted only when necessary

### Security Features
- **Input Verification**: Cryptographic proofs ensure data integrity
- **Access Control**: Only authorized users can decrypt specific data
- **Audit Trail**: All operations are logged for transparency
- **Reputation System**: Build trust through verified participation

## 🎮 Usage Guide

### For Race Organizers
1. **Create a Race**: Set race parameters, start/end times, and max participants
2. **Monitor Participation**: Track encrypted stake amounts and participant count
3. **Record Performance**: Input encrypted performance scores for participants
4. **Finish Race**: Declare winner and distribute rewards

### For Participants
1. **Join Races**: Register for available racing events
2. **Place Stakes**: Bet on participants with encrypted amounts
3. **Track Performance**: View your encrypted performance scores
4. **Claim Rewards**: Receive winnings after race completion

### For Stakers
1. **Connect Wallet**: Link your Ethereum wallet
2. **Browse Races**: View available racing events
3. **Place Bets**: Stake on participants with encrypted amounts
4. **Monitor Results**: Track race outcomes and winnings

## 🌐 Network Configuration

### Sepolia Testnet
- **Chain ID**: 11155111
- **RPC URL**: https://sepolia.infura.io/v3/b18fb7e6ca7045ac83c41157ab93f990
- **Explorer**: https://sepolia.etherscan.io

### Getting Testnet ETH
- [Sepolia Faucet](https://sepoliafaucet.com/)
- [Alchemy Faucet](https://sepoliafaucet.com/)

## 🔒 Security Considerations

### FHE Security
- All sensitive data is encrypted using Zama's FHE technology
- Cryptographic proofs ensure data integrity
- Access control prevents unauthorized decryption

### Smart Contract Security
- OpenZeppelin security standards
- Reentrancy protection
- Access control mechanisms
- Comprehensive testing

### Frontend Security
- Secure wallet integration
- Input validation
- Error handling
- User data protection

## 🚀 Deployment

### Vercel Deployment
1. **Connect Repository**: Link your GitHub repository to Vercel
2. **Configure Environment**: Set environment variables in Vercel dashboard
3. **Deploy**: Automatic deployment on push to main branch

### Manual Deployment
```bash
npm run build
npm run deploy
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Zama** for FHE technology and FHEVM
- **OpenZeppelin** for security standards
- **RainbowKit** for wallet integration
- **Vite** for fast development experience

## 📞 Support

- **Documentation**: [GitHub Wiki](https://github.com/torstein84/secret-speed-stakes/wiki)
- **Issues**: [GitHub Issues](https://github.com/torstein84/secret-speed-stakes/issues)
- **Discussions**: [GitHub Discussions](https://github.com/torstein84/secret-speed-stakes/discussions)

---

**Built with ❤️ using Zama's FHE technology for privacy-preserving racing stakes**