import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Chatgptapi = ({ transcript }) => {
  console.log('trans',{transcript})
    const [responseText, setResponseText] = useState('');
  
    useEffect(() => {
      const fetchChatGPTResponse = async () => {
        try {
          const apiKey = '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';
          const apiUrl = 'https://api.openai.com/v1/engines/davinci/completions';
  
          const response = await axios.post(
            apiUrl,
            {
              prompt: transcript, // Use 'prompt' instead of 'messages'
              max_tokens: 50, // Add any additional parameters as needed
            },
            {
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${apiKey}`,
              },
            }
          );
          console.log('res',response.data)
          const reply = response.data.choices[0].text;
          console.log(response.data)
          setResponseText(reply);
        } catch (error) {
          console.error('Error:', error);
        }
      };
  
      if (transcript) {
        fetchChatGPTResponse();
      }
    }, [transcript]);
  
    useEffect(() => {
      if (responseText) {
        // Convert response text to speech audio
        
        const synth = window.speechSynthesis;
        const utterance = new SpeechSynthesisUtterance(responseText);
        synth.speak(utterance);
        console.log('uttervoice',{utterance})
      }
    }, [responseText]);
  
    console.log(responseText);
  
  
    return (
      <div>
        <p>ChatGPT Response: {responseText}</p>
      </div>
    );
  };
  

  
  
  export default Chatgptapi;