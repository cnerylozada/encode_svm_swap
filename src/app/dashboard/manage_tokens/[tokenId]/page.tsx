import { UpdateMetadataForm } from './_components/UpdateMetadataForm'
import { getAppTokenById } from '@/server/tokens'

export default async function Page({ params }: { params: Promise<{ tokenId: string }> }) {
  const { tokenId } = await params
  const swapToken = await getAppTokenById(tokenId)
  console.log(`swapToken`, swapToken)

  return (
    <div>
      <div>Page</div>
      <UpdateMetadataForm tokenMint={swapToken.mint_address} />
    </div>
  )
}
