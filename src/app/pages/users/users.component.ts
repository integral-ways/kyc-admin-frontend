import { Component, OnInit } from '@angular/core';
import { UserService, AdminUser } from '../../services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users: AdminUser[] = [];
  loading = true;
  showCreateModal = false;

  newUser = {
    username: '',
    email: '',
    password: '',
    fullName: '',
    profileIds: [] as string[]
  };

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.loading = true;
    this.userService.getAllUsers().subscribe({
      next: (users) => {
        this.users = users;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  openCreateModal(): void {
    this.showCreateModal = true;
    this.resetForm();
  }

  closeCreateModal(): void {
    this.showCreateModal = false;
    this.resetForm();
  }

  createUser(): void {
    if (!this.newUser.username || !this.newUser.email || !this.newUser.password || !this.newUser.fullName) {
      alert('Please fill in all required fields');
      return;
    }

    this.userService.createUser(this.newUser).subscribe({
      next: () => {
        this.closeCreateModal();
        this.loadUsers();
      },
      error: (err) => {
        alert('Error creating user: ' + (err.error?.message || 'Unknown error'));
      }
    });
  }

  toggleUserStatus(user: AdminUser): void {
    const action = user.active 
      ? this.userService.deactivateUser(user.id)
      : this.userService.activateUser(user.id);

    action.subscribe({
      next: () => {
        this.loadUsers();
      },
      error: (err) => {
        alert('Error updating user status');
      }
    });
  }

  deleteUser(user: AdminUser): void {
    if (confirm(`Are you sure you want to delete user ${user.username}?`)) {
      this.userService.deleteUser(user.id).subscribe({
        next: () => {
          this.loadUsers();
        },
        error: (err) => {
          alert('Error deleting user');
        }
      });
    }
  }

  resetForm(): void {
    this.newUser = {
      username: '',
      email: '',
      password: '',
      fullName: '',
      profileIds: []
    };
  }
}
