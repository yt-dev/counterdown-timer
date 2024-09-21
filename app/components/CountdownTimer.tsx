"use client";

import React, { useState, useEffect } from "react";

interface CountdownTimerProps {
  targetTime: Date;
}

function CountdownTimer({ targetTime }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(targetTime));

  useEffect(() => {
    const timerId = setInterval(() => {
      if (timeLeft === 0) return;
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, [targetTime, timeLeft]);

  // const formattedTime = new Date(timeLeft * 1000).toISOString().substr(11, 8);

  return (
    <div>
      {/* <p>Time Left: {formattedTime}</p> */}
      <h1 className="flex-auto text-7xl font-semibold text-slate-900">
        {timeLeft === 0 ? "🌕" : `还有${timeLeft}秒下班，撑住🫡`}
      </h1>
    </div>
  );
}

function calculateTimeLeft(targetTime: Date): number {
  const now = new Date();

  // Set the target time to 5:30 PM of the current day
  targetTime.setHours(17, 30, 0, 0);

  if (now > targetTime) {
    // Handle case where target time has already passed
    return 0;
  }

  const differenceInSeconds = Math.floor(
    (targetTime.getTime() - now.getTime()) / 1000
  );
  return differenceInSeconds;
}

export default CountdownTimer;
