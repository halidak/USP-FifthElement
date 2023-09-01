import React, { useEffect, useState } from 'react'
import { Avatar, List } from 'antd';
import axios from 'axios';

function ListOfNotices() {
    const [userData, setUserData] = useState();

    const fetchUsers = async () => {
        try{
            const response = await axios.get(`https://localhost:7029/api/Notice/get-all-notices`);
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
        <h2 style={{marginTop: '30px'}}>List of Users</h2>
      <List
    itemLayout="horizontal"
    dataSource={userData}
    renderItem={(item) => (
      <List.Item actions={[<a key="list-loadmore-edit" href={`/praksa-forma/${item.id}`}>edit or delete notice</a>]}>
        <List.Item.Meta
          avatar={<Avatar src={item.companyPhoto} />}
          title={<a href="">{item.name}</a>}
          description={item.companyName}
        />
      </List.Item>
    )}
  />
    </div>
  )
}

export default ListOfNotices
