import { Component, effect, input, OnInit } from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import { Slide } from '../../models';
import { MatDialog } from '@angular/material/dialog';
import { UploadImagesComponent } from '../upload-images/upload-images.component';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    MatTableModule,
    MatIconModule,
    UploadImagesComponent
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent{
  displayedColumns: string[] = ['name','logo'];
  dataSource = new MatTableDataSource<Slide>();
  data = input.required<Slide[]>();

  constructor(public dialog: MatDialog){
    effect(() => {
      this.dataSource.data = this.data() 
    });       
  }

  toggleImageUploadBox(slide: Slide) {
    const dialogRef = this.dialog.open(UploadImagesComponent, {
      width: '600px',
      data: {
        slide: slide
      }
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('Las opciones seleccionadas son:', result);
    })
  }

 
}
