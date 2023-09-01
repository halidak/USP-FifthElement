import React, { useEffect, useState } from 'react'
import { Avatar, List } from 'antd';
import axios from 'axios';

function ListOfCompanies() {
    const [userData, setUserData] = useState();

    const fetchUsers = async () => {
        try{
            const response = await axios.get(`https://localhost:7029/api/Company/get-all-companies`);
            if(response && response.data){
                setUserData(response.data);
            }
        }
        catch(err){
            console.log(err);
        }
    }
    useEffect(() => {
        fetchUsers();
    }, [])
  return (
    <div>
        <h2 style={{marginTop: '30px'}}>List of Companies</h2>
      <List
    itemLayout="horizontal"
    dataSource={userData} 
    renderItem={(item) => (
      <List.Item actions={[<a href={`/edit-company/${item.id}`} key="list-loadmore-edit">edit or delete company</a>]}>
        <List.Item.Meta
          avatar={<Avatar src={item.photo} />}
          title={<a href="">{item.companyName}</a>}
          description={item.email}
        />
      </List.Item>
    )}
  />
    </div>
  )
}

export default ListOfCompanies
