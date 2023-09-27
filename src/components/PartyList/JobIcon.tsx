import React from 'react';
import { Job } from '../../redux/slices/playerSlice';
import styled from 'styled-components';

interface Props {
  job: Job;
}

const Container = styled.div``;

const JobIcon = ({ job }: Props) => {
  const path = `/jobIcons/${job}.png`;
  return (
    <Container>
      <img height={50} width={50} src={path} />
    </Container>
  );
};

export default JobIcon;
