import { useEffect, useRef, useState, useCallback } from 'react';

interface VADConfig {
  sensitivity: 'low' | 'medium' | 'high';
  silenceThreshold: number;
  onSpeechStart: () => void;
  onSpeechEnd: () => void;
  onVolumeChange: (volume: number) => void;
}

const SENSITIVITY_THRESHOLDS = {
  low: -50,
  medium: -60,
  high: -70,
};

export function useVoiceActivityDetection(config: VADConfig) {
  const [isActive, setIsActive] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const micStreamRef = useRef<MediaStream | null>(null);
  const silenceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  const startVAD = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      micStreamRef.current = stream;

      const audioContext = new AudioContext();
      audioContextRef.current = audioContext;

      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 2048;
      analyser.smoothingTimeConstant = 0.8;
      analyserRef.current = analyser;

      const source = audioContext.createMediaStreamSource(stream);
      source.connect(analyser);

      setIsActive(true);
      monitorAudioLevel();
    } catch (error) {
      console.error('Failed to start VAD:', error);
    }
  }, []);

  const stopVAD = useCallback(() => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }

    if (silenceTimerRef.current) {
      clearTimeout(silenceTimerRef.current);
      silenceTimerRef.current = null;
    }

    if (micStreamRef.current) {
      micStreamRef.current.getTracks().forEach(track => track.stop());
      micStreamRef.current = null;
    }

    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }

    analyserRef.current = null;
    setIsActive(false);
    setIsSpeaking(false);
  }, []);

  const monitorAudioLevel = useCallback(() => {
    if (!analyserRef.current || !isActive) return;

    const analyser = analyserRef.current;
    const dataArray = new Uint8Array(analyser.frequencyBinCount);

    const checkAudioLevel = () => {
      if (!analyserRef.current || !isActive) return;

      analyser.getByteFrequencyData(dataArray);

      const average = dataArray.reduce((sum, value) => sum + value, 0) / dataArray.length;
      const decibels = 20 * Math.log10(average / 255);

      const normalizedVolume = Math.max(0, Math.min(100, (average / 255) * 100));
      config.onVolumeChange(normalizedVolume);

      const threshold = SENSITIVITY_THRESHOLDS[config.sensitivity];
      const isSpeechDetected = decibels > threshold;

      if (isSpeechDetected) {
        if (!isSpeaking) {
          setIsSpeaking(true);
          config.onSpeechStart();
        }

        if (silenceTimerRef.current) {
          clearTimeout(silenceTimerRef.current);
          silenceTimerRef.current = null;
        }
      } else {
        if (isSpeaking && !silenceTimerRef.current) {
          silenceTimerRef.current = setTimeout(() => {
            setIsSpeaking(false);
            config.onSpeechEnd();
            silenceTimerRef.current = null;
          }, config.silenceThreshold * 1000);
        }
      }

      animationFrameRef.current = requestAnimationFrame(checkAudioLevel);
    };

    checkAudioLevel();
  }, [isActive, isSpeaking, config]);

  useEffect(() => {
    return () => {
      stopVAD();
    };
  }, [stopVAD]);

  return {
    isActive,
    isSpeaking,
    startVAD,
    stopVAD,
  };
}
