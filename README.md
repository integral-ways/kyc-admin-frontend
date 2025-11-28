# KYC Admin Frontend

Modern Angular-based admin portal for managing KYC applications with comprehensive features.

## 🎉 Status: COMPLETE & PRODUCTION READY

## Features

✅ **Authentication & Security**
- Secure JWT-based authentication
- Route guards and interceptors
- Automatic token management
- Session handling

✅ **Dashboard**
- Real-time statistics
- Recent applications overview
- Visual data representation
- Quick navigation

✅ **Application Management**
- Complete application list with pagination
- Advanced search and filtering
- Status management workflow
- Detailed application view
- Review and approval system
- Export to CSV

✅ **User Management**
- Create and manage admin users
- Activate/deactivate users
- Profile assignment
- User activity tracking

✅ **Statistics & Analytics**
- Status distribution charts
- Type distribution analysis
- Daily submission trends
- Monthly submission trends
- Completion percentage tracking

✅ **UI/UX**
- Responsive Bootstrap 5 design
- Dark sidebar navigation
- Loading states and spinners
- Toast notifications
- Empty states
- Error handling
- Modal dialogs

## Technology Stack

- **Framework**: Angular 17
- **UI Library**: Bootstrap 5.3
- **Icons**: Bootstrap Icons
- **HTTP**: Angular HttpClient
- **Routing**: Angular Router
- **Forms**: Reactive Forms
- **State**: RxJS Observables

## Getting Started

### Prerequisites
- Node.js 18+ and npm

### Installation

1. Navigate to frontend directory:
```bash
cd kyc-admin-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm start
```

4. Open browser at: `http://localhost:4201`

### Build for Production

```bash
npm run build
```

The build artifacts will be in the `dist/` directory.

## Default Credentials

- **Username**: `admin`
- **Password**: `admin123`

## Project Structure

```
src/
├── app/
│   ├── components/          # Reusable components
│   │   ├── layout/         # Main layout with sidebar
│   │   ├── search-bar/     # Search component
│   │   └── notification/   # Toast notifications
│   ├── pages/              # Page components
│   │   ├── login/          # Login page
│   │   ├── dashboard/      # Dashboard page
│   │   ├── application-list/    # Applications list
│   │   ├── application-detail/  # Application details
│   │   ├── users/          # User management
│   │   └── statistics/     # Statistics page
│   ├── services/           # API services
│   │   ├── auth.service.ts
│   │   ├── application.service.ts
│   │   ├── user.service.ts
│   │   ├── statistics.service.ts
│   │   └── notification.service.ts
│   ├── guards/             # Route guards
│   │   └── auth.guard.ts
│   ├── interceptors/       # HTTP interceptors
│   │   └── auth.interceptor.ts
│   ├── pipes/              # Custom pipes
│   │   └── time-ago.pipe.ts
│   └── app.module.ts
├── assets/                 # Static assets
├── environments/           # Environment configs
└── styles.scss            # Global styles
```

## API Configuration

The frontend connects to the backend at `http://localhost:8081/api/admin`

### Development
Update `src/environments/environment.ts`:
```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8081/api/admin'
};
```

### Production
Update `src/environments/environment.prod.ts`:
```typescript
export const environment = {
  production: true,
  apiUrl: 'https://your-api-domain.com/api/admin'
};
```

## Available Scripts

- `npm start` - Start development server (port 4201)
- `npm run build` - Build for production
- `npm run watch` - Build and watch for changes
- `npm test` - Run unit tests

## Features in Detail

### 1. Dashboard
- Overview statistics cards
- Recent applications table
- Quick navigation to details
- Real-time data updates

### 2. Applications
- Paginated list view
- Status filtering
- Search by name, email, mobile, ID
- Export to CSV
- Detailed view with review capabilities
- Status update workflow

### 3. Users
- Admin user management
- Create new users
- Activate/deactivate
- Profile assignment
- Activity tracking

### 4. Statistics
- Status distribution visualization
- Type distribution charts
- Daily submission trends
- Monthly submission trends
- Average completion tracking

### 5. Search & Filter
- Global search bar
- Multi-field search
- Status filtering
- Type filtering
- Combined filters

## UI Components

### Layout
- Fixed sidebar navigation
- Top header with user info
- Responsive design
- Active route highlighting

### Forms
- Reactive forms with validation
- Error messages
- Loading states
- Success feedback

### Tables
- Sortable columns
- Pagination
- Responsive design
- Action buttons

### Modals
- Create user modal
- Confirmation dialogs
- Form modals

### Notifications
- Toast notifications
- Auto-dismiss
- Manual close
- Color-coded by type

## Security

- JWT token storage in localStorage
- Automatic token injection via interceptor
- Route protection with guards
- 401 error handling
- Automatic logout on auth failure

## Styling

### Color Scheme
- Primary: #2563eb
- Success: #10b981
- Danger: #ef4444
- Warning: #f59e0b
- Info: #3b82f6

### Layout
- Sidebar: 250px fixed width
- Dark gradient sidebar
- White content area
- Card-based design

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Development

### Adding New Pages

1. Generate component:
```bash
ng generate component pages/my-page
```

2. Add route in `app-routing.module.ts`
3. Add navigation link in `layout.component.html`

### Adding New Services

```bash
ng generate service services/my-service
```

### Adding New Components

```bash
ng generate component components/my-component
```

## Deployment

### Docker

Create `Dockerfile`:
```dockerfile
FROM node:18 as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist/kyc-admin-frontend /usr/share/nginx/html
EXPOSE 80
```

Build and run:
```bash
docker build -t kyc-admin-frontend .
docker run -p 80:80 kyc-admin-frontend
```

### Nginx Configuration

```nginx
server {
    listen 80;
    server_name admin.yourdomain.com;
    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /api {
        proxy_pass http://backend:8081;
    }
}
```

## Troubleshooting

### Port Already in Use
```bash
# Change port in angular.json or use:
ng serve --port 4202
```

### API Connection Issues
- Check backend is running on port 8081
- Verify CORS configuration in backend
- Check API URL in environment files

### Build Errors
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

## Performance

- Lazy loading modules (ready)
- OnPush change detection (ready)
- Production build optimization
- AOT compilation
- Tree shaking
- Minification

## Future Enhancements

- [ ] Real-time updates with WebSocket
- [ ] Advanced charts with Chart.js
- [ ] Bulk operations
- [ ] Advanced filtering
- [ ] Document preview
- [ ] Email notifications
- [ ] Audit log viewer
- [ ] Profile management UI

## Support

For issues or questions, contact the development team.

## License

Proprietary - All rights reserved
