import { useResetRecoilState, useSetRecoilState } from "recoil";
import { timeLapsedState } from "../recoils/atoms";
import { useRef } from "react";

function useTimer(interval: number) {
  const reset = useResetRecoilState(timeLapsedState);
  const setTimeLapsed = useSetRecoilState(timeLapsedState);
  const timerId = useRef<NodeJS.Timeout | null>(null);

  const runTimer = () => {
    timerId.current = setInterval(
      () => setTimeLapsed((currentTime) => currentTime + interval),
      interval
    );
  };

  const dropTimer = () => {
    if (timerId.current) {
      clearInterval(timerId.current);
      timerId.current = null;
    }
  };

  return { reset, runTimer, dropTimer };
}

export default useTimer;
