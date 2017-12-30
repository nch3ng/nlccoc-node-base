import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User, RegUser } from '../model/user';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  
  user: User;
  regUser: RegUser;
  message: string = '';
  user_status: boolean;
  error: boolean = false;
  isRegister: boolean =false;

  constructor(private authService: AuthService, private router: Router) { 
    this.user = new User();
    this.regUser = new RegUser();
  }

  ngOnInit() {
  }

  login(user: User){
    console.log("login user");
    console.log(user)
    this.authService.loginUser(user).subscribe( res => {
      this.user_status = res['success']; 
      if(res['success'] == true) {
        this.error=false;
        this.authService.setUser(res['user']);
        this.router.navigate(['/dashboard']);
      } else {
        this.error=true;
        this.message = res['message'];
      }
    });
  }

  register(user: RegUser){
    console.log("register: ");

    this.authService.registerUser(user).subscribe( (res) => {
      console.log(res);
      if( res['success'] == true ) {
        this.authService.setUser(res['user']);
        this.router.navigate(['/dashboard']);
      } else {
        this.message = res['message'];
      }
    })
    // var body = JSON.stringify({
    //   name: this.user.name,
    //   email: this.user.email,
    //   password: this.user.password
    // });

    // return this.http.post('/api/register', body, {headers:this.headers}).map((response: Response) => {
    //     // login successful if there's a jwt token in the response
    //     let user = response.json();
    //     console.log(user);
    //     return user;
    // }).subscribe();
  }

  toggle():void {
    this.isRegister=!this.isRegister;
  }
}
