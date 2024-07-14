import { Button, Spinner } from "@nextui-org/react";
import React, { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";
import { formatTime } from "./utils";
import { NextIcon } from "../icons/next";
import { PauseCircleIcon } from "../icons/pause-circle";
import { PreviousIcon } from "../icons/previous";
import { SoundIcon } from "../icons/sound";
import { PlayCircleIcon } from "../icons/play-circle";

export const AUDIO_SKIPPABLE_DURATION = 10;

const CallRecording = () => {
  const waveformContainer = useRef(null);
  const waveSurfaceInstance = useRef(null);
  const [isLoading, setisLoading] = useState<boolean>(true);
  const [volume, setVolume] = useState(0.5);
  const [playing, setPlay] = useState(false);

  useEffect(() => {
    if (waveformContainer.current) {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height * 1.35);
      gradient.addColorStop(0, "#91C4FF"); // Top color
      gradient.addColorStop((canvas.height * 0.7) / canvas.height, "#91C4FF");
      gradient.addColorStop(
        (canvas.height * 0.7 + 1) / canvas.height,
        "transparent"
      );
      gradient.addColorStop(
        (canvas.height * 0.7 + 2) / canvas.height,
        "transparent"
      );

      // Progress gradient
      const progressGradient = ctx.createLinearGradient(
        0,
        0,
        0,
        canvas.height * 1.35
      );
      progressGradient.addColorStop(0, "#0077ff"); // Top color
      progressGradient.addColorStop(
        (canvas.height * 0.7) / canvas.height,
        "#0077ff"
      ); // Top color
      progressGradient.addColorStop(
        (canvas.height * 0.7 + 1) / canvas.height,
        "#91C4FF"
      ); // White line
      progressGradient.addColorStop(
        (canvas.height * 0.7 + 2) / canvas.height,
        "#E6F1FE"
      );
      waveSurfaceInstance.current = WaveSurfer.create({
        container: waveformContainer.current,
        waveColor: gradient,
        progressColor: progressGradient,
        barWidth: 5,
        height: 135,
        url: "/audio.mp3",
        barRadius: 10,
        interact: true,
      });
      waveformContainer.current?.setAttribute("tabindex", "0");
      const hover = document.querySelector("#hover") as HTMLElement;
      const wavesurfer = document.querySelector("#waveform") as HTMLElement;
      wavesurfer.addEventListener(
        "pointermove",
        (e) => (hover.style.width = `${e.offsetX}px`)
      );
      wavesurfer.addEventListener(
        "mouseleave",
        (e) => (hover.style.width = `0px`)
      );

      const timeEl = document.querySelector("#time");
      const durationEl = document.querySelector("#duration");
      waveSurfaceInstance.current?.on(
        "decode",
        (duration) => (durationEl.textContent = formatTime(duration))
      );
      waveSurfaceInstance.current?.on(
        "timeupdate",
        (currentTime) => (timeEl.textContent = formatTime(currentTime))
      );

      // Currently playing audio indicator (Prgress bar & marker)
      waveSurfaceInstance.current?.on("audioprocess", (currentTime) => {
        const marker = document.getElementById("playback-marker");
        const progressBar = document.getElementById("progress-bar");
        if (marker && waveSurfaceInstance.current) {
          const duration = waveSurfaceInstance.current.getDuration();
          const waveformWidth = waveformContainer.current.offsetWidth;
          const progress = currentTime / duration;
          const markerPosition = waveformWidth * progress;
          marker.style.left = `${markerPosition - 1}px`;
          marker.style.display = "block"; // Show marker during playback
          const durationTime = waveSurfaceInstance.current.getDuration();
          const progressPercentage = (currentTime / durationTime) * 100;
          progressBar.style.width = `${progressPercentage}%`;
        }
      });

      waveSurfaceInstance.current?.on("seeking", (progress) => {
        const progressBar = document.getElementById("progress-bar");
        const marker = document.getElementById("playback-marker");
        if (progressBar && marker && waveSurfaceInstance.current) {
          const totalDurationInSeconds =
            waveSurfaceInstance.current?.getDuration();
          const progressPercentage = (progress / totalDurationInSeconds) * 100;
          const markerPosition = progressPercentage;
          // Update progress bar width & marker
          progressBar.style.width = `${progressPercentage - 2}%`;
          marker.style.left = `${markerPosition - 2}%`;
          marker.style.display = "block";
        }
      });

      //   Loading state
      waveSurfaceInstance.current?.on("loading", () => setisLoading(true));
      waveSurfaceInstance.current?.on("ready", () => {
        setisLoading(false);
        const marker = document.getElementById("playback-marker");
        const progressBar = document.getElementById("progress-bar");
        if (marker) {
          marker.style.left = "0px";
          marker.style.display = "none"; // Hide marker until playback starts
          progressBar.style.width = "0%";
        }
      });

      // Audio controls
      const forwardButton = document.querySelector(
        "#forward-btn"
      ) as HTMLElement;
      const backButton = document.querySelector("#backward-btn") as HTMLElement;

      forwardButton.onclick = () => {
        waveSurfaceInstance.current?.skip(AUDIO_SKIPPABLE_DURATION);
      };

      backButton.onclick = () => {
        waveSurfaceInstance.current?.skip(-AUDIO_SKIPPABLE_DURATION);
      };

      // Keyboard accessibility
      waveformContainer.current.addEventListener("keydown", (e) => {
        switch (e.key) {
          case "Enter":
            togglePlay();
            break;
          case "ArrowRight":
            waveSurfaceInstance.current?.skip(AUDIO_SKIPPABLE_DURATION);
            break;
          case "ArrowLeft":
            waveSurfaceInstance.current?.skip(-AUDIO_SKIPPABLE_DURATION);
            break;
        }
      });

      return () => {
        waveSurfaceInstance.current?.destroy();
      };
    }
  }, []);

  const onVolumeChange = (e) => {
    const { target } = e;
    const newVolume = +target.value;
    if (newVolume) {
      setVolume(newVolume);
      waveSurfaceInstance.current.setVolume(newVolume ?? 1);
    }
  };

  const togglePlay = () => {
    setPlay((isPlaying) => !isPlaying);
    waveSurfaceInstance.current.playPause();
  };

  return (
    <div className="relative h-[200px]">
      {isLoading && <Spinner className="w-full absolute top-5" />}
      <div
        id="waveform"
        ref={waveformContainer}
        className="max-h-[100px] border-b-2 relative outline-none"
      >
        <div id="time">0:00</div>
        <div id="duration">0:00</div>
        <div id="hover"></div>
        <div
          id="playback-marker"
          className="absolute top-[66px] w-3 h-3 rounded-large bg-[#ffffff] hidden border-1 border-blue-500 z-50"
        />
        <div
          id="progress-bar"
          className="absolute bg-blue-500 top-[70px] h-1 left-0 z-50"
          style={{ width: "0%" }}
        ></div>
      </div>
      <div className="audio-controls mt-4 absolute z-50 w-full bg-gray-100 border-1 rounded-large ">
        <div
          className="relative flex justify-end items-center h-12 m-1"
          onClick={() => waveformContainer.current?.focus()}
        >
          <div className="flex-1 flex gap-6 justify-center items-center">
            <Button
              isIconOnly
              className="data-[hover]:bg-foreground/10"
              radius="full"
              variant="light"
              id="backward-btn"
            >
              <PreviousIcon />
            </Button>
            <Button
              isIconOnly
              className="w-auto h-auto data-[hover]:bg-foreground/10"
              radius="full"
              variant="light"
            >
              {playing ? (
                <PauseCircleIcon onClick={togglePlay} />
              ) : (
                <PlayCircleIcon onClick={togglePlay} />
              )}
            </Button>
            <Button
              isIconOnly
              id="forward-btn"
              className="data-[hover]:bg-foreground/10"
              radius="full"
              variant="light"
            >
              <NextIcon />
            </Button>
          </div>
          <div className="volume-control flex justify-center items-center w-10 h-full relative">
            <div className="volume-icon w-full cursor-pointer relative">
              <div className="volume-slider h-[30px] cursor-pointer hidden absolute -rotate-90">
              <input
                type="range"
                id="volume"
                className=""
                name="volume"
                min="0.01"
                max="1"
                step=".025"
                onChange={onVolumeChange}
                defaultValue={volume}
              />
              </div>
              <SoundIcon />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CallRecording;
