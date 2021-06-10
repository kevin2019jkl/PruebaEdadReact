import { makeObservable,observable,action  } from "mobx";

class PerfilStore {

    page=1;
    errorText= '';
    errorTextF= '';
    Listado=[];
    open=false;
    nuevoItem=false;
    editarVarios=false;
    index=0;
    
    agregarPerfil = perfil=>{
        this.Listado.push(perfil)
    }
    seleccionarPerfil = perfil=>{
        this.Listado[perfil.index].checked=!this.Listado[perfil.index].checked;
    }
    editarPerfil = perfil=>{
        this.Listado[perfil.index].nombre=perfil.nombre;
          this.Listado[perfil.index].fecha_nacimiento=perfil.fecha_nacimiento;
    }
    editarVariosPerfil = perfil=>{
         this.Listado.forEach(item=>{
              if(item.checked){
                item.nombre=perfil.nombre;
                item.fecha_nacimiento=perfil.fecha_nacimiento;
              }
            })
    }

    eliminarPerfil = perfil=>{
        this.Listado.splice(perfil.index,1);
         
    }
    eliminarVariosPerfil = perfil=>{
        this.Listado=this.Listado.filter(item=>(item.checked==false));
         
    }
    openDialog = perfil=>{
        this.open=true;
        this.nuevoItem=perfil.nuevoItem;
        this.editarVarios=perfil.editarVarios;
        this.index=perfil.index;
    }
    closeDialog = perfil=>{
        this.open=false;
       
    }
    updatePage= perfil=>{
        this.page=perfil.page;
       
    }
    nombreChange= perfil=>{
        if (perfil.value!="") {
          this.errorText= '';
        } else {
          this.errorText= 'El campo es requerido';
        }
      }
      fechaNactChange= perfil=>{
        if (perfil.value!="") {
          this.errorTextF= '';
        } else {
          this.errorTextF='El campo es requerido' ;
        }
      }
      resetErrorMessage=perfil=>{
          this.errorText="";
          this.errorTextF="";
      }
    constructor() {
        makeObservable(this,{
          
            page:observable,
            errorText:observable,
            errorTextF:observable,
            Listado:observable,
            open:observable,
            agregarPerfil:action,
            editarPerfil:action,
            eliminarPerfil:action,
            editarVariosPerfil:action,
            seleccionarPerfil:action,
            eliminarVariosPerfil:action,
            openDialog:action,
            closeDialog:action,
            updatePage:action,
            nombreChange:action,
            fechaNactChange:action,
            resetErrorMessage:action,
        })
        
    }
}

const perfilStore=new PerfilStore();

export default perfilStore;