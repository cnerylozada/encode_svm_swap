export interface IRawUser {
  id: string
  wallet: string
  email: string | null
  role: 'USER' | 'ADMIN'
}

export interface IRawAppToken {
  id: string
  mint: string
  name: string
  symbol: string
  uri: string
  decimals: number
}

export interface IRawOffer {
  id: string
  maker: string
  tokenMintA: string
  tokenMintB: string
  tokenWantedAmount: number
  tokenOfferedAmount: number
  bump: number
  wasTaken: boolean
}
