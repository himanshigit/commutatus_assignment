import React, {useState, useEffect, useCallback} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import debounce from 'lodash.debounce';
import Popover from '@material-ui/core/Popover';
import avatar_male2 from '../../constants/images/avatar_male2.jpg';
import avatar_female2 from '../../constants/images/avatar_female2.jpg';
import Grid from '@material-ui/core/Grid';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },

  edit_icon: {
    height: '20px',
    width: '25px',
    color: '#b057c2',
    verticalAlign: 'bottom'
  },

  input_label: {
    marginRight: '5px',
    verticalAlign:'middle',
    fontWeight: 'bold'
  },

  popver_color: {
    background: 'antiquewhite',
    display: 'table-caption'
  },

  avatar_size: {
    height: '100px',
    width: '100px',
    display: 'inline-block'
  },

  text_color: {
    color: 'antiquewhite',
    fontWeight: 'bold'
  }
}));

function TeamMember(props) {

  const classes = useStyles();
  const [data, setData] = useState(JSON.parse(localStorage.getItem("empsData")));
  const [anchorEl, setAnchorEl] = useState(null);
  const [elKey, setElKey] = useState();
  var teams = data.ceo.departments[props.department].teams;
  var employees = data.ceo.departments[props.department].teams[props.team].members.sort(GetSortOrder("position"));

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const debouncedName = useCallback(
    debounce((value,key) => {
      employees[key].emp_name = value;
    }, 1000),[]
  )

  const debouncedEmail = useCallback(
    debounce((value,key) => {
      employees[key].email_id = value;
    }, 1000),[]
  )

  const debouncedContact = useCallback(
    debounce((value,key)=> {
      employees[key].phone_number = value;
    }, 1000),[]
  )

  const debouncedTeam = useCallback(
    debounce((value, key)=> {

    }, 1000),[]
  )

  function handleClick(event, key){
    setElKey(key);
    setAnchorEl(event.currentTarget);
  }

  function handleNameChange(event) {
    debouncedName(event.target.value, elKey);
  }

  function handlePositionChange(event) {
    employees[elKey].position = event.target.value;
  }

  function handleEmailChange(event) {
    debouncedEmail(event.target.value, elKey);
  }

  function handleContactChange(event) {
    debouncedContact(event.target.value, elKey);
  }

  function handleTeamChange(event){
    data.ceo.departments[props.department].teams[event.target.value].members.push(employees.splice(elKey,1)[0]);
    localStorage.setItem("empsData", JSON.stringify(data));
  }

  function handleDelete(key){
    data.ceo.departments[props.department].teams[props.team].members.splice(key,1);
    localStorage.setItem("empsData", JSON.stringify(data));
    setData(JSON.parse(localStorage.getItem("empsData")));
  }

  function GetSortOrder(prop) {    
    return function(a, b) {    
        if (a[prop] > b[prop]) {    
            return 1;    
        } else if (a[prop] < b[prop]) {    
            return -1;    
        }    
        return 0;    
    }    
  } 

  var members = 
    Object.keys(employees).map((item, key)=>(
        <Grid item xs={12} key={key}>
          <div className={classes.text_color}>
            <Avatar className={classes.avatar_size} alt={employees[`${key}`].emp_name} src={employees[`${key}`].gender == 'male' ? avatar_male2 : avatar_female2} />
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
                <label className={classes.input_label}>Name</label>
                <input onChange={event => handleNameChange(event)}></input>
              </div>
              <div>
                <label className={classes.input_label}>Position</label>
                <select name="teams" id="teams" onChange={event => handlePositionChange(event)}>
                  <option value=""></option>
                  <option value="0">Team Lead</option>
                  <option value="1">Level 1</option>
                  <option value="2">Level 2</option>
                  <option value="3">Level 3</option>
                </select>
              </div>
              <div>
                <label className={classes.input_label}>Email Id</label>
                <input onChange={event => handleEmailChange(event)}></input>
              </div>
              <div>
                <label className={classes.input_label}>Contact No.</label>
                <input onChange={event => handleContactChange(event)}></input>
              </div>
              <div>
                <label className={classes.input_label}>Team</label>
                <select name="teams" id="teams" onChange={event => handleTeamChange(event)}>
                  {Object.keys(teams).map(function(key,item){
                    return (<option key={key} value={key}>{key}</option>)
                  })}
                </select>
              </div>
            </div>
          </Popover>
            <p style={{display:'flex', justifyContent: 'center'}}>{employees[`${key}`].emp_name}<EditIcon className={classes.edit_icon} onClick={event => handleClick(event, key)}/><DeleteIcon className={classes.edit_icon} onClick={() => handleDelete(key)}/></p>
            <p>{employees[`${key}`].position == 0 ? 'Team Lead' : employees[`${key}`].position == 1 ? 'Level 1' : employees[`${key}`].position == 2 ? 'Level 2' : 'Level 3'}</p>
          </div>
        </Grid>
    ))
  
  return (
    <Grid container spacing={3}>
      {members}
    </Grid>
  );
}

export default TeamMember;