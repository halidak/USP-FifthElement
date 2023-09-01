import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import LoadingSpinner from '../UI/LoadingSpinner';
import NoticeItem from './NoticeItem';
import Card from '../UI/Card';
import './AvailableNotice.css';

function Applied() {
    const [list, setList] = useState([]);
    const [error, setErros] = useState(false);
    const [loading, setLoading] = useState(false);

    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        const fetchNotice = async () => {
            setLoading(true);
        try {
            const respose = await axios.get(`https://localhost:7029/api/User/get-notices-by-user/${user.user.id}`)
            if(respose && respose.data){
              setList(respose.data);
              console.log(list);
            }
        }
        catch (err){
            setErros(true);
        }
        setLoading(false);
        }
        fetchNotice();
    }, [])

    const noticeList = list.map(n => 
          <Card>
            <NoticeItem 
                key={n.id}
                id={n.id}
                name={n.name}
                companyName={n.companyName}
                location={n.loaction}
                date={n.date}
                companyPhoto={n.companyPhoto}
            />
          </Card>
          );

    if(noticeList.length === 0){
        return(
          <div className='centered'>
          <p>No notice found</p>
        </div>
        )
      }

      if(error){
        return(
          <div className='centered'>
          <p>Something went wrong</p>
        </div>
        )
      }

      if (loading) {
        return (
          <div className='centered'>
            <LoadingSpinner />
          </div>
        );
      }
  return (
    <div className='kartica'>
      <div className='notice'>
        {noticeList}
      </div>
    </div>
  )
}

export default Applied
