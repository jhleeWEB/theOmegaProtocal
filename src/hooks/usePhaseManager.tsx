import useDebuffGenerator from './useDebuffGenerator';
import { useEffect, useState } from 'react';
import useCountDown from 'react-countdown-hook';
import useValidator from './useValidator';
import { useDispatch, useSelector } from 'react-redux';
import { updateAfter, updateBefore } from '../redux/slices/simulationSlice';
import { RootState } from '../redux/store';

type TPhaseStatus =
  | 'idle'
  | 'delta'
  | 'deltaHellwall'
  | 'sigma'
  | 'sigmaHellwall'
  | 'omega1'
  | 'omega1Hellwall'
  | 'omega2'
  | 'omega2Hellwall'
  | 'end';

export const phaseInitalTimes = {
  delta: {
    start: 10000,
    end: 5000,
  },
  sigma: {
    start: 10000,
    end: 5000,
  },
  omega1: {
    start: 10000,
    end: 5000,
  },
  omega2: {
    start: 10000,
    end: 5000,
  },
};

export type TSimulationResult = '평가중' | '성공' | '실패';

const usePhaseManager = () => {
  const { delta, sigma, omega1, omega2 } = phaseInitalTimes;
  const { party } = useSelector((state: RootState) => state);
  const debuffGenerator = useDebuffGenerator();
  const [phaseStatus, setPhaseStatus] = useState<TPhaseStatus>('idle');
  const [simulationResult, setSimulationResult] =
    useState<TSimulationResult>('평가중');
  const [deltaTimeLeft, deltaCountdown] = useCountDown(delta.start);
  const [deltaHellwallTimeLeft, deltaHellwallCountdown] = useCountDown(
    delta.end,
  );
  const [sigmaTimeLeft, sigmaCountdown] = useCountDown(sigma.start);
  const [sigmaHellwallTimeLeft, sigmaHellwallCountdown] = useCountDown(
    sigma.end,
  );
  const [omega1TimeLeft, omega1Countdown] = useCountDown(omega1.start);
  const [omega1HellwallTimeLeft, omega1HellwallCountdown] = useCountDown(
    omega1.end,
  );
  const [omega2TimeLeft, omega2Countdown] = useCountDown(omega2.start);
  const [omega2HellwallTimeLeft, omega2HellwallCountdown] = useCountDown(
    omega2.end,
  );

  //Delta ========================
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

  //Sigma ========================
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
      setPhaseStatus('omega1');
      omega1Countdown.start();
    }
  }, [sigmaHellwallTimeLeft, phaseStatus]);

  //Omega1 ========================
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
      setPhaseStatus('omega2');
      omega2Countdown.start();
    }
  }, [omega1HellwallTimeLeft, phaseStatus]);

  //Omega2 ========================
  useEffect(() => {
    if (omega2TimeLeft <= 0 && phaseStatus === 'omega2') {
      setPhaseStatus('omega2Hellwall');
      omega2HellwallCountdown.start();
    }
  }, [omega2TimeLeft, phaseStatus]);

  useEffect(() => {
    if (omega2HellwallTimeLeft <= 0 && phaseStatus === 'omega2Hellwall') {
      debuffGenerator.applyOmegaDynamis('omega2');
      setPhaseStatus('end');
    }
  }, [omega2HellwallTimeLeft, phaseStatus]);

  useEffect(() => {
    if (phaseStatus === 'end') {
      const isSuccess =
        party.member.filter((n) => n.debuffs.length === 3).length === 8;
      setSimulationResult(isSuccess ? '성공' : '실패');
    }
  }, [phaseStatus]);

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
    simulationResult,
    startDeltaPhase,
    startSigmaPhase,
    startOmega1Phase,
    startOmega2Phase,
  };
};

export default usePhaseManager;
