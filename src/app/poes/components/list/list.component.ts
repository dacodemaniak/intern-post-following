import { DataSource } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Poe } from 'src/app/core/models/poe';
import { PoeService } from '../../services/poe/poe.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  poes: Poe[] = [];

  displayedColumns: string[] = [
    'id',
    'title',
    'beginDate',
    'endDate',
    'poeType',
    'actions'
  ];

  dataSource: MatTableDataSource<Poe> = new MatTableDataSource();
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _poeService: PoeService
  ) { }

  ngOnInit(): void {
    this._poeService.findAll()
      .subscribe((poes: Poe[]) => {
        this.poes = poes;
        this.dataSource = new MatTableDataSource(poes);
      })
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

}
