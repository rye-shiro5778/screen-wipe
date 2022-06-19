import React, { useEffect, useState } from "react";
import { useRef } from "react";
import styles from "./index.module.scss";

const Camera: React.FC = () => {
  const cameraRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    window.api.on("switchCamera", async () => {
      const cameraElement = cameraRef.current;
      if (!cameraElement) return;
      let stream: MediaStream | null = cameraElement?.srcObject as MediaStream;

      if (stream != null) {
        stream.getVideoTracks().forEach((track) => track.stop());
        stream = null;
        cameraElement.srcObject = null;
      } else {
        try {
          stream = await navigator.mediaDevices.getUserMedia({
            audio: false,
            video: { width: 2560, height: 1440 },
          });
          cameraElement.srcObject = stream;
          cameraElement.onloadedmetadata = () => cameraElement.play();
        } catch (err) {
          console.log(err);
        }
      }
    });
  }, [cameraRef]);

  return (
    <>
      <video ref={cameraRef} className={styles.camera} />
    </>
  );
};

export default Camera;
