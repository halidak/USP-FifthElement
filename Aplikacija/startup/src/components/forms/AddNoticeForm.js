import { Alert, Input } from 'antd'
import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
const {TextArea} = Input;

function AddNoticeForm() {

    const company = JSON.parse(localStorage.getItem('company'));

    const [succ, setSucc] = useState();
    const[err, setErr] = useState();

    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [date, setDate] = useState('');
    const [description, setDescription] = useState('');

    const [nameErr, setNameErr] = useState(false);
    const [locationErr, setLocationErr] = useState(false);
    const [dateErr, setDateErr] = useState(false);
    const [descErr, setDescErr] = useState(false);

    const history = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault();
        if(name.length === 0){
            setNameErr(true);
        }
        else if(location.length === 0){
            setLocationErr(true);
        }
        else if(date.length === 0){
            setDateErr(true);
        }
        else if(description.length === 0){
            setDescErr(true);
        }
        
        else{

            axios.post(`https://localhost:7029/api/Notice/add-notice`, {
             name: name,
             loaction: location,
             date: date,
             description: description,
             companyId: company.company.id
         })
           .then(function (response) {
             console.log(response);
             history('/company-notices')
           })
           .catch(function (error) {
             setErr(true);
             console.log(error);
           });
        }
    }
    const onDateChange = (e) => setDate(e.target.value);
    const onNameChange = (e) => setName(e.target.value);
    const onLocationChange = (e) => setLocation(e.target.value);
    const onDescriptionChange = (e) => setDescription(e.target.value);
  return (
    <div>
        <div className='bodyFormCompany'>
    <div className='containerForm'>
        <form onSubmit={submitHandler}>
        {succ && <Alert message="Podaci uspesno promenjeni" type="success" />}
        {err && <Alert message="Doslo je do greske!" type="error" />}
        <div className='title'>Dodaj oglas</div>
            <div className='user-details'>
                <div className='input-box'>
                    <span className='details'>Naziv oglasa:</span>
                    <input type='text' onChange={onNameChange}/>
                    {nameErr && <p className='error-text'>Unesite podatke.</p>}
                </div>
                <div className='input-box' style={{display: 'grid'}}>
                    <span className='details'>Datum:</span>
                    <input type='date' onChange={onDateChange} />
                    {dateErr && <p className='error-text'>Unesite podatke.</p>}
                </div>
                <div className='input-box'>
                    <span className='details'>Lokacija:</span>
                    <input type='text' onChange={onLocationChange}/>
                    {locationErr && <p className='error-text'>Unesite podatke.</p>}
                </div>
                <div className='input-box'>
                    <span className='details'>Opis:</span>
                    <TextArea rows={4} onChange={onDescriptionChange}/>
                    {descErr && <p className='error-text'>Unesite podatke.</p>}
                </div>
                <div className='button'>
                    <button className='izmenidugme'>Dodaj oglas</button>
                </div>
            </div>
        </form>
        </div>
    </div>
    </div>
  )
}

export default AddNoticeForm
