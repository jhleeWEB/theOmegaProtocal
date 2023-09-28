import React from 'react';
import styled from 'styled-components';
import PartyList from '../components/PartyList';
import Macros from '../components/PartyList/Macros';
import { batch, useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import {
  Debuff,
  Player,
  addDebuff,
  removeAllHellwallDebuffs,
  removeDebuff,
} from '../redux/slices/playerSlice';
import useDebuffGenerator, { TPhase } from '../hooks/useDebuffGenerator';

const Container = styled.main``;

const PartyContainer = styled.div`
  display: flex;
`;

const ControlButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100px;
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

  const applyDiceDebuffs = () => {
    const dicePlayers = debuffGenerator.generateRandomDice(
      party.member,
    ) as Player[];
    batch(() => {
      const farTargets = dicePlayers.filter((n) =>
        n.debuffs.includes('hellwallFar'),
      );
      const nearTargets = dicePlayers.filter((n) =>
        n.debuffs.includes('hellwallNear'),
      );
      farTargets.forEach((n, i) => {
        const target = party.member.indexOf(n);
        const debuff = i % 2 == 0 ? 'dice1' : 'dice2';
        dispatch(addDebuff({ debuff, target }));
      });
      nearTargets.forEach((n, i) => {
        const target = party.member.indexOf(n);
        const debuff = i % 2 == 0 ? 'dice1' : 'dice2';
        dispatch(addDebuff({ debuff, target }));
      });
    });
  };

  const applyDeltaDynamis = () => {
    const debuffedPlayers = debuffGenerator.generateRandomDynamis(
      party.member,
      'delta',
    );
    debuffedPlayers.forEach((n) => {
      const target = party.member.indexOf(n);
      const debuff = 'dynamis';
      dispatch(addDebuff({ debuff, target }));
    });
  };
  const applySigmaDynamis = () => {
    const debuffedPlayers = debuffGenerator.generateRandomDynamis(
      party.member,
      'sigma',
    );
    batch(() => {
      debuffedPlayers.forEach((n) => {
        const target = party.member.indexOf(n);
        const debuff = 'dynamis';
        dispatch(addDebuff({ debuff, target }));
      });
    });
  };
  const applyOmega1Dynamis = () => {
    const debuffedPlayers = debuffGenerator.generateRandomDynamis(
      party.member,
      'omega1',
    );
    batch(() => {
      debuffedPlayers.forEach((n) => {
        const target = party.member.indexOf(n);
        const debuff = 'dynamis';
        dispatch(addDebuff({ debuff, target }));
      });
    });
  };

  const applyHellwall = (phase: TPhase) => {
    const debuffedPlayers = debuffGenerator.generateRandomHellWall(
      party.member,
      phase,
    );
    batch(() => {
      debuffedPlayers.forEach((n, i) => {
        const target = party.member.indexOf(n);
        const debuff = i % 2 == 0 ? 'hellwallFar' : 'hellwallNear';
        dispatch(addDebuff({ debuff, target }));
      });
    });
  };
  const removeHellwall = () => {
    dispatch(removeAllHellwallDebuffs());
  };

  return (
    <Container>
      This is Sigma page
      <PartyContainer>
        <PartyList />
        <Macros />
      </PartyContainer>
      <ControlButtonContainer>
        <button onClick={applyDeltaDynamis}>Add Delta Dynamis Debuff</button>
        <button onClick={applySigmaDynamis}>Add Sigma Dynamis Debuff</button>
        <button onClick={applyOmega1Dynamis}>Add Omega1 Dynamis Debuff</button>
        <button onClick={() => applyHellwall('delta')}>Add Hell Wall</button>
        <button onClick={() => applyHellwall('omega1')}>
          Add Omega Hell Wall
        </button>
        <button onClick={removeHellwall}>remove hellwall Debuff</button>
        <button onClick={applyDiceDebuffs}>Add Dice Debuff</button>
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
      </ControlButtonContainer>
    </Container>
  );
}
