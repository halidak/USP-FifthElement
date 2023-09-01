import React, { useRef, useState } from 'react'
import './Form.css';
import { Input, Button, Alert } from 'antd';
import axios from 'axios';
import LoadingSpinner from '../UI/LoadingSpinner';

function ForgotPassword(props) {
    const [emailErr, setEmailErr] = useState(false);
    const [email, setEmail] = useState('');
    const [succ, setSucc] = useState(false);
    const [err, setErr] = useState(false);
    const [loading, setLoading] = useState(false);

    const onClickHandle = (e) => {
        e.preventDefault();
        if(!email.includes('@')){
            setEmailErr(true);
            return;
        }
        try{
            setLoading(true);
            const response = axios.post(props.link + email);
            if(response.status === 200){
                setSucc(true);
            }
            setSucc(true);
        }
        catch(err){
            setErr(true);
            console.log(err);
        }
        setLoading(false);
    }
    if(loading){
        return(
            <LoadingSpinner />
        )
    }
  return (
    <div className='body'>
        <div className='wraper2'>
        <div className='form-container'>
            <h2 className='formh2'>Unesite Vaš email:</h2>
            {succ && <Alert message="Proverite email" type="success" />}
            {err && <Alert message="Doslo je do greske!" type="error" />}
            <Input placeholder='Email' style={{ width: '80%' }} className='inputForm' onChange={(e) => setEmail(e.target.value)}/>
            {emailErr && <p className='error-text'>Unesite validan email.</p>}
            <Button type="primary" onClick={onClickHandle}>Prosledi</Button>
        </div>
        </div>
    </div>
  )
}

export default ForgotPassword;