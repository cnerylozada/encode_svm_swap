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
