import './App.css';
import { BrowserRouter as Router,Route,Link } from "react-router-dom";

import Footer from './Components/Footer';
import Header from './Components/Header';
import Home from './Components/Home';
import PostDetail from './Components/PostDetail';
import CategoryDetail from './Components/CategoryDetail';
import About from './Components/About';

function App() {
  return (
    <div className="App">
      <Router>
      <Header></Header>
      <Route path='/'  exact component={Home}/>
      <Route path='/post/:id'  exact component={PostDetail}/>
      <Route path='/category/:id' exact component={CategoryDetail}/>
      <Route path='/about' exact component={About}/>
      <Footer></Footer>

    </Router>
     
    </div>
  );
}

export default App;
