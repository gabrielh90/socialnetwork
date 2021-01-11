import React from 'react'
import moment from 'moment';

const genSelectElem = (type) => {
    let options =[];
    switch(type) {
        case('year'):
            for(let i = (new Date()).getFullYear() - 50; i < (new Date()).getFullYear(); i++)
            options.push(
                            <option key={i} value={i}>
                                {i}
                            </option>
            )
            break;
        case('month'):
            options = moment.months().map((month, i) =>
                            <option key={i} value={i}>
                                {month}
                            </option>
                            )
        break;
        case('day'):
            for(let i = 1; i <= 31; i++)
            options.push(
                            <option key={i} value={i}>
                                {i}
                            </option>
            )
            break;
        default:
            
    }
    // console.log(options)
    return options
}
const Input = (props) => {

    let inputElem = null;
    switch(props.elementType) {
        case('select'):
            inputElem = (
                <select
                    key={props.identifier}
                    className={props.className} 
                    value={props.value}
                    onChange={props.onChange}
                    {...props.elemConfig}
                    >
                    {props.elemConfig.type === 'default' 
                        && props.elementConfig.options.map(option => (
                            <option key={option.value} value={option.value}>
                                {option.displayValue}
                            </option>
                        ))
                    }
                    {props.elemConfig.type !== 'default' 
                        && genSelectElem(props.elemConfig.type)
                    }
                </select>
            );
            break;
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