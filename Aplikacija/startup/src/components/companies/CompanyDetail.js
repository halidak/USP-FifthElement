import { Alert, Button, Modal } from 'antd';
import axios from 'axios';
import React, {useEffect, useState} from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import LoadingSpinner from '../UI/LoadingSpinner';
import './CompanyDetail.css'
import Star from './Star';
import { FaStar } from "react-icons/fa";
import ChatCard from '../chat/ChatCard';

function CompanyDetail() {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [succ, setSucc] = useState(false);
  const user = JSON.parse(localStorage.getItem('user'));
  const history = useNavigate();
  const {companyId} = useParams();

  const showModal = () => {
    if(!user){
      history('/login');
    }
    setIsModalOpen(true);
  };

  const handleOk = () => {
    axios.post(`https://localhost:7029/api/User/rate-company/${user.user.id}`,{
    companyId: companyId,
    rate: currentValue
    })
    .then(function(response){
      if(response.status == 200){
        setSucc(true);
      }
    })
    .catch(function (err){
      console.log(err);
    })
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const comp = JSON.parse(localStorage.getItem("company"));

    const params = useParams();

    const [list, setList] = useState(null);
    const [error, setErros] = useState(false);
    const [loading, setLoading] = useState(false);
    const [currentValue, setCurrentValue] = useState(0);
    const [firstValue, setFirstValue] = useState(0);
    const [hoverValue, setHoverValue] = useState(undefined);
    const [err, setErr] = useState(false);
    const [showChatCard, setShowChatCard] = useState(false);

    const showChat = () => {
      setShowChatCard(!showChatCard);
    }

    const fetchCompany = async (id) => {
      setLoading(true);
      try{
        const response = await axios.get(`https://localhost:7029/api/Company/get-company-by-id/${id}`);
        if(response && response.data){
          setList(response.data);
        }
      }
      catch(err){
        setErros(true);
        console.log(err);
      }
      setLoading(false);
    }



    useEffect(() => {
      fetchCompany(params.companyId);
    }, [params.companyId])

    if(!list){
        return <p className='centered'>Company not found</p>
    }

    if(loading){
      return (
        <div className='centered'>
          <LoadingSpinner />
        </div>
      )
    }
    if(error){
      return (
        <div className='centered'>
          <p>Something went wrong</p>
        </div>
      )
    }

  return (
    <>
      <div className='companyDetail'>
        <div>
      {succ && <Alert message="Uspesno ste ocenili poslodavca" type="success" />}
        <img style={{ width: '300px'}} 
        src={list.photo}/>
          <div className='ocena'>
            <FaStar
              size={24}
              color="#FFBA5A"
              />
              <span className='details'>{list.rate}</span>
          </div>
        <h3>{list.name}</h3>
        <p>
            <i className='fa fa-envelope'></i>
            {list.email}
        </p>
        <p>
          <i class="fa fa-location-pin"></i>
          {list.location}
          </p>
        <p>
          <i class="fa fa-phone"></i>
          {list.phoneNumber}
        </p>
        <p><i class="fa fa-map-pin"></i>{list.address}</p>
        </div>
        <div>
        <p className='text'>{list.description}</p>
       <button  className='company-button' onClick={showChat}>
            <i className='fa fa-envelope'></i>
            Kontaktirajte nas
        </button>
       <div style={{marginTop: '20px'}}>
         <Button onClick={showModal}>Ocenite nas</Button>
        </div>
       </div>
      </div>
      {showChatCard ? <ChatCard /> : null}
      <Modal title="Ocenite vase iskustvo" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
      {err && <Alert message="Vec ocenjeni" type="error" />}
        <Star 
            currentValue={currentValue}
            firstValue={firstValue}
            hoverValue={hoverValue}
            setCurrentValue={setCurrentValue}
            setFirstValue={setFirstValue}
            setHoverValue={setHoverValue}
          />
      </Modal>
    </>
  )
}

export default CompanyDetail
