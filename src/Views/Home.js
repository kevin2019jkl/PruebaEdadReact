
import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/styles';
import Box from '@material-ui/core/Box';
import { green, purple } from '@material-ui/core/colors';
import Dialog from '../Components/Dialog';
import { ArrowBackIosRounded, ContactsOutlined } from '@material-ui/icons';
import { Alert } from '@material-ui/lab';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Swal from 'sweetalert2';
import Pagination from '@material-ui/lab/Pagination';
import Checkbox from '@material-ui/core/Checkbox';
import { observable, computed,extendObservable,action,makeObservable  } from "mobx";
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
  typography: {
    align: "center"
  }
});
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

const ColorButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: purple[500],
    '&:hover': {
      backgroundColor: purple[700],
    },
  },
}))(Button);

class DenseTable extends Component  {

  constructor(props) {
    super(props)
  }
  
   createData(nuevo,index,nombre,fecha,varios) {
    const {PerfilStore}=this.props;
     var pasar=true;
     if (nombre=="") {
       PerfilStore.nombreChange({
         value:nombre,
       })
      pasar=false
    }
    if (fecha=="") {
      pasar=false
      PerfilStore.fechaNactChange({
        value:fecha,
      })
    } 
    if(pasar){ 
      var mensaje="";
      if(nuevo){
          PerfilStore.agregarPerfil({
            nombre:nombre,
            fecha_nacimiento:fecha,
           checked:false,
        })
        mensaje="El registro se ha guardado con exito";
      }else{
        if(varios){
          PerfilStore.editarVariosPerfil({
            nombre:nombre,
            fecha_nacimiento:fecha,
           
        })
        }else{
          PerfilStore.editarPerfil({
            nombre:nombre,
            fecha_nacimiento:fecha,
            index:index,
        })
          mensaje="El registro se ha actualizado con exito";
        }
       
      }
      this.mostrarAlerta("success","Operación exitosa",mensaje);
      return true;
    }
    return false;
  }

