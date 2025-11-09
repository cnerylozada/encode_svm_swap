import { ITokenMetadata } from '@/models/models'

export const getTokenURI = async (metadata: ITokenMetadata) => {
  const DEFAULT_TOKEN_IMAGE =
    'https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Solana_cryptocurrency_two.jpg/2560px-Solana_cryptocurrency_two.jpg'

  if (!metadata) return DEFAULT_TOKEN_IMAGE

  const URI_response = await fetch(metadata.uri)
  if (!URI_response.ok) return DEFAULT_TOKEN_IMAGE

  const URIDetails: { name: string; image: string; symbol: string } = await URI_response.json()
  return URIDetails.image ?? DEFAULT_TOKEN_IMAGE
}
