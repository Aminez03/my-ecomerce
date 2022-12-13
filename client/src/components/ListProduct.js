import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from '../redux/action';
import {  Carousel, Col, Container, Row } from "react-bootstrap";
import ProductCard from './ProductCard';
import TableProductAdmin from './TableauProductAdmin';
import { Link } from 'react-router-dom';
import ContactUs from './ContactUs';
import Fouter from './Fouter';





const ListProduct = ({products }) => {
    //store
  // const { products } = useSelector((state) => state.product);
  const { user } = useSelector((state) => state.user);

  
//   console.log(products);


  //dispatch getallproducts
  const dispatch = useDispatch();

  
    useEffect(() => {
        dispatch(getAllProducts());
        
      }, []);


      function importAll(r) {
        let images = {};
        r.keys().map((item) => { return( images[item.replace('./', '')] = r(item)) });
        return images;
      }
      
      const images = importAll(require.context('../../public/images', false, /\.(png|jpe?g|svg)$/));
      
      

  return (
    <div>
       {user && user.userRole === "admin" ?
      <TableProductAdmin product={products}  />:
      <div>

        <div className="carousels">
          <Carousel variant="dark" fade>
            <Carousel.Item style={{ color: "black" }}>
              <img
                className="d-block w-100"
                style={{ height: "80vh",opacity:'0.9' }}
                src={images['mencl.jpg']}
                alt="First slide"
              />
              <Carousel.Caption>
                <h3 style={{fontSize:'28px',color:'black', fontFamily:"Arial, Helvetica, sans-serif"}}>Men's clothing </h3>
                <p style={{fontSize:'22px',color:'black'}}> Shop for our collection of men's clothing including suits, dress shirts, sportcoats, big & tall & custom clothing online</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                style={{ height: "80vh",opacity:'0.8' }}
                src={images['woo.png']}
                alt="Third slide"
              />

              <Carousel.Caption>
                <h3 style={{fontSize:'28px',color: "black",fontFamily:"Arial, Helvetica, sans-serif"}}>women's clothing </h3>
                <p style={{fontSize:'22px',color: "black"}}>
                Shop for our collection of women's clothing including suits, dress shirts, sportcoats, big & tall & custom clothing online
                </p>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </div>

        <Container>
              <Row>
                <Col sm={1}></Col>
                <Col lg={true} sm={10}>
                  <div className="listProduct">
                    <h2 className='ourproducts'><i class="fa-brands fa-product-hunt"></i> Our products</h2>
                    <div className='categorie'>
                        <ul>
                        <li><Link to="/" style={{color:"black",textDecoration: "none"}}>All clothing  </Link> </li>
                        <li><Link to="/men" style={{color:"black" ,textDecoration: "none"}}>Men's clothing </Link></li>
                        <Link to="/women" style={{color:"black" ,textDecoration: "none"}}><li>Women's clothing</li></Link>
                        </ul>
                    </div>
                    {products &&
                      React.Children.toArray(
                        products.map((el) => <ProductCard product={el} />)
                      )}
                  </div>
                </Col>
                <Col sm={1}></Col>
              </Row>
            </Container>
            <ContactUs/>
            <Fouter/>
      </div>
      }

    </div>
  )
}

export default ListProduct