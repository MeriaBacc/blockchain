import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseURL } from '../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class UploadService {
  SERVER_URL: string = baseURL+"api/file/";
  PROGRESS_URL : string = baseURL+"api/progress/";
  constructor(private httpClient: HttpClient) { }


  get_progress(progress_token:string){
    return this.httpClient.get(this.PROGRESS_URL+"?task_token="+progress_token);
  }


  upload(formData: FormData, token: string) {

    var headers = new HttpHeaders()
      .set("Authorization", "Token " + token);

    return this.httpClient.post<any>(this.SERVER_URL, formData, { headers: headers });
  }
  async new_upload(formData: FormData, token: string) {

    var headers = new HttpHeaders()
      .set("Authorization", "Token " + token);

    return await this.httpClient.post<any>(this.SERVER_URL, formData, { headers: headers }).toPromise();
  }
}
