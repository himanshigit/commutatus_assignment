import React, {useState} from 'react';
import Team from '../Teams/Team';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },

  content_justify: {
    justifyContent: 'center',
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },

  avatar_size: {
    height: '100px',
    width: '100px'
  },

  text_color: {
    color: 'antiquewhite',
    fontWeight: 'bold'
  }
}));

function Department() {
  const classes = useStyles();
  const [showTeams, setShowTeams] = useState();
  const [data, setData] = useState(JSON.parse(localStorage.getItem("empsData")));

  const buttonStyle = {
    fontWeight: 'bold',
    background: 'antiquewhite'
  };

  function handleShowTeams(key){
    setShowTeams(key);
  }

  function handleNewTeams(key){
    const teamName = prompt("Please Enter Team Name...");
    if(teamName){
      data.ceo.departments[key].teams[teamName] = {"members":[]};
      localStorage.setItem("empsData", JSON.stringify(data));
      setData(JSON.parse(localStorage.getItem("empsData")));
    }

  }

  return (
    Object.keys(data.ceo.departments).map(function(key, item){
      return (
        <React.Fragment key={key}>
          <Grid container spacing={3} style={{justifyContent: 'center', display:'block'}}>
            <Grid item xs={12}>
              <div className={classes.text_color}>{key}</div>
            </Grid>
            <button style={buttonStyle} onClick={()=>handleShowTeams(key)}>Show Teams</button>
            <button style={buttonStyle} onClick={()=>handleNewTeams(key)}>Add New Team</button>
            {showTeams==key && 
              <Grid item xs={12} className={classes.content_justify}>
                <Team department={key}/>
              </Grid>
            }
          </Grid>
        </React.Fragment>
      )
    })
  );
}

export default Department;