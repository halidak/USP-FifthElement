import React, {useContext, useState} from 'react'
import { Link,  useNavigate } from 'react-router-dom';
import './Form.css'
import useInput from '../../hooks/use-input';
import logo from '../../assets/Startup.png'
import axios from 'axios';
import AuthContext from '../../context/AuthProvider';
import LoadingSpinner from '../UI/LoadingSpinner';


function LoginCompanies() {
    const history = useNavigate();
    const {setAuth} = useContext(AuthContext);

    const [errMsg, setErrMsg] = useState('');

    const [loading, isLoading] = useState(false);

    const {
        value: enteredEmail,
        isValid: enteredEmailIsValid,
        hasError: enteredEmailIsInvalid,
        valueInputChangeHandler: emailChangeHandler,
        valueInputBlurHandler: emailBlurHandler,
        reset: resetEmailInput
      } = useInput(value => value.includes('@'));

      const {
        value: enteredPassword,
        isValid: enteredPasswordIsValid,
        hasError: enteredPasswordIsInvalid,
        valueInputChangeHandler: passwordChangeHandler,
        valueInputBlurHandler: passwordBlurHandler,
        reset: resetPasswordInput
      } = useInput(value => value.length >= 6);

      function loginSubmited(e) {
        if(enteredEmailIsInvalid || enteredPasswordIsInvalid){
          setErrMsg('Email or password are not valid');
          return;
        }
        e.preventDefault();
          axios.post(`https://localhost:7029/api/Company/company-login`, {
              email: enteredEmail,
              password: enteredPassword
            })
            .then(function (response) {
              if (response.status == 200) { 
                if (response.data.token) {
                  localStorage.setItem(
                    "company", 
                    JSON.stringify(response.data)
                  )
                }
                const company = response.data.company;
                const token = response.data.token;
                const role = response.data.company.role;
                if(role === 'Admin'){
                  history('/admin')
                }
                history('/');
                console.log("logged");
                setAuth({company, token})
                console.log(response.data.user.email);
                console.log(response.data.token);
              }
            })
            .catch(function (error) {
              console.log("problem");
              
               if(error.response.status === 401){
                 setErrMsg('Unauthorized');
                console.log('problem');
              }
             else if(error.response.status === 400){
                setErrMsg('Wrong email or password');
                console.log('problem');
              }
              else if(error.response){
                setErrMsg('No Server Response');
              }
              else{
                setErrMsg('Login Failed');
                console.log('problem');
              }
            });
            isLoading(false)
      }

      function formSubmitHandler(e){
        e.preventDefault();

        if(!enteredEmailIsValid || !enteredPasswordIsValid){
            return;
        }

        resetEmailInput();
        resetPasswordInput();
      }

      if(loading){
        return (
          <LoadingSpinner />
        )
      }

  return (
    <div className='wraper'>
   <div className='form-container'>
    <img src={logo}/>
    <h2>Ulogujte se</h2>
    <p className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
        <form onSubmit={formSubmitHandler}>
        <div className='inputLogin'> 
            <label htmlFor='email'>Email:</label>
            <input
            type='email'
            id='email'
            value={enteredEmail}
            onChange={emailChangeHandler}
            onBlur={emailBlurHandler}
            />
            {enteredEmailIsInvalid && (
            <p className='error-text'>Unesite validan email.</p>
            )}
        </div>
        <div className='inputLogin'>
            <label htmlFor='password'>Lozinka:</label>
            <input
            type='password'
            id='password'
            value={enteredPassword}
            onChange={passwordChangeHandler}
            onBlur={passwordBlurHandler}
            />
            <Link to='/forgot-company'>
            <span>Zaboravljena lozinka?</span>
            </Link>
            {enteredPasswordIsInvalid && (
            <p className='error-text'>Unesite validnu lozinku.</p>
            )}
        </div>
        <div>
          
            <button onClick={loginSubmited}>Submit</button>
       
        </div>
        <div className='link'>
             <span>Nemate nalog?-</span>
            <Link to='signup-companies'>
            <span> Registrujte se.</span>
            </Link>
        </div>
        <Link to='/login'>
          <p>Student?</p>
        </Link>
        </form>
   </div>
    </div>
  )
}

export default LoginCompanies
