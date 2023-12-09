import React, { useState, useEffect } from 'react';
import Header from '../component/header';
import { Modal, message } from 'antd';
import '../styles/home.css';
import { useParams,useNavigate } from 'react-router-dom';

const CreateExam = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [exam, setExam] = useState({ id: "", title: "", duractio: "00:15" })
    const [questions, setQuestions] = useState([])
    const [question, setQuestion] = useState({ question: "", ans: "", optionsA: "", optionsB: "", optionsC: "", isans: false, userans: '' })
    const [errors, setErrors] = useState({});
    const [index, setIndex] = useState();
    const { id } = useParams();
    const nav=useNavigate();

    useEffect(() => {
        if (id) {
            getData();
        }
    }, [])


    const getData = () => {
        fetch("http://localhost:8080/exmes/" + id).then((response) => response.json())
            .then((result) => {
                setExam({ ...exam, title: result.title, duractio: result.Duraction })
                setQuestions(result.questions)
            })
    }

    const showModal = () => {
        if (exam.title.length < 3) {
            message.destroy();
            message.open({
                type: 'error',
                content: 'please enter valide exam name',
            });
        } else {
            setIsModalOpen(true);

        }
    };

    const validateValues = (inputValues) => {
        let errors = {};
        if (question.question.length === 0) {
            errors.question = "question can not be empty";
        }
        if (question.optionsA.length === 0) {
            errors.optionsA = "option A can not be empty";
        }
        if (question.optionsB.length === 0) {
            errors.optionsB = "option B can not be empty";
        } 
        if (question.optionsC.length === 0) {
            errors.optionsC = "option C can not be empty";
        }
        if (question.ans.length === 0) {
            errors.ans = "ans can not be empty";
        }

        return errors;
    };




    const handleOk = () => {
        let error=validateValues();
        setErrors(error);
        if(Object.keys(error).length===0){
            if (index) {
                setIsModalOpen(false);
                let newdata = [...questions];
                newdata[index] = question;
                console.log(newdata)
                setQuestions(newdata);
                setQuestion({ question: "", ans: "", optionsA: "", optionsB: "", optionsC: "", isans: false, userans: '' })
                setIndex('');
            } else {
                setIsModalOpen(false);
                setQuestions((prv) => [...prv, question]);
                setQuestion({ question: "", ans: "", optionsA: "", optionsB: "", optionsC: "", isans: false, userans: '' })
            }
        }
       


    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setQuestion({ question: "", ans: "", optionsA: "", optionsB: "", optionsC: "", isans: false, userans: '' })

    };

    const creatExam = () => {
        fetch('http://localhost:8080/exmes', {
            method: 'POST',
            body: JSON.stringify({
                id: Math.floor(Math.random() * 100),
                title: exam.title,
                Duraction: exam.duractio,
                questions: questions
            }),
            headers: {
                'Content-type': 'application/json',
            },
        }).then((response) =>{
            message.destroy();
            message.open({
                type: 'success',
                content: 'Exam created sucessfully',
            });
            setTimeout(()=>nav(-1),1000)
        })
        .catch(()=>{
            message.destroy();
            message.open({
                type: 'error',
                content: 'something went wrong please try again',
            });
          })
    }

    const updateExam = () => {
        fetch('http://localhost:8080/exmes/' + id, {
            method: 'PUT',
            body: JSON.stringify({
                id: Math.floor(Math.random() * 100),
                title: exam.title,
                Duraction: exam.duractio,
                questions: questions
            }),
            headers: {
                'Content-type': 'application/json',
            },
        }).then((response) => {
            message.destroy();
            message.open({
                type: 'success',
                content: 'Exam updated sucessfully',
            });
            setTimeout(()=>nav(-1),1000)
        })
        .catch(()=>{
            message.destroy();
            message.open({
                type: 'error',
                content: 'something went wrong please try again',
            });
          })
    }


    const deleteQuestion = (q) => {
            setQuestions((que) =>
            que.filter((item) => item.question !== q))
    }

    const editeQuestion = (item, index) => {
        setQuestion({ question: item.question, ans: item.ans, optionsA: item.optionsA, optionsB: item.optionsB, optionsC: item.optionsC, isans: false, userans: '' })
        setIsModalOpen(true);
        setIndex(index)
   }




    return (
        <div className='home'>
            <Header showadd={false} />
            <div className='create-exam'>
                {id ? <h1>Update Exam</h1> : <h1>Create Exam</h1>}
                <from className='from-new'>
                    <label>
                        Title<br /><input type='text' id='title' value={exam.title} onChange={(e) => setExam({ ...exam, title: e.target.value })} />
                    </label>
                    <label>
                        Duraction<br /><input type='time' id='duractio' value={exam.duractio} onChange={(e) => setExam({ ...exam, duractio: e.target.value })} />
                    </label>
                    {questions && questions.map((item, index) => {
                        return (
                            <div>
                                <h2 className='list-q-title'>{`${index + 1}.${item.question}`}</h2>
                                <div className='options'>
                                    <p>{`A.${item.optionsA}`}</p><p>{`B.${item.optionsB}`}</p><p>{`C.${item.optionsC}`}</p><span className='pipe'>|</span><p>{`Ans.${item.ans}`}</p>
                                    <button onClick={() => editeQuestion(item, index)} className='btn edit option-edit'>Edite</button><button onClick={() => deleteQuestion(item.question)} className='btn delete option-edit'>Delete</button>

                                </div>
                            </div>
                        )

                    })}
                    <button className='btn addq' onClick={showModal}>Add Question</button>
                    {id ? <button className='btn create' onClick={updateExam}>Update Exam</button> :questions.length>=1 ? <button className='btn create' onClick={creatExam}>Create Exam</button>:null}
                </from>
                <Modal title="Add Question" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} width={800} >
                    <form className='question'>
                        <label>
                            Question <br /><input type='text' value={question.question} onChange={(e) => setQuestion({ ...question, question: e.target.value })} />
                        </label>
                        {errors.question && <p className="error">{errors.question}</p>}
                        <label>
                            Option A <br /><input type='text' value={question.optionsA} onChange={(e) => setQuestion({ ...question, optionsA: e.target.value })} />
                        </label>
                        {errors.optionsA && <p className="error">{errors.optionsA}</p>}

                        <label>
                            Option B <br /><input type='text' value={question.optionsB} onChange={(e) => setQuestion({ ...question, optionsB: e.target.value })} />
                        </label>
                        {errors.optionsB && <p className="error">{errors.optionsB}</p>}

                        <label>
                            Option C <br /><input type='text' value={question.optionsC} onChange={(e) => setQuestion({ ...question, optionsC: e.target.value })} />
                        </label>
                        {errors.optionsC && <p className="error">{errors.optionsC}</p>}

                        <label>
                            Ans<br /><select name="options" id="options" value={question.ans} onChange={(e) => setQuestion({ ...question, ans: e.target.value })} >
                                <option value=''>select ans</option>
                                <option value="A">Option A</option>
                                <option value="B">Option B</option>
                                <option value="C">Option C</option>
                            </select>
                        </label>
                        {errors.ans && <p className="error">{errors.ans}</p>}


                    </form>

                </Modal>

            </div>

        </div>
    )


}

export default CreateExam;