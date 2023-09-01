import { Card } from 'antd'
import axios from 'axios';
import React, { useState } from 'react'
import Input from './Input'
import Messages from './Messages'

function Chat(props) {
    const [toId, setToId] = useState();
    const [sentMessages, setSentMessages] = useState([]);
    const user = JSON.parse(localStorage.getItem("user"));
    const company = JSON.parse(localStorage.getItem("company"));
    const [fetchAgain, setFetchAgain] = useState(false)


    if(user) {
        setTimeout(() => {
        axios.get(`https://localhost:7029/api/User/getAllMessages/${user.user.id}/${props.fromId}`)
        .then(function(response){
            if(response.status == 200){
                if (response.data.length > 0) {
                    props.setShowChat(true);
                }
            }
        })
    }, 3000);
      }
      if (company) {
        setTimeout(() => {
          axios.get(`https://localhost:7029/api/User/getAllMessages/${props.fromId}/${company.company.id}`)
          .then(function(response){
              if(response.status == 200){
                  if (response.data.length > 0) {
                    props.setShowChat(true);
                  }
              }
          })
      }, 3000);
    }
    const hideChat = () => {
        props.setShowChat(false);
    }
  return (
    <div className='chat'>
      <Card
      title="StartUp Chat"
      extra={<p onClick={hideChat}>X</p>}
      style={{
        width: 300,
        height: 400
      }}
    >
     <Messages setToId={setToId} sentMessages={sentMessages} setSentMessages={setSentMessages} fromId={props.fromId} setFetchAgain={setFetchAgain} fetchAgain={fetchAgain}/>
     <Input toId={toId} setSentMessages={setSentMessages} fromId={props.fromId} setFetchAgain={setFetchAgain}/>
    </Card>
    </div>
  )
}

export default Chat

