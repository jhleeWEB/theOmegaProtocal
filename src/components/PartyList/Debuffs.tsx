import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Debuff } from '../../redux/slices/playerSlice';

const Icon = ({ debuff }) => {
  return <div>{debuff}</div>;
};

const Container = styled.div``;

const getStackedDebuffs = (debuffs: Debuff[]) => {
  const stacked = debuffs.reduce(function (prev, curr) {
    prev[curr] = (prev[curr] || 0) + 1;
    return prev;
  }, {});
  return stacked;
};

interface Props {
  debuffs: Debuff[];
}

const Debuffs = ({ debuffs }: Props) => {
  const stacked = getStackedDebuffs(debuffs);
  const dynamisSrc = `/debuffIcons/dynamis${
    stacked['dynamis'] ? stacked['dynamis'] : ''
  }.png`;
  const dice1Src = `/debuffIcons/dice1.png`;
  const dice2Src = `/debuffIcons/dice2.png`;
  const hellWallNearSrc = `/debuffIcons/hellwall_near.png`;
  const hellWallFarSrc = `/debuffIcons/hellwall_far.png`;
  return (
    <Container>
      {stacked['dynamis'] > 0 && <img width="30px" src={dynamisSrc} />}
      {stacked['hellwallNear'] > 0 && (
        <img width="30px" src={hellWallNearSrc} />
      )}
      {stacked['hellwallFar'] > 0 && <img width="30px" src={hellWallFarSrc} />}
      {stacked['dice1'] > 0 && <img width="30px" src={dice1Src} />}
      {stacked['dice2'] > 0 && <img width="30px" src={dice2Src} />}
    </Container>
  );
};

export default Debuffs;
