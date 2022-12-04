
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import Home from './pages/Home';
import ViewTodo from './pages/ViewTodo';
import {TodosProvider} from './TodosContext';

function App() {
  return (
    <TodosProvider>
    <Router>
    <div className="App font-['Poppins'] text-accent">
      <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route exact path="/todo/:id" element={<ViewTodo/>}/>
          
         
      </Routes>
      </div>
    </Router>
    </TodosProvider>
  );
}

export default App;
