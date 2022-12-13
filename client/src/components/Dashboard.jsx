import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getUserProfile, userLogOut } from '../redux/action';
import { Button, Container, Form, FormControl, Nav, Navbar, NavDropdown, Offcanvas } from 'react-bootstrap'
import { Link } from "react-router-dom";





const Dashboard = ({searching,handleSearch}) => {
  const { user } = useSelector((state) => state.user);
  const { cartItems } = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  useEffect(() => {
      dispatch(getUserProfile());
  }, [dispatch]);

  return (
      <div className='header'  >



          <Navbar id='navbar' expand={false} >

              <Container fluid >
                  <Navbar.Toggle aria-controls="offcanvasNavbar" />
                  <Navbar.Brand href="/" className='ecomerce'><i class="fa-solid fa-austral-sign"></i> E-commerce</Navbar.Brand>
                 
                  <NavDropdown title="Catégories" id="basic-nav-dropdown">
              <NavDropdown.Item href="/">All products</NavDropdown.Item>
              <NavDropdown.Item href="/men">
                Men's clothing
              </NavDropdown.Item>
              <NavDropdown.Item href="/women">Women's clothing</NavDropdown.Item>
              
            </NavDropdown>
                  <Form className="d-flex" id='search'>

                 
                            <div className='search'>
                                <FormControl
                                  type="search"
                                  placeholder="Search"
                                  className="me-2"
                                  aria-label="Search"
                                  value={searching}
                                  onChange={e=>handleSearch(e.target.value)}
                              
                              />
                            </div>
                              

                              
                              
        <Button style={{backgroundColor:'SkyBlue '}}><i style={{color:"black"}}class="fa-solid fa-magnifying-glass"></i></Button>
                          
                          
                          
                          </Form>

                  <div className="all_nave">

                      {user ? <div className="nave" >

                          <div className="signUp">
                              <Nav>
                                  <Nav.Link id="username" ><i class="fa-solid fa-user"></i> {user.fullName} </Nav.Link>
                              </Nav>
                          </div>



                          <div className="login">
                              <Nav>
                                  <Nav.Link id="logout"onClick={() => dispatch(userLogOut())} > <i class="fa-solid fa-right-from-bracket"></i> Log Out  </Nav.Link>
                              </Nav>
                          </div>

                      </div> : <div className="nave">
                          <div className="signUp">
                              <Nav>
                                  <Nav.Link href='/signUp'> <button className='buttonsignup'>Create account</button>  </Nav.Link>
                              </Nav>
                          </div>

                          <div className="login">
                              <Nav>
                                  <Nav.Link href='/login' id="buttonlogin">Login<i class="fa-solid fa-right-to-bracket"></i></Nav.Link>
                              </Nav>
                          </div>

                      </div>}

                     { user && user.userRole === "admin"?
                     <Nav>
                          <div className='btnCartCount' >
                              <div className='count'> 0</div>
                              <Nav.Link href='/login' >
                                  <i className='fas fa-shopping-cart'></i>
                              </Nav.Link>
                          </div>
                      </Nav> : 
                      <Nav>
                        <div className='btnCartCount' >
                              <div className='count'>{Object.keys(cartItems).length}</div>
                              <Nav.Link href='/cart' >
                                  <i className='fas fa-shopping-cart'></i>
                              </Nav.Link>
                          </div>
                          
                      </Nav> }

                  </div>


                  <Navbar.Offcanvas
                      id="offcanvasNavbar"
                      aria-labelledby="offcanvasNavbarLabel"
                      placement="start"
                  >
                      <Offcanvas.Header closeButton>
                          <Offcanvas.Title id="offcanvasNavbarLabel">Catégories</Offcanvas.Title>
                      </Offcanvas.Header>

                      <Offcanvas.Body>
                          <Nav className="justify-content-end flex-grow-1 pe-3">
                              <Link  id="linkparent"  to="/"><div id="navlink">Home</div> </Link>
                              <Link id="linkparent" to="/men"><div id="navlink">Men</div></Link>
                              <Link id="linkparent" to="/women"><div id="navlink">Women</div></Link>

                              
                          </Nav>
                          
                      </Offcanvas.Body>
                  </Navbar.Offcanvas>

              </Container>

          </Navbar>

      </div >
  )
}
export default Dashboard

