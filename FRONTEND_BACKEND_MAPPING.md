# Frontend-Backend Field Mapping

## Overview
The KYC Admin Frontend is correctly aligned with the backend Customer entity structure.

## Field Mappings

### KycApplication Interface (Frontend)
```typescript
export interface KycApplication {
  id: string;
  userId: string;
  mobileNumber: string;
  email: string;
  fullName: string;
  status: string;              // Maps to applicationStatus enum
  onboardingType: string;      // Maps to entityType enum
  currentStep: number;
  completionPercentage: number;
  assignedTo?: string;
  reviewNotes?: string;
  submittedAt?: string;        // Populated from createdAt when submitted
  reviewedAt?: string;
  createdAt: string;           // Primary timestamp
  updatedAt: string;
}
```

### Customer Entity (Backend)
```java
@Enumerated(EnumType.STRING)
private ApplicationStatus applicationStatus;  // → status

@Enumerated(EnumType.STRING)
private EntityType entityType;                // → onboardingType

private Instant createdAt;                    // → createdAt
```

### Helper Methods (Backend)
```java
public String getStatus() {
    return applicationStatus != null ? applicationStatus.name() : "DRAFT";
}

public String getOnboardingType() {
    return entityType != null ? entityType.name() : "INDIVIDUAL";
}

public Instant getSubmittedAt() {
    return currentStep >= 7 ? createdAt : null;
}
```

## Status Values

### Frontend Status Filter
```typescript
<option value="DRAFT">Draft</option>
<option value="SUBMITTED">Submitted</option>
<option value="UNDER_REVIEW">Under Review</option>
<option value="APPROVED">Approved</option>
<option value="REJECTED">Rejected</option>
```

### Backend ApplicationStatus Enum
```java
public enum ApplicationStatus {
    DRAFT,
    SUBMITTED,
    SENT,
    UNDER_REVIEW,
    APPROVED,
    REJECTED
}
```

## Onboarding Type Values

### Frontend Display
- Shows: `INDIVIDUAL` or `ENTITY`

### Backend EntityType Enum
```java
public enum EntityType {
    INDIVIDUAL,  // Default
    ENTITY
}
```

## Date Fields

### Frontend Usage
- **createdAt**: Primary timestamp, displayed in lists and details
- **submittedAt**: Only populated when application is submitted (currentStep >= 7)
- **reviewedAt**: Populated when admin reviews the application

### Backend Logic
- `createdAt` is set when customer registers
- `getSubmittedAt()` returns `createdAt` if application is submitted, otherwise `null`
- `reviewedAt` is stored in the admin database (ApplicationReview entity)

## API Response Example

```json
{
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "userId": "123e4567-e89b-12d3-a456-426614174000",
  "mobileNumber": "+966501234567",
  "email": null,
  "fullName": "Ahmed Mohammed Ali",
  "status": "SUBMITTED",
  "onboardingType": "INDIVIDUAL",
  "currentStep": 7,
  "completionPercentage": 100.0,
  "assignedTo": null,
  "reviewNotes": null,
  "submittedAt": "2024-01-15T10:30:00Z",
  "reviewedAt": null,
  "createdAt": "2024-01-15T10:30:00Z",
  "updatedAt": "2024-01-15T10:30:00Z"
}
```

## Summary

✅ **Frontend is correctly aligned with backend**
- Uses `status` (from `applicationStatus`)
- Uses `onboardingType` (from `entityType`)
- Uses `createdAt` as primary timestamp
- `submittedAt` is correctly populated from backend logic

No frontend changes are required - the interface and components are already using the correct field names!
