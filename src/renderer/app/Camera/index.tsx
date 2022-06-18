import React, { useEffect, useState } from "react";
import { useRef } from "react";
import styles from "./index.module.scss";

const Camera: React.FC = () => {
  const cameraRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    (async () => {
      if (!cameraRef.current) return;
      const cameraElement = cameraRef.current;
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: false,
          video: { width: 2560, height: 1440 },
        });
        cameraElement.srcObject = stream;
        cameraElement.onloadedmetadata = () => cameraElement.play();
      } catch (err) {
        console.log(err);
      }
    })();
  }, [cameraRef]);

  return <video ref={cameraRef} className={styles.camera} />;
};

export default Camera;
