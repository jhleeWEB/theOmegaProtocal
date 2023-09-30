import React from 'react';
import styled from 'styled-components';
import usePhaseManager, {
  TSimulationResult,
  phaseInitalTimes,
} from '../hooks/usePhaseManager';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';

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
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const Time = styled.div`
  text-align: center;
  font-weight: bold;
  font-size: 120px;
`;
const Prefix = styled.div`
  text-align: center;
  font-weight: bold;
  font-size: 32px;
`;
const Suffix = styled.div`
  text-align: center;
  font-weight: bold;
  font-size: 32px;
`;
const Result = styled.div<{ simulationResult: TSimulationResult }>`
  text-align: center;
  font-size: 80px;
  font-weight: bold;
  color: ${(props) => (props.simulationResult === '성공' ? 'green' : 'red')};
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
  simulationResult: TSimulationResult;
}

const PhaseTimers = ({ timer, simulationResult }: Props) => {
  const { delta, sigma, omega1, omega2 } = phaseInitalTimes;
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
        {simulationResult === '성공' && (
          <Result simulationResult={simulationResult}>
            {simulationResult}!!!
          </Result>
        )}
        {simulationResult === '실패' && (
          <Result simulationResult={simulationResult}>
            {simulationResult}...
          </Result>
        )}
        {showDeltaTimer && (
          <CountdownCircleTimer
            isPlaying
            duration={delta.start / 1000}
            colors={['#004777', '#F7B801', '#A30000', '#A30000']}
            colorsTime={[7, 5, 2, 0]}
            strokeWidth={50}
            size={500}
          >
            {({ remainingTime }) => {
              return (
                <Timer>
                  <Prefix>헬로월드 부여</Prefix>
                  <Time>{timer.deltaTimeLeft / 1000}</Time>
                  <Suffix>초</Suffix>
                </Timer>
              );
            }}
          </CountdownCircleTimer>
        )}
        {showDeltaHellwallTimer && (
          <CountdownCircleTimer
            isPlaying
            duration={delta.end / 1000}
            colors={['#004777', '#F7B801', '#A30000', '#A30000']}
            colorsTime={[7, 5, 2, 0]}
            strokeWidth={50}
            size={500}
          >
            {({ remainingTime }) => {
              return (
                <Timer>
                  <Prefix>뒤나미스 시전</Prefix>
                  <Time>{timer.deltaHellwallTimeLeft / 1000}</Time>
                  <Suffix>초</Suffix>
                </Timer>
              );
            }}
          </CountdownCircleTimer>
        )}
        {showSigmaTimer && (
          <CountdownCircleTimer
            isPlaying
            duration={sigma.start / 1000}
            colors={['#004777', '#F7B801', '#A30000', '#A30000']}
            colorsTime={[7, 5, 2, 0]}
            strokeWidth={50}
            size={500}
          >
            {({ remainingTime }) => {
              return (
                <Timer>
                  <Prefix>헬로월드 시전</Prefix>
                  <Time>{timer.sigmaTimeLeft / 1000}</Time>
                  <Suffix>초</Suffix>
                </Timer>
              );
            }}
          </CountdownCircleTimer>
        )}
        {showSigmaHellwallTimer && (
          <CountdownCircleTimer
            isPlaying
            duration={sigma.end / 1000}
            colors={['#004777', '#F7B801', '#A30000', '#A30000']}
            colorsTime={[7, 5, 2, 0]}
            strokeWidth={50}
            size={500}
          >
            {({ remainingTime }) => {
              return (
                <Timer>
                  <Prefix>뒤나미스 시전</Prefix>
                  <Time>{timer.sigmaHellwallTimeLeft / 1000}</Time>
                  <Suffix>초</Suffix>
                </Timer>
              );
            }}
          </CountdownCircleTimer>
        )}
        {showOmega1Timer && (
          <CountdownCircleTimer
            isPlaying
            duration={omega1.start / 1000}
            colors={['#004777', '#F7B801', '#A30000', '#A30000']}
            colorsTime={[7, 5, 2, 0]}
            strokeWidth={50}
            size={500}
          >
            {({ remainingTime }) => {
              return (
                <Timer>
                  <Prefix>헬로월드 시전</Prefix>
                  <Time>{timer.omega1TimeLeft / 1000}</Time>
                  <Suffix>초</Suffix>
                </Timer>
              );
            }}
          </CountdownCircleTimer>
        )}
        {showOmega1HellwallTimer && (
          <CountdownCircleTimer
            isPlaying
            duration={omega1.end / 1000}
            colors={['#004777', '#F7B801', '#A30000', '#A30000']}
            colorsTime={[7, 5, 2, 0]}
            strokeWidth={50}
            size={500}
          >
            {({ remainingTime }) => {
              return (
                <Timer>
                  <Prefix>뒤나미스 시전</Prefix>
                  <Time>{timer.omega1HellwallTimeLeft / 1000}</Time>
                  <Suffix>초</Suffix>
                </Timer>
              );
            }}
          </CountdownCircleTimer>
        )}
        {showOmega2Timer && (
          <CountdownCircleTimer
            isPlaying
            duration={omega2.start / 1000}
            colors={['#004777', '#F7B801', '#A30000', '#A30000']}
            colorsTime={[7, 5, 2, 0]}
            strokeWidth={50}
            size={500}
          >
            {({ remainingTime }) => {
              return (
                <Timer>
                  <Prefix>헬로월드 시전</Prefix>
                  <Time>{timer.omega2TimeLeft / 1000}</Time>
                  <Suffix>초</Suffix>
                </Timer>
              );
            }}
          </CountdownCircleTimer>
        )}
        {showOmega2HellwallTimer && (
          <CountdownCircleTimer
            isPlaying
            duration={omega2.end / 1000}
            colors={['#004777', '#F7B801', '#A30000', '#A30000']}
            colorsTime={[7, 5, 2, 0]}
            strokeWidth={50}
            size={500}
          >
            {({ remainingTime }) => {
              return (
                <Timer>
                  <Prefix>뒤나미스 시전</Prefix>
                  <Time>{timer.omega2HellwallTimeLeft / 1000}</Time>
                  <Suffix>초</Suffix>
                </Timer>
              );
            }}
          </CountdownCircleTimer>
        )}
      </TimerContainer>
    </Container>
  );
};

export default PhaseTimers;
