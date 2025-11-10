import { Program } from '@coral-xyz/anchor'
import { CONNECTION } from './commons'
import { ClaimSwapTokens } from './structs/claim_swap_tokens'
import CLAIM_SWAP_TOKENS from './structs/claim_swap_tokens.json'
import SWAP_TOKENS from './structs/swap.json'
import { Swap } from './structs/swap'

export const ClaimSwapTokensContract: Program<ClaimSwapTokens> = new Program(CLAIM_SWAP_TOKENS, {
  connection: CONNECTION,
})

export const SwapContract: Program<Swap> = new Program(SWAP_TOKENS, {
  connection: CONNECTION,
})
