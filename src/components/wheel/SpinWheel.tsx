import React, { useRef, useEffect, useState } from 'react';
import { API_LIST } from '../../data/apis';
import { ApiItem } from '../../types';
import { useTeam } from '../../context/TeamContext';

export const SpinWheel: React.FC = () => {
  const { currentTeam, recordSpin } = useTeam();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [isSpinning, setIsSpinning] = useState(false);
  const [currentAngle, setCurrentAngle] = useState(0); // in radians
  const [spinStep, setSpinStep] = useState<1 | 2>(currentTeam?.api1 ? 2 : 1);

  // Sync spin step when current team updates
  useEffect(() => {
    if (!currentTeam?.api1) {
      setSpinStep(1);
    } else if (currentTeam?.api1 && !currentTeam?.api2) {
      setSpinStep(2);
    }
  }, [currentTeam]);

  const numSlices = API_LIST.length;
  const sliceAngle = (2 * Math.PI) / numSlices;

  // Persistent Web Audio context for zero-latency, reliable tick sound
  const audioCtxRef = useRef<AudioContext | null>(null);

  const getAudioContext = () => {
    if (!audioCtxRef.current) {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtxClass) {
        audioCtxRef.current = new AudioCtxClass();
      }
    }
    if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  };

  // Play a crisp peg-click ticker sound synchronized with slice line pass
  const playTickSound = (progress: number = 0) => {
    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';

      // Pitch drops slightly as the wheel slows down
      const startFreq = 650 - progress * 220; 
      const endFreq = 160;

      osc.frequency.setValueAtTime(startFreq, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(endFreq, ctx.currentTime + 0.035);

      // Volume fades gently near the end of the spin
      const volume = Math.max(0.03, 0.18 * (1 - progress * 0.4));
      gain.gain.setValueAtTime(volume, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.035);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.035);
    } catch (e) {
      // Catch autoplay restrictions
    }
  };

  // Render Canvas Wheel
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(centerX, centerY) - 10;

    ctx.clearRect(0, 0, width, height);

    // Draw Slices
    API_LIST.forEach((api, index) => {
      const startAngle = currentAngle + index * sliceAngle;
      const endAngle = startAngle + sliceAngle;

      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, startAngle, endAngle);
      ctx.closePath();

      ctx.fillStyle = api.color;
      ctx.fill();
      ctx.lineWidth = 2;
      ctx.strokeStyle = '#090e1a';
      ctx.stroke();

      // Draw API Label Text
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(startAngle + sliceAngle / 2);
      ctx.textAlign = 'right';
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 11px Inter, sans-serif';
      ctx.shadowColor = 'rgba(0, 0, 0, 0.8)';
      ctx.shadowBlur = 4;
      ctx.fillText(api.shortName || api.name, radius - 14, 4);
      ctx.restore();
    });

    // Draw Center Pivot ("API")
    const centerRadius = 38;
    ctx.beginPath();
    ctx.arc(centerX, centerY, centerRadius, 0, 2 * Math.PI);
    ctx.fillStyle = '#09101d';
    ctx.fill();
    ctx.lineWidth = 3;
    ctx.strokeStyle = '#00e5ff';
    ctx.stroke();

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 14px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('API', centerX, centerY);
  }, [currentAngle, sliceAngle]);

  const handleSpin = () => {
    if (isSpinning) return;

    // Resume AudioContext on user interaction
    getAudioContext();

    // Filter available APIs (prevent duplicates on Spin #2)
    const availableApis = API_LIST.filter(
      (api) => api.id !== currentTeam?.api1?.id
    );

    // Pick random target API
    const selectedApi = availableApis[Math.floor(Math.random() * availableApis.length)];
    const selectedIndex = API_LIST.findIndex((api) => api.id === selectedApi.id);

    setIsSpinning(true);

    // Calculate rotation angle to align chosen index with the top pointer (at 3*PI/2)
    const pointerAngle = 3 * Math.PI / 2;
    const targetSliceCenter = selectedIndex * sliceAngle + sliceAngle / 2;

    // 4 full rotations (8 * Math.PI) plus offset
    const extraRotations = 8 * Math.PI;
    
    // Calculate final target angle
    const desiredFinalAngleModulo = (pointerAngle - targetSliceCenter) % (2 * Math.PI);
    const normalizedFinalAngleModulo = desiredFinalAngleModulo < 0 ? desiredFinalAngleModulo + 2 * Math.PI : desiredFinalAngleModulo;
    
    const currentAngleModulo = currentAngle % (2 * Math.PI);
    let delta = normalizedFinalAngleModulo - currentAngleModulo;
    if (delta < 0) delta += 2 * Math.PI;

    const totalRotation = extraRotations + delta;
    const startAngleVal = currentAngle;
    const startTime = performance.now();
    const spinDuration = 4500; // 4.5 seconds

    // Track cumulative slice boundary index for 1:1 needle-slice synchronization
    let lastTickSlice = Math.floor((pointerAngle - startAngleVal) / sliceAngle);

    const animateSpin = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / spinDuration, 1);

      // Ease-out cubic formula
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const angleNow = startAngleVal + totalRotation * easeOut;

      setCurrentAngle(angleNow);

      // Sound ticker calculation: fires every time a slice divider passes needle
      const currentTickSlice = Math.floor((pointerAngle - angleNow) / sliceAngle);

      if (currentTickSlice !== lastTickSlice) {
        lastTickSlice = currentTickSlice;
        playTickSound(progress);
      }

      if (progress < 1) {
        requestAnimationFrame(animateSpin);
      } else {
        setIsSpinning(false);
        recordSpin(selectedApi);
      }
    };

    requestAnimationFrame(animateSpin);
  };

  return (
    <div className="glass-panel rounded-2xl p-6 md:p-8 border border-slate-800/80 text-center flex flex-col items-center justify-center">
      {/* Title */}
      <h3 className="text-2xl font-bold text-slate-100 mb-1">
        Spin for API #{spinStep}
      </h3>
      <p className="text-slate-400 text-sm mb-6">
        Click the button below to reveal your {spinStep === 1 ? 'first' : 'second'} API.
      </p>

      {/* Wheel Wrapper */}
      <div className="relative my-4 flex items-center justify-center">
        {/* Needle Arrow Pointer */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20 pointer-events-none drop-shadow-[0_2px_8px_rgba(0,229,255,0.8)]">
          <div className="w-0 h-0 border-l-[14px] border-l-transparent border-r-[14px] border-r-transparent border-t-[22px] border-t-cyan-400" />
        </div>

        {/* Canvas Wheel */}
        <canvas
          ref={canvasRef}
          width={440}
          height={440}
          className="max-w-full w-[340px] h-[340px] md:w-[440px] md:h-[440px] rounded-full drop-shadow-2xl"
        />
      </div>

      {/* Spin Button */}
      <div className="mt-6">
        <button
          onClick={handleSpin}
          disabled={isSpinning}
          className="px-10 py-3.5 rounded-full bg-cyan-400 hover:bg-cyan-300 active:scale-95 text-slate-950 font-bold text-base shadow-lg shadow-cyan-400/30 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          {isSpinning ? 'Spinning...' : 'Spin Wheel'}
        </button>
      </div>
    </div>
  );
};
