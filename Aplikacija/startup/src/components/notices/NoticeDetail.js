import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import NoticeItem from '../notices/NoticeItem';
import './NoticeDetail.css'
import LoadingSpinner from '../UI/LoadingSpinner';
import { Alert } from 'antd';

function NoticeDetail(props) {

    const {noticeId} = useParams();
    const [listOfIds, setListOfIds] = useState(null);
    const [list, setList] = useState(null);
    const [error, setErros] = useState(false);
    const [loading, setLoading] = useState(false);
    const user = JSON.parse(localStorage.getItem("user"));
    const [clicked, setIsClicked] = useState(false);

    
    const addToFavorites = () => {
      axios.post(`https://localhost:7029/api/User/add-to-favorites/${user.user.id}`, {
        noticeId: noticeId
      })
      .then(function(response){
        if(response.status === 200){

          if (clicked) {
            let index = user.user.favoriteNotices.indexOf(parseInt(noticeId));
            if (index != -1) {
              user.user.favoriteNotices.splice(index,1);
            }
          } else  {
           user.user.favoriteNotices.push(parseInt(noticeId));
          }

          localStorage.setItem("user", JSON.stringify(user));
          setIsClicked(!clicked);
        }
      })
      .catch(function(err){
        console.log(err);
      })
    }

    const fetchNotice = async (id) => {
      try {
        setLoading(true);
        const response = await axios.get(`https://localhost:7029/api/Notice/get-notice-by-id/${id}`)
        if(response && response.data){
          console.log(response.data);
          setList(response.data);
        }
      }
      catch (err){
        setErros(true);
        console.error(err);
      }
      setLoading(false);
    }
    
    useEffect(() => {
      fetchNotice(noticeId);
      console.log(user)
      if(user?.user?.favoriteNotices?.find(x => x == parseInt(noticeId))){
        setIsClicked(true);
      }
      else{
        setIsClicked(false);
      }
    }, [clicked])

    if(!list){
      return (
        <div className='centered'>
          <p>Something went wrong</p>
        </div>
      )
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
       <div className='noticeDetail' data-testid="resolved">
       {props.succApply && <Alert message="Uspesno prijavljeni" type="success" />}
        <NoticeItem 
            key={list.id}
            id={list.id}
            name={list.name}
            date={list.date}
            companyName={list.companyName}
            location={list.loaction}
            companyPhoto={list.companyPhoto}
            addToFavorites={addToFavorites}
            clicked={clicked}
        />
        <p className='paragraf'>{list.description}</p>
        <Link to={`/notice-application/${noticeId}`}>
          <button  className='notice-button'>Konkuriši</button>
        </Link>
     </div>
    </>
  )
}

export default NoticeDetail
