import React from 'react';
import styled from 'styled-components';
import usePhaseManager from '../hooks/usePhaseManager';

const Container = styled.div`
  position: absolute;
  right: 0;
  top: 0;
`;

const TimerContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Timer = styled.div`
  font-weight: bold;
  font-size: 34px;
`;
const PhaseName = styled.div`
  font-weight: bold;
  font-size: 34px;
`;

interface Props {
  timer: {
    deltaTimeLeft: number;
    deltaHellwallTimeLeft: number;
    sigmaTimeLeft: number;
    sigmaHellwallTimeLeft: number;
    omega1TimeLeft: number;
    omega1HellwallTimeLeft: number;
    omega2TimeLeft: number;
    omega2HellwallTimeLeft: number;
  };
}

const PhaseTimers = ({ timer }: Props) => {
  const showDeltaTimer = timer.deltaTimeLeft > 0;
  const showDeltaHellwallTimer = timer.deltaHellwallTimeLeft > 0;
  const showSigmaTimer = timer.sigmaTimeLeft > 0;
  const showSigmaHellwallTimer = timer.sigmaHellwallTimeLeft > 0;
  const showOmega1Timer = timer.omega1TimeLeft > 0;
  const showOmega1HellwallTimer = timer.omega1HellwallTimeLeft > 0;
  const showOmega2Timer = timer.omega2TimeLeft > 0;
  const showOmega2HellwallTimer = timer.omega2HellwallTimeLeft > 0;
  return (
    <Container>
      <TimerContainer>
        <PhaseName>타이머</PhaseName>
        {showDeltaTimer && (
          <Timer>헬월 시작 {timer.deltaTimeLeft / 1000}초 전</Timer>
        )}
        {showDeltaHellwallTimer && (
          <Timer>뒤나미스 부여 {timer.deltaHellwallTimeLeft / 1000}초 전</Timer>
        )}
        {showSigmaTimer && (
          <Timer>헬월 시작 {timer.sigmaTimeLeft / 1000}초 전</Timer>
        )}
        {showSigmaHellwallTimer && (
          <Timer>뒤나미스 부여 {timer.sigmaHellwallTimeLeft / 1000}초 전</Timer>
        )}
        {showOmega1Timer && (
          <Timer>헬월 시작 {timer.omega1TimeLeft / 1000}초 전</Timer>
        )}
        {showOmega1HellwallTimer && (
          <Timer>
            뒤나미스 부여 {timer.omega1HellwallTimeLeft / 1000}초 전
          </Timer>
        )}
        {showOmega2Timer && (
          <Timer>헬월 시작 {timer.omega2TimeLeft / 1000}초 전</Timer>
        )}
        {showOmega2HellwallTimer && (
          <Timer>
            뒤나미스 부여 {timer.omega2HellwallTimeLeft / 1000}초 전
          </Timer>
        )}
      </TimerContainer>
    </Container>
  );
};

export default PhaseTimers;
