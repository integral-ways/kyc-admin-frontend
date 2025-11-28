import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApplicationService, KycApplication } from '../../services/application.service';

@Component({
  selector: 'app-application-detail',
  templateUrl: './application-detail.component.html',
  styleUrls: ['./application-detail.component.scss']
})
export class ApplicationDetailComponent implements OnInit {
  application: KycApplication | null = null;
  loading = true;
  updating = false;
  reviewNotes = '';

  constructor(
    private route: ActivatedRoute,
    private applicationService: ApplicationService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadApplication(id);
    }
  }

  loadApplication(id: string): void {
    this.applicationService.getApplicationById(id).subscribe({
      next: (app) => {
        this.application = app;
        this.reviewNotes = app.reviewNotes || '';
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  updateStatus(status: string): void {
    if (!this.application) return;

    this.updating = true;
    this.applicationService.updateStatus(this.application.id, status, this.reviewNotes).subscribe({
      next: (app) => {
        this.application = app;
        this.updating = false;
        alert('Status updated successfully!');
      },
      error: (err) => {
        this.updating = false;
        alert('Error updating status: ' + (err.error?.message || 'Unknown error'));
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

  getStatusIcon(status: string): string {
    const icons: any = {
      'SUBMITTED': 'bi bi-send',
      'UNDER_REVIEW': 'bi bi-hourglass-split',
      'APPROVED': 'bi bi-check-circle-fill',
      'REJECTED': 'bi bi-x-circle-fill',
      'DRAFT': 'bi bi-pencil-square'
    };
    return icons[status] || 'bi bi-circle';
  }

  getInitials(fullName: string): string {
    if (!fullName) return '?';
    const names = fullName.split(' ');
    if (names.length >= 2) {
      return (names[0][0] + names[names.length - 1][0]).toUpperCase();
    }
    return fullName.substring(0, 2).toUpperCase();
  }
}
