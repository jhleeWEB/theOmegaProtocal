import { useEffect, useState } from 'react';
import { setInterval } from 'timers';

const useCooldown = (debuffCooldown) => {
  const [cooldown, setCooldown] = useState(debuffCooldown);

  useEffect(() => {}, [cooldown]);
};
