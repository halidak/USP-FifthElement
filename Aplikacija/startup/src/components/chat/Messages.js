import axios from "axios";
import React, { useEffect, useState } from "react";
import Message from "./Message";

const Messages = (props) => {
  const [messages, setMessages] = useState([]);
  const [sender, setSender] = useState();
  const user = JSON.parse(localStorage.getItem("user"));
  const company = JSON.parse(localStorage.getItem("company"));

  const fetchMessages = async() => {
    if(user){
        await axios.get(`https://localhost:7029/api/User/getAllMessages/${user.user.id}/${props.fromId}`)
        .then(function(response){
            if(response.status == 200){
                 setMessages(response.data);
                 setSender(user.user.id);
              }
          }).catch(function(err){
              console.log(err);
          });
      }
      else if(company){
         await axios.get(`https://localhost:7029/api/User/getAllMessages/${props.fromId}/${company.company.id}`)
          .then(function(response){
              if(response.status == 200){
                  setMessages(response.data);
                  setSender(company.company.id);
              }
          }).catch(function(err){
              console.log(err);
          })
      }
    }
  useEffect(() => {
        fetchMessages();
      }, []);

      useEffect(() => {
        if(props.fetchAgain) {
            props.setFetchAgain(false)
            fetchMessages();
        }
    }, [props.fetchAgain])
      
  return (
    <div className="messages">
      {messages.map((m) => (
        <Message message={m.message} key={m.id} time={m.time} name={m.fromName} setToId={props.setToId} toId={m.fromId} toName={m.toName} sender={sender}/>
      ))} 
    </div>
  );
};

export default Messages;