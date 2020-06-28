import React, {useState,useEffect} from 'react';
import {Table, Button} from 'semantic-ui-react'
import Input from '../Input/Input'
import style from './RowItem.module.css'


export default function RowItem({product,removeProduct}) {
    
    const [state,setState] = useState({
        mode:'read',
        id:product.id,
        toggleEdit:'Edit',
        fields:[],
    }) 

    useEffect(() => {
        let rowFields = Object.entries(product).filter( (item,index) =>  item[index] !== 'id' )        
        setState({...state, fields:rowFields});
    }, [])

    const handleEdit = () => {
        switch(state.mode) {
            case 'read':
                setState({...state,mode:'edit',toggleEdit:'Save'})
                break;
            default:setState({...state,mode:'read',toggleEdit:'Edit'})
        }
    }

    return (
        <Table.Row>
            { state.fields.map( (itemArr) => {
                    return (
                        <Table.Cell key={itemArr[1]}>
                            <Input name={itemArr[0]} value={itemArr[1]}  mode={state.mode} />
                         </Table.Cell>
                    )}) 
            }
             <Table.Cell>
                <Button className={style.btnEdit} onClick={ () => { handleEdit() }} positive>{state.toggleEdit}</Button>
                <Button onClick={ () => { removeProduct(state.id) }} negative>Remove</Button>
            </Table.Cell>
        </Table.Row>
    )
}