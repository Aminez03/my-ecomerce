
import './App.css';

import Signup from './components/Signup';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/Login'
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import { Profile } from './components/Profile';
import { useSelector } from 'react-redux';
import Dashboard from './components/Dashboard';
import AddProduct from './components/AddProduct';
import ListProduct from './components/ListProduct';
import ListMenProd from './components/ListMenProd';
import ListWomenProd from './components/ListWomenProd';
import DetailProduct from './components/DetailProduct';
import CartItems from './components/CartItems'
import Annonce from './components/Annonce';
import ContactUs from './components/ContactUs';
import Fouter from './components/Fouter'
import Checkout from './components/Checkout';





function App() {
  const { user } = useSelector((state) => state.user);

  return (
    <div className="App">
      <Router>
        <Annonce/>
      <Dashboard/>
      {user && user.userRole === "admin" ? <AddProduct /> : null }
       <Routes>
         <Route path="/" element={<div>

          <ListProduct/>
          <ContactUs/>
          <Fouter />
         </div>
                                  }/>
         <Route path="/Signup" element={<Signup/>}  />
         <Route path="/login" element={<Login/>}  />
         <Route path="/profile" element={<Profile/>}/>  
         <Route path="/men" element={<ListMenProd />} />
         <Route path="/women" element={<ListWomenProd />} /> 
         <Route path="/detailProduct/:_id" element={<DetailProduct />} />
         <Route path="/cart" element={<CartItems/>}/>
         <Route path="/Checkout" element={<Checkout/>}/>



       </Routes>
       
       
     </Router>
      
    </div>
  );
}

export default App;
