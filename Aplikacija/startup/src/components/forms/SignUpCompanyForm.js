import React, {useState} from 'react'
import useInput from '../../hooks/use-input';
import logo from '../../assets/Startup.png'
import axios from 'axios';
import { Alert } from 'antd';
import { Link } from 'react-router-dom';

function SignInCompanyForm() {
  const [succ, setSucc] = useState(false);
  const [err, setErr] = useState(false);

  const {
      value: enteredEmail,
      isValid: enteredEmailIsValid,
      hasError: enteredEmailIsInvalid,
      valueInputChangeHandler: emailChangeHandler,
      valueInputBlurHandler: emailBlurHandler,
      reset: restEmailInput
    } = useInput(value => value.includes('@'));

    const {
      value: enteredPassword,
      isValid: enteredPasswordIsValid,
      hasError: enteredPasswordIsInvalid,
      valueInputChangeHandler: passwordChangeHandler,
      valueInputBlurHandler: passwordBlurHandler,
      reset: restPasswordInput
    } = useInput(value => value.length > 8);

    const {
      value: enteredName,
      isValid: enteredNameIsValid,
      hasError: enteredNameIsInvalid,
      valueInputChangeHandler: nameChangeHandler,
      valueInputBlurHandler: nameBlurHandler,
      reset: resetNameInput
    } = useInput(value => value.trim() !== '');

    const {
      value: enteredConfirmPassword,
      isValid: enteredConfirmPasswordIsValid,
      hasError: enteredConfirmPasswordIsInvalid,
      valueInputChangeHandler: confirmPasswordChangeHandler,
      valueInputBlurHandler: confirmPasswordBlurHandler,
      reset: resetConfirmPasswordInput
    } = useInput(value => value === enteredPassword);

  
    function formSubmitHandler(e){
      e.preventDefault();

      if(!enteredEmailIsValid || !enteredPasswordIsValid || !enteredNameIsValid ||  !enteredConfirmPasswordIsValid){
          return;
      }
          axios.post(`https://localhost:7029/api/Company/company-registration`, {
          companyName: enteredName,
          email: enteredEmail,
          password: enteredPassword,
          confirmPassword: enteredConfirmPassword
        }).then(function (response) {
        if(response.status === 200){
          setSucc(true);
          console.log('registracija u toku');
        }
        setSucc(true);
      })
      .catch(function (err){
        setErr(true);
        console.log(err);
      })

      restEmailInput();
      restPasswordInput();
      resetNameInput();
      resetConfirmPasswordInput();
    }


return (
  <div className='wraper'>
 <div className='form-container'>
 <img src={logo}/>
  {succ && <Alert message="Verfifikujte nalog" type="success" />}
  {err && <Alert message="Doslo je do greske!" type="error" />}
  <h2>Registrujte se</h2>
      <form onSubmit={formSubmitHandler}>
      <div className='inputLogin'> 
          <label htmlFor='text'>Ime Kompanije:</label>
          <input
          type='text'
          id='text'
          value={enteredName}
          onChange={nameChangeHandler}
          onBlur={nameBlurHandler}
          />
          {enteredNameIsInvalid && (
          <p className='error-text'>Unesite ime.</p>
          )}
      </div>
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
          {enteredPasswordIsInvalid && (
          <p className='error-text'>Lozinka mora imati najmanje 8 karaktera.</p>
          )}
      </div>
      <div className='inputLogin'>
          <label htmlFor='password'>Potvrdite lozinku:</label>
          <input
          type='password'
          id='password'
          value={enteredConfirmPassword}
          onChange={confirmPasswordChangeHandler}
          onBlur={confirmPasswordBlurHandler}
          />
          {enteredConfirmPasswordIsInvalid && (
          <p className='error-text'>Lozinke se ne poklapaju.</p>
          )}
      </div>
      <div>
          <button>Submit</button>
          <Link to='/login-companies'>
            <p>Imate nalog? Ulogute se.</p>
          </Link>
      </div>
      </form>
 </div>
  </div>
)
}

export default SignInCompanyForm
