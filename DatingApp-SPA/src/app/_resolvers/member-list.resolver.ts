
import {Injectable} from '@angular/core';
import {Resolve, ActivatedRouteSnapshot, Router} from '@angular/router';
import {User} from '../_modals/user';
import { Observable, of } from 'rxjs';
import { UserService } from '../_services/user.service';
import { catchError } from 'rxjs/operators';
import { AlertifyService } from '../_services/alertify.service';


@Injectable()

export class MemberListResolver implements Resolve<User[]>{
    /**
     *
     */
    constructor(private userService: UserService, private router : Router , private alertify : AlertifyService) { }

    resolve (route: ActivatedRouteSnapshot): Observable<User[]>{
        return this.userService.getUsers().pipe(
            catchError(error => {
                this.alertify.error('problem retrieving data');
                this.router.navigate(['/home']);
                return of(null);
            }
            )
        )
    }
}