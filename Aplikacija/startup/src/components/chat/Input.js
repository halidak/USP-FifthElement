import axios from 'axios';
import React, { useState } from 'react'
import './Chat.css';

function Input(props) {
    const user = JSON.parse(localStorage.getItem("user"));
    const company = JSON.parse(localStorage.getItem("company"));
    const [message, setMessage] = useState('');

    const sendMessage = (e) => {
        e.preventDefault();
        if(user){
            axios.post(`https://localhost:7029/api/User/send-message`,{
                fromId: user.user.id,
                toId: props.fromId,
                message: message
            })
            .then(function(response){
                if(response.status == 200){
                    props.setFetchAgain(true);
                }
            })
            .catch(function(err){
                console.log(err);
            })
        }
        else {
            axios.post(`https://localhost:7029/api/Company/sendMessage`,{
                fromId:  company.company.id,
                toId: props.fromId,
                message: message
            })
            .then(function(response){
                if(response.status == 200){
                    props.setFetchAgain(true);
                }
            })
            .catch(function(err){
                console.log(err);
            })
        }
        setMessage('');
    }

  return (
    <div className="input">
      <input
      className='sendM'
        type="text"
        placeholder="Type something..."
       value={message}
       onChange={e => setMessage(e.target.value)}
      />
      <button className='input-button' onClick={sendMessage}>Send</button>
    </div>
  )
}

export default Input
