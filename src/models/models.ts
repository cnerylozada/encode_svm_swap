export interface IRawUser {
  id: string
  wallet: string
  email: string | null
  role: 'USER' | 'ADMIN'
}
