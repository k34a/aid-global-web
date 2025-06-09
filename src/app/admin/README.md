## Admin Dashboard

### User fields

- id
- name
- email
- password_hash
- role
- created_at

Whenever someone wants to access the admin dashboard, the superadmin will have to add the email address.
The user can then create their account (same email) using their full name and a password. These details will be securely stored in the DB
The authentication will be done based on JWT (which contains their 'id').
To authorize, get the user's role from the DB.

### User Roles

- Superadmin
- Admin
- Editor
- Read-Only
- Guest
