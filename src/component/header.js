import React,{memo}  from 'react';
import {PlusOutlined} from '@ant-design/icons';
import '../styles/header.css';
import  Gnblogo from '../asset/gnb.png';
import { useNavigate } from 'react-router-dom';
const Header=({showadd})=>{
    const nav=useNavigate();
    return(
        <div className='header'>
          <img onClick={()=>nav('/')} className='logo' src={Gnblogo}/>
         {showadd?<button onClick={()=>nav("/create-exam")} className='create_btn'><PlusOutlined className='createicon' />Create Exam</button>:<button onClick={()=>nav(-1)} className='create_btn'>Go Back</button>} 
        </div>
    )
}

export default memo(Header);