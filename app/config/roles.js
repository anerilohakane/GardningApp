// app/config/roles.js
export const ROLES = {
  CUSTOMER: 'customer',
  TENANT_ADMIN: 'tenantadmin',
  SUPER_ADMIN: 'superadmin',
};

// Hardcoded role (manually change this to test)
export const CURRENT_ROLE = ROLES.CUSTOMER; // Switch to SUPER_ADMIN or CUSTOM