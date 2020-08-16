import React, {useEffect, useState} from 'react';

const useForm = (initialFieldValues, setCurrentId) => {

  // Component state property
  const [values, setValues] = useState(initialFieldValues); //Collecting Values from the form
  const [errors, setErrors] = useState({}) //Handle any error that occures from form Validation

  const handleInputChange = e => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value
    });
  }

  // Reset and make sure no initial values are in the form 
  const resetForm = () => {
    setValues(initialFieldValues)
    setErrors({})
    setCurrentId(0)
  }
  
  
  return {
    values,
    setValues,
    errors,
    setErrors,
    resetForm,
    handleInputChange
  }
}

export default useForm;