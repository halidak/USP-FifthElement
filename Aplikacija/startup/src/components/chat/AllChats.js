import React, { useEffect, useState } from 'react';
import { List, Avatar, Drawer } from 'antd';
import axios from 'axios';


function AllChats(props) {

    const user = JSON.parse(localStorage.getItem("user"));
    const company = JSON.parse(localStorage.getItem("company"));
    const [chats, setChats] = useState([]);
   

    useEffect(() => {
        if(user){
            axios.get(`https://localhost:7029/api/User/getChats/${user.user.id}`)
            .then(function(response){
                if(response.status === 200){
                    setChats(response.data);
                }
            })
            .catch(function(err){
                console.log(err);
            })
        }
        else if(company){
            axios.get(`https://localhost:7029/api/Company/getChats/${company.company.id}`)
            .then(function(response){
                if(response.status === 200){
                    setChats(response.data);
                }
            })
            .catch(function(err){
                console.log(err);
            })
        }
    }, [props.showChat])

    const onClose = () => {
        props.setOpen(false);
      };

  return (
    <div>
       <Drawer title="All Chats" placement="right" onClose={onClose} open={props.open}>
       <List
    itemLayout="horizontal"
    dataSource={chats}
    renderItem={(item) => (
      <List.Item >
        <List.Item.Meta
          onClick={() => {
            props.setShowChat(true);
            props.setOpen(false);
            props.setFromId(item.fromId)
          }}
          key={item.fromId}
          avatar={<Avatar src={item.photo} />}
          title={<p>{item.name}</p>}
        />
      </List.Item>
    )}
  />
      </Drawer>
    </div>
  
  )
}

export default AllChats
