import React, { useEffect, useState } from 'react'
import { styled, Table } from "@nextui-org/react";
import { useDispatch, useSelector } from 'react-redux';
import {  editeUser, getAllProducts, getAllUsers, removeProduct, removeUser } from '../redux/action';
import { Tooltip  } from "@nextui-org/react";
import { Link } from 'react-router-dom';
import UpdateProduct from './UpdateProduct';
import Block from './Block';
import { Button } from 'react-bootstrap';




const TableProductAdmin = () => {
  let { products } = useSelector((state) => state.product);
  let {users}=useSelector((state) => state.user);
//   let {user}=useSelector((state) => state.user);

//   console.log(user.blocking)
//   const [blocking, setBlocking] = useState(user.blocking);



//   const handleSubmit = () => {
 
   
//    if (blocking=='no') {
//     setBlocking('yes')}
// };

// const handleblock=()=>{
//   const editdUser = { _id: users._id, blocking};
//   dispatch(editeUser(editdUser))

// }

  
     //dispatch getallproducts
  const dispatch = useDispatch();

  function calculeRemise(prix,remise){
    const prixNumber = parseFloat(prix)
    const remiseNumber = parseFloat(remise) 
    let resulta=0;
    if ((prixNumber && remiseNumber) && (remiseNumber >0)){ 
   resulta=prix*(1-(remise/100))
    return resulta}
  
}

  //useeffect
  useEffect(() => {
    dispatch(getAllProducts());
    dispatch(getAllUsers())

 

  }, []);


// tableau icon 



  const IconButton = styled('button', {
    dflex: 'center',
    border: 'none',
    outline: 'none',
    cursor: 'pointer',
    padding: '0',
    margin: '0',
    bg: 'transparent',
    transition: '$default',
    '&:hover': {
      opacity: '0.8'
    },
    '&:active': {
      opacity: '0.6'
    }
  });


  const EyeIcon = ({
    fill,
    size,
    height,
    width,
    ...props
  }) => {
    return (
      <svg
        width={size || width || 24}
        height={size || height || 24}
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <path
          d="M12.9833 10C12.9833 11.65 11.65 12.9833 10 12.9833C8.35 12.9833 7.01666 11.65 7.01666 10C7.01666 8.35 8.35 7.01666 10 7.01666C11.65 7.01666 12.9833 8.35 12.9833 10Z"
          stroke={fill}
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M9.99999 16.8916C12.9417 16.8916 15.6833 15.1583 17.5917 12.1583C18.3417 10.9833 18.3417 9.00831 17.5917 7.83331C15.6833 4.83331 12.9417 3.09998 9.99999 3.09998C7.05833 3.09998 4.31666 4.83331 2.40833 7.83331C1.65833 9.00831 1.65833 10.9833 2.40833 12.1583C4.31666 15.1583 7.05833 16.8916 9.99999 16.8916Z"
          stroke={fill}
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  };

  
  const DeleteIcon = ({
    fill,
    size,
    height,
    width,
    ...props
  }) => {
    return (
      <svg
        width={size || width || 24}
        height={size || height || 24}
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <path
          d="M17.5 4.98332C14.725 4.70832 11.9333 4.56665 9.15 4.56665C7.5 4.56665 5.85 4.64998 4.2 4.81665L2.5 4.98332"
          stroke={fill}
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M7.08331 4.14169L7.26665 3.05002C7.39998 2.25835 7.49998 1.66669 8.90831 1.66669H11.0916C12.5 1.66669 12.6083 2.29169 12.7333 3.05835L12.9166 4.14169"
          stroke={fill}
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M15.7084 7.61664L15.1667 16.0083C15.075 17.3166 15 18.3333 12.675 18.3333H7.32502C5.00002 18.3333 4.92502 17.3166 4.83335 16.0083L4.29169 7.61664"
          stroke={fill}
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M8.60834 13.75H11.3833"
          stroke={fill}
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M7.91669 10.4167H12.0834"
          stroke={fill}
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  };







  return (
    <div>
      <br />
      <h1 >list products</h1>
            <Table
      aria-label="Example static collection table"
      css={{
        position:"relative",
        zIndex: "0",
          height: "auto",
          minWidth: "100%",

        }}
        selectionMode="single"
        >
      <Table.Header>
      <Table.Column css={{fontSize:"20px", textAlign:"center"}}>Image</Table.Column>
      <Table.Column css={{fontSize:"20px", textAlign:"center", width:"40%"}}>Title</Table.Column>
        <Table.Column css={{fontSize:"20px", textAlign:"center"}}>Category</Table.Column>
        <Table.Column css={{fontSize:"20px", textAlign:"center"}}>Price</Table.Column>
        <Table.Column css={{fontSize:"20px", textAlign:"center"}}>Promotion</Table.Column>
        <Table.Column css={{fontSize:"20px", textAlign:"center"}}>Price after promotion</Table.Column>

        <Table.Column css={{fontSize:"20px", textAlign:"center"}}>ACTION</Table.Column>

      </Table.Header> 
      <Table.Body>
      {products && products.map((el , i) => 
          <Table.Row key={i}>
          <Table.Cell><img style={{ height: '8rem' }} src={el.image} alt=""></img></Table.Cell>

          <Table.Cell css={{fontSize:"22px", fontWeight:"400"}}>{el.title}</Table.Cell>
          <Table.Cell css={{fontSize:"20px", fontWeight:"400"}} >{el.category}</Table.Cell>
          <Table.Cell css={{fontSize:"20px", fontWeight:"600"}}>{`${el.price} $`}</Table.Cell>
          <Table.Cell css={{fontSize:"20px" , fontWeight:"600"}}>{`${el.promo} %`}</Table.Cell>
          <Table.Cell css={{fontSize:"20px" , fontWeight:"600"}}>{`${ calculeRemise(el.price,el.promo).toFixed(2)} $`}</Table.Cell>

          <Table.Cell css={{ display:'flex', marginTop:'40px'}}>

            <Tooltip content="Details product " >
          <Link to={`/detailProduct/${el._id}`}><IconButton>
                  <EyeIcon size={30} fill="#979797" />
                </IconButton>
                </Link>
              </Tooltip>

                <UpdateProduct updateProd={el} />
              <Tooltip
                content="Delete product "
                color="error"
                onClick={() => { dispatch(removeProduct(el._id)); dispatch(getAllProducts()) }}
              >
                <IconButton>
                  <DeleteIcon size={30} fill="#FF0080" />
                </IconButton>
              </Tooltip>

          




              </Table.Cell>
        </Table.Row>

)}


    
     
      </Table.Body> 
    </Table>
    <hr />
    <h1>List Users</h1>
  
    <Table
      aria-label="Example static collection table"
      css={{
        position:"relative",
        zIndex: "0",
          height: "auto",
          minWidth: "100%",

        }}
        selectionMode="single"
        >
      <Table.Header>
      <Table.Column css={{fontSize:"20px", textAlign:"center"}}>FullName</Table.Column>
      <Table.Column css={{fontSize:"20px", textAlign:"center", width:"40%"}}>Email</Table.Column>
        <Table.Column css={{fontSize:"20px", textAlign:"center"}}>Adresse</Table.Column>
        <Table.Column css={{fontSize:"20px", textAlign:"center"}}>Telephone</Table.Column>
        <Table.Column css={{fontSize:"20px", textAlign:"center"}}>UserRole</Table.Column>
        <Table.Column css={{fontSize:"20px", textAlign:"center"}}>Block</Table.Column>

       

        <Table.Column css={{fontSize:"20px", textAlign:"center"}}>ACTION</Table.Column>

      </Table.Header> 
      <Table.Body>
      {users && users.map((el , i) => 
          <Table.Row key={i}>
          <Table.Cell css={{fontSize:"22px", fontWeight:"400"}}>{el.fullName}</Table.Cell>
          <Table.Cell css={{fontSize:"20px", fontWeight:"400"}}>{el.email}</Table.Cell>
          <Table.Cell css={{fontSize:"20px", fontWeight:"400"}} >{el.adresse}</Table.Cell>
          <Table.Cell css={{fontSize:"20px", fontWeight:"400"}}>{el.telephone}</Table.Cell>
          <Table.Cell css={{fontSize:"20px" , fontWeight:"600"}}>{el.userRole}</Table.Cell>
          <Table.Cell css={{fontSize:"20px" , fontWeight:"600"}}>{el.blocking}</Table.Cell>

         

          <Table.Cell css={{ display:'flex', marginTop:'10px', marginLeft:'50px'}}>

              <Tooltip
                content="Delete product "
                color="error"
                onClick={() => { dispatch(removeUser(el._id)); dispatch(getAllUsers()) }}
              >
                <IconButton>
                  <DeleteIcon size={30} fill="#FF0080" />
                </IconButton>
              </Tooltip>
              <Tooltip>
              <Block updatetUser={el} />
              {/* <Button variant="primary" onClick={handleSubmit} >BLOCK</Button> */}
              </Tooltip>
              </Table.Cell>
        </Table.Row>

)}
    </Table.Body> 
    </Table>
    </div>
  )


}

export default TableProductAdmin