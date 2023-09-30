import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const useValidator = () => {
  const { party } = useSelector((state: RootState) => state);

  const validateDelta = () => {};
  const validateSigma = () => {
    console.log(party);
  };
  const validateOmega1 = () => {};
  const validateOmega2 = () => {};

  return {
    validateDelta,
    validateSigma,
    validateOmega1,
    validateOmega2,
  };
};

export default useValidator;
