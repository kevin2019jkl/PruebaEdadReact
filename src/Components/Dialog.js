import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { withStyles } from '@material-ui/styles';
import { makeStyles } from '@material-ui/core/styles';
import { Input  } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { inject,observer } from "mobx-react";
const styles = theme => ({
  root: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 48,
    padding: '0 30px',
  },
});
class FormDialog extends Component {
  nombreRef=React.createRef();
  fechaRef=React.createRef();
  constructor(props) {
    super(props)
  }
  showDialog(nombre,fecha,i,varios){
    this.props.PerfilStore.openDialog({
      nuevoItem:false,
      editarVarios:varios,
      index:i
    });
    
  }
 handleClickOpen  () {
  this.props.PerfilStore.openDialog({
    nuevoItem:true,
    editarVarios:false,
    index:0
  });
  };

  handleClose  () {
    this.props.PerfilStore.closeDialog();
    this.props.PerfilStore.resetErrorMessage();
  };
  async guardar(){
    var pasar=await this.props.createData(this.props.PerfilStore.nuevoItem,this.props.PerfilStore.index,this.nombreRef.current.value,this.fechaRef.current.value,this.props.PerfilStore.editarVarios);
    if(pasar){
      this.handleClose();
    }
  }
  render(){
   
    const useStyles = makeStyles({
      table: {
        minWidth: 650,
      },
    });
  
    const BootstrapButton = withStyles({
      root: {
        boxShadow: 'none',
        textTransform: 'none',
        fontSize: 16,
        padding: '6px 12px',
        border: '1px solid',
        lineHeight: 1.5,
        backgroundColor: '#0063cc',
        borderColor: '#0063cc',
        fontFamily: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          'sans-serif',
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
        ].join(','),
        '&:hover': {
          backgroundColor: '#0069d9',
          borderColor: '#0062cc',
          boxShadow: 'none',
        },
        '&:active': {
          boxShadow: 'none',
          backgroundColor: '#0062cc',
          borderColor: '#005cbf',
        },
        '&:focus': {
          boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
        },
      },
    })(Button);
    const { classes,PerfilStore } = this.props;
    return (
      <div>
          <BootstrapButton  variant="contained" 
                                    color="primary" 
                                    disableRipple 
                                    className={classes.margin}
                                    onClick={this.handleClickOpen.bind(this)}>
                    AGREGAR
                  </BootstrapButton>
        <Dialog open={this.props.PerfilStore.open} onClose={this.handleClose.bind(this)} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">{this.props.PerfilStore.nuevoItem?'AGREGAR NUEVO REGISTRO':'EDITAR REGISTRO'}</DialogTitle>
          <DialogContent>
         
            <Grid container 
                spacing={3}  
                direction="row"
                justify="center"
                alignItems="center"
                >
              <Grid item xs={6} >
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  defaultValue={(!PerfilStore.nuevoItem&&!PerfilStore.editarVarios&&PerfilStore.Listado.length>0)?PerfilStore.Listado[PerfilStore.index].nombre:""}
                  inputRef={this.nombreRef}
                  label="nombre"
                  type="text"
                  helperText={PerfilStore.errorText}
                  error={PerfilStore.errorText!=""}
                  fullWidth
                  variant="standard"
                  onChange={this.nombreChange.bind(this)}
                />
              </Grid>
              <Grid item xs={6} >
              <Box fontSize={12 }fontFamily="Arial">
                <label >Fecha de nacimiento</label>
                <TextField
                id="date"
                  inputRef={this.fechaRef}
                  defaultValue={(!PerfilStore.nuevoItem&&!PerfilStore.editarVarios&&PerfilStore.Listado.length>0)?PerfilStore.Listado[PerfilStore.index].fecha_nacimiento:""}
                  helperText={PerfilStore.errorTextF}
                  error={PerfilStore.errorTextF!=""}
                  onChange={this.fechaNactChange.bind(this)}
                  type="date"
                  fullWidth
                />
                </Box>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose.bind(this)}>Cancelar</Button>
            <Button onClick={this.guardar.bind(this)}>Guardar</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
  nombreChange(event){
    this.props.PerfilStore.nombreChange({
      value:event.target.value,
    })
  }
  fechaNactChange(event){
    this.props.PerfilStore.fechaNactChange({
      value:event.target.value,
    })
  }
}

export default withStyles(styles)(observer(FormDialog));