import React from 'react';
import { Player } from '../redux/slices/playerSlice';

const useDebuffGenerator = () => {
  const generateRandomDynamis = (party: Player[]) => {
    const dynamisTargets = new Array();
    const chooser = randomNoRepeats(party.filter((n) => !n.isChained));
    for (let i = 0; i < 6; i++) {
      dynamisTargets.push(chooser());
    }
    return dynamisTargets;
  };

  const generateRandomHellWall = (party: Player[]) => {
    const hellWallTargets = new Array();
    const chooser = randomNoRepeats(party);
    for (let i = 0; i < 2; i++) {
      hellWallTargets.push(chooser());
    }
    return hellWallTargets;
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

  return { generateRandomHellWall, generateRandomDynamis };
};

export default useDebuffGenerator;
