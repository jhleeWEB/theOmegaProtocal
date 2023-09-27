import React from 'react';
import styled from 'styled-components';
import PartyList from '../components/PartyList';
import Macros from '../components/PartyList/Macros';

const Container = styled.main``;

const PartyContainer = styled.div`
  display: flex;
`;

export default function Sigma() {
  return (
    <Container>
      This is Sigma page
      <PartyContainer>
        <PartyList />
        <Macros />
      </PartyContainer>
      <div>
        <button>start</button>
        <button>pause</button>
      </div>
    </Container>
  );
}
