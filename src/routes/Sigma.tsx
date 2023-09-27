import React from 'react';
import styled from 'styled-components';
import PartyList from '../components/PartyList';
import Macros from '../components/PartyList/Macros';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import {
  Debuff,
  Player,
  addDebuff,
  removeDebuff,
} from '../redux/slices/playerSlice';
import useDebuffGenerator from '../hooks/useDebuffGenerator';

const Container = styled.main``;

const PartyContainer = styled.div`
  display: flex;
`;

export default function Sigma() {
  const dispatch = useDispatch();
  const party = useSelector((state: RootState) => state.party);
  const debuffGenerator = useDebuffGenerator();

  const addDebuffHandler = (debuff: Debuff) => {
    dispatch(addDebuff({ debuff: debuff, target: 4 }));
  };
  const removeDebuffHandler = (debuff: Debuff) => {
    dispatch(removeDebuff({ debuff: debuff, target: 4 }));
  };

  const applyDeltaDynamis = () => {
    const debuffedPlayers = debuffGenerator.generateRandomDynamis(party.member);
    debuffedPlayers.forEach((n) => {
      const target = party.member.indexOf(n);
      const debuff = 'dynamis';
      dispatch(addDebuff({ debuff, target }));
    });
  };
  const applyDeltaHellwall = () => {
    const debuffedPlayers = debuffGenerator.generateRandomHellWall(
      party.member,
    );
    const targetOne = party.member.indexOf(debuffedPlayers[0]);
    const targetTwo = party.member.indexOf(debuffedPlayers[1]);
    dispatch(addDebuff({ debuff: 'hellwallNear', target: targetOne }));
    dispatch(addDebuff({ debuff: 'hellwallFar', target: targetTwo }));
  };

  return (
    <Container>
      This is Sigma page
      <PartyContainer>
        <PartyList />
        <Macros />
      </PartyContainer>
      <div>
        <button onClick={applyDeltaDynamis}>Add Dynamis Debuff</button>
        <button onClick={applyDeltaHellwall}>Add Hell Wall</button>
        <button onClick={() => addDebuffHandler('dice1')}>
          Add Dice1 Debugg
        </button>
        <button onClick={() => addDebuffHandler('dice2')}>
          Add Dice2 Debugg
        </button>
        <button onClick={() => removeDebuffHandler('dynamis')}>
          Remove Dynamis Debugg
        </button>
        <button onClick={() => removeDebuffHandler('dice1')}>
          Remove Dice1 Debugg
        </button>
        <button onClick={() => removeDebuffHandler('dice2')}>
          Remove Dice2 Debugg
        </button>
        <button>pause</button>
      </div>
    </Container>
  );
}
