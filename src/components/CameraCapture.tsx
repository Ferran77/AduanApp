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
    <div className="border p-4 rounded mt-4">
      {!isActive ? (
        <button
          onClick={startCamera}
          className="bg-blue-600 text-white px-4 py-2"
        >
          📸 Abrir cámara
        </button>
      ) : (
        <>
          <div className="relative w-full max-w-md">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-64 object-cover bg-black rounded"
            />

            {/* 🎯 OVERLAY */}
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
              <div className="border-4 border-white w-3/4 h-3/4 rounded-lg" />
            </div>
          </div>

          <div className="flex gap-2 mt-2">
            <button
              onClick={capture}
              className="bg-green-600 text-white px-4 py-2"
            >
              Tomar foto
            </button>

            <button
              onClick={stopCamera}
              className="bg-red-600 text-white px-4 py-2"
            >
              Cerrar cámara
            </button>
          </div>
        </>
      )}
    </div>
  );
}