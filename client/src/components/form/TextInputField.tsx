import React from "react";
import { CardGroup, Form } from "react-bootstrap"; 
import { FieldError, RegisterOptions, UseFormRegister } from 'react-hook-form'


interface TextInputFieldProps {
    name: string, 
    label: string, 
    register: UseFormRegister<any>,
    registerOptions?: RegisterOptions, 
    error?: FieldError, 
    [x: string]: any // Optional props

}

const TextInputField = ({name, label, register, registerOptions, error, ...props} : TextInputFieldProps) => {
    return (  
        <Form.Group className="mb-5" controlId={name + "-input"}>
            <Form.Label>{label}</Form.Label>
            <Form.Control 
                {...props}
                {...register(name, registerOptions)}
                isInvalid={!!error}
            />
             <Form.Control.Feedback type="invalid">
                {error ? error.message : "Field is required"}
            </Form.Control.Feedback>
        </Form.Group>
    );
}
 
export default TextInputField;