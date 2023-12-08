import React, { useState, useEffect } from 'react';
import Header from '../component/header';
import { useParams,useNavigate } from 'react-router-dom';
import { Radio, message,Modal,Result,Button} from 'antd';
import '../styles/home.css';

const Exam = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState();
  const [questions, setQuestions] = useState();
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const [result, setResult] = useState({totalquestions:'',correctans:'',persantage:""});
  const [showAns, setShowAns] = useState(false);
  const nav=useNavigate();


  useEffect(() => {
    getData();
  }, [])


  const getData = () => {
    setLoading(true)
    fetch("http://localhost:8080/exmes/" + id).then((response) => response.json())
      .then((result) => {
        setData(result)
        setQuestions(result.questions)
        setLoading(false)
      })
  }
 
  const showModal = () => {
   setIsModalOpen(true);
 };

  const onChange = (e, index) => {
    let newdata = [...questions];
    newdata[index].userans = e.target.value;
    newdata[index].isans = true;
    setQuestions(newdata)
}

  const getResult = () => {
    var totalQuestions = questions.length;
    var correctAnswers = 0
    questions.forEach((value, index, array) => {
      if (!value.isans) {
        message.destroy();
        message.open({
          type: 'error',
          content: 'please answer all the questions',
        });
        return;
      } else {
        if (value.ans == value.userans) {
          correctAnswers += 1;
      }
        if(index==totalQuestions-1){
          let result={totalquestions:totalQuestions,correctans:correctAnswers,persantage:(correctAnswers/totalQuestions)*100}
          setResult(result)
          showModal();
        }
      }
    });
  }



  if (loading) {
    return (
      <div className='home'>
        <Header showadd={false} />
        <div className='create-exam'>
       </div>
      </div>
    )
  }

  return (
    <div className='home'>
      <Header showadd={false} />
      <div className='create-exam'>
        <h1>Exam</h1>
        <from className='from-new'>
          <label>
            Title<br /><input type='text' id='title' value={data.title} disabled />
          </label>
          <label>
            Duraction<br /><input type='time' id='duractio' value={data.Duraction} disabled />
          </label>
          {questions && questions.map((item, index) => {
            return (
              <div>
                <h2 className='list-q-title'>{`${index + 1}.${item.question}`}</h2>
                <div className='options'>
                  <Radio.Group onChange={(e) => onChange(e, index)}>
                    <Radio value={"A"}>{"A ."+item.optionsA}</Radio>
                    <Radio value={"B"}>{"B ."+item.optionsB}</Radio>
                    <Radio value={"C"}>{"C ."+item.optionsC}</Radio>
                  </Radio.Group>
                </div>
              {showAns&&<h2 className='ans'>{"Answer is option "+item.ans}</h2>} 

              </div>
            )

          })}
         {showAns ?<button onClick={()=> showModal()} className='btn addq' >Result</button>:<button onClick={getResult} className='btn addq' >Submit</button>} 
        </from>
        <Modal title={`Successfully completed ${data.title} Exam`} open={isModalOpen} onCancel={()=>{setIsModalOpen(false); nav(-1)}}   width={800} 
         footer={[
          <Button key="back" onClick={()=>nav(-1)} >
            ok
          </Button>,
          <Button key="submit" type="primary" onClick={()=>{setShowAns(true);setIsModalOpen(false)}}>
            Show Answers
          </Button>,
        
        ]}
        >
          <Result
            status="success"
            title={ `Total Questions =${result.totalquestions} \n correct answers =${result.correctans} percentage =${result.persantage} %`}
           
          />

        </Modal>


      </div>

    </div>
  )


}

export default Exam;