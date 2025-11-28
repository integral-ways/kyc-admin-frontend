# Changelog

## [1.0.0] - 2024-11-23

### Changed
- **Simplified Data Model**: Status and onboardingType are now strings instead of enums
- **Backend Integration**: Updated to work with simplified backend that reads from customers table
- **Type Definitions**: Updated KycApplication interface to use string types

### Added
- Architecture documentation
- Better error handling in status updates
- Success/error alerts for user actions

### Technical Details

#### Before
```typescript
status: ApplicationStatus; // enum
onboardingType: OnboardingType; // enum
```

#### After
```typescript
status: string; // "SUBMITTED", "UNDER_REVIEW", etc.
onboardingType: string; // "INDIVIDUAL", "ENTITY"
```

### Benefits
1. Simpler type system
2. No enum maintenance needed
3. Direct mapping to backend
4. More flexible for future changes

### Breaking Changes
None - API contract remains the same, only internal types changed

### Migration Notes
No migration needed - existing code works with string-based status values
