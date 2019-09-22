import { HttpErrorResponse } from '@angular/common/http';
import { Component, ViewChild} from '@angular/core';

import { MatSnackBar, MatInput } from '@angular/material';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { MatSort } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { ServerService } from 'src/app/components/server/server.service';
import { ISelectOptions, ISemesterDetails, ITransactionsListData } from 'src/app/typings/typings';


@Component({
  selector: 'app-transaction-list',
 templateUrl: './transaction-list.component.html',
})
export class TransactionListComponent {

    constructor(
      private server: ServerService,
      private snackBar: MatSnackBar
    ) {

      this.server
      .getSemesterDetails()
      .toPromise()
      .then((data: ISemesterDetails[]) => {
        this.semesters = data.map((semester: ISemesterDetails, index: number) => {
          return {
            value: index.toString(),
            viewValue: semester.name
          } as ISelectOptions;
        });
        this.semestersData = data;
      })
      .catch((err: HttpErrorResponse) => {
        this.openSnackBar('Błąd!', 'Nie udało się pobrać danych');
      });

      this.server.getTransactionsList().toPromise().then((data: ITransactionsListData[]) => {
        this.transactionsData = data;
        this.setDataTable('-1');
      }).catch((err: HttpErrorResponse) => {
        this.openSnackBar('Błąd!', 'Nie udało się pobrać danych');
      });

    }

    selection = new SelectionModel<ITransactionsListData>(true);
    transactionsList: MatTableDataSource<ITransactionsListData>;
    transactionsData: ITransactionsListData[];
    semesters: ISelectOptions[];
    semestersData: ISemesterDetails[];


    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatInput) matInput: MatInput;

    displayedColumns: string[] = [
      'id_transaction',
      'name',
      'email',
      'product',
      'date',
      'price',
      'quantity',
      'sum'
    ];

    setDataTable(value: string): void {
      const index = parseInt(value, 10);

      if (index === -1) {
        this.transactionsList = new MatTableDataSource<ITransactionsListData>(this.transactionsData as ITransactionsListData[]);
      } else {
        const tranactionsInSemester: ITransactionsListData[] = this.transactionsData.filter((transaction: ITransactionsListData) => {
          try {
            const transactionDate = new Date(transaction.date);
            return transactionDate > new Date(this.semestersData[index].start) &&
             transactionDate <= new Date(this.semestersData[index].end);
          } catch {
            this.openSnackBar('Błąd!', 'Nie udało się sformatować daty');
            return false;
          }
        });
        this.transactionsList = new MatTableDataSource<ITransactionsListData>(tranactionsInSemester as ITransactionsListData[]);
      }
      this.transactionsList.paginator = this.paginator;
      this.transactionsList.sort = this.sort;
      this.matInput.value = '';
    }

    applyFilter(filterValue: string) {
      this.transactionsList.filter = filterValue.trim().toLowerCase();

      if (this.transactionsList.paginator) {
        this.transactionsList.paginator.firstPage();
      }
    }

    openSnackBar(message: string, action: string) {
      this.snackBar.open(message, action, {
        duration: 2000
      });
    }
}
