# Campaign Management Dashboard

This module provides comprehensive campaign management functionality for NGO administrators.

## Features

### 1. Campaign Listing
- View all campaigns in a data grid
- Sort and filter campaigns
- Double-click to edit campaigns
- Quick access to campaign details

### 2. Create New Campaign
- **URL**: `/admin/dashboard/campaigns/new`
- **Features**:
  - Basic campaign information (title, description, target amount, end date)
  - Auto-generated campaign slugs
  - Banner image upload with preview
  - Campaign products management
  - Product image uploads
  - Real-time validation

### 3. Edit Existing Campaign
- **URL**: `/admin/dashboard/campaigns/[slug]`
- **Features**:
  - Edit all campaign details
  - Update banner and product images
  - Add/remove/edit campaign products
  - View campaign analytics
  - Tabbed interface for better organization

### 4. Campaign Analytics
- **Key Metrics**:
  - Total raised amount with progress visualization
  - Total donors count
  - Average donation per donor
  - Days remaining until campaign end
- **Recent Donations**: Latest 5 donations with donor details
- **Products Summary**: Progress tracking for each campaign product

## API Endpoints

### Campaign Management
- `GET /api/admin/campaigns/[slug]` - Get campaign details
- `PUT /api/admin/campaigns/[slug]` - Update campaign
- `POST /api/admin/campaigns` - Create new campaign
- `GET /api/admin/campaigns/[slug]/analytics` - Get campaign analytics

### File Upload
- `POST /api/upload` - Upload images to Supabase storage

## Database Schema

### Campaigns Table
```sql
- id (UUID, Primary Key)
- title (Text)
- description (Text)
- slug (Text, Unique)
- amount (Numeric)
- ended_at (Timestamp, Nullable)
- banner_image (Text)
- collection (Numeric, Default: 0)
- backers (Integer, Default: 0)
- unallocated_amount (Numeric, Default: 0)
- created_at (Timestamp)
```

### Campaign Products Table
```sql
- id (UUID, Primary Key)
- campaign_id (UUID, Foreign Key)
- title (Text)
- description (Text)
- image (Text, Nullable)
- price_per_unit (Numeric)
- units_required (Integer)
- units_collected (Integer, Default: 0)
```

## Usage Instructions

### For NGO Administrators

1. **Login**: Use your admin credentials. For local development, refer to `.env.local` or use the seed script to create a test admin account.
2. **Navigate**: Go to `/admin/dashboard/campaigns`
3. **Create Campaign**: Click "Create New Campaign" button
4. **Edit Campaign**: Double-click on any campaign in the grid
5. **View Analytics**: Switch to "Analytics" tab in campaign edit page

### Key Workflows

#### Creating a New Campaign
1. Fill in basic information (title, description, target amount)
2. Upload banner image (optional)
3. Add campaign products (optional)
4. Set end date (optional)
5. Save campaign

#### Editing a Campaign
1. Update basic information
2. Change banner image if needed
3. Manage campaign products
4. View real-time analytics
5. Save changes

#### Managing Products
1. Add new products with title, description, price, and units required
2. Upload product images
3. Edit existing products
4. Remove products (if no donations received)

## Security Features

- JWT-based authentication for all admin endpoints
- File upload validation (images only, max 5MB)
- Input validation and sanitization
- Role-based access control (admin roles)

## Technical Implementation

### Frontend Components
- `CampaignCreateForm` - Form for creating new campaigns
- `CampaignEditForm` - Form for editing existing campaigns
- `CampaignAnalytics` - Analytics dashboard with charts
- `CampaignTabs` - Tabbed interface for campaign management
- `AllCampaignsGrid` - Data grid for campaign listing

### Backend Services
- Campaign CRUD operations
- Image upload to Supabase storage
- Analytics data aggregation
- Authentication middleware

## Future Enhancements

1. **Advanced Analytics**: More detailed charts and insights
2. **Bulk Operations**: Import/export campaigns
3. **Campaign Templates**: Pre-built campaign structures
4. **Email Notifications**: Automated updates to donors
5. **Social Media Integration**: Direct sharing capabilities
6. **Mobile App**: Native mobile admin interface

## Troubleshooting

### Common Issues

1. **Image Upload Fails**: Check file size (max 5MB) and format (images only)
2. **Campaign Not Saving**: Verify all required fields are filled
3. **Analytics Not Loading**: Check database connectivity
4. **Authentication Errors**: Ensure valid JWT token

### Error Handling

- All API endpoints return appropriate HTTP status codes
- Frontend displays user-friendly error messages
- Console logging for debugging
- Toast notifications for user feedback 