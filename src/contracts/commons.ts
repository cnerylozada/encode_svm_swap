import { clusterApiUrl, Connection, PublicKey } from '@solana/web3.js'

export const CONNECTION = new Connection(clusterApiUrl('devnet'))

export const ADMIN_PUBKEY = new PublicKey(`AKeJdxqP6MpFyhcFGUN79NTUwe2ntZNoGjw37UTbbFp`)
