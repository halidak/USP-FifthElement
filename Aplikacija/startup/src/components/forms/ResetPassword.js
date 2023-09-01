import React, {useState} from 'react';
import { Alert, Button, Input } from 'antd';
import './Form.css';
import './EditProfile.css';
import {  useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import LoadingSpinner from '../UI/LoadingSpinner';

export default function ResetPassword(props) {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passErr, setPassErr] = useState(false);
    const [confPassErr, setConfErrPass] = useState(false);
    const [succ, setSucc] = useState(false);
    const [err, setErr] = useState(false);
    const [loading, setLoading] = useState(false);
    const history = useNavigate();
    const {token} = useParams();

    const passHandler = e => {
        setPassword(e.target.value);
    }

    const confPassHandler = e => {
        setConfirmPassword(e.target.value);
    }

    const clickHandler = e => {
        e.preventDefault();
        if(password.length < 7){
            setPassErr(true);
            return;
        }
        if(password !== confirmPassword){
            setConfErrPass(true);
            return;
        }
        try{
            setLoading(true);
            const response = axios.post(props.link + token, {
                newPassword: password,
                conformNewPassword: confirmPassword
            })
            if(response.status === 200){
                setSucc(true);
            }
            setSucc(true);
            history(props.login);
        }
        catch(err){
            setErr(true);
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
            {succ && <Alert message="Uspesno promenjena lozinka" type="success" />}
            {err && <Alert message="Doslo je do greske!" type="error" />}
            <Input type='password' placeholder='New password' style={{ width: '80%' }} className='inputForm' onChange={passHandler}/>
            {passErr && <p className='error-text'>Lozinka mora imati najmanje 8 karaktera.</p>}
            <Input type='password' placeholder='Confirm password' style={{ width: '80%' }} className='inputForm' onChange={confPassHandler}/>
            {confPassErr && <p className='error-text'>Lozinke se ne poklapaju.</p>}
            <Button type="primary" onClick={clickHandler}>Promeni sifru</Button>
        </div>
        </div> 
    </div>
  )
}
