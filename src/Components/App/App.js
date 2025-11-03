
import './App.css';
import StudentList from '../StudentManagement/StudentList';
import AddNewStudents from '../AddNewStudents/AddNewStudents';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/:id?' element={<AddNewStudents/>} />
        <Route path='/studentlist' element={<StudentList />} />
        
      </Routes>

    </Router>
   
  );
}

export default App;
