'use client'
import { getTokenBalanceByOwner } from '@/server/tokens'
import { useWallet } from '@solana/wallet-adapter-react'
import { useEffect, useState } from 'react'

export const TokenBalance = ({ tokenMint, symbol }: { tokenMint: string; symbol: string }) => {
  const { connected, publicKey } = useWallet()
  const [balance, setBalance] = useState(0)

  useEffect(() => {
    if (publicKey) {
      getTokenBalanceByOwner(tokenMint, publicKey.toString()).then((_) => setBalance(_))
    }
  }, [connected])

  return (
    <div className="border rounded-md p-2 border-white">
      Balance: {balance} {symbol}
    </div>
  )
}
