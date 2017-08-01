import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
/**
 * La Subjectclasse hérite des deux Observableet Observer, 
 * en ce sens, elle est à la fois observatrice et observable. 
 * Vous pouvez utiliser un sujet pour vous abonner à tous les observateurs, 
 * puis vous abonner le sujet à une source de données 
 */
import { Subject } from 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

import { AuthService } from '../services/auth.service';

@Injectable()
export class JobService {

  initialJobs = [];
  jobs = [];
  jobsSubject = new Subject();
  searchResultSubject = new Subject();

  BASE_URL = 'http://localhost:4201/'

  constructor(private http:Http) { }

  /**
   * Retreive jobs
   */
  getJobs(){
    /** 
     * Gérer les cas :
     * - On a à la fois des données de jobs.json + des données ajoutées par notre formulaire
     * - On a pas encore récupéré de données
     * - On a des jobs récupéré des jobs.json
     *    
     *  
 
    if(this.jobs.length > 0 && this.initialJobs.length > 0) {
      return Observable.of([...this.jobs, ...this.initialJobs]);
    } else if(this.jobs.length > 0 && this.initialJobs.length === 0) {
      /**
       * Appel Http du fichiers jobs.json
       * La fonction map Observable permet de lister proprement les données de jobs.json

      return this.http.get(this.BASE_URL + 'api/jobs')
                .map(res => res.json())
                .do(data => {
                  this.initialJobs = data;
                  this.jobs = [...this.jobs, ...this.initialJobs]
                });
    } else {
      return this.http.get(this.BASE_URL + 'api/jobs')
                .map(res => res.json())
                .do(data => this.initialJobs = data);
    }
              */
    return this.http.get(this.BASE_URL + 'api/jobs').map(res => res.json());
  }

  getJobsByUserEmail(userEmail) {
    // console.log('getJobsByUserEmail ', userEmail);
    return this.http.get(`${this.BASE_URL}api/jobs/${userEmail}`)
                    .map(res => res.json());
  }

  /**
   * Add Job
   */
  addJob(jobData){
    jobData.id = Date.now();
    /*
    this.jobs = [jobData, ...this.jobs];
    return this.jobsSubject.next(jobData);
    */
    jobData.id = Date.now();
    return this.http.post(this.BASE_URL + 'api/jobs', jobData)
              .map(res => {         
                console.log(res);       
                this.jobsSubject.next(jobData);
              });
  }

  getJob(id) {
    return this.http.get(this.BASE_URL + `api/jobs/${id}`)
                     .map(res => res.json())
              .do(res =>  this.searchResultSubject.next(res));
  }

  searchJobs(criteria) {
    console.log(criteria);
    return this.http.get(`${this.BASE_URL}api/search/${criteria.term}/${criteria.place}`)
              .map(res => res.json())
              .do(res =>  this.searchResultSubject.next(res));
  }  

}
