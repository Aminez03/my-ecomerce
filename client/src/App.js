
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
import { useState } from 'react';





function App() {
  const { user } = useSelector((state) => state.user);
  const { products } = useSelector((state) => state.product);

  const [searching, setSearching] = useState("")
  //edit search
  const handleSearch=(y)=>setSearching(y);


  return (
    <div className="App">
      <Router>
        <Annonce/>
      <Dashboard searching={searching} handleSearch={handleSearch}/>
      {user && user.userRole === "admin" ? <AddProduct /> : null }
       <Routes>
         <Route path="/" element={<div>

          <ListProduct products={products.filter(el=>el.title.toLocaleLowerCase().includes(searching.toLocaleLowerCase()))} />
         
         </div>
                                  }/>
         <Route path="/Signup" element={<Signup/>}  />
         <Route path="/login" element={<Login/>}  />
         <Route path="/profile" element={<Profile products={products.filter(el=>el.title.toLocaleLowerCase().includes(searching.toLocaleLowerCase()))}/>}/>  
         <Route path="/men" element={<ListMenProd products={products.filter(el=>el.title.toLocaleLowerCase().includes(searching.toLocaleLowerCase()))}/>} />
         <Route path="/women" element={<ListWomenProd products={products.filter(el=>el.title.toLocaleLowerCase().includes(searching.toLocaleLowerCase()))}/>} /> 
         <Route path="/detailProduct/:_id" element={<DetailProduct />} />
         <Route path="/cart" element={<CartItems/>}/>
         <Route path="/Checkout" element={<Checkout/>}/>



       </Routes>
       
       
     </Router>
      
    </div>
  );
}

export default App;
