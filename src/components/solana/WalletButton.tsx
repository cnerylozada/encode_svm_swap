'use client'
import { CONNECTION } from '@/contracts/commons'
import { ellipsify } from '@/lib/utils'
import { useWallet } from '@solana/wallet-adapter-react'
import { useWalletModal } from '@solana/wallet-adapter-react-ui'
import { LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js'
import { LogOut } from 'lucide-react'
import { useEffect, useState } from 'react'
import { signIn, signOut, useSession } from 'next-auth/react'

export const WalletButton = () => {
  const { connected, disconnect, publicKey, signMessage } = useWallet()
  const { setVisible } = useWalletModal()
  const { status } = useSession()

  const [balance, setBalance] = useState(0)

  const fetchBalance = async (wallet: PublicKey) => {
    const walletInfo = await CONNECTION.getAccountInfo(wallet)
    if (walletInfo) {
      const rawBalance = walletInfo.lamports / LAMPORTS_PER_SOL
      const formatBalance = Math.round(rawBalance * 10000) / 10000
      setBalance(formatBalance)
    }
  }

  const onSignIn = async () => {
    try {
      if (!connected) setVisible(true)

      if (signMessage && publicKey) {
        const data = new TextEncoder().encode('Your message to sign')
        const signature = await signMessage(data)
        console.log(`signature`, signature)

        await fetchBalance(publicKey)

        const result = await signIn('credentials', {
          wallet: publicKey.toString(),
          redirect: false,
        })
        if (result.error) {
          console.log(`onSignIn error: `, result.error)
          await disconnect()
        }
      }
    } catch (error) {
      console.log(`onSignIn error: `, error)
      onSignOut()
    }
  }

  const onSignOut = async () => {
    await Promise.all([signOut(), disconnect()])
  }

  useEffect(() => {
    if (connected && status === 'unauthenticated') {
      onSignIn()
    }
  }, [connected])

  useEffect(() => {
    if (connected && publicKey) {
      fetchBalance(publicKey)
    }
  }, [connected, publicKey])

  return (
    <div>
      {connected && publicKey ? (
        <div className="flex space-x-4 items-center">
          <div>
            Wallet: {ellipsify(publicKey.toString())} | {balance} SOL
          </div>
          <div>
            <button
              type="button"
              onClick={async () => {
                await onSignOut()
              }}
              className="block"
            >
              <LogOut className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>
      ) : (
        <div>
          <button type="button" onClick={async () => await onSignIn()}>
            Connect wallet
          </button>
        </div>
      )}
    </div>
  )
}
