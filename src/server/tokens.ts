'use server'

import { CONNECTION } from '@/contracts/commons'
import { TOKEN_2022_PROGRAM_ID } from '@solana/spl-token'
import { PublicKey } from '@solana/web3.js'
import { BACKEND_URL } from './common'

export const getAppTokenList = async () => {
  try {
    const tokenListResponse = await fetch(`${BACKEND_URL}/tokens`)
    const rawTokenList: { id: string; mint_address: string }[] = await tokenListResponse.json()

    return rawTokenList.map((_) => ({ ..._, mintAddress: _.mint_address }))
  } catch (error) {
    console.log(`getAppTokenList error`, error)
    return []
  }
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
