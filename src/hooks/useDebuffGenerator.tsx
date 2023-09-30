import React, { useEffect } from 'react';
import {
  Debuff,
  PartyListState,
  Player,
  addDebuff,
  addMultipleDebuffs,
  removeAllHellwallDebuffs,
  removeDiceDebuffs,
  removeDiceHellwallDebuffs,
} from '../redux/slices/playerSlice';
import { TPhase } from '../redux/slices/simulationSlice';
import { batch, useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const getDynamisTargetPlayers = (
  chainedIndexes: number[],
  players: Player[],
  fullPlayers: Player[],
  phase: TPhase,
) => {
  const excludedPlayers = chainedIndexes.map((n, i) => {
    if (phase === 'sigma') {
      return (i === 0 || i === 2) && fullPlayers[n].name;
    } else if (phase === 'omega1' || phase === 'omega2') {
      return (i === 0 || i === 1) && fullPlayers[n].name;
    } else {
      return 'not included';
    }
  });
  return players.filter((n) => !excludedPlayers.includes(n.name));
};

const useDebuffGenerator = () => {
  const dispatch = useDispatch();
  const { member, chainedIndexes } = useSelector(
    (state: RootState) => state.party,
  );

  useEffect(() => {}, [member, chainedIndexes]);

  const generateRandomDynamis = (phase: TPhase) => {
    const players = [...member];
    const potentialTargets = [] as Player[];
    //무조건 헬월 대상자 2명이 포함되어있어야한다.
    const hellwallTargets = member
      .filter((n) => {
        if (
          n.debuffs.includes('hellwallFar') ||
          n.debuffs.includes('hellwallNear')
        ) {
          return true;
        } else {
          potentialTargets.push({ ...n, debuffs: [] });
          return false;
        }
      })
      .map((n) => {
        return {
          ...n,
          debuffs: [],
        };
      });

    const confirmedTargets = [...hellwallTargets];

    const chooser = randomNoRepeats(
      getDynamisTargetPlayers(chainedIndexes, potentialTargets, players, phase),
    );

    for (let i = 0; i < 4; i++) {
      confirmedTargets.push(chooser());
    }
    return confirmedTargets;
  };

  const generateOmegaRandomDynamis = (phase: TPhase) => {
    const players = [...member];
    const potentialTargets = [] as Player[];
    const dice = phase === 'omega1' ? 'dice1' : 'dice2';
    //무조건 헬월 대상자 2명이 포함되어있어야한다.
    const hellwallTargets = member
      .filter((n) => {
        if (
          (n.debuffs.includes('hellwallFar') ||
            n.debuffs.includes('hellwallNear')) &&
          n.debuffs.includes(dice)
        ) {
          return true;
        } else {
          potentialTargets.push({ ...n, debuffs: [] });
          return false;
        }
      })
      .map((n) => {
        return {
          ...n,
          debuffs: [],
        };
      });

    const confirmedTargets = [...hellwallTargets];

    const chooser = randomNoRepeats(
      getDynamisTargetPlayers(chainedIndexes, potentialTargets, players, phase),
    );

    for (let i = 0; i < 4; i++) {
      confirmedTargets.push(chooser());
    }
    return confirmedTargets;
  };

  const randomNoRepeats = (array) => {
    var copy = array.slice(0);
    return function () {
      if (copy.length < 1) {
        copy = array.slice(0);
      }
      var index = Math.floor(Math.random() * copy.length);
      var item = copy[index];
      copy.splice(index, 1);
      return item;
    };
  };

  const applyDynamis = (phase: TPhase) => {
    const debuffedPlayers = generateRandomDynamis(phase).map((n) => {
      return {
        ...n,
        debuffs: [...n.debuffs, 'dynamis'],
      };
    }) as Player[];
    batch(() => {
      dispatch(addMultipleDebuffs({ targetPlayers: debuffedPlayers }));
      dispatch(removeAllHellwallDebuffs());
    });
  };

  const applyOmegaDynamis = (phase: TPhase) => {
    const debuffedPlayers = generateOmegaRandomDynamis(phase).map((n) => {
      return {
        ...n,
        debuffs: [...n.debuffs, 'dynamis'],
      };
    }) as Player[];
    batch(() => {
      dispatch(addMultipleDebuffs({ targetPlayers: debuffedPlayers }));
      dispatch(
        removeDiceHellwallDebuffs({
          dice: phase === 'omega1' ? 'dice1' : 'dice2',
        }),
      );
      dispatch(
        removeDiceDebuffs({ dice: phase === 'omega1' ? 'dice1' : 'dice2' }),
      );
    });
  };

  const generateRandomHellWall = (party: Player[], phase: TPhase) => {
    const hellWallTargets = new Array();
    const debuffCount = phase === 'omega1' ? 4 : 2;
    const chooser = randomNoRepeats(party);
    for (let i = 0; i < debuffCount; i++) {
      hellWallTargets.push(chooser());
    }
    return hellWallTargets;
  };

  const applyHellwall = (phase: TPhase) => {
    const targetPlayers = generateRandomHellWall(member, phase).map((n) => {
      return { ...n, debuffs: [] };
    }) as Player[];
    const debuffedPlayers = targetPlayers.map((n, i) => {
      const debuffs = [i % 2 === 0 ? 'hellwallFar' : 'hellwallNear'];
      if (phase === 'omega1') {
        debuffs.push(i < 2 ? 'dice1' : 'dice2');
      }
      return {
        ...n,
        debuffs: [...n.debuffs, ...(debuffs as Debuff[])],
      };
    });

    dispatch(addMultipleDebuffs({ targetPlayers: debuffedPlayers }));
  };

  const removeHellwall = () => {
    dispatch(removeAllHellwallDebuffs());
  };

  return {
    applyHellwall,
    applyDynamis,
    applyOmegaDynamis,
    removeHellwall,
  };
};

export default useDebuffGenerator;
