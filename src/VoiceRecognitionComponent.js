import React, { useState, useEffect } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import Chatgptapi from './Chatgptapi';
import './voice.css';

const VoiceRecognitionComponent = ({toggleVideoPlay}) => {
  const { transcript, listening, startListening, stopListening } = useSpeechRecognition();
  const [isRecordingStopped, setRecordingStopped] = useState(false);
  const [isChatVisible, setChatVisible] = useState(false);
  const [previousTranscript, setPreviousTranscript] = useState('');

  useEffect(() => {
    if (transcript && !listening) {
      setChatVisible(true);
    }
  }, [transcript, listening]);

  const handleStart = () => {
    console.log('Listening...');
  };

  const handleEnd = () => {
    console.log('Stopped listening.');
    if (transcript && !isRecordingStopped) {
      setRecordingStopped(true);
      setChatVisible(true);
    }
  };

  const startRecognition = () => {
    setRecordingStopped(false);
    setChatVisible(false);
    SpeechRecognition.startListening({ onStart: handleStart, onEnd: handleEnd });
  };

  const stopRecognition = () => {
    setRecordingStopped(true);
    setChatVisible(true);
    SpeechRecognition.stopListening();
  };

  const handleSpeechRecognition = (finalTranscript) => {
    console.log('Recognized speech:', finalTranscript);
    if (finalTranscript && finalTranscript !== previousTranscript) {
      setRecordingStopped(true);
      setChatVisible(true);
      // Call the API here
      console.log('API call:', finalTranscript);
    }
    setPreviousTranscript(finalTranscript);
  };

  useEffect(() => {
    if (isRecordingStopped && transcript) {
      handleSpeechRecognition(transcript);
    }
  }, [transcript, isRecordingStopped, handleSpeechRecognition]);
 
  return (
    <div>
      <button onClick={startRecognition} disabled={listening || isRecordingStopped} className='startrecord'>
        Start Listening
      </button>
      <button onClick={stopRecognition} disabled={!listening || isRecordingStopped} className='stoprecord'>
        Stop Listening
      </button>
      <p>Transcript: {transcript}</p>
      <p>Status: {listening ? 'Listening...' : 'Not listening'}</p>
      {isChatVisible && <Chatgptapi transcript={transcript} 
      toggleVideoPlay={toggleVideoPlay}
      />}
    </div>
  );
};

export default VoiceRecognitionComponent;
