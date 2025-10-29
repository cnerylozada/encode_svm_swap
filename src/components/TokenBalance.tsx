'use client'
import { getTokenBalanceByOwner } from '@/server/tokens'
import { useEffect, useState } from 'react'

export const TokenBalance = ({ tokenMint, symbol }: { tokenMint: string; symbol: string }) => {
  const wallet = 'CJVvnwfGKpWLfWZxbCc5KyyTHiebfgQQj4m7cYN6mV3E'
  const [balance, setBalance] = useState(0)

  useEffect(() => {
    getTokenBalanceByOwner(tokenMint, wallet).then((_) => setBalance(_))
  }, [])

  return (
    <div className="border rounded-md p-2 border-white">
      Balance: {balance} {symbol}
    </div>
  )
}
