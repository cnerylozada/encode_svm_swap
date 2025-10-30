'use server'

import { CONNECTION } from '@/contracts/commons'
import { TOKEN_2022_PROGRAM_ID } from '@solana/spl-token'
import { PublicKey } from '@solana/web3.js'

export const getAppTokenList = async () => {
  return [
    { id: '01', mintAddress: 'mntXmMnUP9vJYxbfykG2ZQhgcFHth6kwg8sVJTBY1pX' },
    { id: '02', mintAddress: 'supS9xE5YSVNuQyfyE4VKcKMwAAEjzvvVeXW189qpdf' },
    { id: '03', mintAddress: 'mnteyhFCjqLu5QwfXmEu49dGybyFN5dwPfAhoiMbjNw' },
  ]
}

export const getTokenBalanceByOwner = async (tokenMint: string, wallet: string) => {
  const tokenAccountsByOwner = await CONNECTION.getParsedTokenAccountsByOwner(new PublicKey(wallet), {
    mint: new PublicKey(tokenMint),
    programId: TOKEN_2022_PROGRAM_ID,
  })

  let tokenBalance = 0
  if (tokenAccountsByOwner.value.length) {
    const parsed = tokenAccountsByOwner.value[0].account.data.parsed
    tokenBalance = parsed.info.tokenAmount.uiAmount
  }
  return tokenBalance
}
