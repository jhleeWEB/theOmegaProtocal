import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Debuff, Player } from './playerSlice';

export type TPhase = 'delta' | 'sigma' | 'omega1' | 'omega2';

export interface SimulationState {
  history: {
    [key: string]: {
      before: {
        member?: Player[];
        chainedIndexes?: number[];
      };
      after: {
        member?: Player[];
        chainedIndexes?: number[];
      };
    };
  };
}

const initialState: SimulationState = {
  history: {
    delta: { before: {}, after: {} },
    sigma: { before: {}, after: {} },
    omega1: { before: {}, after: {} },
    omega2: { before: {}, after: {} },
  },
};

export const simulationSlice = createSlice({
  name: 'simulation',
  initialState,
  reducers: {
    updateBefore: (
      state,
      action: PayloadAction<{
        phase: TPhase;
        member: Player[];
        chainedIndexes: number[];
      }>,
    ) => {
      const { phase, member, chainedIndexes } = action.payload;
      state.history[phase].before = {
        member,
        chainedIndexes,
      };
    },
    updateAfter: (
      state,
      action: PayloadAction<{
        phase: TPhase;
        member: Player[];
        chainedIndexes: number[];
      }>,
    ) => {
      const { phase, member, chainedIndexes } = action.payload;
      state.history[phase].after = {
        member,
        chainedIndexes,
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateAfter, updateBefore } = simulationSlice.actions;

export default simulationSlice.reducer;
