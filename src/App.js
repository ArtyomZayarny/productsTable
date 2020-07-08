import React,{useState,useCallback} from 'react';
import MyContext from './components/context'
import { Table, Button,Modal } from 'semantic-ui-react'
import AddForm from './components/AddFrom';
import RowItem from './components/RowItem/RowItem'
import './App.css'

const productsContext =  {
  categoryOptions:[
    { key: 'ph', value: 'Phones', text: 'Phones' },
    { key: 'Notebook', value: 'Notebook', text: 'Notebook' }]
}


function App() {
  const [data,setData] = useState({
    products:[],
    showModal:false
    
  });

  const removeProduct = (id) => {
    let updateProducts = data.products.filter( (item) => item.id !== id)
    setData({...data, products:updateProducts })
  }
  const addProduct = useCallback((value) => {    
      setData({...data, showModal:false})
      let  updateProducts = [...data.products];
      updateProducts.push(value);
      setData({...data, products:updateProducts})
    },[data.products]);

    const closeModal = () => {  
        setData({...data,showModal:false})
    }
  return (

    <>
      <MyContext.Provider value={productsContext} >
      <Modal onClose={closeModal} open={data.showModal} trigger={<Button onClick={() => {setData({...data,showModal:true})}} >Add product</Button>}>
        <Modal.Content image>
            <AddForm addProduct={addProduct}/>
        </Modal.Content>
      </Modal>
      {
        data.products.length === 0 ? <p>You have no product </p> :
        <div className="table">
        <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Product</Table.HeaderCell>
            <Table.HeaderCell>Category</Table.HeaderCell>
            <Table.HeaderCell>Price</Table.HeaderCell>
            <Table.HeaderCell>Stock</Table.HeaderCell>
            <Table.HeaderCell>Actions</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
         { data.products.map( (product) => {
            return (
              <RowItem key={product.id} product={product} removeProduct={removeProduct} />
            )}) }
      </Table.Body>
      </Table>
      </div>
      }

      </MyContext.Provider>
    </>
  );
}

export default App;
