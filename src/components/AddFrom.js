import React, {useState, useContext} from 'react';
import shortid from "shortid";
import MyContext from './context'
import {Form,Button,Select,Checkbox} from 'semantic-ui-react'
import classes from './AddForm.module.css'

const AddForm = ({addProduct}) => {

    const [name, setName] = useState('');
    const [price,setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [isError,setError] = useState({
        name:'',
        price:'',
        category:''
    })
 
    const options = useContext(MyContext);

    const handleChange = (name, value ) => {
        setError({...isError, name:'',price:'',category:''})
        switch (name) {
            case 'name': 
            setName(value)
            break;
            case 'price':
                setPrice(value)
                break;
        default:return false;
        }
    }
    
    const handleSelect = (e,data) => {
        setCategory(data.value)
    }


    const checkFields = (fields) => {      
        let obj = {};
        let flag = false

        for (let key in fields) {
            if (fields[key] === '') {
                obj[key] = true;
                flag = true
            } else {
                obj[key] = ''
            }
        }
        return {hasErrors:flag,errors:obj}
    }

    const handleAddProduct = (e) => {
        e.preventDefault();   
        
     let result = checkFields({name,category,price});

        if (result.hasErrors) {
            setError({...isError, ...result.errors})
        } else {
                const obj = {};
                obj.id = shortid.generate();
                obj.name = name;
                obj.category = category;
                obj.price = price;
                obj.stock = 500;  
            addProduct(obj)
        }

    }
    

    return (
        <>
         <Form onSubmit={(e) => {handleAddProduct(e)}}>
            <Form.Field>
                <label>Product Name</label>
                <input value={name} name="name"  className={isError.name === true ? classes.error : ''} onChange={(e) => {handleChange(e.target.name, e.target.value)}} placeholder='Product Name' />
                <span className={classes.errorMsg}>This field is required</span>
            </Form.Field>
            <Form.Field>
                <label>Category</label>
                <Select value={category} className={isError.category === true ? classes.error : ''} name="category" onChange={handleSelect} placeholder='Select category' options={options.categoryOptions}/>
                <span className={classes.errorMsg}>This field is required</span>
            </Form.Field>
            <Form.Field>
                <label>Price</label>
                <input value={price} type="number" className={isError.price === true ? classes.error : ''} name="price" onChange={(e) => {handleChange(e.target.name, e.target.value)}} placeholder='Price' />
                <span className={classes.errorMsg}>This field is required</span>
            </Form.Field>
            <Button type='submit'>Add</Button>
        </Form>
        </>
    )
}
export default AddForm
