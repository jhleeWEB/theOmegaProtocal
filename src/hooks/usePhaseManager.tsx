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
  | 'sigmaHellwall'
  | 'omega1'
  | 'omega1Hellwall'
  | 'omega2'
  | 'omega2Hellwall';

const usePhaseManager = () => {
  const dispatch = useDispatch();
  const { simulation, party } = useSelector((state: RootState) => state);
  const debuffGenerator = useDebuffGenerator();
  const { removeHellwall } = debuffGenerator;
  const [phaseStatus, setPhaseStatus] = useState<TPhaseStatus>('idle');
  const [deltaTimeLeft, deltaCountdown] = useCountDown(2000);
  const [deltaHellwallTimeLeft, deltaHellwallCountdown] = useCountDown(2000);
  const [sigmaTimeLeft, sigmaCountdown] = useCountDown(2000);
  const [sigmaHellwallTimeLeft, sigmaHellwallCountdown] = useCountDown(10000);
  const [omega1TimeLeft, omega1Countdown] = useCountDown(2000);
  const [omega1HellwallTimeLeft, omega1HellwallCountdown] = useCountDown(10000);

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
      // setPhaseStatus('sigma');
      // sigmaCountdown.start();
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

  useEffect(() => {
    if (omega1TimeLeft <= 0 && phaseStatus === 'omega1') {
      debuffGenerator.applyHellwall('omega1');
      setPhaseStatus('omega1Hellwall');
      omega1HellwallCountdown.start();
    }
  }, [omega1TimeLeft, phaseStatus]);

  useEffect(() => {
    if (omega1HellwallTimeLeft <= 0 && phaseStatus === 'omega1Hellwall') {
      debuffGenerator.applyDynamis('omega1');
    }
  }, [omega1HellwallTimeLeft, phaseStatus]);

  const startDeltaPhase = () => {
    setPhaseStatus('delta');
    deltaCountdown.start();
  };
  const startSigmaPhase = () => {
    setPhaseStatus('sigma');
    sigmaCountdown.start();
  };
  const startOmega1Phase = () => {
    setPhaseStatus('omega1');
    omega1Countdown.start();
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
    timer: {
      deltaTimeLeft,
      deltaHellwallTimeLeft,
      sigmaTimeLeft,
      sigmaHellwallTimeLeft,
      omega1TimeLeft,
      omega1HellwallTimeLeft,
    },
    startDeltaPhase,
    startSigmaPhase,
    startOmega1Phase,
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
