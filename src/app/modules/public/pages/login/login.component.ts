import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {IAppState} from '../../../../core/store/state/app.state';
import {PostLogin} from '../../../../core/store/actions/auth.actions';
import {selectIsAuthLoading} from 'src/app/core/store/selectors/auth.selectors';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public isLoading$: Observable<boolean> = this.store.select(selectIsAuthLoading);
  public email: string;
  public password: string;

  constructor(
    private store: Store<IAppState>,
  ) {
  }

  public ngOnInit(): void {
  }

  public login(): void {
    this.store.dispatch(new PostLogin(this.email, this.password));
  }
}
