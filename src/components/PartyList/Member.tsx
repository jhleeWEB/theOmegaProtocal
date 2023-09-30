import React, { ReactElement, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Player } from '../../redux/slices/playerSlice';
import Debuffs from './Debuffs';
import JobIcon from './JobIcon';
import { PUBLIC_URL } from '../../env';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 16px;
  font-weight: bold;
`;
const Name = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PlayerInfoContainer = styled.div`
  min-width: 240px;
`;

const NameContainer = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  padding: 0;
`;

const HealthContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const HealthBarContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Bar = styled.div`
  background-color: lightblue;
  min-height: 4px;
  min-width: 100px;
`;
interface Props {
  memberInfos: Player[];
}

const Member = ({ memberInfos }: Props) => {
  return (
    <>
      {memberInfos.map((member, i) => {
        const { job, name, debuffs } = member;
        return (
          <Container key={`player_${member.name}_${i}`}>
            <JobIcon job={job} />
            <PlayerInfoContainer>
              <NameContainer>
                <img
                  width="16px"
                  height="16px"
                  src={`${PUBLIC_URL}/partyIcons/${i + 1}.png`}
                />
                <Name>레벨 90 {name}</Name>
              </NameContainer>
              <HealthBarContainer>
                <Bar />
                <Bar />
              </HealthBarContainer>
              <HealthContainer>
                <div>100020</div>
                <div>100.00</div>
              </HealthContainer>
            </PlayerInfoContainer>
            <Debuffs debuffs={debuffs} />
          </Container>
        );
      })}
    </>
  );
};

export default Member;
