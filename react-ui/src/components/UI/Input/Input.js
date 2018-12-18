import React from 'react';

import classes from './Input.module.css';

const input = ( props ) => {
    let inputElement = null;
    const inputClasses = [classes.InputElement];

    if (props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push(classes.Invalid);
    }

    switch ( props.elementType ) {
        case ( 'input' ):
            inputElement = <input
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />;
            break;
        case ( 'textarea' ):
            inputElement = <textarea
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />;
            break;
        case ( 'select' ):
            inputElement = (
                <select
                    className={inputClasses.join(' ')}
                    value={props.value}
                    onChange={props.changed}>
                    {props.elementConfig.options.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.displayValue}
                        </option>
                    ))}
                </select>
            );
            break;
        // case ( 'radio' ):
        //     inputElement = (
        //         <input
        //             type="radio"
        //             className={inputClasses.join(' ')}
        //             value={props.value}
        //             onChange={(event) => props.optionChange(event, props.elementConfig.name)}
        //             checked={props.checked}>
        //             {props.elementConfig.fieldName}
        //         </input>
        //     );
        //     break;
        // case ( '' ):
        //     inputElement = (
        //         <input
        //             type="radio"
        //             className={inputClasses.join(' ')}
        //             value={props.value}
        //             onChange={props.changed}>
        //             {props.elementConfig.fieldName}
        //         </input>
        //     );
        //     break;
        default:
            inputElement = <input
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />;
    }

    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
        </div>
    );

};

export default input;