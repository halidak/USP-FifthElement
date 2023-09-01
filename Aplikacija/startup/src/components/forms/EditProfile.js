import React, {  useEffect, useRef, useState } from 'react'
import { Modal } from 'antd';
import './EditProfile.css';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Alert } from 'antd';
import LoadingSpinner from '../UI/LoadingSpinner';

function EditProfile() {

    const user = JSON.parse(localStorage.getItem('user'));
    const [loading, setLoading] = useState(false);

    const [firstName, setFirstName] = useState();

    const [lastName, setLatsName] = useState();

    const [email, setEmail] = useState();

    const [phoneNumber, setPhoneNumber] = useState();

    const [address, setAddress] = useState();

    const [err, setErr] = useState(false);

    const [succ, setSucc] = useState(false);

    const history = useNavigate();

    const [emailErr, setEmailErr] = useState(false);

    const [profile, setProfile] = useState();

    const currPass = useRef();
    const newPass = useRef();
    const confPass = useRef();

    const {userId} = useParams();

    const [currPassErr, setCurrErrPass] = useState(false);
    const [newPassErr, setNewErrPass] = useState(false);
    const [confPassErr, setConfErrPass] = useState(false);

    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const displayData = async() => {
            try{
                setLoading(true);
                const respose = await axios.get(`https://localhost:7029/api/User/get-user-by-id/${userId}`)
                if(respose && respose.data){
                    setFirstName(respose.data.firstName);
                    setLatsName(respose.data.lastName);
                    setEmail(respose.data.email);
                    setAddress(respose.data.address);
                    setPhoneNumber(respose.data.phoneNumber);
                    setProfile(respose.data.photo);
                }
                setLoading(false);
            }
            catch (err){
                setLoading(false);
               console.log(err);
            }
        }
        displayData();
    }, [])



  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
     axios.delete(`https://localhost:7029/api/User/delete-user-by-id/${userId}`)
    .then(function(response) {
        if (response.status === 200){
            localStorage.clear();
        }
        history('/');
    })
    .catch(function (error) {
        console.log(error);
    })
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const changeUser = () => {
    if(!email.includes('@')){
        setEmailErr(true);
        return;
    }
   axios.patch(`https://localhost:7029/api/User/update-user-id/${userId}`, {
    firstName: firstName,
    lastName: lastName,
    email: email,
    phoneNumber: phoneNumber,
    address: address,
    photo: image
   })
   .then(function (response){
        if(response.status === 200){
            setErr(false);
            setSucc(true);
            setEmailErr(false);
        }
   })
   .catch(function (error){
    setErr(true);
    console.log(error);
   })
  }

  const submitHandler = (e) => {
    e.preventDefault();
  }

 function onNameChange(event) {
    setFirstName(event.target.value);
  }

  function onLastNameChange(event){
    setLatsName(event.target.value);
  }

  function onEmailChange(event){
    setEmail(event.target.value);
  }

  function onAddressChange(event){
    setAddress(event.target.value);
  }

  function onNumberChange(event){
    setPhoneNumber(event.target.value);
  }

  const passwordSubmit = (e) => e.preventDefault();

  const changePassword = () => {
    if(newPass.current.value.length < 5){
        setNewErrPass(true);
        return;
    }
    if(newPass.current.value !== confPass.current.value){
        setConfErrPass(true);
        return;
    }
    axios.put(`https://localhost:7029/api/User/change-password/${userId}`, {
        currentPassword: currPass.current.value,
        newPassword: newPass.current.value,
        conformNewPassword: confPass.current.value
       })
       .then(function (response){
            if(response.status === 200){
                setSucc(true);
            }
       })
       .catch(function (error){
        setCurrErrPass(true);
        console.log(error);
       })
  }

  const [image, setImage] = useState('');

  const convert2base64 = e => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
        setImage(reader.result.toString());
    }
    reader.readAsDataURL(file);
  }

  if(loading){
    return(
        <div className='centered'>
            <LoadingSpinner />
        </div>
    )
  }

  return (
    <div className='bodyForm'>
    <div className='containerForm'>
        <div className='profil'>
            <div className='slika'>
            {profile ? (<img src={profile}/>) :  <i className='fa fa-user fa-5x'></i>}
            </div>
            <h2>{firstName}{' '}{lastName}</h2>
            <span className='details'>{email}</span>
            <div className='button'>
                    <button className='obrisidugme' onClick={showModal}>Obrisi profil</button>
            </div>
             <br></br>
            <input id='fileupload' type='file' onChange={e => convert2base64(e)} />
            <Modal title="Potvrda" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            <p>Da li ste sigurni da zelite da obrisete nalog?</p>
        </Modal>
        </div>
        <form onSubmit={submitHandler}>
        {succ && <Alert message="Podaci uspesno promenjeni" type="success" />}
        {err && <Alert message="Doslo je do greske!" type="error" />}
        <div className='title'>Izmeni profil</div>
            <div className='user-details'>
                <div className='input-box'>
                    <span className='details'>Ime:</span>
                    <input type='text' value={firstName} onChange={onNameChange}/>
                </div>
                <div className='input-box'>
                    <span className='details'>Prezime:</span>
                    <input type='text'  value={lastName} onChange={onLastNameChange}/>
                </div>
                <div className='input-box'>
                    <span className='details'>Email:</span>
                    <input type='text' value={email} onChange={onEmailChange}/>
                    {emailErr && <p className='error-text'>Unesite validan email.</p>}
                </div>
                <div className='input-box'>
                    <span className='details'>Broj telefona:</span>
                    <input type='text' value={phoneNumber} onChange={onNumberChange}/>
                </div>
                <div className='input-box'>
                    <span className='details'>Adresa:</span>
                    <input type='text' value={address} onChange={onAddressChange}/>
                </div>
                <div className='button'>
                    <button className='izmenidugme' onClick={changeUser}>Izmeni profil</button>
                </div>
            </div>
        </form>
        <div>
            <form onSubmit={passwordSubmit}>
                <div className='title'>Promeni lozinku</div>
                <div className='input-box'>
                    <span className='details'>Stara lozinka:</span>
                    <input type='password' ref={currPass}/>
                    {currPassErr && <p className='error-text'>Pogresna lozinka.</p>}
                </div>
                <div className='input-box'>
                    <span className='details'>Nova lozinka:</span>
                    <input type='password' ref={newPass}/>
                    {newPassErr && <p className='error-text'>Lozinka mora imati najmanje 8 karaktera.</p>}
                </div>
                <div className='input-box'>
                    <span className='details'>Potvrdi lozinku:</span>
                    <input type='password' ref={confPass}/>
                    {confPassErr && <p className='error-text'>Lozinke se ne poklapaju.</p>}
                </div>
                <div className='button'>
                    <button className='izmenidugme' onClick={changePassword}>Izmeni lozinku</button>
                </div>
            </form>
        </div>
        </div>
    </div>
  )
}

export default EditProfile
