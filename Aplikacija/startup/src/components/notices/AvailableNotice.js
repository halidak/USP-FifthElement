import React, { useEffect, useState } from 'react'
import Card from '../UI/Card';
import NoticeItem from './NoticeItem';
import './AvailableNotice.css';
import axios from 'axios';
import LoadingSpinner from '../UI/LoadingSpinner';
import { Link } from 'react-router-dom';


function AvailableNotice(props) {

    const [list, setList] = useState([]);
    const [listOfIds, setListOfIds] = useState([]);
    const user = JSON.parse(localStorage.getItem("user"));
    const [error, setErros] = useState(false);
    const [loading, setLoading] = useState(false);

    const fav = async() => {
      setLoading(true);
      try {
          const respose = await axios.get(`https://localhost:7029/api/User/get-favorite-notices/${user.user.id}`)
          if(respose && respose.data){
            setListOfIds(respose.data);
            console.log(listOfIds);
          }
      }
      catch (err){
         
      }
      
    }

    useEffect(() => {
      const fetchNotice = async () => {
        try {
          setLoading(true);
          const respose = await axios.get(`https://localhost:7029/api/Notice/get-all-notices`)
          if(respose && respose.data){
            setList(respose.data);
          }
          setLoading(false);
        }
        catch (err){
            setErros(true);
        }
      }
      fetchNotice();
      fav();
    }, [])
    

    const noticeList = list.filter(n => {
      return  (n.loaction.includes(props.locationSearch) &&
      n.name.toLowerCase().includes(props.jobTypeSearch.toLowerCase()) && n.companyName.toLowerCase().includes(props.search.toLowerCase()))
    }).map(n => 
      <Link to={`/prakse/${n.id}`}>
        <Card>
        <NoticeItem 
            key={n.id}
            id={n.id}
            name={n.name}
            companyName={n.companyName}
            location={n.loaction}
            date={n.date}
            companyPhoto={n.companyPhoto}
            clicked={listOfIds.find(x => x.id === n.id) ? true : false}
        />
        </Card>
        </Link>
        );

        if(noticeList.length === 0){
          return(
            <div className='centered'>
            <p>No notice found</p>
          </div>
          )
        }

        if (loading) {
          return (
            <div className='centered' data-testid='loading'>
              <LoadingSpinner />
            </div>
          );
        }

  return (
    <div className='notice'>
        {noticeList}
        {error && <p data-testid='noData'>Something went wrong</p>}
    </div>
  )
}

export default AvailableNotice
