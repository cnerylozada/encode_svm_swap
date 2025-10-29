import { TokenMetadata } from '@solana/spl-token-metadata'

export const getTokenURI = async (metadata: TokenMetadata | null) => {
  const DEFAULT_TOKEN_IMAGE =
    'https://es.wikipedia.org/wiki/Solana_%28plataforma_de_blockchain%29#/media/Archivo:Solana_cryptocurrency_two.jpg'
  if (!metadata) return DEFAULT_TOKEN_IMAGE

  const logoRes = await fetch(metadata.uri)
  if (!logoRes.ok) return DEFAULT_TOKEN_IMAGE

  const logoJson: { name: string; image: string; symbo: string } = await logoRes.json()
  return logoJson.image ? logoJson.image : DEFAULT_TOKEN_IMAGE
}
