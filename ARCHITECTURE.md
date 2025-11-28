# KYC Admin Frontend - Architecture

## Overview

The frontend connects to the simplified backend that reads directly from the `customers` table in the KYC database.

## Data Flow

```
┌─────────────────────────────────────────────────────────┐
│                    Frontend (Angular)                    │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  Components → Services → HTTP → Backend API              │
│                                                          │
└─────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│                  Backend (Spring Boot)                   │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  Read: customers table (KYC DB)                          │
│  Write: application_reviews table (Admin DB)             │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

## Key Changes

### Status & Type as Strings

The backend now returns status and onboardingType as strings instead of enums:

```typescript
export interface KycApplication {
  status: string;        // "SUBMITTED", "UNDER_REVIEW", etc.
  onboardingType: string; // "INDIVIDUAL", "ENTITY"
}
```

### Benefits

1. **Simpler Type System** - No need to maintain enum definitions in frontend
2. **Flexibility** - Easy to add new statuses without frontend changes
3. **Direct Mapping** - Matches database values exactly
4. **Less Code** - No enum conversion logic needed

## Components

### Dashboard
- Displays statistics from customers table
- Shows recent applications
- Real-time data updates

### Application List
- Lists all applications from customers table
- Filters by status (string comparison)
- Search and pagination
- Export to CSV

### Application Detail
- Shows customer data (read-only)
- Displays review notes and assignments
- Update review information
- Assign reviewers

### Users
- Manage admin users
- Create/activate/deactivate users
- Profile assignment

### Statistics
- Status distribution
- Type distribution
- Daily/monthly trends
- Completion tracking

## Services

### ApplicationService
```typescript
getApplications(page, size) → Page<KycApplication>
getApplicationById(id) → KycApplication
updateStatus(id, status, notes) → KycApplication
assignApplication(id, assignedTo) → KycApplication
```

### AuthService
```typescript
login(credentials) → LoginResponse
logout() → void
isAuthenticated() → boolean
```

### UserService
```typescript
getAllUsers() → AdminUser[]
createUser(request) → AdminUser
activateUser(id) → AdminUser
deactivateUser(id) → AdminUser
```

### StatisticsService
```typescript
getDashboardStats() → DashboardStats
getStatistics() → Statistics
```

## Status Values

The following status values are used (as strings):

- `DRAFT` - Initial state
- `SUBMITTED` - User submitted
- `UNDER_REVIEW` - Being reviewed
- `APPROVED` - Approved by admin
- `REJECTED` - Rejected by admin
- `PENDING_INFO` - Waiting for info

## Onboarding Types

- `INDIVIDUAL` - Individual customer
- `ENTITY` - Business/entity customer

## API Endpoints

All endpoints use string parameters for status:

```typescript
GET  /applications
GET  /applications/{id}
GET  /applications/status/{status}  // status as string
PUT  /applications/{id}/status?status=APPROVED&reviewNotes=...
PUT  /applications/{id}/assign?assignedTo=...
```

## Error Handling

- HTTP interceptor catches 401 errors
- Automatic logout on authentication failure
- User-friendly error messages
- Loading states for all operations

## State Management

- RxJS Observables for reactive data
- Local storage for JWT token
- BehaviorSubject for current user
- No global state management (simple app)

## Styling

- Bootstrap 5.3 for UI components
- Bootstrap Icons for icons
- Custom SCSS for theme
- Responsive design

## Summary

The frontend is simplified to work with string-based status and type values, making it:
- ✅ Easier to maintain
- ✅ More flexible
- ✅ Better aligned with backend
- ✅ Less type conversion overhead
