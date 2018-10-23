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

    getActiveUser(): Observable<User> {

        return this.authService.onTokenChange()
            .pipe(map<NbAuthOAuth2JWTToken, User>(it => {

                const payload: any = it.getAccessTokenPayload();

                return {
                    id: 1, // TODO: get id from JWT
                    username: payload.user_name,
                    enabled: true, // can not be false, because the user would not be able to log in then
                };
            }));
    }

    getUsers(): Observable<any> {
        return observableOf([]);
    }
}
