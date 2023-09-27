import React, { ReactElement, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Player } from '../../redux/slices/playerSlice';
import Debuffs from './Debuffs';
import JobIcon from './JobIcon';

const Container = styled.div`
  display: flex;
  flex-direction: row;
`;
const Name = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  font-weight: bold;
`;

interface Props {
  memberInfos: Player[];
}
const Member = ({ memberInfos }: Props) => {
  return (
    <>
      {memberInfos.map((member) => {
        const { job, name, debuffs } = member;
        return (
          <Container>
            <JobIcon job={job} />
            <Name>{name}</Name>
            <Debuffs debuffs={debuffs} />
          </Container>
        );
      })}
    </>
  );
};

export default Member;
