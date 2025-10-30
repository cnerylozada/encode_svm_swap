import { UpdateMetadataForm } from './_components/UpdateMetadataForm'

export default function Page() {
  const tokenMint = 'mntXmMnUP9vJYxbfykG2ZQhgcFHth6kwg8sVJTBY1pX'
  return (
    <div>
      <div>Page</div>
      <UpdateMetadataForm tokenMint={tokenMint} />
    </div>
  )
}
