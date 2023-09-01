import { Alert, Input } from 'antd'
import Modal from 'antd/es/modal/Modal'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
const { TextArea } = Input;


function EditNoticeForm() {

    const [name, setName] = useState();
   

    const [email, setEmail] = useState();

    const [companyName, setCompanyName] = useState();

    const [description, setDescription] = useState();

    const [location, setLocation] = useState();

    const [date, setDate] = useState();

    const [err, setErr] = useState(false);

    const [succ, setSucc] = useState(false);

    const [photo, setPhoto] = useState();

    const history = useNavigate();

    const [isModalOpen, setIsModalOpen] = useState(false);

    const { noticeId } = useParams();

    const dateFormat = 'DD/MM/YYYY';


    useEffect(() => {
       const displayData = async() => {
        try{
            const response = await axios.get(`https://localhost:7029/api/Notice/get-notice-by-id/${noticeId}`);
            if(response && response.data){
                setCompanyName(response.data.companyName);
                setEmail(response.data.companyEmail);
                setPhoto(response.data.companyPhoto);
                setDescription(response.data.description);
                setName(response.data.name);
                setLocation(response.data.loaction);
                setDate(response.data.date);
            }
        }
        catch(err) {
            console.log(err);
        }
       }
       displayData();
    }, [])
    

    const onChange = (e) => {
        setDate(e.target.value);
        console.log(date);
    }

    const submitHandler = (e) => {
        e.preventDefault();
    }

    const showModal = () => {
        setIsModalOpen(true);
    }
    const changeNotice = () => {
        axios.put(`https://localhost:7029/api/Notice/update-notice-by-id/${noticeId}`, {
            name: name,
            loaction: location,
            description: description,
            date: date
        })
        .then(function (response){
            if(response.status === 200){
                setErr(false);
                setSucc(true);
            }
        })
        .catch(function (err) {
            setErr(true);
            console.log(err);
        })
    }
    const handleCancel = () =>{
        setIsModalOpen(false);
    }
    const handleOk = () => {
            axios.delete(`https://localhost:7029/api/Notice/delete-notice?id=${noticeId}`)
        .then(function(response) {
            if (response.status === 200){
                history('/company-notices');
            }
        })
        .catch(function (error) {
            console.log(error);
        })
        setIsModalOpen(false);
    }

    const onNameChange = (e) => {
        setName(e.target.value);
    }

    const onLocationChange = (e) => {
        setLocation(e.target.value);
    }

    const onDescriptionChange = (e) => {
        setDescription(e.target.value);
    }

  return (
    <div className='bodyFormCompany'>
    <div className='containerForm'>
        <div className='profil'>
            <div className='slika'>
            {photo ? (<img src={photo}/>) :  <i className='fa fa-user fa-5x'></i>}
            </div>
            <h2>{companyName}</h2>
            <span className='details'>{email}</span>
            <div className='button'>
                    <button className='obrisidugme' onClick={showModal}>Obrisi oglas</button>
            </div>
             <br></br>
            <Modal title="Potvrda" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            <p>Da li ste sigurni da zelite da obrisete nalog?</p>
        </Modal>
        </div>
        <form onSubmit={submitHandler}>
        {succ && <Alert message="Podaci uspesno promenjeni" type="success" />}
        {err && <Alert message="Doslo je do greske!" type="error" />}
        <div className='title'>Izmeni oglas</div>
            <div className='user-details'>
                <div className='input-box'>
                    <span className='details'>Naziv oglasa:</span>
                    <input type='text' value={name} onChange={onNameChange}/>
                </div>
                <div className='input-box' style={{display: 'grid'}}>
                    <span className='details'>Datum:</span>
                    <input type='date' onChange={onChange} value={date}/>
                </div>
                <div className='input-box'>
                    <span className='details'>Lokacija:</span>
                    <input type='text' value={location} onChange={onLocationChange}/>
                </div>
                <div className='input-box'>
                    <span className='details'>Opis:</span>
                    <TextArea rows={4} value={description} onChange={onDescriptionChange}/>
                </div>
                <div className='button'>
                    <button className='izmenidugme' onClick={changeNotice}>Izmeni oglas</button>
                </div>
            </div>
        </form>
        </div>
    </div>
  )
}

export default EditNoticeForm
