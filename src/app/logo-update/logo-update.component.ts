import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { fromEvent } from 'rxjs';
import { map } from 'rxjs/operators';
import { UpdateLogoStore } from '../../store/update-logo.store';
import { UpdateLogoService } from '../services/update-logo..service';
import { Slide } from '../../models';
import { TableComponent } from '../table/table.component';
import { UploadImagesComponent } from '../upload-images/upload-images.component';
import {MatIconModule} from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { RemoveUnderscorePipe } from '../pipes/remove-underscore.pipe';
import { SearchComponent } from '../shared/search/search.component';
import {MatTooltipModule, TooltipPosition} from '@angular/material/tooltip';
import { FormControl } from '@angular/forms';
@Component({
  selector: 'app-logo-update',
  standalone: true,
  imports: [
    TableComponent,
    MatIconModule,
    UploadImagesComponent,
    RemoveUnderscorePipe,
    SearchComponent,
    MatTooltipModule
  ],
  templateUrl: './logo-update.component.html',
  styleUrl: './logo-update.component.scss'
})
export class LogoUpdateComponent implements OnInit{
  readonly updateLogoStore = inject(UpdateLogoStore)
  readonly updateLogoService = inject(UpdateLogoService)

  projectName: string = '';
  uploadImagesBox: boolean;
  positionOptions: TooltipPosition[] = ['above'];
  position = new FormControl(this.positionOptions[0]);

  constructor(private activatedRoute: ActivatedRoute,public dialog: MatDialog) {
    this.uploadImagesBox = false;
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.projectName = params['id'];
      this.updateLogoStore.updateProjectName(this.projectName)
      this.initializeProject()
    });    
  }

  public initializeProject(): void {
    const projectName = this.updateLogoStore.projectName() ?? '';    
    this.updateLogoService.getProjectId(projectName).subscribe(
      {
        next: (response: any) => {           
          const projectId = response[0].PresentationId ?? '';
          this.updateLogoStore.updateProjectId(projectId)
          this.updateLogoService.getProjectData(projectId).subscribe(
            {
              next: (response: Slide[]) => {
                let newObj = response.filter((element: Slide) => {
                  return (element.SlideDescription !== '' && element.SlideType.toLowerCase() === 'nameevaluation');
                }).slice(1);
                newObj = newObj.map((obj: Slide) => {                 
                  let str = obj.SlideDescription;
                  let result = str.match(/^[^()]+/);
                  if (result) {
                    obj.SlideDescription = result[0].trim();
                  }
                  return obj; 
                });
                this.updateLogoStore.updateSlidesData(newObj);
              },
              error: (err: any) => console.error(err)
            }
          )
        },
        error: (err: any) => console.error(err)
      }
    );
  }

  toggleImageUploadBox() {
    const dialogRef = this.dialog.open(UploadImagesComponent, {
      width: '600px',
      data: {
        slide: null
      }
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('Las opciones seleccionadas son:', result);
    })
  }
}
