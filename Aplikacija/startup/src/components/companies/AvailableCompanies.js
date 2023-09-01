import React, { useEffect, useState } from 'react'
import './AvailableCompanies.css'
import CompanyItem from './CompanyItem';
import axios from 'axios';
import LoadingSpinner from '../UI/LoadingSpinner';

function AvailableCompanies() {
    const [list, setList] = useState([]);
    const [error, setErros] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchNotice = async () => {
            setLoading(true);
            try{
                const respose = await axios.get(`https://localhost:7029/api/Company/get-all-companies`);
                if(respose && respose.data){
                    setList(respose.data);
                }
            }
            catch(err){
                setErros(true);
            }
            setLoading(false);
        }
        fetchNotice();
    }, [])

  const listC = list.map(n => 
    <CompanyItem 
        key={n.id}
        id={n.id}
        name={n.companyName}
        location={n.location}
        email={n.email}
        photo={n.photo}
    />
    )

    if(listC.length === 0){
        return(
          <div className='centered'>
          <p data-testid='error'>No comanies found</p>
        </div>
        )
      }

      if (loading) {
        return (
          <div className='centered' data-testid='loading-div'>
            <LoadingSpinner />
          </div>
        );
      }
return (
    <div className='availableCompanies-cards' data-testid="resolved">
        {listC}
        {error && <p>Something went wrong</p>}
    </div>
)
}

export default AvailableCompanies
