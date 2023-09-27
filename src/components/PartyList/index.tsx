import React, { useState } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import Member from './Member';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const PartyList = () => {
  const party = useSelector((state: RootState) => state.party);

  return (
    <Container>
      <Member memberInfos={party.member} />
    </Container>
  );
};

export default PartyList;
