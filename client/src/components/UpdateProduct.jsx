import React, {  useState } from 'react'
import { useDispatch } from 'react-redux';
import Modal from 'react-modal';
import axios from 'axios';
import { Button, Form } from 'react-bootstrap';
import { editeProduct, getAllProducts } from '../redux/action';
import { styled, Tooltip } from '@nextui-org/react';


const UpdateProduct = ({ updateProd }) => {
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

      const EditIcon = ({
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
              d="M11.05 3.00002L4.20835 10.2417C3.95002 10.5167 3.70002 11.0584 3.65002 11.4334L3.34169 14.1334C3.23335 15.1084 3.93335 15.775 4.90002 15.6084L7.58335 15.15C7.95835 15.0834 8.48335 14.8084 8.74168 14.525L15.5834 7.28335C16.7667 6.03335 17.3 4.60835 15.4583 2.86668C13.625 1.14168 12.2334 1.75002 11.05 3.00002Z"
              stroke={fill}
              strokeWidth={1.5}
              strokeMiterlimit={10}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M9.90833 4.20831C10.2667 6.50831 12.1333 8.26665 14.45 8.49998"
              stroke={fill}
              strokeWidth={1.5}
              strokeMiterlimit={10}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M2.5 18.3333H17.5"
              stroke={fill}
              strokeWidth={1.5}
              strokeMiterlimit={10}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        );
      };



    //state
    const [title, setTitle] = useState(updateProd.title);
    const [price, setPrice] = useState(updateProd.price);
    const [category, setCategory] = useState(updateProd.category);
    const [promo, setPromo] = useState(updateProd.promo);
    const [image, setImage] = useState(updateProd.image);
    const [description, setDescription] = useState(updateProd.description)

  
  
  
    //handel upload
    const fileSelectedHandler = async (e) => {
        const file = e.target.files[0]
        const fd = new FormData()
        fd.append('image', file)
        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
            const { data } = await axios.post('/upload/up', fd, config)
            setImage(data)
        } catch (error) {
            console.log(error)
            
        }
    }
    const dispatch = useDispatch();
    const handleSubmit = (e) => {
        e.preventDefault();
        const fd = new FormData();
        fd.append('image', setImage(image))


        const editedProd = { _id: updateProd._id, title, price, category, promo, image,description };
        dispatch(editeProduct(editedProd));
        dispatch(getAllProducts());
        closeModal();
    };

 
 

    // modal
    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        },
    };

    const [modalIsOpen, setIsOpen] = React.useState(false);

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    Modal.setAppElement('#root');
    return (
        <div >
            {/* <Button variant="primary" onClick={openModal} >UPDATE</Button> */}
            <Tooltip content="Edit product">
                <IconButton onClick={openModal}>
                  <EditIcon size={30} fill="#979797" />
                </IconButton>
              </Tooltip>


            <Modal className="form_update" 
           
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <Form onSubmit={handleSubmit} id="form_update_product"   >
          <h2 className='adding-product' >UPDATE</h2>

                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label style={{width:"200px", color:'black', fontSize:'14px',fontWeight:"bold"}}>Product name: </Form.Label>
                        <Form.Control style={{width:"200px", marginLeft:"100px"}} type="text" placeholder='product name' value={title} onChange={(e) => setTitle(e.target.value)} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label style={{width:"200px", color:'black', fontSize:'15px',fontWeight:"bold"}}>Price:</Form.Label>


                        <Form.Control style={{width:"200px", marginLeft:"100px"}} type="text" placeholder='price' value={price} onChange={(e) => setPrice(e.target.value)} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label style={{width:"200px", color:'black', fontSize:'15px',fontWeight:"bold"}}>Category:</Form.Label>


                        <Form.Control style={{width:"200px", marginLeft:"100px"}} type="text" placeholder='category' value={category} onChange={(e) => setCategory(e.target.value)} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label style={{width:"200px", color:'black', fontSize:'15px',fontWeight:"bold"}}>Promotion:</Form.Label>

                        <Form.Control  style={{width:"200px", marginLeft:"100px"}} type="text" placeholder='Quantity' value={promo} onChange={(e) => setPromo(e.target.value)} />
                    </Form.Group>
                    
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label  style={{width:"200px", color:'black', fontSize:'15px',fontWeight:"bold"}}>Description:</Form.Label>

                        <Form.Control  style={{width:"200px", marginLeft:"100px"}} type="text" placeholder='Description' value={description} onChange={(e) => setDescription(e.target.value)} />
                    </Form.Group>


                    {/* uploadfile */}
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label style={{width:"200px", color:'black', fontSize:'15px',fontWeight:"bold"}}> Image:</Form.Label>


                        <Form.Control style={{width:"400px", marginLeft:"50px",}} type="file" onChange={fileSelectedHandler} />
                    </Form.Group>

                    <div className='btn-add' style={{marginLeft:'50px'}} >
                    <div id='cancel'><Button variant="secondary" onClick={() => closeModal()}><i class="fa-solid fa-ban"></i> Cancel </Button></div>
            <div id='add'><button  class="btn btn-success" type="submit" ><i class="fa-solid fa-plus"></i> Add</button></div>
                    </div>
                </Form>
            </Modal>
        </div>
    )
}

export default UpdateProduct