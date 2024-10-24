import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { UpdateLogoStore } from '../../store/update-logo.store';
import { environment } from '../../environments/environment.development';
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
  brandMatrixResourceUpload: string;
  get_projects: string;

  constructor(private http: HttpClient) {    
    this.brandMatrixResourceUpload = '/BrandMatrixResourceUpload';
    this.get_projects = '/projects'
  }  

  getAllProjects(){    
    return this.http.get(environment.awsBaseUrl+this.get_projects,httpOptions)
  }

  getProjectData(projectId: string) {
    const data = {
      token: environment.awsToken,
      app: 'NW',
      method: 'NW_NamesAndSlides',
      projectid: projectId
    }
    return this.http.post(environment.awsBaseUrl, JSON.stringify(data), httpOptions).pipe(
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
      token: environment.awsToken,
      app: 'NW',
      method: 'BiFormCreator',
      project: projectName
    }
    return this.http.post(environment.awsBaseUrl, JSON.stringify(data), httpOptions).pipe(
      map(
        (response: any) => {
          const data = JSON.parse(response);
          return data;
        }
      )
    )
  }

  saveFileResources(resourceData: any) {
    return this.http.post(environment.logosBaseUrl + this.brandMatrixResourceUpload, { token: '646EBF52-1846-47C2-9F62-DC50AE5BF692', payload: resourceData });
  }
}
