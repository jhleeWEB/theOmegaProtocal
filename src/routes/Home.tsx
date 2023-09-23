import React, { useEffect } from 'react';
import styled from 'styled-components';
import ThemeToggleSwitch from '../components/ThemeToggleSwitch';
import { useHistory } from 'react-router-dom';

// This is example of styled-components
const Container = styled.main`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 1rem;
`;

// This is example of styled-components with TypeScript or you can make interface of props
const Content = styled.div`
  font-size: 3rem;
  font-weight: 900;
  margin: 1rem 0;
`;

const PhaseButtonContainer = styled.div`
  width: 50%;
  display: flex;
  justify-content: space-evenly;
`;
const PhaseButton = styled.button`
  height: 10rem;
  width: 10rem;
`;

export default function Home() {
  const history = useHistory();

  const handleOnPhaseButtonClick = (e: any, path?: string) => {
    history.push(path);
  };

  return (
    <Container className="App">
      <ThemeToggleSwitch />
      <Content>
        절 오메가 프로토콜
        <br />
        5페이즈: 시그마
        <br />
        징맨 시뮬레이션
      </Content>
      <PhaseButtonContainer>
        <PhaseButton onClick={(e) => handleOnPhaseButtonClick(e, '/sigma')}>
          시그마(Sigma)
        </PhaseButton>
        <PhaseButton onClick={(e) => handleOnPhaseButtonClick(e, '/omega')}>
          오메가(Omega)
        </PhaseButton>
      </PhaseButtonContainer>
    </Container>
  );
}
