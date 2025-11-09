'use server'
import { CONNECTION } from '@/contracts/commons'
import { getMint, getTokenMetadata, TOKEN_2022_PROGRAM_ID } from '@solana/spl-token'
import { PublicKey } from '@solana/web3.js'
import { BACKEND_AXUM_URL } from './common'
import { IRawAppToken, ITokenDetail } from '@/models/models'

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

const getAppTokenById = async (id: string) => {
  const appTokenResponse = await fetch(`${BACKEND_AXUM_URL}/tokens/${id}`)
  const appToken: IRawAppToken = await appTokenResponse.json()
  return appToken
}
export const getTokenDetailById = async (id: string): Promise<ITokenDetail> => {
  const appToken = await getAppTokenById(id)
  const tokenMint = new PublicKey(appToken.mint_address)

  const mintData = await getMint(CONNECTION, tokenMint, undefined, TOKEN_2022_PROGRAM_ID)
  const decimals = mintData.decimals

  const metadata = await getTokenMetadata(CONNECTION, tokenMint, undefined, TOKEN_2022_PROGRAM_ID)

  return {
    id,
    decimals,
    metadata: metadata
      ? { mint: metadata.mint.toString(), name: metadata.name, symbol: metadata.symbol, uri: metadata.uri }
      : null,
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
