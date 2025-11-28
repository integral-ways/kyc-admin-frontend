import { Component, OnInit } from '@angular/core';
import { NafathSimulatorService, NafathUserProfile, PageResponse } from '../../services/nafath-simulator.service';

@Component({
  selector: 'app-nafath-simulator',
  templateUrl: './nafath-simulator.component.html',
  styleUrls: ['./nafath-simulator.component.scss']
})
export class NafathSimulatorComponent implements OnInit {
  profiles: NafathUserProfile[] = [];
  loading = false;
  showCreateModal = false;
  showEditModal = false;
  showViewModal = false;
  showStatusModal = false;
  selectedProfile: NafathUserProfile | null = null;

  // Pagination
  currentPage = 0;
  pageSize = 10;
  totalElements = 0;
  totalPages = 0;

  // Bulk generation
  bulkCount = 5;
  idType = 'NATIONAL_ID';

  // Status options
  statusOptions = ['WAITING', 'COMPLETED', 'REJECTED', 'EXPIRED', 'ERROR'];

  // Expose Math for template
  Math = Math;

  constructor(private simulatorService: NafathSimulatorService) {}

  ngOnInit(): void {
    this.loadProfiles();
  }

  loadProfiles(): void {
    this.loading = true;
    this.simulatorService.getAllProfiles(this.currentPage, this.pageSize).subscribe({
      next: (response: PageResponse<NafathUserProfile>) => {
        this.profiles = response.content;
        this.totalElements = response.totalElements;
        this.totalPages = response.totalPages;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        alert('Error loading profiles');
      }
    });
  }

  generateProfile(): void {
    this.loading = true;
    this.simulatorService.generateProfile(this.idType).subscribe({
      next: () => {
        this.loadProfiles();
        alert('Profile generated successfully');
      },
      error: () => {
        this.loading = false;
        alert('Error generating profile');
      }
    });
  }

  generateBulk(): void {
    if (this.bulkCount < 1 || this.bulkCount > 50) {
      alert('Bulk count must be between 1 and 50');
      return;
    }
    this.loading = true;
    this.simulatorService.generateBulkProfiles(this.bulkCount, this.idType).subscribe({
      next: () => {
        this.loadProfiles();
        alert(`${this.bulkCount} profiles generated successfully`);
      },
      error: () => {
        this.loading = false;
        alert('Error generating bulk profiles');
      }
    });
  }

  viewProfile(profile: NafathUserProfile): void {
    this.selectedProfile = { ...profile };
    this.showViewModal = true;
  }

  editProfile(profile: NafathUserProfile): void {
    this.selectedProfile = { ...profile };
    this.showEditModal = true;
  }

  saveProfile(): void {
    if (!this.selectedProfile) return;

    this.simulatorService.updateProfile(this.selectedProfile.nationalId, this.selectedProfile).subscribe({
      next: () => {
        this.closeEditModal();
        this.loadProfiles();
        alert('Profile updated successfully');
      },
      error: () => {
        alert('Error updating profile');
      }
    });
  }

  deleteProfile(profile: NafathUserProfile): void {
    if (confirm(`Are you sure you want to delete profile for ${profile.fullNameEn}?`)) {
      this.simulatorService.deleteProfile(profile.nationalId).subscribe({
        next: () => {
          this.loadProfiles();
          alert('Profile deleted successfully');
        },
        error: () => {
          alert('Error deleting profile');
        }
      });
    }
  }

  openStatusModal(profile: NafathUserProfile): void {
    this.selectedProfile = { ...profile };
    this.showStatusModal = true;
  }

  closeStatusModal(): void {
    this.showStatusModal = false;
    this.selectedProfile = null;
  }

  updateStatus(newStatus: string): void {
    if (!this.selectedProfile) return;

    const updatedProfile = { ...this.selectedProfile, status: newStatus as any };
    this.simulatorService.updateProfile(this.selectedProfile.nationalId, updatedProfile).subscribe({
      next: () => {
        this.closeStatusModal();
        this.loadProfiles();
      },
      error: () => {
        alert('Error updating profile status');
      }
    });
  }

  getStatusBadgeClass(status: string): string {
    switch (status) {
      case 'COMPLETED':
        return 'bg-success';
      case 'WAITING':
        return 'bg-warning';
      case 'REJECTED':
        return 'bg-danger';
      case 'EXPIRED':
        return 'bg-secondary';
      case 'ERROR':
        return 'bg-dark';
      default:
        return 'bg-secondary';
    }
  }

  getStatusIcon(status: string): string {
    switch (status) {
      case 'COMPLETED':
        return 'bi-check-circle-fill';
      case 'WAITING':
        return 'bi-clock-fill';
      case 'REJECTED':
        return 'bi-x-circle-fill';
      case 'EXPIRED':
        return 'bi-hourglass-bottom';
      case 'ERROR':
        return 'bi-exclamation-triangle-fill';
      default:
        return 'bi-question-circle';
    }
  }

  getStatusDescription(status: string): string {
    switch (status) {
      case 'WAITING':
        return 'The request is still waiting for the user to approve it on their Nafath app.';
      case 'COMPLETED':
        return 'The user has approved the request successfully; authentication / verification is done.';
      case 'REJECTED':
        return 'The user explicitly rejected the verification request.';
      case 'EXPIRED':
        return 'The request timed out / expired before user approval.';
      case 'ERROR':
        return 'Some error occurred in processing the request — possibly a system error, or invalid payload, or other failure.';
      default:
        return '';
    }
  }

  testAuth(profile: NafathUserProfile): void {
    this.simulatorService.simulateAuth(profile.nationalId).subscribe({
      next: (result) => {
        alert(`Authentication successful for ${result.fullNameEn}`);
      },
      error: () => {
        alert('Authentication failed');
      }
    });
  }

  closeViewModal(): void {
    this.showViewModal = false;
    this.selectedProfile = null;
  }

  closeEditModal(): void {
    this.showEditModal = false;
    this.selectedProfile = null;
  }

  goToPage(page: number): void {
    this.currentPage = page;
    this.loadProfiles();
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.loadProfiles();
    }
  }

  previousPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.loadProfiles();
    }
  }

  get pages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i);
  }
}
