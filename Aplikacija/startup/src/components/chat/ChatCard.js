import React, { useState } from 'react'
import { Alert, Button, Card, Input } from 'antd';
import './Chat.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';


function ChatCard() {
    const [message, setMessage] = useState();
    const {companyId} = useParams();
    const [succ, setSucc] = useState(false);
    const [err, setErr] = useState(false);
    const user = JSON.parse(localStorage.getItem('user'));
    
    if(user){
        setTimeout(() => {
            axios.get(`https://localhost:7029/api/User/getMessages/${user.user.id}`)
            .then(function(response){
                if(response.status == 200){
                    console.log(response)
                }
            })
        }, 300);
    
    
        const onMessage = e =>{
            setMessage(e.target.value);
        }
    
        const sendMessage = (e) => {
            e.preventDefault();
            axios.post(`https://localhost:7029/api/User/send-message`, {
                fromId: user.user.id,
                toId: companyId,
                message: message
            })
            .then(function(response){
                if(response.status == 200){
                    setSucc(true);
                    setMessage('');
                }
            })
            .catch(function(err){
                console.log(err);
                setErr(true);
            })
        }
    }

            else {
            const comp = JSON.parse(localStorage.getItem("company"));

            setTimeout(() => {
                axios.get(`https://localhost:7029/api/Company/getMessages/${comp.comp.id}`)
                .then(function(response){
                    if(response.status == 200){
                        console.log(response)
                    }
                })
            }, 300);
        
            return;
         }

       

    setTimeout(() => {
        axios.get(`https://localhost:7029/api/User/getMessages/${user.user.id}`)
        .then(function(response){
            if(response.status == 200){
                console.log(response)
            }
        })
    }, 300);


    const onMessage = e =>{
        setMessage(e.target.value);
    }

    const sendMessage = (e) => {
        e.preventDefault();
        axios.post(`https://localhost:7029/api/User/send-message`, {
            fromId: user.user.id,
            toId: companyId,
            message: message
        })
        .then(function(response){
            if(response.status == 200){
                setSucc(true);
                setMessage('');
            }
        })
        .catch(function(err){
            console.log(err);
            setErr(true);
        })
    }
  return (
    <div className='chatcard'>
       {succ && <Alert message="Poruka poslata" type='success' style={{
        width: 350,
      }}/>}
       {err && <Alert message="Poruka poslata" type='error' style={{
        width: 350,
      }}/>}
       <Card className='cartica'
      title="Započni razgovor sa poslodavcem"
      style={{
        width: 350,
      }}
    >
      <Input placeholder='Unsesite poruku:'
      style={{
        width: 300,
        marginBottom: 5
    }} onChange={onMessage}
    value={message}
    />
      <Button
        style={{
            width: 300
        }} onClick={sendMessage}
      >Posalji</Button>
    </Card>
    </div>
  )
}

export default ChatCard
