import React from 'react';
import styled from 'styled-components';
import PartyList from '../components/PartyList';
import Macros from '../components/PartyList/Macros';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { Debuff, addDebuff, removeDebuff } from '../redux/slices/playerSlice';

const Container = styled.main``;

const PartyContainer = styled.div`
  display: flex;
`;

export default function Sigma() {
  const party = useSelector((state: RootState) => state.party);
  const dispatch = useDispatch();

  const addDebuffHandler = (debuff: Debuff) => {
    dispatch(addDebuff({ debuff: debuff, target: 4 }));
  };
  const removeDebuffHandler = (debuff: Debuff) => {
    dispatch(removeDebuff({ debuff: debuff, target: 4 }));
  };

  return (
    <Container>
      This is Sigma page
      <PartyContainer>
        <PartyList />
        <Macros />
      </PartyContainer>
      <div>
        <button onClick={() => addDebuffHandler('dynamis')}>
          Add Dynamis Debugg
        </button>
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
