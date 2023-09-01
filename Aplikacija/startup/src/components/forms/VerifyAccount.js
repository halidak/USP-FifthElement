import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom';
import { Alert, Button } from 'antd';
import './Form.css';
import LoadingSpinner from '../UI/LoadingSpinner';
import axios from 'axios';

function VerifyAccount() {

    const [succ, setSucc] = useState(false);
    const [err, setErr] = useState(false);
    const [loading, setLoading] = useState(false);
    const { token } = useParams();

    console.log(token);
    useEffect(() => {
        const verify = async () => {
            try{
                setLoading(true);
                const respose = await axios.post(`https://localhost:7029/api/User/user-verify?token=${token}`);
                if(respose.status === 200){
                    console.log(respose);
                    setSucc(true);
                }
            }
            catch(err){
                console.log(err);
                setErr(true);
            }
            setLoading(false);
        }
        verify();
    }, [])

  return (
    <div className='center'>
        {loading && <LoadingSpinner />}
          {succ && <Alert
      message="Nalog je verifikovan"
      description="Uspešno ste verifikovali Vaš nalog."
      type="success"
      showIcon
    />}
    {succ && <div className='dugme'>
        <Link to='/login'>
            <Button type="primary">Ulogujte se</Button>
        </Link>
    </div>}
          {err && <Alert
      message="Došlo je do greške"
      description="Probajte ponovo."
      type="error"
      showIcon
    />}
    </div>
  )
}

export default VerifyAccount
