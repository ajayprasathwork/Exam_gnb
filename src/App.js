import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Home from './page/home';
import CreateExam from './page/createexam';
import Exam from './page/exam';
import Error404  from './page/404'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/create-exam" element={<CreateExam/>}/>
        <Route path="/update-exam/:id" element={<CreateExam/>}/>
        <Route path="/exam/:id" element={<Exam/>}/>
        <Route path="/*" element={<Error404/>}>

        </Route>
      </Routes>
    </BrowserRouter>
   
  );
}

export default App;
