// import { Component, OnInit } from '@angular/core';
// import { Router, NavigationExtras } from '@angular/router';
// import { AuthService } from '../service/auth.service';
//
// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css']
// })
// export class LoginComponent implements OnInit {
//
//   message: string;
//   userId: string;
//
//   constructor(public authService: AuthService, public router: Router) {
//     this.setMessage();
//   }
//
//   ngOnInit() {
//   }
//
//
//   setMessage() {
//     this.message = (this.authService.isLogin ? this.authService.userId + '님 환영합니다.' : '로그인 필요');
//   }
//
//   private doLogin() {
//     this.setMessage();
//     if (this.authService.isLogin) {
//       let redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/admin';
//       let navigationExtras: NavigationExtras = {
//         preserveQueryParams: true,
//         preserveFragment: true
//       };
//       this.router.navigate([redirect], navigationExtras);
//     } else {
//       alert('로그인을 할 수 없습니다.');
//     }
//   }
//
//   login() {
//     if (!this.userId) {
//       alert('id를 입력해주세요');
//       return;
//     }
//     this.message = '로그인을 진행해주세요';
//
//     return this.authService.checkId(this.userId).then(children => {
//       if (children) {
//         this.authService.login(this.userId).subscribe(() => this.doLogin()); //아이디가 서비스에서 정의한 목록에 존재하면 this.doLogin()을 수행
//       } else {
//         alert('아이디가 없습니다');
//       }
//       this.setMessage();
//     });
//   }
//
//   logout() {
//     this.authService.logout();
//     this.setMessage();
//   }
//
// }
