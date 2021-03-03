import {Component} from '@angular/core';
import {Observable} from 'rxjs';
import {IAccountModel} from '../../core/models/account.model';
import {Store} from '@ngrx/store';
import {IAppState} from '../../core/store/state/app.state';
import {selectAuthAccount} from '../../core/store/selectors/auth.selectors';
import {Logout} from '../../core/store/actions/auth.actions';

@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.scss']
})
export class HomeComponent {
  public account$: Observable<IAccountModel> = this.store.select(selectAuthAccount);

  constructor(
    private store: Store<IAppState>,
  ) {
  }

  public ionViewWillEnter(): void {
  }

  public logout(): void {
    this.store.dispatch(new Logout());
  }
}
