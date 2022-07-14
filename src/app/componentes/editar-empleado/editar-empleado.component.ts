import { Component, OnInit } from '@angular/core';

import { FormGroup, FormBuilder } from '@angular/forms';
import { CrudService } from 'src/app/servicio/crud.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-editar-empleado',
  templateUrl: './editar-empleado.component.html',
  styleUrls: ['./editar-empleado.component.css']
})
export class EditarEmpleadoComponent implements OnInit {

  formEmpleados:FormGroup;

  identificador:any;

  constructor(
    private activeRoute:ActivatedRoute,
    private crudService:CrudService,
    public formulario:FormBuilder,
    private ruteador:Router
  ) { 
    this.identificador=this.activeRoute.snapshot.paramMap.get('id');
    console.log(this.identificador);

    this.crudService.consultarEmpleado(this.identificador).subscribe(respuesta=>{
      console.log(respuesta);
      this.formEmpleados.setValue({
        nombre:respuesta[0]['nombre'],
        correo:respuesta[0]['correo']
      });
    });

    this.formEmpleados=this.formulario.group({
      nombre:[''],
      correo:['']
    });
  }

  ngOnInit(): void {
  }

  enviarDatos():any{
    console.log(this.identificador);
    console.log(this.formEmpleados.value);

    this.crudService.editarEmpleado(this.identificador,this.formEmpleados.value).subscribe(()=>{
      this.ruteador.navigateByUrl('/listar-empleado');
    });
  }

}
