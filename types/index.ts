export interface IPoXInfo {
  contract_id: string;
  pox_activation_threshold_ustx: number;
  first_burnchain_block_height: number;
  prepare_phase_block_length: number;
  reward_phase_block_length: number;
  reward_slots: number;
  rejection_fraction: number;
  total_liquid_supply_ustx: number;
  current_cycle: Currentcycle;
  next_cycle: Nextcycle;
  min_amount_ustx: number;
  prepare_cycle_length: number;
  reward_cycle_id: number;
  reward_cycle_length: number;
  rejection_votes_left_required: number;
  next_reward_cycle_in: number;
}

interface Nextcycle {
  id: number;
  min_threshold_ustx: number;
  min_increment_ustx: number;
  stacked_ustx: number;
  prepare_phase_start_block_height: number;
  blocks_until_prepare_phase: number;
  reward_phase_start_block_height: number;
  blocks_until_reward_phase: number;
  ustx_until_pox_rejection: number;
}

interface Currentcycle {
  id: number;
  min_threshold_ustx: number;
  stacked_ustx: number;
  is_pox_active: boolean;
}

export interface IGrainConfig {
  allocationPolicies: AllocationPolicy[];
  maxSimultaneousDistributions: number;
}

interface AllocationPolicy {
  policyType: string;
  budget: string;
  discount: number;
}
