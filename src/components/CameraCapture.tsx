"use client";

import { useEffect, useRef, useState } from "react";

export default function CameraCapture({
  onCapture,
}: {
  onCapture: (file: File) => void;
}) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isActive, setIsActive] = useState(false);
  const [flash, setFlash] = useState(false);

  useEffect(() => {
    console.log("videoRef:", videoRef.current);
  }, [isActive]);

  // 🎥 iniciar cámara
  const startCamera = async () => {
    try {
      setIsActive(true); // 👈 PRIMERO renderiza el video

      // 👇 espera a que React monte el video
      await new Promise((r) => setTimeout(r, 100));

      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: { ideal: "environment" },
        },
      });

      const video = videoRef.current;

      if (!video) {
        console.error("❌ videoRef no existe");
        return;
      }

      video.srcObject = mediaStream;

      await new Promise<void>((resolve) => {
        video.onloadedmetadata = () => {
          video.play();
          resolve();
        };
      });

      console.log("🎥 cámara lista:", video.videoWidth, video.videoHeight);

      setStream(mediaStream);
    } catch (err) {
      console.error("Error cámara:", err);
      alert("No se pudo acceder a la cámara");
    }
  };
  // 🛑 detener cámara
  const stopCamera = () => {
    stream?.getTracks().forEach((track) => track.stop());

    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }

    setStream(null);
    setIsActive(false);
  };

  // 📸 capturar frame
  const capture = () => {
    if (!videoRef.current) return;

    const video = videoRef.current;

    // 🛑 asegurar que el video ya cargó
    if (video.videoWidth === 0) {
      alert("La cámara aún no está lista");
      return;
    }

    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");
    ctx?.drawImage(video, 0, 0);

    canvas.toBlob((blob) => {
      if (!blob) return;

      const file = new File([blob], "captura.jpg", {
        type: "image/jpeg",
      });

      setFlash(true);

      setTimeout(() => {
        setFlash(false);
      }, 150);

      console.log("📸 Foto capturada");

      onCapture(file);
    }, "image/jpeg");
  };

  // cleanup
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  return (
    <>
      {/* 🎥 BOTÓN */}
      {!isActive && (
        <button
          onClick={startCamera}
          className="
            w-full
            rounded-2xl
            border
            border-slate-700
            bg-slate-900
            py-3
            font-medium
            text-white
            transition-all
            duration-200
            hover:border-cyan-500
            hover:bg-slate-800
          "
        >
          📸 Abrir cámara
        </button>
      )}

      {/* 🌑 MODAL */}
      {isActive && (
        <div
          className="
          fixed
          inset-0
          z-50
          flex
          items-start
          justify-center
          bg-black/80
          backdrop-blur-sm
          px-4
          pt-20
        "
        >
          {/* ⚡ FLASH */}
          {flash && (
            <div
              className="
                pointer-events-none
                absolute
                inset-0
                animate-pulse
                bg-white
                opacity-80
              "
            />
          )}

          {/* 📦 MODAL CONTENT */}
          <div
            className="
              relative
              w-full
              max-w-2xl
              rounded-3xl
              border
              border-slate-700
              bg-slate-950
              p-4
              shadow-2xl
              shadow-cyan-500/10
            "
          >
            {/* ❌ CERRAR */}
            <button
              onClick={stopCamera}
              className="
                absolute
                right-4
                top-4
                z-10
                rounded-full
                bg-red-500
                px-3
                py-1
                text-sm
                font-bold
                text-white
                hover:bg-red-400
              "
            >
              ✕
            </button>

            {/* 🎥 VIDEO */}
            <div className="relative overflow-hidden rounded-2xl">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="
                  h-[420px]
                  w-full
                  object-cover
                  bg-black
                "
              />

              {/* 🎯 OVERLAY */}
              <div
                className="
                  pointer-events-none
                  absolute
                  inset-0
                  flex
                  items-center
                  justify-center
                "
              >
                <div
                  className="
                    h-3/4
                    w-3/4
                    rounded-2xl
                    border-4
                    border-white/80
                    shadow-[0_0_20px_rgba(255,255,255,0.5)]
                  "
                />
              </div>
            </div>

            {/* 🎮 CONTROLES */}
            <div className="mt-4 flex justify-center">
              <button
                onClick={capture}
                className="
                  rounded-2xl
                  bg-emerald-500
                  px-8
                  py-3
                  text-lg
                  font-bold
                  text-white
                  transition-all
                  duration-200
                  hover:scale-105
                  hover:bg-emerald-400
                "
              >
                📸 Tomar foto
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}