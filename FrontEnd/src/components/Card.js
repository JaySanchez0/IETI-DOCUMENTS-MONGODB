import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import AddIcon from '@material-ui/icons/Add';
const useStyles = makeStyles((theme)=>({
 card:{
    width:'100%',
    [theme.breakpoints.up('sm')]:{
        width:'400px',
    }
 },
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
}));

export default function CardItem(props) {
  const theme = useTheme();
  const classes = useStyles(theme);
  const bull = <span className={classes.bullet}>•</span>;
  console.log(props);
  return (
      <React.Fragment>
    <Card className={classes.card}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
         <CheckCircleOutlineIcon style={{color:'green'}}></CheckCircleOutlineIcon> {props.status}
        </Typography>
        <Typography variant="h5" component="h2">
          {props.description}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {props.people}
        </Typography>
        <Typography variant="body2" component="p">
          <b>Fecha:</b>
              <br/> {props.date.toString()}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
    <div style={{width:'100%',height:'40px'}}></div>
    
    </React.Fragment>
  );
}