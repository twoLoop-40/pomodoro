import { atom, selectorFamily, SerializableParam } from "recoil";
import { LapseUnit, TimeUnit } from "../types/units";
import { TimerState } from "../types/operators";
import { remainderCeil } from "../timer-apis/time-handle";

export const timeLapsedState = atom({
  key: "timeLapsedState",
  default: 0
});

interface TimeLeftResult {
  min: string;
  sec: string;
}

interface TimeLeftInput {
  rounds: number;
  goals: number;
  minsPerRound: number;
  [key: string]: SerializableParam;
}

export const timeLeftState = selectorFamily<TimeLeftResult, TimeLeftInput>({
  key: "timeLeftState",
  get: (initSet) => ({ get }) => {
    const timeOffSet =
      initSet.goals * initSet.rounds * initSet.minsPerRound * TimeUnit.min;
    const timeLeftInSec = timeOffSet - get(timeLapsedState) / TimeUnit.interval;
    const min = remainderCeil(
      timeLeftInSec,
      TimeUnit.min,
      initSet.minsPerRound
    );

    const sec = timeLeftInSec % TimeUnit.min;
    const minOnTimer = min.toString();
    const secOnTimer = sec.toString().padStart(2, "0");
    return { min: minOnTimer, sec: secOnTimer };
  }
});

export const roundState = selectorFamily<number, number>({
  key: "roundsState",
  get: (minsPerRound) => ({ get }) => {
    // timePerRound의 단위는 min
    const lapsedTimeInMin = Math.floor(
      get(timeLapsedState) / (TimeUnit.min * TimeUnit.interval)
    );
    const rounds =
      Math.floor(lapsedTimeInMin / minsPerRound) % LapseUnit.roundsPerGoal;
    return rounds;
  }
});

export const goalState = selectorFamily<number, number>({
  key: "goalState",
  get: (roundsPerGoal) => ({ get }) => {
    const lapsedTimeInMin = Math.floor(
      get(timeLapsedState) / (TimeUnit.min * TimeUnit.interval)
    );
    const rounds = Math.floor(lapsedTimeInMin / LapseUnit.minsPerRound);
    return Math.floor(rounds / roundsPerGoal);
  }
});

export const timerStates = atom<boolean>({
  key: "timerStates",
  default: TimerState.off
});
