import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Debuff, Player } from './playerSlice';

export type TPhase = 'delta' | 'sigma' | 'omega1' | 'omega2';

enum PHASE {
  delta = 0,
  sigma = 1,
  omega1 = 2,
  omega2 = 3,
}
//miliseconds
const PhaseCountdown = [5, 5, 5, 5];

interface DebuffInfo {
  name: Debuff;
  startAt: number;
  endAt: number;
}

const initialHellwallFarState: DebuffInfo = {
  name: 'hellwallFar',
  startAt: 2,
  endAt: 5,
};
const initialHellwallNearState: DebuffInfo = {
  name: 'hellwallNear',
  startAt: 2,
  endAt: 5,
};
const initialDynamisState: DebuffInfo = {
  name: 'dynamis',
  startAt: 0,
  endAt: 5,
};
const initialDice1State: DebuffInfo = {
  name: 'dice1',
  startAt: 3,
  endAt: 5,
};
const initialDice2State: DebuffInfo = {
  name: 'dice2',
  startAt: 3,
  endAt: 5,
};

const getPhaseInfos = (phase: TPhase) => {
  let debuffs = [] as DebuffInfo[];
  let countdown = 0;
  let delay = 5;
  switch (phase) {
    case 'delta':
    default:
      debuffs = [
        {
          name: 'dynamis',
          startAt: 0,
          endAt: 5,
        },
        {
          name: 'hellwallFar',
          startAt: 2,
          endAt: 5,
        },
        {
          name: 'hellwallNear',
          startAt: 2,
          endAt: 5,
        },
      ];
      countdown = 5;
    case 'sigma':
      debuffs = [
        {
          name: 'dynamis',
          startAt: 0,
          endAt: 5,
        },
        {
          name: 'hellwallFar',
          startAt: 2,
          endAt: 5,
        },
        {
          name: 'hellwallNear',
          startAt: 2,
          endAt: 5,
        },
      ];
      countdown = 5;
      delay = 6;
    case 'omega1':
      debuffs = [
        {
          name: 'dynamis',
          startAt: 0,
          endAt: 5,
        },
        {
          name: 'hellwallFar',
          startAt: 2,
          endAt: 5,
        },
        {
          name: 'hellwallFar',
          startAt: 2,
          endAt: 5,
        },
        {
          name: 'hellwallNear',
          startAt: 2,
          endAt: 5,
        },
        {
          name: 'hellwallNear',
          startAt: 2,
          endAt: 5,
        },
        {
          name: 'dice1',
          startAt: 2,
          endAt: 3,
        },
        {
          name: 'dice1',
          startAt: 2,
          endAt: 3,
        },
        {
          name: 'dice2',
          startAt: 2,
          endAt: 5,
        },
        {
          name: 'dice2',
          startAt: 2,
          endAt: 5,
        },
      ];
      countdown = 5;
      delay = 5;
      break;
  }
  return { countdown, debuffs, delay };
};

export interface SimulationState {
  globalTimer: number;
  current: {
    phase: {
      delay: number;
      order: number;
      name: TPhase;
      countdown: number;
      debuffs: DebuffInfo[];
    };
  };
}

const initialState: SimulationState = {
  globalTimer: 0,
  current: {
    phase: {
      delay: 3,
      name: 'delta',
      order: 0,
      countdown: PhaseCountdown[PHASE.delta],
      debuffs: [
        initialDynamisState,
        initialHellwallFarState,
        initialHellwallNearState,
      ],
    },
  },
};

export const simulationSlice = createSlice({
  name: 'simulation',
  initialState,
  reducers: {
    nextPhase: (state) => {
      const currentPhase = state.current.phase;
      const nextOrder = currentPhase.order + 1;
      const infos = getPhaseInfos(PHASE[nextOrder] as TPhase);
      const nextPhase = {
        name: PHASE[nextOrder] as TPhase,
        order: nextOrder,
        ...infos,
      };
      console.log(nextPhase.name);
      console.log(nextPhase.order);
      state.current.phase = nextPhase;
    },
  },
});

// Action creators are generated for each case reducer function
export const { nextPhase } = simulationSlice.actions;

export default simulationSlice.reducer;
