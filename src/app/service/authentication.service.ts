import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'


import { PostTestService } from '../service/post-test.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

//[model]
import { User } from '../model/index';

@Injectable()
export class AuthenticationService {

    public token: string;
    user: User;

    constructor(private http: Http,
                private postTestService: PostTestService,
                private router: Router,) {

        // set token if saved in local storage
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token;
    }




    login(userid: string, password: string): Observable<boolean> {

      var path = '/authentication';
      var postData = {id:userid, password:password};
      return this.postTestService.postServer(path, postData).map(data => {
        this.user = data;
        console.log("아이디: " + this.user.user_id);

        if(this.user.result=="ok"){
          return true;
        }else{
          return false;
        }

      });

        // return this.http.post('/api/authenticate', JSON.stringify({ username: username, password: password }))
        //     .map((response: Response) => {
        //         // login successful if there's a jwt token in the response
        //         let token = response.json() && response.json().token;
        //         if (token) {
        //             // set token property
        //             this.token = token;
        //
        //             // store username and jwt token in local storage to keep user logged in between page refreshes
        //             localStorage.setItem('currentUser', JSON.stringify({ username: username, token: token }));
        //
        //             // return true to indicate successful login
        //             return true;
        //         } else {
        //             // return false to indicate failed login
        //             return false;
        //         }
        //     });
    }


    logout(): void {
        // clear token remove user from local storage to log user out
        this.token = null;
        localStorage.removeItem('currentUser');
    }
}
