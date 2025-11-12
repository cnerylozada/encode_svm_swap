import { getAppTokenById, getTokenBalanceByAccount, getTokenDetail } from '@/server/tokens'
import { AddFundsToVaultForm } from './_components/AddFundsToVaultForm'
import { web3 } from '@coral-xyz/anchor'
import { PublicKey } from '@solana/web3.js'
import { ADMIN_PUBKEY } from '@/contracts/commons'
import { ClaimSwapTokensContract } from '@/contracts/contracts'

export default async function Page({ params }: { params: Promise<{ tokenId: string }> }) {
  const { tokenId } = await params
  const appToken = await getAppTokenById(tokenId)
  const tokenDetail = await getTokenDetail(tokenId, appToken.mint_address)

  if (!tokenDetail.metadata) return <></>

  const [main_vault_pda] = web3.PublicKey.findProgramAddressSync(
    [Buffer.from('swap_token1'), new PublicKey(tokenDetail.mint).toBuffer(), ADMIN_PUBKEY.toBuffer()],
    ClaimSwapTokensContract.programId,
  )
  const accountTokenBalance = await getTokenBalanceByAccount(tokenDetail.mint, main_vault_pda.toString())

  return (
    <div>
      <div className="mb-4 font-bold">
        <div>Manage token: {tokenDetail.metadata?.name} </div>
        <div>Symbol: {tokenDetail.metadata?.symbol}</div>
        <div>
          Account Balance: {accountTokenBalance} {tokenDetail.metadata?.symbol}
        </div>
      </div>

      <div className="space-y-4">
        <AddFundsToVaultForm tokenDetail={tokenDetail} />
        {/* <UpdateMetadataForm tokenMint={swapToken.mint_address} /> */}
      </div>
    </div>
  )
}
