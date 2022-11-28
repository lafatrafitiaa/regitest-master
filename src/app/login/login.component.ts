import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LaravelserviceService } from '../laravelservice.service';
import { MicoService } from '../mico.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public userForm:FormGroup;
  email: string = "";
  pass: string = "";
  iduserrole: string = "";

  constructor(private httpService: MicoService, private route: ActivatedRoute, private fb: FormBuilder, private laravelService: LaravelserviceService) {
    this.userForm = this.fb.group({
      email:'',
      pass:'',
      iduserrole:''
    });
  }

  ngOnInit(): void {
  }

  traitementLogin(){
    this.email = this.userForm.get('email')?.value;
    this.pass = this.userForm.get('pass')?.value;
    this.iduserrole = this.userForm.get('iduserrole')?.value;
    this.laravelService.loginApk(this.email, this.pass, this.iduserrole).subscribe(
      (data: any) => {
        if(data.length == 0) {
          window.location.href = "login";
        }
        this.laravelService.getToken(data[0].id).subscribe(
          (tokendata: any) => {
            localStorage.setItem('token', tokendata[0].token);
            sessionStorage.setItem('id', tokendata[0].id);
            sessionStorage.setItem('idclients', data[0].id);
            sessionStorage.setItem('userrole', data[0].iduserrole);
          }
        )
        window.location.href = "accueil";
      }
    )
  }

}
