import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class JobService {

  constructor(private http:Http) { }

  /**
   * Return the jobs
   */
  getjobs(){
    // Appel Http du fichiers jobs.json
    // La fonction map Observable permet de lister proprement les données de jobs.json
    return this.http.get('data/jobs.json')
        .map(res => res.json());
  }

}
