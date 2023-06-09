import { useRecoilState, useRecoilValue } from "recoil";
import { PauseIcon } from "./css/icons";
import { PlayIcon } from "./css/icons";
import {
  goalState,
  roundState,
  timeLeftState,
  timerStates
} from "./recoils/atoms";
import useTimer from "./timer-apis/create-timer";
import ShowTime from "./components/time-board";
import Head from "./components/header";
import { useEffect } from "react";
import {
  Button,
  RecordBoard,
  RecordContainer,
  Span,
  TimeContainer,
  Wrapper
} from "./css/styled-components";
import { LapseUnit, TimeUnit } from "./types/units";
import { TimerState } from "./types/operators";

export default function App() {
  const [isOn, setIsOn] = useRecoilState(timerStates);
  const { reset, dropTimer, runTimer } = useTimer(TimeUnit.interval);
  const { min, sec } = useRecoilValue(
    timeLeftState({
      minsPerRound: LapseUnit.minsPerRound,
      goals: LapseUnit.goals,
      rounds: LapseUnit.roundsPerGoal
    })
  );
  const rounds = useRecoilValue(roundState(LapseUnit.minsPerRound));
  const goals = useRecoilValue(goalState(LapseUnit.roundsPerGoal));
  useEffect(() => {
    if (isOn) {
      runTimer();
    } else {
      dropTimer();
    }
    return dropTimer;
  }, [isOn, dropTimer, runTimer]);

  useEffect(() => {
    if (goals === LapseUnit.goals || Number(min) === LapseUnit.minsPerRound) {
      setIsOn(() => TimerState.off);
    }
  }, [min, setIsOn, goals]);

  const onTimerBtnClick = () => {
    if (goals === LapseUnit.goals) {
      reset();
    }
    setIsOn((prev) => !prev);
  };

  return (
    <Wrapper>
      <Head title="Pomodoro" />
      <TimeContainer>
        <ShowTime timeNum={min} />
        <Span>:</Span>
        <ShowTime timeNum={sec} />
      </TimeContainer>
      <Button
        whileHover={{
          scale: 1.2,
          transition: { duration: 0.3 }
        }}
        whileTap={{ scale: 0.8 }}
        onClick={onTimerBtnClick}
      >
        {isOn ? <PauseIcon /> : <PlayIcon />}
      </Button>
      <RecordContainer>
        <RecordBoard>
          <Span>{`${rounds}/${LapseUnit.roundsPerGoal}`}</Span>
          <span>ROUND</span>
        </RecordBoard>
        <RecordBoard>
          <Span>{`${goals}/${LapseUnit.goals}`}</Span>
          <span>GOAL</span>
        </RecordBoard>
      </RecordContainer>
    </Wrapper>
  );
}
