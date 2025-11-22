import { useState } from 'react'
import {Chatbot} from 'supersimpledev'
import './Chatinput.css'


export function ChatInput({ chatMessages, setChatMessages }) {
      const [inputText, setInputText] = useState('');
      const [isLoading, setIsLoading] = useState(false);

      function saveInputText(event){
        setInputText(event.target.value);
      }

      function handleKeyDown(event){
        if (event.key === 'Enter'){
          sendMessage();
        } else if(event.key === 'Escape'){
          setInputText('');
        }
      }

      async function sendMessage(){

        if (isLoading || inputText === ''){
          return;
        }

        setIsLoading(true);

        setInputText('');

        const newChatMessages = [
          ...chatMessages,
          {
            message: inputText,
            sender: 'user',
            id: crypto.randomUUID()
          }
        ];

        setChatMessages([
          ...newChatMessages,

          {
            message: 'Loading...',
            sender:'robot',
            id:crypto.randomUUID()
          }
        ]);

        const response = await Chatbot.getResponseAsync(inputText);
        setChatMessages([
          ...newChatMessages,
          {
            message: response,
            sender: 'robot',
            id: crypto.randomUUID()
          }
        ]);
          setIsLoading(false);
      }

      return (
       <>
        <div className="chat-input-container">
        <input 
        className="chat-input"
        placeholder="Send a message to Chatbot" 
        size="30" 
        onChange={saveInputText}
        onKeyDown={handleKeyDown}
        value={inputText}
        />
        <button
          onClick={sendMessage}
          className="send-button"
        >Send</button>
        </div>
       </>
      );
     }