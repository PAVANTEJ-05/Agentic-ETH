// import { PrivyClient } from '@privy-io/server-auth';
// import dotenv from 'dotenv';
// dotenv.config();

// export const privy = new PrivyClient(process.env.NEXT_PUBLIC_PRIVY_APP_ID || "a", process.env.NEXT_PUBLIC_APP_SECRET || 'b');

// const {id, address, chainType} = await privy.walletApi.create({chainType: 'ethereum'});

// console.log("wallet address ", address, "\n id ", id);

// function createWallet (){

// }

// const {signature, encoding} = await privy.walletApi.ethereum.signMessage({
//     walletId: id,
//     message: 'Hello server wallets!',
//   });
  
  

//   const {hash} = await privy.walletApi.ethereum.sendTransaction({
//     walletId: id,
//     caip2: 'eip155:84532',
//     transaction: {
//       to: '0xyourRecipientAddress',
//       value: 100000,
//       chainId: 84532,
//     },
//   });
  
