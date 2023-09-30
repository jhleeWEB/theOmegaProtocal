import React, { useEffect, useState } from 'react';
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
  width: 100%;
  height: 100%;
`;

const Button = styled.button`
  min-height: 150px;
  min-width: 150px;
  margin: 2px;
  background: rgba(255, 255, 255, 0.16);
  font-size: 32px;
  border-radius: 10px;
  box-shadow: 0 0px 5px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(6.3px);
  -webkit-backdrop-filter: blur(6.3px);
  border: 1px solid rgba(255, 255, 255, 0.47);
  &:hover {
    border: 2px solid rgb(255, 238, 153);
    box-shadow: 0 0px 30px rgb(255, 238, 153);
  }
`;

const PartyContainer = styled.div`
  display: flex;
`;

const ControlButtonContainer = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  width: 100px;
  left: 0;
  bottom: 0;
`;

const RuleContainer = styled.div`
  position: absolute;
  font-size: 10px;
  right: 0;
  bottom: 0;
`;

export default function Sigma() {
  const phaseManager = usePhaseManager();
  const [isStartButtonClicked, setIsStartButtonClicked] = useState(false);
  const onClickStartSimulation = () => {
    phaseManager.startDeltaPhase();
    setIsStartButtonClicked(!isStartButtonClicked);
  };
  const onClickResetSimulation = () => {
    window.location.reload();
  };

  return (
    <Container className="App">
      <PartyContainer>
        <PartyList />
        <Macros />
      </PartyContainer>
      <ControlButtonContainer>
        {isStartButtonClicked ? (
          <Button onClick={onClickResetSimulation}>다시시작</Button>
        ) : (
          <Button onClick={onClickStartSimulation}>시작</Button>
        )}
      </ControlButtonContainer>

      <PhaseTimers
        timer={phaseManager.timer}
        simulationResult={phaseManager.simulationResult}
      />
      <RuleContainer>
        <div>
          <b>델타</b>
          <p>델타 페이즈에서는 특별히 할것이 없습니다.</p>
        </div>
        <div>
          <b>시그마</b>
          <p>숙박징 1번과 3번은 뒤나미스 디버프를 부여 받지 않습니다.</p>
        </div>
        <div>
          <b>오메가1</b>
          <p>숙박징 1번과 2번은 뒤나미스 디버프를 부여 받지 않습니다.</p>
        </div>
        <div>
          <b>오메가2</b>
          <p>숙박징 1번과 2번은 뒤나미스 디버프를 부여 받지 않습니다.</p>
        </div>
        <div>
          <b>결과</b>
          <p>모두가 뒤나미스 3스택으로 마무리 되어야 성공합니다.</p>
        </div>
      </RuleContainer>
    </Container>
  );
}
