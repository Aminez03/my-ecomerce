import React from 'react'

import  {  useState } from 'react'
import { useDispatch } from 'react-redux';
import Modal from 'react-modal';

import { Button, Form } from 'react-bootstrap';
import {  editeUser, getAllUsers } from '../redux/action';




const Block = ({updatetUser}) => {

    const [blocking, setBlocking] = useState(updatetUser.blocking);

    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();


        const editedUser = { _id: updatetUser._id,blocking };
        dispatch(editeUser(editedUser));
        dispatch(getAllUsers())
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
        <Button variant="primary" onClick={openModal} >BLOCK</Button>
     

        <Modal className="form_update" 
       
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Example Modal"
        >
            <Form onSubmit={handleSubmit} id="form_update_product"   >
                <h2 style={{marginLeft:"60px"}}>Are You sure to block this user </h2>
                <h6 style={{marginLeft:"200px"}}>taper yes or no </h6>

                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
               
                    <Form.Control style={{width:"200px", marginLeft:"100px"}} type="text" placeholder='true' value={blocking} onChange={(e) => setBlocking(e.target.value)} />
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

export default Block