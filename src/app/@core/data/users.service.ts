import {Observable, of as observableOf} from 'rxjs';
import {Injectable} from '@angular/core';
import {User} from '../../modules/user/user-models';
import {map} from 'rxjs/operators';
import {NbAuthOAuth2JWTToken, NbAuthService} from '@nebular/auth';


@Injectable()
/**
 * @deprecated use UserSupplier instead
 */
export class UserService {

    constructor(
        private readonly authService: NbAuthService,
    ) {}

    getUsers(): Observable<any> {
        return observableOf([]);
    }
}
