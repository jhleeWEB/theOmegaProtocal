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
  const debuffGenerator = useDebuffGenerator();
  const [phaseStatus, setPhaseStatus] = useState<TPhaseStatus>('idle');
  const [deltaTimeLeft, deltaCountdown] = useCountDown(2000);
  const [deltaHellwallTimeLeft, deltaHellwallCountdown] = useCountDown(2000);
  const [sigmaTimeLeft, sigmaCountdown] = useCountDown(2000);
  const [sigmaHellwallTimeLeft, sigmaHellwallCountdown] = useCountDown(10000);
  const [omega1TimeLeft, omega1Countdown] = useCountDown(2000);
  const [omega1HellwallTimeLeft, omega1HellwallCountdown] = useCountDown(10000);
  const [omega2TimeLeft, omega2Countdown] = useCountDown(2000);
  const [omega2HellwallTimeLeft, omega2HellwallCountdown] = useCountDown(10000);

  //Delta
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

  //Sigma
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

  //Omega1
  useEffect(() => {
    if (omega1TimeLeft <= 0 && phaseStatus === 'omega1') {
      debuffGenerator.applyHellwall('omega1');
      setPhaseStatus('omega1Hellwall');
      omega1HellwallCountdown.start();
    }
  }, [omega1TimeLeft, phaseStatus]);

  useEffect(() => {
    if (omega1HellwallTimeLeft <= 0 && phaseStatus === 'omega1Hellwall') {
      debuffGenerator.applyOmegaDynamis('omega1');
    }
  }, [omega1HellwallTimeLeft, phaseStatus]);

  //Omega2
  useEffect(() => {
    if (omega2TimeLeft <= 0 && phaseStatus === 'omega2') {
      setPhaseStatus('omega2Hellwall');
      omega2HellwallCountdown.start();
    }
  }, [omega2TimeLeft, phaseStatus]);

  useEffect(() => {
    if (omega2HellwallTimeLeft <= 0 && phaseStatus === 'omega2Hellwall') {
      debuffGenerator.applyOmegaDynamis('omega2');
    }
  }, [omega2HellwallTimeLeft, phaseStatus]);

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
  const startOmega2Phase = () => {
    setPhaseStatus('omega2');
    omega2Countdown.start();
  };

  return {
    timer: {
      deltaTimeLeft,
      deltaHellwallTimeLeft,
      sigmaTimeLeft,
      sigmaHellwallTimeLeft,
      omega1TimeLeft,
      omega1HellwallTimeLeft,
      omega2TimeLeft,
      omega2HellwallTimeLeft,
    },
    startDeltaPhase,
    startSigmaPhase,
    startOmega1Phase,
    startOmega2Phase,
  };
};

export default usePhaseManager;
