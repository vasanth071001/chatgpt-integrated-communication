import React, { useState, useRef } from 'react';
import './content.css';
import VoiceRecognitionComponent from './VoiceRecognitionComponent';
import ved1 from './vedio/untitled-video_7clSlDwy (online-video-cutter.com).mp4';
import Chatgptapi from './Chatgptapi';

const Content = () => {
  const [voiceRecognitionActive, setVoiceRecognitionActive] = useState(false);
  const videoRef = useRef(null);

  const toggleVoiceRecognition = () => {
    setVoiceRecognitionActive((prevState) => !prevState);
  };

  const toggleVideoPlay = () => {
    console.log('playing')
    if (videoRef.current.paused) {
      videoRef.current.play();
   
  };
}

  return (
    <div className="content">
      <video ref={videoRef} src={ved1} className="content-video" />

      <VoiceRecognitionComponent 
      toggleVideoPlay={toggleVideoPlay}
      />
   
    </div>
  );
};

export default Content;
