import React from 'react';
import styled from 'styled-components';
import { Debuff } from '../../redux/slices/playerSlice';

const Icon = ({ debuff }) => {
  return <div>{debuff}</div>;
};

const Container = styled.div``;

interface Props {
  debuffs: Debuff[];
}

const Debuffs = ({ debuffs }: Props) => {
  return (
    <Container>
      {debuffs.map((debuff) => (
        <div>{debuff}</div>
      ))}
    </Container>
  );
};

export default Debuffs;
