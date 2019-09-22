import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import * as Chart from 'chart.js';
import { getRandomColor } from 'src/app/components/items/colorGenerator/colorGenerator';
import { ServerService } from 'src/app/components/server/server.service';
import { IDeclaredCharges, IPresence, IStatModalPresenceGroup } from 'src/app/typings/typings';

import { DocumentsComponent } from './../documents-component/documents.component';

@Component({
  selector: 'app-modal',
  templateUrl: './documents-modal.component.html'
})
export class DocumentsModalComponent implements AfterViewInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) private modalData: IStatModalPresenceGroup,
    private snackBar: MatSnackBar,
    private server: ServerService,
    private dialogRef: MatDialogRef<DocumentsComponent>,
  ) {
    if (this.modalData) {
      if (!this.modalData.id_user || !this.modalData.id_semester) {
        this.snackBar.open('Błąd!', 'Przewarzania danych nie powiodło się', {
          duration: 3000
        });
        this.dialogRef.close();
        return;
      }

      this.server
      .getStatPresenceGroupByIdAndIdSemester(
        this.modalData.id_user,
        this.modalData.id_semester
      ).toPromise().then((data: IPresence[]) => {
        const chargesData = data.map((declaredCharges: IPresence) => declaredCharges.data);
        const chargesLabels = data.map((declaredCharges: IPresence) => declaredCharges.name);
        const title = `Ilość wizyt w poszczególnych grupach w wybranym semestrze - ${this.modalData.name} ${this.modalData.surname}`;
        const datasetLabel = 'Grupy';

        this.setChartData(chargesData, chargesLabels, datasetLabel, title, 'bar');
      }).catch((err: HttpErrorResponse) => {
        this.snackBar.open('Błąd!', 'Nie udało się pobrać danych', {
          duration: 3000
        });
      });
    } else {
      this.server.getStatOfDeclaredCharges().toPromise().then((data: IDeclaredCharges[]) => {
        const chargesData = data.map((declaredCharges: IDeclaredCharges) => declaredCharges.value);
        const chargesLabels = data.map((declaredCharges: IDeclaredCharges) => declaredCharges.name);
        const title = 'Deklarowane wysokości składek';
        const datasetLabel = 'Deklarowana składka';

        this.setChartData(chargesData, chargesLabels, datasetLabel, title);
      }).catch((err: HttpErrorResponse) => {
        this.snackBar.open('Błąd!', 'Nie udało się pobrać danych', {
          duration: 3000
        });
      });
    }
  }

  chart: Chart;

  ngAfterViewInit(): void {
   const ctx = document.getElementById('chart') as HTMLCanvasElement;
   this.chart = new Chart(ctx, {
    type: 'pie',
    options: {
      title: {
        display: true,
        fontSize: 15,
      },
    }
    });
  }

  setChartData(data: number[], labels: string[], dataLabel: string, title: string, type?: string): void {
    this.chart.data.datasets = [{
      data: data,
      label: dataLabel,
      backgroundColor: getRandomColor(data.length),
    }];

    this.chart.data.labels = labels;
    this.chart.options.title.text = title;
    type ? this.chart.config.type = type : null;

    this.chart.update();
  }
}
