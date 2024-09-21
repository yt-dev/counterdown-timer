"use client";

import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";

import workerPic from "../assets/worker.png";
import oyePic from "../assets/oye.png";
import excitedPic from "../assets/excited.png";

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

  const isWeekend = useMemo(() => !isWeekday(new Date()), []);

  return (
    <div>
      <Image
        className="dark:invert"
        src={isWeekend ? excitedPic : timeLeft ? workerPic : oyePic}
        alt="Losed sticker here..."
        width={180}
        height={38}
        priority
      />
      <h1 className="flex-auto text-7xl font-semibold text-slate-900">
        {isWeekend
          ? "Happy Weekend."
          : timeLeft
          ? `还有${timeLeft}秒下班，撑住🫡`
          : "沉迷工作不能自拔"}
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

function isWeekday(date: Date): boolean {
  return date.getDay() >= 1 && date.getDay() <= 5;
}

export default CountdownTimer;
