import { Avatar, Button, List } from 'antd';
import axios from 'axios';
import LoadingSpinner from '../UI/LoadingSpinner';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import fileDownload from 'js-file-download';

function Students(props) {
    const {noticeId} = useParams();
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [documentPDF, setDocument] = useState();
    useEffect(() => {
        const fetch = async () => {
        setLoading(true);
        try{
            setLoading(true);
            const response = await axios.get(`https://localhost:7029/api/Notice/users-applied/${noticeId}`);
            if(response && response.data){
                setData(response.data);
                setDocument(response.data[0].document);
            }
        }
        catch(err){
            console.log(err);
        }
        setLoading(false);
    }
    fetch();
}, []);

    const download = (id) => {
        //var doc = URL.renderItem(documentPDF);
        var file = data.find(x => x.id === id).document;
        if (!file) {
            return
        }

      let element = document.createElement('a');
element.setAttribute('href', file);
element.setAttribute('download', 'cv.pdf');

element.style.display = 'none';
document.body.appendChild(element);

element.click();

document.body.removeChild(element);

    }

    if(loading){
        return(
            <div className='centered'>
                <LoadingSpinner />
            </div>
        )
    }
    return (
        <div style={{padding: '100px', height: '55vh'}}>
            <List
            itemLayout="horizontal"
            dataSource={data}
            renderItem={(item) => (
            <List.Item
                actions={[<a onClick={() => {
                    props.setFromId(item.id);
                    props.setShowChat(true);
                }} key="list-loadmore-more">Kontakt</a>]}
                >
                    <List.Item.Meta
                    avatar={<Avatar src={item.photo} />}
                    title={<a href="">{item.firstName}{" "} {item.lastName}</a>}
                    description={item.email}
                    />
            <div>
               
                <Button onClick={() => download(item.id)}>Document</Button>
                </div>
            </List.Item>
            )}
            />
        </div>
    );
}

export default Students
