import { Component, OnInit } from '@angular/core';

import { CrudService } from 'src/app/servicio/crud.service';

@Component({
  selector: 'app-listar-empleado',
  templateUrl: './listar-empleado.component.html',
  styleUrls: ['./listar-empleado.component.css']
})
export class ListarEmpleadoComponent implements OnInit {

  Empleados:any;

  constructor(
    private crudService:CrudService
  ) { }

  ngOnInit(): void {
    this.crudService.obtenerEmpleado().subscribe(respuesta=>{
      console.log(respuesta);
      this.Empleados=respuesta;
    });
  }
  borrarRegistro(id:any, icontrol:any){
    console.log(id);
    console.log(icontrol);

    if(window.confirm("¿Seguro que quiere borrar?")){
    this.crudService.borrarEmpleado(id).subscribe((respuesta)=>{
      this.Empleados.splice(icontrol,1);
    });
  }
  }

}
