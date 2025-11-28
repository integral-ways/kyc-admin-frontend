import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApplicationService } from '../../services/application.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  stats = {
    total: 0,
    submitted: 0,
    underReview: 0,
    approved: 0,
    rejected: 0
  };

  recentApplications: any[] = [];
  loading = true;

  constructor(
    private applicationService: ApplicationService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    // Load dashboard stats
    this.http.get<any>('http://localhost:8081/api/admin/dashboard/stats').subscribe({
      next: (stats) => {
        this.stats = {
          total: stats.totalApplications,
          submitted: stats.submittedApplications,
          underReview: stats.underReviewApplications,
          approved: stats.approvedApplications,
          rejected: stats.rejectedApplications
        };
      }
    });

    // Load recent applications
    this.applicationService.getApplications(0, 5).subscribe({
      next: (response) => {
        this.recentApplications = response.content;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  getStatusBadgeClass(status: string): string {
    const classes: any = {
      'SUBMITTED': 'bg-info',
      'UNDER_REVIEW': 'bg-warning',
      'APPROVED': 'bg-success',
      'REJECTED': 'bg-danger',
      'DRAFT': 'bg-secondary'
    };
    return classes[status] || 'bg-secondary';
  }
}
