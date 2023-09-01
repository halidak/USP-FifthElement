import React, {  useEffect, useRef, useState } from 'react'
import { Modal } from 'antd';
import './EditProfile.css';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Alert, Input } from 'antd';
const { TextArea } = Input;

function CompanyEditProfile() {

    const company = JSON.parse(localStorage.getItem('company'));
    var {companyId} = useParams();

    const [companyName, setCompanyName] = useState();

    const [email, setEmail] = useState();

    const [phoneNumber, setPhoneNumber] = useState();

    const [location, setLocation] = useState();

    const [address, setAddress] = useState();

    const [description, setDescription] = useState();

    const [err, setErr] = useState(false);

    const [succ, setSucc] = useState(false);

    const history = useNavigate();

    const [emailErr, setEmailErr] = useState(false);

    const [profile, setProfile] = useState();

    const currPass = useRef();
    const newPass = useRef();
    const confPass = useRef();

    const [currPassErr, setCurrErrPass] = useState(false);
    const [newPassErr, setNewErrPass] = useState(false);
    const [confPassErr, setConfErrPass] = useState(false);

    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const displayData = async() => {
            try{
                const respose = await axios.get(`https://localhost:7029/api/Company/get-company-by-id/${companyId}`)
                if(respose && respose.data){
                    setCompanyName(respose.data.companyName);
                    setEmail(respose.data.email);
                    setAddress(respose.data.address);
                    setPhoneNumber(respose.data.phoneNumber);
                    setProfile(respose.data.photo);
                    setLocation(respose.data.location);
                    setDescription(respose.data.description);
                }
            }
            catch (err){
               console.log(err);
            }
        }
        displayData();
    }, [])


  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
     axios.delete(`https://localhost:7029/api/Company/delete-company-by-id/${companyId}`)
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
   axios.put(`https://localhost:7029/api/Company/update-company/${companyId}`, {
    companyName: companyName,
    email: email,
    phoneNumber: phoneNumber,
    address: address,
    photo: image,
    location: location,
    description: description
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
    setCompanyName(event.target.value);
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

  function onLocationChange(event){
    setLocation(event.target.value);
  }

  function onDescriptionChange(event){
    setDescription(event.target.value);
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
    axios.put(`https://localhost:7029/api/Company/change-password/${companyId}`, {
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


  return (
    <div className='bodyFormCompany'>
    <div className='containerForm'>
        <div className='profil'>
            <div className='slika'>
            {profile ? (<img src={profile}/>) :  <i className='fa fa-user fa-5x'></i>}
            </div>
            <h2>{companyName}</h2>
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
                    <span className='details'>Ime kompanije:</span>
                    <input type='text' value={companyName} onChange={onNameChange}/>
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
                    <span className='details'>Lokacija:</span>
                    <input type='text'  value={location} onChange={onLocationChange}/>
                </div>
                <div className='input-box'>
                    <span className='details'>Adresa:</span>
                    <input type='text' value={address} onChange={onAddressChange}/>
                </div>
                <div className='input-box'>
                    <span className='details'>Opis:</span>
                    <TextArea rows={4} value={description} onChange={onDescriptionChange}/>
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

export default CompanyEditProfile
