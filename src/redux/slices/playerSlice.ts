import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export type Debuff = 'dynamis' | 'dice1' | 'dice2';
export type Job = 'pld' | 'war' | 'wht' | 'sch' | 'nin' | 'rpr' | 'mch' | 'sum';

export interface Player {
  name: string;
  job: Job;
  debuffs: Debuff[];
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
    },
    {
      job: 'war',
      name: '세트메뉴',
      debuffs: [],
    },
    {
      job: 'wht',
      name: '감자깎는토마토',
      debuffs: [],
    },
    {
      job: 'sch',
      name: '유들',
      debuffs: [],
    },
    {
      job: 'rpr',
      name: '깜쟝마리모',
      debuffs: [],
    },
    {
      job: 'nin',
      name: '재규',
      debuffs: [],
    },
    {
      job: 'mch',
      name: '악성마리모',
      debuffs: [],
    },
    {
      job: 'sum',
      name: '찰떡돌',
      debuffs: [],
    },
  ],
};

export const partySlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    addDebuff: (
      state,
      action: PayloadAction<{ debuff: Debuff; target: number }>,
    ) => {
      const { target, debuff } = action.payload;
      state.member[target].debuffs.push(debuff);
    },
  },
});

// Action creators are generated for each case reducer function
export const { addDebuff } = partySlice.actions;

export default partySlice.reducer;
