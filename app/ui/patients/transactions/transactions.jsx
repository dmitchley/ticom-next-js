"use client";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import styles from "./transactions.module.css"; // Make sure this path is correct

const MedicalVideosNoSSR = dynamic(() => Promise.resolve(MedicalVideos), {
  ssr: false,
});

function MedicalVideos() {
  const [showVideo, setShowVideo] = useState(false);
  const [videoSrc, setVideoSrc] = useState("");

  const videos = [
    {
      id: 1,
      name: "Surgical Procedure",
      date: "14.02.2024",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    },
    {
      id: 2,
      name: "Medical Lecture",
      date: "12.03.2024",
      videoUrl: "https://www.youtube.com/embed/example",
    },
    // Add more videos as needed
  ];

  const handleVideoClick = (videoUrl) => {
    setVideoSrc(videoUrl);
    setShowVideo(true);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Latest Medical Videos</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <td>Video Name</td>
            <td>Date</td>
            <td>Watch</td>
          </tr>
        </thead>
        <tbody>
          {videos.map((video) => (
            <tr key={video.id}>
              <td>{video.name}</td>
              <td>{video.date}</td>
              <td>
                <button
                  className={styles.watchButton}
                  onClick={() => handleVideoClick(video.videoUrl)}
                >
                  Watch
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showVideo && (
        <div className={styles.videoPopup}>
          <div className={styles.videoContent}>
            <span
              className={styles.closeButton}
              onClick={() => setShowVideo(false)}
            >
              &times;
            </span>
            <iframe
              className={styles.videoPlayer}
              src={videoSrc}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="Embedded youtube"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default MedicalVideosNoSSR;