  mostrarAlerta(icon, title, text) {
      Swal.fire({
          icon,
          title,
          text,
          allowOutsideClick: false,
      });
  }
  modalWarning(i,mensage,eliminarVarios) {
    Swal.fire({
        title: mensage,
        text: "",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, estoy seguro",
        cancelButtonText: "No, cancelar",
        allowOutsideClick: false,
    }).then(async result => {
        if (result.value) {
          if(eliminarVarios){
            this.deleteItems()
          }else{
            this.deleteItem(i)
          }
           
        }
    });
}
  render(){
    const {PerfilStore}=this.props;
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Grid container  
              direction="row"   
              justify="center"
              alignItems="center" >
          <Grid container 
              item xs={10} 
              alignItems="flex-start" 
              justify="flex-end" 
              direction="row">

                <Box m={2} pt={5} pb={4}>
                <Dialog ref="child" createData={this.createData.bind(this)}
                          nombreRef={this.nombreRef}
                          fechaRef={this.fechaRef}
                          PerfilStore={PerfilStore}></Dialog>
              </Box>
           
          </Grid>
        </Grid>
         <Grid container 
              spacing={3}  
              direction="row"
              justify="center"
              alignItems="center">
          <Grid item xs={10} >
            <TableContainer component={Paper}>
              <Table className={classes.table} size="small" aria-label="a dense table" >
                <TableHead>
                  <TableRow>
                    <TableCell>Nombre</TableCell>
                    <TableCell align="right">Fecha de nacimiento</TableCell>
                    <TableCell align="right">edad</TableCell>
                    <TableCell align="right">Acciones</TableCell>
                    <TableCell align="right">
                    <DeleteIcon onClick={this.modalWarning.bind(this,0,"¿Esta seguro de que desea eliminar los registros seleccionados?",true)}></DeleteIcon>
                    <EditIcon onClick={this.editItems.bind(this,1)}></EditIcon>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.obtenerPagina()}
                </TableBody>
              </Table>
            </TableContainer>
            <Grid item xs={12} >
            {this.getAlert()}
            </Grid><br></br>
            <Grid container 
                  spacing={3}  
                  direction="row"
                  justify="center"
                  alignItems="center">
             <Pagination count={this.getPagination()} page={this.props.PerfilStore.page} onChange={this.handleChange.bind(this)} variant="outlined" shape="rounded"/> 
            </Grid>
          </Grid>
        </Grid> 
      </div>
    );
  }
  obtenerPagina(){
    var items=[]
    const {PerfilStore}=this.props;
    PerfilStore.Listado.forEach((row,index) => {
      if(index+1>=(this.props.PerfilStore.page)*5-4&&index+1<=(this.props.PerfilStore.page*5)){
        items.push(
          <TableRow key={row}>
          <TableCell component="th" scope="row">
            {row.nombre}
          </TableCell>
          <TableCell align="right">{row.fecha_nacimiento}</TableCell>
          <TableCell align="right">
              {this.calcularEdad(row.fecha_nacimiento)} 
          </TableCell>
          <TableCell align="right">
          <DeleteIcon onClick={this.modalWarning.bind(this,index,"¿Esta seguro de que desea eliminar este registro?",false)}></DeleteIcon>
          <EditIcon onClick={this.editItem.bind(this,index)}></EditIcon>
          </TableCell>
          <TableCell align="right">
          <Checkbox
             checked={row.checked}
             onChange={this.handleChangeCheck.bind(this,index)}
              color="primary"
              inputProps={{ 'aria-label': 'secondary checkbox' }}
            />
          </TableCell>
        </TableRow>
         )        
        }
      });
  return items;
  }
  handleChangeCheck(i,event){
    this.props.PerfilStore.seleccionarPerfil({
      index:i,
    });
  }
  getPagination(){
    const {PerfilStore}=this.props;
    if(PerfilStore.Listado.length<6){
      return 1;
    }else{
      var pagina=Math.trunc(PerfilStore.Listado.length/5);
      if(PerfilStore.Listado.length%5!=0){
        pagina++;
      }
      return pagina;
    }
  }
  handleChange = (event, value) => {
      this.props.PerfilStore.updatePage({
        page:value
      });
  }
  calcularEdad(fecha_nacimiento){
    var currentDate=new Date().toISOString().substr(0, 10);
    const [ currentYear, currentMonth, currentDay] = [parseInt(currentDate.substring(0,4),10),parseInt(currentDate.substring(5,7),10),parseInt(currentDate.substring(8,10),10)]
    const [month, year, day] = [fecha_nacimiento.substring(5,7),fecha_nacimiento.substring(0,4),fecha_nacimiento.substring(8,10)]
    var edad =(currentYear-year-1);
    if((currentMonth-month)>0){
        edad++;
    }else if(((currentMonth-month)==0)&&((currentDay-day)>=0)){
        edad++;
    }
    if(edad>0){
       return edad;
    }else{
      return 0;
    }
    
  }
  deleteItem(index){
    const {PerfilStore}=this.props;
    PerfilStore.eliminarPerfil({
        index:index,
    })
  }
  deleteItems(){
    const {PerfilStore}=this.props;
    PerfilStore.eliminarVariosPerfil({
  })
  }
  editItem(index){
    this.refs.child.showDialog( this.props.PerfilStore.nombre,this.props.PerfilStore.fecha,index,false);
  }
  editItems(){
    this.refs.child.showDialog("","",0,true);
  }

  getAlert(){
    const {PerfilStore}=this.props;
    if(PerfilStore.Listado.length==0){
      return(
        <Alert variant="outlined" severity="info"  >
                No hemos encontrado ningun registro
              </Alert>
      )
    }else{
      return null;
    }
  }
}

export default withStyles(styles)(inject("PerfilStore")(observer(DenseTable)) );