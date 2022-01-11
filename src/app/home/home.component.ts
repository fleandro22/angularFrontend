import { Component, OnInit } from '@angular/core';
import { HomeService } from '../auth/services/home.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(public homeS: HomeService) { }

  dataCompany:any = [ {
    "nit": "",
    "nombre": "",
    "capa": "",
    "segmento": ""
  }]

  ngOnInit(): void {

    this.handleLogin();
  }
  
  handleLogin() {
    const nit = "8002201542";

    try {
      this.homeS.getCompany(nit).subscribe((res) => {
        if (res.statusResponse !== 'FAILED') {
          const dataCompanyResponse:any = {
            "nit":  res.data.nit,
            "nombre": res.data.nombre,
            "capa": res.data.capa,
            "segmento": res.data.segmento
          }

           this.dataCompany.push(dataCompanyResponse)
        }
      },error => error)

    } catch(error) { error}
  }

}
