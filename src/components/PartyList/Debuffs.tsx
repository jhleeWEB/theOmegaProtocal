import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Debuff } from '../../redux/slices/playerSlice';
import { PUBLIC_URL } from '../../env';

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
  const dynamisSrc = `${PUBLIC_URL}/debuffIcons/dynamis${
    stacked['dynamis'] ? stacked['dynamis'] : ''
  }.png`;
  const dice1Src = `${PUBLIC_URL}/debuffIcons/dice1.png`;
  const dice2Src = `${PUBLIC_URL}/debuffIcons/dice2.png`;
  const hellWallNearSrc = `${PUBLIC_URL}/debuffIcons/hellwall_near.png`;
  const hellWallFarSrc = `${PUBLIC_URL}/debuffIcons/hellwall_far.png`;
  const psFarSrc = `${PUBLIC_URL}/debuffIcons/ps_far.png`;
  const psNearSrc = `${PUBLIC_URL}/debuffIcons/ps_near.png`;
  const damageIncreaseSrc = `${PUBLIC_URL}/debuffIcons/dmg_increase.png`;
  return (
    <Container>
      {stacked['dynamis'] > 0 && <img width="30px" src={dynamisSrc} />}
      {stacked['hellwallNear'] > 0 && (
        <img width="30px" src={hellWallNearSrc} />
      )}
      {stacked['hellwallFar'] > 0 && <img width="30px" src={hellWallFarSrc} />}
      {stacked['ps_far'] > 0 && <img width="30px" src={psFarSrc} />}
      {stacked['ps_near'] > 0 && <img width="30px" src={psNearSrc} />}
      {stacked['dmg_increase'] > 0 && (
        <img width="30px" src={damageIncreaseSrc} />
      )}
      {stacked['dice1'] > 0 && <img width="30px" src={dice1Src} />}
      {stacked['dice2'] > 0 && <img width="30px" src={dice2Src} />}
    </Container>
  );
};

export default Debuffs;
