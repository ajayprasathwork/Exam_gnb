import React, { useState, useEffect } from 'react';
import Header from '../component/header';
import '../styles/home.css';
import { useNavigate } from 'react-router-dom';
import { Result,Button } from 'antd';
const Error404 = () => {
    const nav=useNavigate();

   return (
        <div className='home'>
            <Header showadd={false} />
            <Result
                status="404"
                title="404"
                subTitle="Sorry, the page you visited does not exist."
                extra={<Button onClick={()=>nav("/")} type="primary">Back Home</Button>}
            />
        </div>
    )


}

export default Error404;