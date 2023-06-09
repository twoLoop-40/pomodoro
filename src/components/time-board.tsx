import { motion, useAnimate, usePresence } from "framer-motion";
import React, { EffectCallback, useEffect } from "react";
import styled from "styled-components";

const TimeBoard = styled(motion.div)`
  display: flex;
  flex-direction: column;
  flex: 1 0 auto;
  justify-content: center;
  text-align: center;
  width: 100%;
  margin-left: 2rem;
  margin-right: 2rem;
  max-width: 12rem;
  min-height: 18rem;
  border-radius: 1rem; /* rounded-2xl is typically around 1rem */
  background-color: whitesmoke;
  color: #e44337;
  padding: 0.5rem; /* p-2 is typically around 0.5rem */
`;

interface ShowTimeProps {
  timeNum: string;
}
function ShowTime({ timeNum }: ShowTimeProps) {
  const [scope, animate] = useAnimate();
  const [isPresent, safeToRemove] = usePresence();

  useEffect((): ReturnType<EffectCallback> => {
    if (isPresent) {
      animate(scope.current, { scale: [0.8, 1] });
    }
    return () => {
      if (safeToRemove) safeToRemove();
    };
  }, [timeNum, scope, animate, safeToRemove, isPresent]);

  return (
    <TimeBoard
      ref={scope}
      transition={{
        duration: 0.3,
        ease: ["easeOut"]
      }}
    >
      {timeNum}
    </TimeBoard>
  );
}

export default React.memo(ShowTime);
