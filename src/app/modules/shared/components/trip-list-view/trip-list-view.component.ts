import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ITripModel} from '../../../../core/models/trip.model';
import * as moment from 'moment';
import {AlertController} from '@ionic/angular';

@Component({
  selector: 'app-trip-list-view',
  templateUrl: './trip-list-view.component.html',
  styleUrls: ['./trip-list-view.component.scss'],
})
export class TripListViewComponent implements OnInit {
  @Input() trips: ITripModel[] = [];
  @Output() deleteTrip: EventEmitter<ITripModel> = new EventEmitter<ITripModel>();

  constructor(
    private alertController: AlertController,
  ) {
  }

  ngOnInit() {
  }

  async showTrip(trip: ITripModel) {
    const message = '<b>From:</b> '
      + trip.origin + '<br>'
      + '<b>To:</b> ' + (trip.destination || '') +
      '<br>' +
      '<b>Trip start: </b>' + moment(trip.created_at).tz('Europe/Copenhagen').format('HH:mm') + '<br>' +
      '<b>Distance: </b>' + (trip.distance ? (trip.distance / 1000).toFixed(2) + 'km' : '');

    const alert = await this.alertController.create({
      header: 'Trip info',
      message: message,
      buttons: [
        {
          text: 'Delete',
          cssClass: 'alertDanger',
          handler: () => {
            if (confirm('Are you sure you want to delete this trip?')) {
              this.deleteTrip.emit(trip);
            }
          }
        },
        {
          text: 'Okay',
        },

      ]
    });
    await alert.present();
  }

}
