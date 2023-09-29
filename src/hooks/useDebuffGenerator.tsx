import React, { useEffect } from 'react';
import {
  Debuff,
  PartyListState,
  Player,
  addDebuff,
  addMultipleDebuffs,
  removeAllHellwallDebuffs,
  removeDiceHellwallDebuffs,
} from '../redux/slices/playerSlice';
import { TPhase } from '../redux/slices/simulationSlice';
import { batch, useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const getDynamisTargetPlayers = (players: Player[], phase: TPhase) => {
  switch (phase) {
    case 'delta':
    default:
      return players;
    case 'sigma':
      return players.filter((n) => n.chainNumber !== 1 && n.chainNumber !== 3);
    case 'omega1':
      return players.filter((n) => n.chainNumber !== 1 && n.chainNumber !== 2);
    case 'omega2':
      return players.filter(
        (n) =>
          n.chainNumber !== 0 &&
          n.chainNumber !== 1 &&
          n.debuffs.filter((m) => m === 'dynamis').length < 3,
      );
  }
};

const useDebuffGenerator = () => {
  const dispatch = useDispatch();
  const party = useSelector((state: RootState) => state.party);

  useEffect(() => {}, [party.member]);

  const generateRandomDynamis = (phase: TPhase) => {
    const dynamisTargets = party.member
      .filter(
        (n) =>
          n.debuffs.includes('hellwallFar') ||
          n.debuffs.includes('hellwallNear'),
      )
      .map((n) => {
        return {
          ...n,
          debuffs: [],
        };
      });
    const players = party.member
      .filter(
        (n) =>
          !n.debuffs.includes('hellwallFar') &&
          !n.debuffs.includes('hellwallNear'),
      )
      .map((n) => {
        return {
          ...n,
          debuffs: [],
        };
      });
    console.log('hellwall target', dynamisTargets);
    console.log('pool', players);
    const chooser = randomNoRepeats(getDynamisTargetPlayers(players, phase));
    for (let i = 0; i < 4; i++) {
      dynamisTargets.push(chooser());
    }

    return dynamisTargets;
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

  const applyOmega1Dynamis = (delay = 0) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const debuffedPlayers = generateRandomDynamis('omega1').map((n) => {
          return {
            ...n,
            debuffs: [...n.debuffs, 'dynamis'],
          };
        }) as Player[];
        dispatch(addMultipleDebuffs({ targetPlayers: debuffedPlayers }));
        resolve('resolve');
      }, delay);
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
    const targetPlayers = generateRandomHellWall(party.member, phase).map(
      (n) => {
        return { ...n, debuffs: [] };
      },
    ) as Player[];

    const debuffedPlayers = targetPlayers.map((n, i) => {
      const debuffs = [i % 2 == 0 ? 'hellwallFar' : 'hellwallNear'];
      if (phase === 'omega1') {
        debuffs.push(i % 2 == 0 ? 'dice1' : 'dice2');
      }
      return {
        ...n,
        debuffs: [...n.debuffs, ...(debuffs as Debuff[])],
      };
    });

    dispatch(addMultipleDebuffs({ targetPlayers: debuffedPlayers }));
  };

  const removeHellwall = (diceNumber?: 'dice1' | 'dice2') => {
    if (diceNumber !== undefined) {
      dispatch(removeDiceHellwallDebuffs({ dice: diceNumber }));
    } else {
      dispatch(removeAllHellwallDebuffs());
    }
  };

  return {
    applyHellwall,
    applyDynamis,
    applyOmega1Dynamis,
    removeHellwall,
  };
};

export default useDebuffGenerator;
