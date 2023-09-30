import React, { useEffect } from 'react';
import styled from 'styled-components';
import PartyList from '../components/PartyList';
import Macros from '../components/PartyList/Macros';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import usePhaseManager from '../hooks/usePhaseManager';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';

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

const TimerContainer = styled.div`
  display: flex;
`;

const Timer = styled.div`
  font-weight: bold;
  font-size: 34px;
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
      <TimerContainer>
        <h1>Delta</h1>
        <Timer>{phaseManager.timer.deltaTimeLeft / 1000}</Timer>
        <Timer>{phaseManager.timer.deltaHellwallTimeLeft / 1000}</Timer>
        <h1>Sigma</h1>
        <Timer>{phaseManager.timer.sigmaTimeLeft / 1000}</Timer>
        <Timer>{phaseManager.timer.sigmaHellwallTimeLeft / 1000}</Timer>
      </TimerContainer>
      <TimerContainer>
        <h1>Omega1</h1>
        <Timer>{phaseManager.timer.omega1TimeLeft / 1000}</Timer>
        <Timer>{phaseManager.timer.omega1HellwallTimeLeft / 1000}</Timer>
        <h1>Omega2</h1>
        <Timer>{phaseManager.timer.omega2TimeLeft / 1000}</Timer>
        <Timer>{phaseManager.timer.omega2HellwallTimeLeft / 1000}</Timer>
      </TimerContainer>
    </Container>
  );
}
