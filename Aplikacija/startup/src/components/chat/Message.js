import React from 'react'

function Message(props) {
    
    var toId = props.toId;
    props.setToId(toId);
  return (
    <div>
    <div>
    <p className={props.sender === props.toId ? "senderFrom" : ''}>{props.name}</p>
    </div>
     <div
    className={props.sender === props.toId ? 'messageFrom' : 'message'}>
    <div className="messageInfo">
      <span>{props.time}</span>
    </div>
    <div className={props.sender === props.toId ? "messageContentFrom" : 'messageContent'}>
      <p>{props.message}</p>
    </div>
  </div>
  </div>
  )
}

export default Message
