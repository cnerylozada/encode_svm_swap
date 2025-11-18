'use server'
import { CONNECTION } from '@/contracts/commons'
import { getMint, getTokenMetadata, TOKEN_2022_PROGRAM_ID } from '@solana/spl-token'
import { PublicKey } from '@solana/web3.js'
import { BACKEND_AXUM_URL } from './common'
import { IRawAppToken } from '@/models/models'

export const getAppTokenList = async () => {
  try {
    const tokenListResponse = await fetch(`${BACKEND_AXUM_URL}/tokens`)
    const rawTokenList: IRawAppToken[] = await tokenListResponse.json()

    return rawTokenList
  } catch (error) {
    console.log(`getAppTokenList error`, error)
    return []
  }
}

export const getAppTokenById = async (id: string) => {
  const appTokenResponse = await fetch(`${BACKEND_AXUM_URL}/tokens/${id}`)
  const appToken: IRawAppToken = await appTokenResponse.json()
  return appToken
}

export const getTokenDetail = async (id: string, mint: string): Promise<IRawAppToken> => {
  const tokenMint = new PublicKey(mint)

  const mintData = await getMint(CONNECTION, tokenMint, undefined, TOKEN_2022_PROGRAM_ID)
  const decimals = mintData.decimals

  const metadata = await getTokenMetadata(CONNECTION, tokenMint, undefined, TOKEN_2022_PROGRAM_ID)
  return {
    id,
    decimals,
    mint,
    name: metadata?.name ?? '',
    symbol: metadata?.symbol ?? '',
    uri: metadata?.uri ?? '',
  }
}

export const getTokenBalanceByAccount = async (tokenMint: string, account: string) => {
  const tokenAccountsByOwner = await CONNECTION.getParsedTokenAccountsByOwner(new PublicKey(account), {
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
