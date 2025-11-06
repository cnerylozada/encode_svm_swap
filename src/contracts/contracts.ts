import { Program } from '@coral-xyz/anchor'
import CLAIM_SWAP_TOKENS from './structs/claim_swap_tokens.json'
import { CONNECTION } from './commons'
import { ClaimSwapTokens } from './structs/claim_swap_tokens'

export const ClaimSwapTokensContract: Program<ClaimSwapTokens> = new Program(CLAIM_SWAP_TOKENS, {
  connection: CONNECTION,
})
