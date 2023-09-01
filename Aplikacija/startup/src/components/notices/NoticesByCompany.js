import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import LoadingSpinner from '../UI/LoadingSpinner';
import './AvailableNotice.css';
import CompanyNotice from './CompanyNotice';
import { Button } from 'antd';

function NoticesByCompany() {
    const [list, setList] = useState([]);
    const [error, setErros] = useState(false);
    const [loading, setLoading] = useState(false);

    const company = JSON.parse(localStorage.getItem('company'));

    useEffect(() => {
        const fetchNotice = async () => {
            setLoading(true);
        try {
            const respose = await axios.get(`https://localhost:7029/api/Company/notice-by-company/${company.company.id}`)
            if(respose && respose.data){
              setList(respose.data);
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
          <div className='notice--card'>
            <CompanyNotice 
                key={n.id}
                id={n.id}
                name={n.name}
                companyName={n.companyName}
                location={n.loaction}
                date={n.date}
                companyPhoto={n.companyPhoto}
            />
            <Link to={`/praksa-forma/${n.id}`}>
              <Button>Izmeni</Button>
            </Link>
            <Link to={`/students/${n.id}`}>
              <Button type="primary" style={{marginLeft: '10px'}}>Prijavljeni</Button>
            </Link>
          </div>
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
    <div className='notice'>
      {noticeList}
    </div>
  )
}

export default NoticesByCompany
