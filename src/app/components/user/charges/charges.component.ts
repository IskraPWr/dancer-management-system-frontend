import { ServerService } from './../../../server/server.service';
import { Title } from '@angular/platform-browser';
import { PathService } from './../../service';
import { Component, OnInit, OnDestroy } from '@angular/core';

export interface Semester {
  id_semester: number;
  name: string;
  start: Date;
  date_1: any;
  date_2: any;
  date_3: any;
  end: Date;
}

export interface Data {
  entryFee: any;
  charges1: number;
  charges2: number;
  charges3: number;
  declaration: number;
}

export interface Server {
  semester: Semester;
  data: Data;
}
@Component({
  templateUrl: './charges.component.html'
})
export class ChangesComponent implements OnInit, OnDestroy {
  constructor (private Service: PathService, private titleService: Title, private server: ServerService) {
    this.Service.updateFlag('Konto');
    this.titleService.setTitle('Dane');
  }

  edit = false;
  numberOfBlocks;
  buttonStatusArray = ['Edytuj', 'Zmień'];
  button = this.buttonStatusArray[0];
  charges;
  data: Server = {
    semester: {
      id_semester: 0,
      name: '0',
      start: new Date(0),
      date_1: new Date(0),
      date_2: new Date(0),
      date_3: new Date(0),
      end: new Date(0),
    },
    data: {
      entryFee: 0,
      charges1: 0,
      charges2: 0,
      charges3: 0,
      declaration: 0,
    }
  };

  ngOnInit () {
    this.charges = this.server.getChargesById(1).subscribe((data) => {
      this.data = data as Server;
      this.data.semester.date_1 = new Date(this.data.semester.date_1).toLocaleDateString();
      this.data.semester.date_2 = new Date(this.data.semester.date_2).toLocaleDateString();
      this.data.semester.date_3 = new Date(this.data.semester.date_3).toLocaleDateString();
      if (this.data.data.declaration === 0) {
        this.edit = true;
      } else {
        this.numberOfBlocks = this.data.data.declaration + ' bloki';
      }

      if (this.data.data.entryFee === 0) {
        this.data.data.entryFee = 'Brak';
      }
    }, error => console.log(error));
  }

  ngOnDestroy () {
    this.charges.unsubscribe();
  }

  change () {
    if (this.edit === false ) {
      this.edit = true;
      this.button = this.buttonStatusArray[1];
    } else {
      this.edit = false;
      this.button = this.buttonStatusArray[0];
    }
  }
}

