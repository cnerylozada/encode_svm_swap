'use server'
import { CONNECTION } from '@/contracts/commons'
import { TOKEN_2022_PROGRAM_ID } from '@solana/spl-token'
import { PublicKey } from '@solana/web3.js'
import { BACKEND_AXUM_URL } from './common'
import { IRawAppToken } from '@/models/models'

export const getAppTokenList = async () => {
  try {
    const tokenListResponse = await fetch(`${BACKEND_AXUM_URL}/tokens`)
    const rawTokenList: IRawAppToken[] = await tokenListResponse.json()

    return rawTokenList.map((_) => ({ id: _.id, mintAddress: _.mint_address }))
  } catch (error) {
    console.log(`getAppTokenList error`, error)
    return []
  }
}

export const getAppTokenById = async (id: string) => {
  const swapTokenResponse = await fetch(`${BACKEND_AXUM_URL}/tokens/${id}`)
  const swapToken: IRawAppToken = await swapTokenResponse.json()
  return swapToken
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
