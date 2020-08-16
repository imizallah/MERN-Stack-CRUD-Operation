import React, { useEffect, useState, Fragment } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/postMessage';
import { Grid, Paper, makeStyles, List, ListItem, ListItemText, Divider, Typography, Button } from '@material-ui/core';
import PostMessageForm from './PostMessageForm';
import ButterToast, { Cinnamon } from 'butter-toast';
import { DeleteSweep } from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
  paper: {
    margin: theme.spacing(3),
    padding: theme.spacing(2)
  },
  smBtn: {
    margin: theme.spacing(1)
  },
  actionDiv: {
    textAlign: 'center'
  }
}));

const PostMessages = (props) => {
  // const [x, setX] = useState()
  // setX(5)
  const classes = useStyles();

  // Edit Post Hooks
  // Pass the 'id' of a post to edit it
  const [currentId, setCurrentId] = useState(0);

  useEffect(() => {
    props.fetchAllPostMessages()
  }, []);

  // Delete Post function
  const onDelete = id => {
    const onSuccess = () => {
      ButterToast.raise({
        content: <Cinnamon.Crisp title="Post Box"
                    content="Post Deleted Successfully"
                    scheme={Cinnamon.Crisp.SCHEME_PURPLE}
                    icon={<DeleteSweep />}
                  />
      })
    }

    if (window.confirm('Are you sure you want to delete this?'))
      props.deletePostMessage(id, onSuccess)

  }

  return (
    <Grid container>
      <Grid item xs={12} sm={5}>
        <Paper className={classes.paper}>
          <PostMessageForm {...{currentId, setCurrentId}} />
        </Paper>
      </Grid>
      <Grid item xs={12} sm={7}>
        <Paper className={classes.paper}>
          <List>
            { 
              props.postMessageList.map((record, index) => {
                return(
                  <Fragment key={index}>
                    <ListItem>
                      <ListItemText>
                        <Typography variant="h5">
                          {record.title}
                        </Typography>
                        <div>
                          {record.message}
                        </div>
                        <div className={classes.actionDiv}>
                          <Button 
                          variant="contained" 
                          color="primary" 
                          size="small"  
                          className={classes.smBtn}
                          onClick={() => setCurrentId(record._id)}
                          >
                            Edit
                          </Button>

                          <Button 
                          variant="contained" 
                          color="secondary" 
                          size="small" 
                          className={classes.smBtn}
                          onClick={() => onDelete(record._id)}
                          >
                            Delete
                          </Button>
                        </div>
                      </ListItemText>
                    </ListItem>
                    <Divider component="li" />
                  </Fragment>
                  
                )
              })
            }
          </List>
        </Paper>
      </Grid>
    </Grid>
  )
}

const mapSateToProps = state => ({
  postMessageList: state.postMessage.list
});

// Mapping the whole collected data from the database to the component
const mapActionToProps = {
  fetchAllPostMessages: actions.fetchAll, //'props.fetchAllPostMessages' 
  deletePostMessage: actions.Delete
}

export default connect(mapSateToProps, mapActionToProps)(PostMessages);