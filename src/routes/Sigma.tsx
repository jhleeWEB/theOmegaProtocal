import React, { useEffect } from 'react';
import styled from 'styled-components';
import PartyList from '../components/PartyList';
import Macros from '../components/PartyList/Macros';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import usePhaseManager from '../hooks/usePhaseManager';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import PhaseTimers from '../components/PhaseTimers';

const Container = styled.main`
  position: relative;
`;

const PartyContainer = styled.div`
  display: flex;
`;

const PhaseCountdownTimerContainer = styled.div`
  display: flex;
`;

const ControlButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100px;
`;

export default function Sigma() {
  const { simulation, party } = useSelector((state: RootState) => state);
  const phaseManager = usePhaseManager();

  const onClickDelta = () => {
    phaseManager.startDeltaPhase();
  };
  const onClickSigma = () => {
    phaseManager.startSigmaPhase();
  };
  const onClickOmega1 = () => {
    phaseManager.startOmega1Phase();
  };
  const onClickOmega2 = () => {
    phaseManager.startOmega2Phase();
  };

  return (
    <Container>
      <PartyContainer>
        <PartyList />
        <Macros />
      </PartyContainer>
      <ControlButtonContainer>
        <button onClick={onClickDelta}>Start Delta</button>
        <button onClick={onClickSigma}>Start Sigma</button>
        <button onClick={onClickOmega1}>Start Omega1</button>
        <button onClick={onClickOmega2}>Start Omega2</button>
      </ControlButtonContainer>
      <PhaseTimers timer={phaseManager.timer} />
    </Container>
  );
}
