
import React, { Component } from 'react';
// import { makeStyles } from '@material-ui/core/styles';
// import Table from '@material-ui/core/Table';
// import TableBody from '@material-ui/core/TableBody';
// import TableCell from '@material-ui/core/TableCell';
// import TableContainer from '@material-ui/core/TableContainer';
// import TableHead from '@material-ui/core/TableHead';
// import TableRow from '@material-ui/core/TableRow';
// import Paper from '@material-ui/core/Paper';
// import Grid from '@material-ui/core/Grid';
// import Button from '@material-ui/core/Button';
// import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
// import { withStyles } from '@material-ui/styles';
// import Box from '@material-ui/core/Box';
// import { green, purple } from '@material-ui/core/colors';
// import Dialog from './Components/Dialog';
// import { ArrowBackIosRounded } from '@material-ui/icons';
// import { Alert } from '@material-ui/lab';
// import DeleteIcon from '@material-ui/icons/Delete';
// import EditIcon from '@material-ui/icons/Edit';
// import Swal from 'sweetalert2';
// import Pagination from '@material-ui/lab/Pagination';
// import Checkbox from '@material-ui/core/Checkbox';
import { observable, computed,extendObservable,action,makeObservable  } from "mobx";
import { Provider } from "mobx-react";
import PerfilStore from "./Store/PerfilStore";
import Home from "./Views/Home";
export default function App(){
  return <Provider PerfilStore={PerfilStore}>
    <Home></Home>
  </Provider>
}
