import { Component, OnInit } from '@angular/core';
import { ApplicationService, KycApplication } from '../../services/application.service';

@Component({
  selector: 'app-application-list',
  templateUrl: './application-list.component.html',
  styleUrls: ['./application-list.component.scss']
})
export class ApplicationListComponent implements OnInit {
  applications: KycApplication[] = [];
  loading = true;
  currentPage = 0;
  totalPages = 0;
  pageSize = 10;
  selectedStatus = 'ALL';
  searchQuery = '';

  constructor(private applicationService: ApplicationService) {}

  ngOnInit(): void {
    this.loadApplications();
  }

  loadApplications(): void {
    this.loading = true;
    
    const request = this.selectedStatus === 'ALL'
      ? this.applicationService.getApplications(this.currentPage, this.pageSize)
      : this.applicationService.getApplicationsByStatus(this.selectedStatus, this.currentPage, this.pageSize);

    request.subscribe({
      next: (response) => {
        this.applications = response.content;
        this.totalPages = response.totalPages;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  onStatusFilterChange(): void {
    this.currentPage = 0;
    this.loadApplications();
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadApplications();
  }

  onSearch(query: string): void {
    this.searchQuery = query;
    this.currentPage = 0;
    if (query) {
      this.searchApplications();
    } else {
      this.loadApplications();
    }
  }

  searchApplications(): void {
    this.loading = true;
    // Simple client-side search for now
    this.applicationService.getApplications(0, 100).subscribe({
      next: (response) => {
        const filtered = response.content.filter(app => 
          app.fullName?.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          app.email?.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          app.mobileNumber?.includes(this.searchQuery) ||
          app.id?.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
        this.applications = filtered;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  exportData(): void {
    // Simple CSV export
    const csv = this.generateCSV();
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `applications_${new Date().toISOString()}.csv`;
    a.click();
  }

  generateCSV(): string {
    const headers = ['ID', 'Name', 'Email', 'Mobile', 'Type', 'Status', 'Progress', 'Created'];
    const rows = this.applications.map(app => [
      app.id,
      app.fullName,
      app.email,
      app.mobileNumber,
      app.entityType,
      app.applicationStatus,
      `${app.completionPercentage}%`,
      app.createdAt
    ]);
    
    return [headers, ...rows].map(row => row.join(',')).join('\n');
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

  getPendingCount(): number {
    return this.applications.filter(app => 
      app.applicationStatus === 'SUBMITTED' || app.applicationStatus === 'UNDER_REVIEW'
    ).length;
  }

  getApprovedCount(): number {
    return this.applications.filter(app => app.applicationStatus === 'APPROVED').length;
  }

  getRejectedCount(): number {
    return this.applications.filter(app => app.applicationStatus === 'REJECTED').length;
  }
}
