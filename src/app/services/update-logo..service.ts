import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { UpdateLogoStore } from '../../store/update-logo.store';
import { map } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Authorization': 'Bearer your-token-here',
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})

export class UpdateLogoService {
  awsBaseUrl: string
  awsToken: string;
  brandMatrixResourceUpload: string;

  constructor(private http: HttpClient) {
    this.awsBaseUrl = "https://0hq9qn97gk.execute-api.us-east-1.amazonaws.com/prod-bitools01/tmx";
    this.awsToken = "38230499-A056-4498-80CF-D63D948AA57F";
    this.brandMatrixResourceUpload = '/BrandMatrixResourceUpload'
  }
  

  getProjectData(projectId: string) {
    const data = {
      token: '38230499-A056-4498-80CF-D63D948AA57F',
      app: 'NW',
      method: 'NW_NamesAndSlides',
      projectid: projectId
    }
    return this.http.post(this.awsBaseUrl, JSON.stringify(data), httpOptions).pipe(
      map(
        (response: any) => {
          const data = JSON.parse(response);
          return data;
        }
      )
    )
  }

  getProjectId(projectName: string) {
    const data = {
      token: this.awsToken,
      app: 'NW',
      method: 'BiFormCreator',
      project: projectName
    }
    return this.http.post(this.awsBaseUrl, JSON.stringify(data), httpOptions).pipe(
      map(
        (response: any) => {
          const data = JSON.parse(response);
          return data;
        }
      )
    )
  }

  saveFileResources(resourceData: any) {
    return this.http.post(this.awsBaseUrl + this.brandMatrixResourceUpload, { token: '646EBF52-1846-47C2-9F62-DC50AE5BF692', payload: resourceData });
  }
}
