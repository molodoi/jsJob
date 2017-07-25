import { Component, OnInit } from '@angular/core';
import { JobService } from '../services/job.service';

@Component({
  selector: 'ticme-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.css']
})
export class JobListComponent implements OnInit {

  jobs = [];
  error = '';

  constructor(private jobService: JobService ) { }

  /**
   * Init 
   */
  ngOnInit() { 
    /**
     * Hydrater la liste des jobs
     */   
    this.jobService.getjobs().subscribe(
      data => this.jobs = data,
      error => {
        console.error(error);
        this.error = error;
      }
    )
    /**
     * Ajouter notre job la liste des jobs au POST du formulaire
     */
    this.jobService.jobsSubject.subscribe(
      data => {
        this.jobs = [data, ...this.jobs];
      }
    );
  }

}
