import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export type Debuff =
  | 'dynamis'
  | 'hellwallFar'
  | 'hellwallNear'
  | 'dice1'
  | 'dice2';
export type Job = 'pld' | 'war' | 'wht' | 'sch' | 'nin' | 'rpr' | 'mch' | 'sum';

export interface Player {
  name: string;
  job: Job;
  debuffs: Debuff[];
  isChained: boolean;
  chainNumber: undefined | number;
}

export interface PartyListState {
  member: Player[];
}

const initialState: PartyListState = {
  member: [
    {
      job: 'pld',
      name: '재외국민',
      debuffs: [],
      isChained: false,
      chainNumber: undefined,
    },
    {
      job: 'war',
      name: '세트메뉴',
      debuffs: [],
      isChained: false,
      chainNumber: undefined,
    },
    {
      job: 'wht',
      name: '감자깎는토마토',
      debuffs: [],
      isChained: false,
      chainNumber: undefined,
    },
    {
      job: 'sch',
      name: '유들',
      debuffs: [],
      isChained: false,
      chainNumber: undefined,
    },
    {
      job: 'rpr',
      name: '깜쟝마리모',
      debuffs: [],
      isChained: false,
      chainNumber: undefined,
    },
    {
      job: 'nin',
      name: '재규',
      debuffs: [],
      isChained: false,
      chainNumber: undefined,
    },
    {
      job: 'mch',
      name: '악성마리모',
      debuffs: [],
      isChained: false,
      chainNumber: undefined,
    },
    {
      job: 'sum',
      name: '찰떡돌',
      debuffs: [],
      isChained: false,
      chainNumber: undefined,
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
    resetPlayer: (state, action: PayloadAction<{ players: Player[] }>) => {
      const { players } = action.payload;
      state.member = players;
    },
    chainPlayer: (state, action: PayloadAction<{ target: number }>) => {
      const { target } = action.payload;
      state.member[target].isChained = true;
    },
    unChainPlayer: (state, action: PayloadAction<{ target: number }>) => {
      const { target } = action.payload;
      state.member[target].isChained = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addDebuff,
  removeDebuff,
  chainPlayer,
  unChainPlayer,
  resetPlayer,
} = partySlice.actions;

export default partySlice.reducer;
