import React, { useState, useEffect } from 'react';
import Header from '../component/header';
import { useNavigate } from 'react-router-dom';
import { Empty,Button,Spin } from 'antd';
import '../styles/home.css';

const Home = () => {
  const [data, setData] = useState();
  const [loading,setLoading]=useState(true);
  const nav = useNavigate();


  useEffect(() => {
    getData();
  }, [])
  
  const getData = () => {
    fetch("http://localhost:8080/exmes").then((response) => response.json())
      .then((result) => {
        setData(result);
        setLoading(false)
      })
  }
  const deleterecord = (id) => {
    fetch("http://localhost:8080/exmes/" + id, { method: 'DELETE' }).then((response) => response.json())
      .then((result) => {
        alert("Record deleted")
        getData()
      })
  }

  if(loading){
    return(
      <div className='home'>
      <Header showadd={true} />
      <Spin className='loading' />
     </div>
    )
  }

 
  return (
    <div className='home'>
      <Header showadd={true} />
      {data? <div> <Empty
        image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
        imageStyle={{
          height: 60,
        }}
        description={
          <span>
          No Data Found
          </span>
        }
      >
      </Empty></div> : <table className="exam-table">
        <caption>Exam List</caption>

        <tbody style={{ width: '100%' }}>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Duration</th>
            <th>Total Questions</th>
            <th>Action</th>
          </tr>
          {data ? data.map((item, index) =>
            <tr key={index}>
              <td>{index + 1} </td>
              <td>{item.title} </td>
              <td>{item.Duraction} </td>
              <td>{item.questions.length} </td>
              <td><button onClick={() => nav("/exam/" + item.id)} className='btn start'>Start</button><button onClick={() => nav("/update-exam/" + item.id)} className='btn edit'>Edite</button><button onClick={() => deleterecord(item.id)} className='btn delete'>Delete</button></td>
            </tr>
          ) : null}
        </tbody>
      </table>}
    </div>
  )
}

export default Home;