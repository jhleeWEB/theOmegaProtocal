import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { nextPhase } from '../redux/slices/simulationSlice';
import useDebuffGenerator from './useDebuffGenerator';
import { useEffect, useState } from 'react';
import useCountDown from 'react-countdown-hook';

type TPhaseStatus =
  | 'idle'
  | 'delta'
  | 'deltaHellwall'
  | 'sigma'
  | 'sigmaHellwall';

const usePhaseManager = () => {
  const dispatch = useDispatch();
  const { simulation, party } = useSelector((state: RootState) => state);
  const { name, order, delay, debuffs } = simulation.current.phase;
  const debuffGenerator = useDebuffGenerator();
  const { removeHellwall } = debuffGenerator;
  const [phaseStatus, setPhaseStatus] = useState<TPhaseStatus>('idle');
  const [isDeltaStart, setIsDeltaStart] = useState(false);
  const [isSigmaStart, setIsSigmaStart] = useState(false);
  const [deltaTimeLeft, deltaCountdown] = useCountDown(5000);
  const [deltaHellwallTimeLeft, deltaHellwallCountdown] = useCountDown(5000);
  const [sigmaTimeLeft, sigmaCountdown] = useCountDown(2000);
  const [sigmaHellwallTimeLeft, sigmaHellwallCountdown] = useCountDown(2000);
  const omega1CountDown = useCountDown(2000);
  const omega2CountDown = useCountDown(2000);

  useEffect(() => {
    if (deltaTimeLeft <= 0 && phaseStatus === 'delta') {
      debuffGenerator.applyHellwall('delta');
      setPhaseStatus('deltaHellwall');
      deltaHellwallCountdown.start();
    }
  }, [deltaTimeLeft, phaseStatus]);

  useEffect(() => {
    if (deltaHellwallTimeLeft <= 0 && phaseStatus === 'deltaHellwall') {
      debuffGenerator.applyDynamis('delta');
      setPhaseStatus('sigma');
      sigmaCountdown.start();
    }
  }, [deltaHellwallTimeLeft, phaseStatus]);

  useEffect(() => {
    if (sigmaTimeLeft <= 0 && phaseStatus === 'sigma') {
      debuffGenerator.applyHellwall('sigma');
      setPhaseStatus('sigmaHellwall');
      sigmaHellwallCountdown.start();
    }
  }, [sigmaTimeLeft, phaseStatus]);

  useEffect(() => {
    if (sigmaHellwallTimeLeft <= 0 && phaseStatus === 'sigmaHellwall') {
      debuffGenerator.applyDynamis('sigma');
    }
  }, [sigmaHellwallTimeLeft, phaseStatus]);

  const startDeltaPhase = () => {
    setPhaseStatus('delta');
    deltaCountdown.start();
  };
  const startSigmaPhase = () => {
    setPhaseStatus('sigma');
    sigmaCountdown.start();
  };

  // const startSigmaPhase = () => {
  //   const { applyHellwall } = debuffGenerator;
  //   applyHellwall(name, 2000).then(() => endSigmaPhase(10000));
  // };
  // const startOmega1Phase = () => {
  //   const { applyHellwall } = debuffGenerator;
  //   applyHellwall(name, 2000)
  //     .then(() => endOmega1Phase(10000))
  //     .catch((e) => console.log(e));
  // };
  // const startOmega2Phase = () => {};

  // const endDeltaPhase = (delay = 0) => {
  //   const { applySigmaDynamis } = debuffGenerator;
  //   return new Promise((resolve) => {
  //     setTimeout(() => {
  //       removeHellwall();
  //       applySigmaDynamis();
  //       dispatch(nextPhase());
  //       resolve('resolve');
  //     }, delay);
  //   });
  // };
  // const endSigmaPhase = (delay = 0) => {
  //   const { applyOmega1Dynamis } = debuffGenerator;
  //   return new Promise((resolve) => {
  //     setTimeout(() => {
  //       removeHellwall();
  //       applyOmega1Dynamis(2000);
  //       dispatch(nextPhase());
  //       resolve('resolve');
  //     }, delay);
  //   });
  // };
  // const endOmega1Phase = (delay = 0) => {
  //   return new Promise((resolve) => {
  //     setTimeout(() => {
  //       removeHellwall();
  //       dispatch(nextPhase());
  //       resolve('resolve');
  //     }, delay);
  //   });
  // };
  // const endOmega2Phase = () => {
  //   dispatch(nextPhase());
  // };
  return {
    deltaTimeLeft,
    deltaHellwallTimeLeft,
    startDeltaPhase,
    startSigmaPhase,
    // startSigmaPhase,
    // startOmega1Phase,
    // startOmega2Phase,
    // endDeltaPhase,
    // endOmega1Phase,
    // endOmega2Phase,
    // endSigmaPhase,
  };
};

export default usePhaseManager;
