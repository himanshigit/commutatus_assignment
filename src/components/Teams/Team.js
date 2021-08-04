import React, { useState } from 'react';
import TeamMember from '../TeamMembers/TeamMember';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'block',
  },

  avatar_size: {
    height: '100px',
    width: '100px'
  },

  members_added: {
    flexGrow: '0',
    maxWidth: '100%',
    flexBasis: '100%',
    padding: '12px'
  },

  text_color: {
    color: 'antiquewhite',
    fontWeight: 'bold'
  }
}));

function Team(props) {
  const classes = useStyles();
  const [showMembersKey, setShowMembersKey] = useState();
  const data = JSON.parse(localStorage.getItem("empsData"));
  var teams = data.ceo.departments[props.department].teams;

  const [member, setMember] = useState()

  const buttonStyle = {
    fontWeight: 'bold',
    background: 'antiquewhite'
  };

  function handleShowMembers(key){
    setShowMembersKey(key);
    setMember(<Grid item xs={12} className={classes.content_justify}>
      <TeamMember team={key} department={props.department}/>
    </Grid>);
  }

  function handleAddMembers(key){
    const empName = prompt("Please Enter Members Name...");
    const empPosition = parseInt(prompt("Please Enter Members Position..."));
    console.log(empPosition);
    if(empPosition>3 || empPosition<0 || typeof(empPosition)=='string' || empPosition=='NaN'){
      prompt("Please Enter Members Position between 0 and 3...");
    }
    const empId = Math.floor(Math.random()*100000)+10000;
    const empEmail = empName+"@gmail.com";
    const empContact = Math.floor(Math.random()*10000000000)+1000000000;
    const empGender = empId%2==0? 'male' : 'female';
    console.log(empId,empEmail,empContact,empGender);
    if(empName && (empPosition || empPosition==0)){
      data.ceo.departments[props.department].teams[key].members.push({
        "emp_name" : empName,
        "idNo": empId,
        "phone_number": empContact,
        "email_id": empEmail,
        "position": empPosition,
        "gender" : empGender
      });
      localStorage.setItem("empsData", JSON.stringify(data));
      setMember(<div className={classes.members_added}>
        <TeamMember team={key} department={props.department}/>
      </div>);
      setShowMembersKey(key);
    }
  }
  return (  
    Object.keys(teams).map(function(key, item){
      return (
        <React.Fragment key={key}>
          <Grid container spacing={3} className={classes.root}>
            <Grid item xs={12}>
              <div className={classes.text_color}>{key}</div>
            </Grid>
            {teams[`${key}`].members ? 
            <div>
              <button style={buttonStyle} onClick={()=>handleShowMembers(key)}>Show Team Lead</button>
              <button style={buttonStyle} onClick={()=>handleAddMembers(key)}>Add Member</button> 
            </div>
            : <button style={buttonStyle} onClick={()=>handleAddMembers(key)}>Add Member</button> }

            {showMembersKey==key && member}
          </Grid>
        </React.Fragment>
      )
    })
  );
}

export default Team;