import React, { useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import { Button, Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { createProduct, getAllProducts } from '../redux/action';



function AddProduct() {

  //state

  
  //title
  const [title, setTitle] = useState("");
  //price
  const [price, setPrice] = useState("");
  //category
  const [category, setCategory] = useState("");
  //Promotion
  const [promo, setPromo] = useState("");
  //image
  const [image, setImage] = useState(null);
  //description
  const [description, setDescription] = useState("")

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
      image && console.log(image)
      // setUploading(false)
    } catch (error) {
      console.log(error)
      // setUploading(false)
    }

  }

  //handle submit
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append('image', setImage(image.name))
    const newProduct = { title, price, category, promo, description, image };
    dispatch(createProduct(newProduct));
     dispatch(getAllProducts());
    closeModal();
  }
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
    <div>
      <Button onClick={openModal} id="addproduct"> <i class="fa-solid fa-plus"></i> Add Product</Button>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <Form onSubmit={handleSubmit} id="form_adding_product" >
          <h2 className='adding-product'>Adding product </h2>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Product name:</Form.Label>
            <Form.Control type="text" placeholder='Product name' value={title} onChange={(e) => setTitle(e.target.value)} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Price:</Form.Label>

            <Form.Control type="text" placeholder='price' value={price} onChange={(e) => setPrice(e.target.value)} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Category</Form.Label>

            <Form.Control type="text" placeholder='category' value={category} onChange={(e) => setCategory(e.target.value)} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Promotion:</Form.Label>

            <Form.Control type="text" placeholder='promotion' value={promo} onChange={(e) => setPromo(e.target.value)} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Description:</Form.Label>

            <Form.Control type="text" placeholder='Description' value={description} onChange={(e) => setDescription(e.target.value)} />
          </Form.Group>

          {/* uploadfile */}
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label> Image:</Form.Label>
            <Form.Control type="file" onChange={fileSelectedHandler} />
          </Form.Group>

          <div className='btn-add' >
          <div id='cancel'><Button variant="secondary" onClick={() => closeModal()}><i class="fa-solid fa-ban"></i> Cancel </Button></div>
            <div id='add'><button  class="btn btn-success" type="submit" ><i class="fa-solid fa-plus"></i> Add</button></div>
          </div>
        </Form>
      </Modal>

    </div>
  );
}

export default AddProduct;