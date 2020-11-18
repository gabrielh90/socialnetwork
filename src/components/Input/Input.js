import React from 'react'
import styles from './Input.css'
const Input = (props) => {

    let inputElem = null;
    switch(props.elementType) {
        
        default:
            inputElem = <input
                        key={props.identifier}
                        className={props.className} 
                        {...props.elemConfig}
                        value={props.value}
                        onChange={props.onChange}
                    />
    }
            // console.log(inputElem)
    return inputElem
}

export default Input