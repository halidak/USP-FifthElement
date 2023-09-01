import React, { useEffect, useState } from 'react'
import { Avatar, List } from 'antd';
import axios from 'axios';

function ListOfUsers() {
    const [userData, setUserData] = useState();

    const fetchUsers = async () => {
        try{
            const response = await axios.get(`https://localhost:7029/api/User/get-all-users`);
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
      <List.Item actions={[<a key="list-loadmore-edit" href={`/edit-user/${item.id}`}>edit or delete user</a>]}>
        <List.Item.Meta
          avatar={<Avatar src={item.photo} />}
          title={<a href="">{item.firstName}{" "}{item.lastName}</a>}
          description={item.email}
        />
      </List.Item>
    )}
  />
    </div>
  )
}

export default ListOfUsers
