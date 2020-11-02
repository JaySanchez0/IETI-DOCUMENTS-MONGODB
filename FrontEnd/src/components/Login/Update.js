import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import {TextField, Select, Button} from '@material-ui/core';
import {Link, Redirect} from 'react-router-dom';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import CloseIcon from '@material-ui/icons/Close';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Fab from '@material-ui/core/Fab';
import Dialog from '@material-ui/core/Dialog';
import AddIcon from '@material-ui/icons/Add';
import { Zoom } from '@material-ui/core';

const drawerWidth = 240;
const useStyles2 = makeStyles((theme) => ({
    div:{
        height:'-moz-calc(100% - 150px)',
        height:'-webkit-calc(100% - 150px)',
        height:'calc(100% - 170px)',
        overflowY:'scroll',
    }
  }));

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${0}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    paddingBottom:theme.spacing(0)
  },
}));

function Update(props) {
  const { window } = props;
  const classes = useStyles();
  const classes2 = useStyles2();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [closeSesion,setCloseSesion] = React.useState(false);
  const [openModal,setOpenModal] = React.useState(false);
  const [filter,setFilter] = React.useState("Ready");
  const [pw,setPw] = React.useState("");
  const [rpw,setRpw]=React.useState("");
  const [del,setDel] = React.useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  if(!localStorage.getItem("isLogged")) return <Redirect to="/"/>
  if(closeSesion || del) return <Redirect to="/logout"/>;
  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider/>
      <Link to="/update"><ListItem button>
            <ListItemIcon><AccountCircleIcon style={{color:'blue'}}/></ListItemIcon>
            <ListItemText primary={localStorage.getItem("name")} />
          </ListItem></Link>
      <Divider />
      <List>
      <Link to="/logout"><ListItem button>
            <ListItemIcon><CloseIcon style={{color:'red'}}/></ListItemIcon>
            <ListItemText primary={"Cerrar sesion"} />
          </ListItem></Link>
      </List>
    </div>
  );
    const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar} style={{background:'orange'}}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Administrador de tareas
          </Typography>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, 
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
            <div className={classes2.div}>
                    <h1>Cambia aqui tu contraseña</h1>
                    <TextField label="contraseña" value={pw} onChange={e=>setPw(e.target.value)} type="password"></TextField>
                    <br></br>
                    <TextField label="Confirma tu contraseña" value={rpw} onChange={e=>setRpw(e.target.value)} type="password"></TextField>
                    <br></br><br></br>
                    <Button onClick={()=>update(pw,rpw)}>Actualizar</Button>
                    <br></br>
                    <Button><Link to="/">Volver a taskplanner</Link></Button>
                    <br></br><br></br>
                    <Button onClick={()=>deleteUser(setDel)}>Eliminar Cuenta</Button>

                </div>
            <div style={{width:'100%',height:'70px',textAlign:'right'}}>
            <Fab color="secondary" aria-label="add" onClick={()=>setOpenModal(true)}>
                <AddIcon />
            </Fab>
        </div>
      </main>
    </div>
  );
}

function update(password,retry){
    if(password!=retry){
        alert("Bad Password");
        return;
    }
    fetch("https://rocky-sands-24100.herokuapp.com/user",{
        method:"PUT",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({email:localStorage.getItem("email"),password:password})
    }).then(re=>re.text()).then((data)=>{
        alert("Se actualizo la contraseña");
    }).catch((e)=>{
        alert("Se produjo un error, vuelve a intentar");
    });
}
function deleteUser(fun){
    fetch("https://rocky-sands-24100.herokuapp.com/user",{
        method:"DELETE",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({email:localStorage.getItem("email")})
    }).then(re=>re.text()).then((data)=>{
        alert("Se elimino el usuario");
        fun(true);
    }).catch((e)=>{
        alert("Se produjo un error, vuelve a intentar");
    });
}

Update.propTypes = {
  window: PropTypes.func,
};



export default Update;