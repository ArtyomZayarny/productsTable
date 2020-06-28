import React, {useState, useEffect} from 'react'
import {Select} from 'semantic-ui-react'
import style from '../RowItem/RowItem.module.css'

const categoryOptions = [
    { key: 'ph', value: 'Phones', text: 'Phones' },
    { key: 'Notebook', value: 'Notebook', text: 'Notebook' }];

export default function Input({name, value, mode}) {
    const [state,setState] = useState({
        name:name,
        value:value
    });

    const handleChange = (name,value) => {
        setState({...state,name:name,value:value})
    }

    const handleSelect = (e,data) => {
        setState({...state,value:data.value})
    }
    return (
        <>
        {mode === 'edit' && name === 'category' ? 
         <Select value={state.value} name="category" onChange={handleSelect} placeholder='Select category' options={categoryOptions} /> :
        
         <input 
         className={mode === 'read' ? style.read : style.edit }
          type={name === 'price' ? 'number' : 'text'} 
          name={state.name} 
          value={state.value} 
          onChange={ (e) => {handleChange(e.target.name, e.target.value)} }
            />
        }
            
        </>
    )
}

