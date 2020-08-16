import React, {useEffect, useState} from 'react';
import { TextField, makeStyles, Button } from '@material-ui/core';
import useForm from './UseForm';
import { connect } from 'react-redux';
import * as actions from '../actions/postMessage';
import ButterToast, { Cinnamon } from 'butter-toast';
import { AssignmentTurnedIn } from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1)
    }
  },
  form: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  postBtn: {
    width: '50%'
  }
}));

const initialFieldValues = {
  title: '',
  message: ''
}

const PostMessageForm = (props) => {
  const classes = useStyles()

  // The Effect from the "useState()"
  useEffect(() => {
    if(props.currentId != 0){
      setValues({
        ...props.postMessageList.find(x => x._id == props.currentId)
      })
      setErrors({})
    }
    // Whenever the value if "currentId" changes in the list component, the call-back function will be invoked
  }, [props.currentId]);

  const validate = () => {
    let temp = {...errors}; //Initializing with the 'errors' object from 'useForm'
    temp.title = values.title?"":"This Field is required";
    temp.message = values.message?"":"This Field is required";
    setErrors({
      ...temp
    });
    return Object.values(temp).every(x => x == ""); //Checking if the errors objct is empty i.e No errors
  }

  var { 
    values, 
    setValues, 
    errors, 
    setErrors, 
    resetForm,
    handleInputChange } = useForm(initialFieldValues, props.setCurrentId);

  const handleSubmit = e => {
    e.preventDefault();

    // console.log(values);
    const onSuccess = () => {
      ButterToast.raise({
        content: <Cinnamon.Crisp title="Post Box"
                    content="Post Created Successfully"
                    scheme={Cinnamon.Crisp.SCHEME_PURPLE}
                    icon={<AssignmentTurnedIn />}
                  />
      })
      resetForm()
    }

    if(validate()) {
      // Differentiates between a new post and a post to be updated
      if(props.currentId == 0)
        props.createPostMessage(values, onSuccess)
      else
        props.updatePostMessage(props.currentId, values, onSuccess)
    }
      
  }

  return (
    <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
      
      <TextField
        name="title"
        variant="outlined"
        label="Title"
        fullWidth
        value={values.title}
        onChange={handleInputChange}
        //Checking if we have an error message relating to title
        //If theres is, we set 'error: true'
        //The we pass the error message in the 'helperText' for display
        {...(errors.title && { error: true, helperText: errors.title })}
      />
      <TextField
        name="message"
        variant="outlined"
        label="Message"
        fullWidth
        multiline
        rows={4}
        value={values.message}
        onChange={handleInputChange}
        {...(errors.message && { error: true, helperText: errors.message })}
      />
      <Button
        variant="contained"
        color="primary"
        size="large"
        type="submit"
        className={classes.postBtn}
      >
        Submit
      </Button>
    </form>
  )
  
}

const mapSateToProps = state => ({
  postMessageList: state.postMessage.list
});

const mapActionToProps = {
  createPostMessage: actions.create,
  updatePostMessage: actions.update
}

export default connect(mapSateToProps, mapActionToProps)(PostMessageForm);
