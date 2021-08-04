import React, { useState, useCallback } from 'react';
import Department from '../Departments/Department';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import debounce from 'lodash.debounce';
import Popover from '@material-ui/core/Popover';
import avatar_male2 from '../../constants/images/avatar_male2.jpg';
import avatar_female2 from '../../constants/images/avatar_female2.jpg';
import Grid from '@material-ui/core/Grid';
import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },

  popover: {
    pointerEvents: 'none',
  },

  edit_icon: {
    height: '20px',
    width: '25px',
    color: '#b057c2',
    verticalAlign: 'bottom'
  },

  avatar_size: {
    height: '100px',
    width: '100px',
    display: 'inline-block'
  },

  popver_color: {
    background: 'antiquewhite',
    display: 'table-caption'
  },

  input_label: {
    marginRight: '5px',
    verticalAlign:'middle',
    fontWeight: 'bold'
  },

  text_color: {
    color: 'antiquewhite',
    fontWeight: 'bold'
  }
}));

var employeesData = require('../../constants/employees.json');
localStorage.setItem("empsData", JSON.stringify(employeesData));


function Ceo() {

  const [data, setData] = useState(JSON.parse(localStorage.getItem("empsData")));
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [showDepartments, setShowDepartments] = useState(false);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const buttonStyle = {
    fontWeight: 'bold',
    background: 'antiquewhite'
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const debouncedName = useCallback(
    debounce(value => {
      data.ceo.emp_name = value;
      localStorage.setItem("empsData", JSON.stringify(data));
      setData(JSON.parse(localStorage.getItem("empsData")));
    }, 1000),[]
  )

  const debouncedEmail = useCallback(
    debounce(value => {
      data.ceo.email_id = value;
      localStorage.setItem("empsData", JSON.stringify(data));
      setData(JSON.parse(localStorage.getItem("empsData")));
    }, 1000),[]
  )

  const debouncedContact = useCallback(
    debounce(value => {
      data.ceo.phone_number = value;
      localStorage.setItem("empsData", JSON.stringify(data));
      setData(JSON.parse(localStorage.getItem("empsData")));
    }, 1000),[]
  )

  function handleClick(event){
    setAnchorEl(event.currentTarget);
  }

  function handleShowDepartments(){
    setShowDepartments(true);
  }

  function handleNameChange(event) {
    debouncedName(event.target.value);
  }

  function handleEmailChange(event) {
    debouncedEmail(event.target.value);
  }

  function handleContactChange(event) {
    debouncedContact(event.target.value);
  }

  const classes = useStyles();

  return (
    <React.Fragment>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <div className={classes.text_color}>
            <Avatar className={classes.avatar_size} alt={data.ceo.emp_name} src={data.ceo.gender == 'male' ? avatar_male2 : avatar_female2} />
              <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'center',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'center',
                }}
              >
                <div className={classes.popver_color}>
                  <div>
                    <label htmlFor="name" className={classes.input_label}>Name</label>
                    <input id="name" onChange={event => handleNameChange(event)}></input>
                  </div>
                  <div>
                    <label htmlFor="email" className={classes.input_label}>Email Id</label>
                    <input id="email" onChange={event => handleEmailChange(event)}></input>
                  </div>
                  <div>
                    <label htmlFor="contact" className={classes.input_label}>Contact No.</label>
                    <input id="contact" onChange={event => handleContactChange(event)}></input>
                  </div>
                </div>
              </Popover>
              <p>{data.ceo.emp_name} <EditIcon className={classes.edit_icon} onClick={event => handleClick(event)}/></p>
            <p>{data.ceo.position}</p>
          </div>
          <button style={buttonStyle} onClick={handleShowDepartments}>Show Departments</button>
        </Grid>
        {showDepartments && 
          <Grid item xs={12}  className={classes.root}>
            <Department/>
          </Grid>
        }

      </Grid>
    </React.Fragment>
  );
}

export default Ceo;