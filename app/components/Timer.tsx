'use client'
import React, { useEffect, useState, useRef } from 'react';

interface TimerProps {
  initialTime: number;
  onTimeUp: () => void;
  onTimerUpdate: (time: number) => void;
}

const Timer: React.FC<TimerProps> = ({ initialTime, onTimeUp, onTimerUpdate }) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const timerIdRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (timerIdRef.current) {
      clearTimeout(timerIdRef.current);
    }
    timerIdRef.current = setTimeout(() => {
      if (timeLeft === 0) {
        onTimeUp();
      } else {
        const newTimeLeft = timeLeft-1;
        setTimeLeft(newTimeLeft);
        onTimerUpdate(newTimeLeft);
      }
    }, 1000);
    return () => {
      if(timerIdRef.current){
        clearTimeout(timerIdRef.current);
      }
  };
}, [timeLeft, onTimeUp, onTimerUpdate]);

  useEffect(()=>{
    setTimeLeft(initialTime);
  },[initialTime])

  return (
    <div className="text-center mb-4">
      <h4 className="text-xl font-bold text-black pulse-animation">Time left: {timeLeft}s</h4>
    </div>
  );
};

export default Timer;