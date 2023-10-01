import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export type Debuff =
  | 'dynamis'
  | 'hellwallFar'
  | 'hellwallNear'
  | 'dice1'
  | 'dice2'
  | 'ps_far'
  | 'ps_near'
  | 'line_green'
  | 'line_blue'
  | 'dmg_increase';

export type Job = 'pld' | 'war' | 'wht' | 'sch' | 'nin' | 'rpr' | 'mch' | 'sum';

export interface Player {
  name: string;
  job: Job;
  debuffs: Debuff[];
  isChained: boolean;
  isNumbered: boolean;
}

export interface PartyListState {
  member: Player[];
  chainedIndexes: number[];
}

const initialState: PartyListState = {
  chainedIndexes: [],
  member: [
    {
      job: 'pld',
      name: '재외국민',
      debuffs: [],
      isChained: false,
      isNumbered: false,
    },
    {
      job: 'war',
      name: '세트메뉴',
      debuffs: [],
      isChained: false,
      isNumbered: false,
    },
    {
      job: 'wht',
      name: '감자깎는토마토',
      debuffs: [],
      isChained: false,
      isNumbered: false,
    },
    {
      job: 'sch',
      name: '유들',
      debuffs: [],
      isChained: false,
      isNumbered: false,
    },
    {
      job: 'rpr',
      name: '깜쟝마리모',
      debuffs: [],
      isChained: false,
      isNumbered: false,
    },
    {
      job: 'nin',
      name: '재규',
      debuffs: [],
      isChained: false,
      isNumbered: false,
    },
    {
      job: 'mch',
      name: '악성마리모',
      debuffs: [],
      isChained: false,
      isNumbered: false,
    },
    {
      job: 'sum',
      name: '찰떡돌',
      debuffs: [],
      isChained: false,
      isNumbered: false,
    },
  ],
};

export const partySlice = createSlice({
  name: 'party',
  initialState,
  reducers: {
    addDebuff: (
      state,
      action: PayloadAction<{ debuff: Debuff; target: number }>,
    ) => {
      const { target, debuff } = action.payload;
      state.member[target].debuffs.push(debuff);
    },
    removeDebuff: (
      state,
      action: PayloadAction<{ debuff: Debuff; target: number }>,
    ) => {
      const { target, debuff } = action.payload;
      const index = state.member[target].debuffs.indexOf(debuff);
      if (state.member[target].debuffs.length > 0) {
        state.member[target].debuffs.splice(index, 1);
      }
    },
    removeAllHellwallDebuffs: (state) => {
      state.member.forEach((n, i) => {
        const hellwallFarIndex = state.member[i].debuffs.indexOf('hellwallFar');
        const hellwallNearIndex =
          state.member[i].debuffs.indexOf('hellwallNear');
        if (n.debuffs.includes('hellwallFar')) {
          state.member[i].debuffs.splice(hellwallFarIndex, 1);
        }
        if (n.debuffs.includes('hellwallNear')) {
          state.member[i].debuffs.splice(hellwallNearIndex, 1);
        }
      });
    },
    removeAllTetherDebuffs: (state) => {
      state.member.forEach((n, i) => {
        const hellwallFarIndex = state.member[i].debuffs.indexOf('ps_far');
        const hellwallNearIndex = state.member[i].debuffs.indexOf('ps_near');
        if (n.debuffs.includes('ps_far')) {
          state.member[i].debuffs.splice(hellwallFarIndex, 1);
        }
        if (n.debuffs.includes('ps_near')) {
          state.member[i].debuffs.splice(hellwallNearIndex, 1);
        }
      });
    },
    removeAllDamageIncreaseDebuffs: (state) => {
      state.member.forEach((n, i) => {
        const dmgIncreaseIndex =
          state.member[i].debuffs.indexOf('dmg_increase');

        if (n.debuffs.includes('dmg_increase')) {
          state.member[i].debuffs.splice(dmgIncreaseIndex, 1);
        }
      });
    },
    removeDiceHellwallDebuffs: (
      state,
      action: PayloadAction<{ dice: 'dice1' | 'dice2' }>,
    ) => {
      const { dice } = action.payload;
      state.member.forEach((n, i) => {
        const hellwallFarIndex = state.member[i].debuffs.indexOf('hellwallFar');
        const hellwallNearIndex =
          state.member[i].debuffs.indexOf('hellwallNear');
        if (n.debuffs.includes('hellwallFar') && n.debuffs.includes(dice)) {
          state.member[i].debuffs.splice(hellwallFarIndex, 1);
        }
        if (n.debuffs.includes('hellwallNear') && n.debuffs.includes(dice)) {
          state.member[i].debuffs.splice(hellwallNearIndex, 1);
        }
      });
    },
    removeDiceDebuffs: (
      state,
      action: PayloadAction<{ dice: 'dice1' | 'dice2' }>,
    ) => {
      const { dice } = action.payload;
      state.member.forEach((n, i) => {
        const diceIndex = state.member[i].debuffs.indexOf(dice);
        if (n.debuffs.includes(dice) && n.debuffs.includes(dice)) {
          state.member[i].debuffs.splice(diceIndex, 1);
        }
      });
    },
    resetPlayer: (state, action: PayloadAction<{ players: Player[] }>) => {
      const { players } = action.payload;
      state.member = players;
    },
    updatePlayerButtonStatus: (
      state,
      action: PayloadAction<{
        index: number;
        isChained: boolean;
        isNumbered: boolean;
      }>,
    ) => {
      const { index, isChained, isNumbered } = action.payload;
      state.member[index].isChained = isChained;
      state.member[index].isNumbered = isNumbered;
      if (isChained) {
        state.chainedIndexes.push(index);
      }
    },

    resetChainPlayer: (state) => {
      state.chainedIndexes = [];
      state.member = state.member.map((n) => {
        return {
          ...n,
          isChained: false,
          isNumbered: false,
        };
      });
    },
    addMultipleDebuffs: (
      state,
      action: PayloadAction<{ targetPlayers: Player[] }>,
    ) => {
      const { targetPlayers } = action.payload;
      targetPlayers.forEach((n, i) => {
        const target = state.member.findIndex((m) => m.name === n.name);
        state.member[target].debuffs = [
          ...n.debuffs,
          ...state.member[target].debuffs,
        ];
      });
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addDebuff,
  addMultipleDebuffs,
  removeDebuff,
  removeAllHellwallDebuffs,
  removeAllTetherDebuffs,
  removeAllDamageIncreaseDebuffs,
  removeDiceHellwallDebuffs,
  removeDiceDebuffs,
  updatePlayerButtonStatus,
  resetChainPlayer,
  resetPlayer,
} = partySlice.actions;

export default partySlice.reducer;
