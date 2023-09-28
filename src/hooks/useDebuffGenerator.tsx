import React from 'react';
import { Player } from '../redux/slices/playerSlice';

export type TPhase = 'delta' | 'sigma' | 'omega1' | 'omega2';

const getHellwallTargetPlayers = (players: Player[], phase: TPhase) => {
  switch (phase) {
    case 'delta':
    case 'sigma':
    case 'omega1':
    case 'omega2':
    default:
      return players;
  }
};

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
          n.chainNumber !== 1 &&
          n.chainNumber !== 2 &&
          n.debuffs.filter((m) => m === 'dynamis').length < 3,
      );
  }
};

const useDebuffGenerator = () => {
  const generateRandomDynamis = (party: Player[], phase: TPhase) => {
    const dynamisTargets = new Array();
    const chooser = randomNoRepeats(getDynamisTargetPlayers(party, phase));
    for (let i = 0; i < 6; i++) {
      dynamisTargets.push(chooser());
    }
    return dynamisTargets;
  };

  const generateRandomHellWall = (party: Player[], phase: TPhase) => {
    const hellWallTargets = new Array();
    const debuffCount = phase === 'omega1' ? 4 : 2;
    const chooser = randomNoRepeats(getHellwallTargetPlayers(party, phase));
    for (let i = 0; i < debuffCount; i++) {
      hellWallTargets.push(chooser());
    }
    return hellWallTargets;
  };

  const generateRandomDice = (party: Player[]) => {
    const diceTarget = new Array();
    const chooser = randomNoRepeats(
      party.filter(
        (n) =>
          n.debuffs.includes('hellwallFar') ||
          n.debuffs.includes('hellwallNear'),
      ),
    );
    for (let i = 0; i < 4; i++) {
      diceTarget.push(chooser());
    }
    return diceTarget;
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

  return { generateRandomDice, generateRandomHellWall, generateRandomDynamis };
};

export default useDebuffGenerator;
