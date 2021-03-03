import {Component, OnDestroy, OnInit} from '@angular/core';
import {SatDatepickerRangeValue} from 'saturn-datepicker';
import {Store} from '@ngrx/store';
import {IAppState} from '../../../../../../core/store/state/app.state';
import {DeleteTrip, GetTrips} from '../../../../../../core/store/actions/trip.actions';
import * as moment from 'moment-timezone';
import {Observable, Subscription} from 'rxjs';
import {ITripModel} from '../../../../../../core/models/trip.model';
import {selectIsTripsLoading, selectTrips} from '../../../../../../core/store/selectors/trip.selectors';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import {AlertController} from '@ionic/angular';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
})
export class HistoryComponent implements OnInit, OnDestroy {

  public trips$: Observable<ITripModel[]> = this.store.select(selectTrips);
  public isLoading$: Observable<boolean> = this.store.select(selectIsTripsLoading);

  public trips: ITripModel[] = [];
  public dateRange: SatDatepickerRangeValue<string> = {
    begin: moment().format('YYYY-MM-DD'),
    end: moment().format('YYYY-MM-DD'),
  };

  public usingFilter = false;
  public EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  public EXCEL_EXTENSION = '.xlsx';

  private _subscriptions: Subscription[] = [];

  constructor(
    private store: Store<IAppState>,
    private alertController: AlertController,
  ) {
    this.store.dispatch(new GetTrips(moment(this.dateRange.begin), moment(this.dateRange.end)));
  }


  ngOnInit() {
    this._subscriptions.push(
      this.trips$.subscribe(t => {
        this.trips = t;
      })
    );
  }

  public delete(trip: ITripModel) {
    this.store.dispatch(new DeleteTrip(trip));
  }

  public doRefresh(event): void {
    this.store.dispatch(new GetTrips(moment(this.dateRange.begin), moment(this.dateRange.end)));
    setTimeout(() => {
      event.target.complete();
    }, 1000);
  }

  dateChange() {
    this.store.dispatch(new GetTrips(moment(this.dateRange.begin), moment(this.dateRange.end)));
  }

  exportExcel() {
    const data: any[] = [];
    this.trips.forEach(t => {
      data.push({
        Time: moment(t.created_at).tz('Europe/Copenhagen').format('YYYY-MM-DD HH:mm:ss'),
        Origin: t.origin,
        Destination: t.destination,
        Distance: t.distance.toFixed(2),
      });
    });
    // tslint:disable-next-line:max-line-length
    this.exportAsExcelFile(data, 'mileage_' + moment(this.dateRange.begin).format('DD/MM/YYYY').concat('-').concat(moment(this.dateRange.end).format('DD/MM/YYYY')));

  }

  public exportAsExcelFile(json: any[], excelFileName: string): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const workbook: XLSX.WorkBook = {Sheets: {'data': worksheet}, SheetNames: ['data']};
    const excelBuffer: any = XLSX.write(workbook, {bookType: 'xlsx', type: 'array'});
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }

  ngOnDestroy(): void {
    this._subscriptions.forEach(s => s.unsubscribe());
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {type: this.EXCEL_TYPE});
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + this.EXCEL_EXTENSION);
  }

}
