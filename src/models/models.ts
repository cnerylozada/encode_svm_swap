import { PublicKey } from '@solana/web3.js'
import { BN } from '@coral-xyz/anchor'

export interface IRawUser {
  id: string
  wallet: string
  email: string | null
  role: 'USER' | 'ADMIN'
}

export interface IRawAppToken {
  id: string
  mint_address: string
}

export interface ITokenMetadata {
  mint: string
  name: string
  symbol: string
  uri: string
}

export interface ITokenDetail {
  id: string
  decimals: number
  metadata: ITokenMetadata | null
}

export interface IRawOffer {
  id: string
  maker: string
  tokenMintA: string
  tokenMintB: string
  tokenWantedAmount: number
  tokenOfferedAmount: number
  bump: number
}
