import { Component, computed, effect, inject, input } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { DragulaModule } from 'ng2-dragula';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import {MatIconModule} from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { UpdateLogoStore } from '../../store/update-logo.store';
import { UpdateLogoService } from '../services/update-logo..service';

@Component({
  selector: 'upload-images',
  standalone: true,
  imports: [
    DragDropModule,
    CommonModule,
    MatIconModule,
    MatDialogModule
  ],
  templateUrl: './upload-images.component.html',
  styleUrl: './upload-images.component.scss'
})
export class UploadImagesComponent {
  readonly updateLogoStore = inject(UpdateLogoStore)
  readonly updateLogoService = inject(UpdateLogoService)

  IMAGES_UPLOADED: any[];
  firstTime: boolean
  logoWidth = 200;
  resourceData: any;
  uploadImagesBox: boolean;

  constructor(){
    this.IMAGES_UPLOADED = []
    this.firstTime = true;
    this.uploadImagesBox = false;
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.IMAGES_UPLOADED, event.previousIndex, event.currentIndex);
  }

  closeImageUploadBox(){
   
        
  }

  deleteImage(index: any) {
    this.IMAGES_UPLOADED.splice(index, 1)
  }

  onFileSelected(event: any) {
    if (event.target.files && event.target.files[0]) {
      let filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        let reader = new FileReader();
        let FileName = event.target.files[i].name
        let FileType = event.target.files[i].type
        reader.onload = (event: any) => {
          this.resourceData = {
            "ProjectName": localStorage.getItem('projectName'),
            "FileName": FileName.split(' ').join(''),
            "ItemType": 'logo-rate',
            "FileType": FileType,
            "FileContent": event.target.result
            // "FileContent" : event.target.result.split(event.target.result.split(",")[0] + ',').pop()
          }
          this.IMAGES_UPLOADED.push(this.resourceData);
        }
        reader.readAsDataURL(event.target.files[i]);
      }
    }
  }

  uploadAllImages() {

    if (this.firstTime) {this.firstTime = false}
    let slides = this.updateLogoStore.slidesData() ?? []

    if (slides.length > 0 && this.IMAGES_UPLOADED.length > slides.length) {
      this.IMAGES_UPLOADED.splice(slides.length + 1,this.IMAGES_UPLOADED.length+ 1 )
      // this.bmxItem.componentText.splice(this.IMAGES_UPLOADED.length + 1, this.bmxItem.componentText.length + 1)
    }
    this.IMAGES_UPLOADED.forEach((imageObject, index) => {
      imageObject['FileContent'] = imageObject['FileContent'].split(imageObject['FileContent'].split(",")[0] + ',').pop()
      this.updateLogoService.saveFileResources(JSON.stringify(imageObject)).subscribe({
        next: (response: any) => {

        },
        error: (err: any) => console.error(err)
      })
      // this.updateLogoService.saveFileResources(JSON.stringify(imageObject)).subscribe((result: any) => {
      //   this.IMAGES_UPLOADED.shift()
      //   if (index == 0) {
      //     this.bmxItem.componentText[index].nameCandidates = "LOGO"
      //   }
      //   if (this.bmxItem.componentText[index + 1]) {
      //     this.bmxItem.componentText[index + 1].nameCandidates = JSON.parse(result.d).FileUrl
      //   } else {
      //     this.bmxItem.componentText.push({ ...this.bmxItem.componentText[1], nameCandidates: JSON.parse(result.d).FileUrl })
      //     const lastItem = this.bmxItem.componentText[this.bmxItem.componentText.length - 1];
      //     for (const key in lastItem) {
      //       if (lastItem.hasOwnProperty(key)) {
      //         if(key != 'RATE'&& key != 'nameCandidates' && key!= 'STARS'){
      //           lastItem[key]=''
      //         }
      //       }
      //     }
      //   }

      // });
    });
    setTimeout(() => {
      this.uploadImagesBox = false;
    }, 1000);
  }

}
