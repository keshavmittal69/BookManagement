import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './components/Home';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="page-container">
      <div className="content-wrap">
        <Router>
          <Route exact path='/' component={Home}></Route>
        </Router>
        <ToastContainer/>
      </div>
    </div>
  );
}

export default App;
