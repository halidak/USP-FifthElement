import { Alert } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import './EditProfile.css';

function NoticeApplication(props) {

  const user = JSON.parse(localStorage.getItem('user'));

  const [file, setFile] = useState();

  const [err, setErr] = useState(false);

  const history = useNavigate();

  const {noticeId} = useParams();

    if (!user) {
      history('/login');
    }


  const convert2base64 = e => {
    const file = e.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      setFile(reader.result);
    };
  }

  const handleSubmit = (e) => {
    console.log(file)
    e.preventDefault();
    axios.post(`https://localhost:7029/api/User/apply-for-job/${user.user.id}`, {
    noticeId: noticeId,
     document: file,
  })
    .then(function (response) {
      console.log(response);
      props.setSuccApply(true);
      history('/prakse/' + noticeId)
    })
    .catch(function (error) {
      setErr(true);
      console.log(error);
    });
  }

  

  return (
    <div className='bodyForm'>
      <div className='containerFormApp'>
     <form onSubmit={handleSubmit}>
     {err && <Alert message="Doslo je do greske!" type="error" />}
     <h3 className='title'>Podaci:</h3>
        <div className='input-box'>
         <span className='details'>Ime:</span>
          <p>{user.user.firstName}</p>        
        </div>
        <div className='input-box'>
         <span className='details'>Prezime:</span>
          <p>{user.user.lastName}</p>        
        </div>
        <div className='input-box'>
         <span className='details'>Email:</span>
          <p>{user.user.email}</p>        
        </div>
        <div className='input-box'>
         <span className='details'>Broj telefona:</span>
          <p>{user.user.phoneNumber}</p>        
        </div>
        <div className='input-box'>
         <span className='details'>Dokument:</span>
          <input id='fileupload' type='file'  accept="application/msword, application/vnd.ms-excel, application/pdf" onChange={e => convert2base64(e)} />
        </div>
        <div className='button'>
          <button className='izmenidugme'>Prijavite se</button>
        </div>
     </form>
      </div>
    </div>
  )
}

export default NoticeApplication
