import { Component, input, OnInit } from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { Slide } from '../../models';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent implements OnInit {
  displayedColumns: string[] = ['name','logo'];
  dataSource = new MatTableDataSource<Slide>();
  data = input.required<Slide[]>();
  ngOnInit(): void {
    this.dataSource.data = this.data()    
  }
 
}
