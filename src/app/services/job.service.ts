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

@Injectable()
export class JobService {

  initialJobs = [];
  jobs = [];
  jobsSubject = new Subject();

  constructor(private http:Http) { }

  /**
   * Retreive jobs
   */
  getjobs(){
    /** 
     * Gérer les cas :
     * - On a à la fois des données de jobs.json + des données ajoutées par notre formulaire
     * - On a pas encore récupéré de données
     * - On a des jobs récupéré des jobs.json
     *    
     *  
     */
    if(this.jobs.length > 0 && this.initialJobs.length > 0) {
      return Observable.of([...this.jobs, ...this.initialJobs]);
    } else if(this.jobs.length > 0 && this.initialJobs.length === 0) {
      /**
       * Appel Http du fichiers jobs.json
       * La fonction map Observable permet de lister proprement les données de jobs.json
       */
      return this.http.get('data/jobs.json')
                .map(res => res.json())
                .do(data => {
                  this.initialJobs = data;
                  this.jobs = [...this.jobs, ...this.initialJobs]
                });
    } else {
      return this.http.get('data/jobs.json')
                .map(res => res.json())
                .do(data => this.initialJobs = data);
    }
  }

  /**
   * Add Job
   */
  addJob(jobData){
    jobData.id = Date.now();
    this.jobs = [jobData, ...this.jobs];
    return this.jobsSubject.next(jobData);
  }

}
