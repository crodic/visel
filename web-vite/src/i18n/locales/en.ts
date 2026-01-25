export default {
  // Config
  'config.version': 'version: {{version}}',
  'config.language_vietnamese': 'Vietnamese',
  'config.language_english': 'English',

  // Navigation
  'navigation_group_general.system': 'System',
  'navigation_group_general.system_dashboard': 'Dashboard',
  'navigation_group_general.system_audit_logs': 'Logs',
  'navigation_group_general.system_admins': 'Admins',
  'navigation_group_general.system_users': 'Users',
  'navigation_group_general.system_roles': 'Roles',
  'navigation_group_general.system_settings': 'Settings',
  'navigation_group_utility.system': 'Utility',
  'navigation_group_utility.system_pages': 'Pages',

  'navigation_user.account': 'Account',
  'navigation_user.logout': 'Logout',
  'navigation_user.notifications': 'Notifications',

  // Validation
  'validation.required': 'The {{field}} is required',
  'validation.email': 'The {{field}} must be a valid email',
  'validation.min': 'The {{field}} must be at least {{min}} characters',
  'validation.max': 'The {{field}} must be at most {{max}} characters',
  'validation.file_size': 'The {{field}} must be less than {{max}} MB',
  'validation.file_type': 'The {{field}} must be a file of type {{type}}',

  // Page Dashboard
  'page_dashboard.title': 'Dashboard',

  // Page Logs Overview
  'page_log_overview.title': 'Logs',
  'page_log_overview.description': 'View logs.',
  'page_log_overview.empty': 'No logs found.',
  'page_log_overview.table_columns_actor': 'Actor',
  'page_log_overview.table_columns_action': 'Action',
  'page_log_overview.table_columns_entity': 'Entity',
  'page_log_overview.table_columns_resource_id': 'Resource ID',
  'page_log_overview.table_columns_timestamp': 'Timestamp',

  // Page Log Detail
  'page_log_detail.title': 'Log Detail',
  'page_log_detail.description': 'View log detail.',
  'page_log_detail.card_title': 'Log Information',
  'page_log_detail.id': 'ID',
  'page_log_detail.action': 'Action',
  'page_log_detail.role': 'Role',
  'page_log_detail.entity': 'Entity',
  'page_log_detail.timestamp': 'Timestamp',
  'page_log_detail.actor': 'Actor',
  'page_log_detail.before': 'Before',
  'page_log_detail.after': 'After',
  'page_log_detail.button_back': 'Back',

  // Page Admin Overview
  'page_admin_overview.title': 'Admins',
  'page_admin_overview.description': 'View admins.',
  'page_admin_overview.empty': 'No admins found.',
  'page_admin_overview.table_columns_full_name': 'Full Name',
  'page_admin_overview.table_columns_email': 'Email',
  'page_admin_overview.table_columns_role': 'Role',
  'page_admin_overview.table_columns_created_at': 'Created At',
  'page_admin_overview.table_columns_actions': 'Actions',
  'page_admin_overview.button_create': 'Create',
  'page_admin_overview.input_email_placeholder': 'Search by email...',
  'page_admin_overview.popup_delete_title': 'Are you sure delete this?',
  'page_admin_overview.popup_delete_description':
    "You won't be able to revert this!",
  'page_admin_overview.popup_delete_confirm': 'Yes, delete it!',
  'page_admin_overview.popup_delete_cancel': 'Cancel',

  // Page Admin Detail
  'page_admin_detail.title': 'Admin Detail',
  'page_admin_detail.description': 'View admin detail.',
  'page_admin_detail.card_title': 'Admin Information',
  'page_admin_detail.id': 'ID',
  'page_admin_detail.phone_number': 'Phone Number',
  'page_admin_detail.first_name': 'First Name',
  'page_admin_detail.last_name': 'Last Name',
  'page_admin_detail.full_name': 'Full Name',
  'page_admin_detail.email': 'Email',
  'page_admin_detail.role': 'Role',
  'page_admin_detail.avatar': 'Avatar',
  'page_admin_detail.last_login_at': 'Last Login At',
  'page_admin_detail.email_verified': 'Email Verified',
  'page_admin_detail.active': 'Active',
  'page_admin_detail.inactive': 'Inactive',
  'page_admin_detail.ip_address': 'IP Address',
  'page_admin_detail.created_at': 'Created At',
  'page_admin_detail.updated_at': 'Updated At',
  'page_admin_detail.button_edit': 'Edit',
  'page_admin_detail.button_delete': 'Delete',
  'page_admin_detail.button_back': 'Back',

  // Page Admin Create
  'page_admin_create.title': 'Create Admin',
  'page_admin_create.description': 'Create a new admin.',
  'page_admin_create.create_email': 'Email',
  'page_admin_create.create_first_name': 'First Name',
  'page_admin_create.create_last_name': 'Last Name',
  'page_admin_create.create_role': 'Role',
  'page_admin_create.create_role_placeholder': 'Select a role',
  'page_admin_create.create_phone_number': 'Phone Number',
  'page_admin_create.create_phone_number_placeholder': 'Enter phone number',
  'page_admin_create.create_password': 'Password',
  'page_admin_create.create_password_confirmation': 'Confirmation Password',
  'page_admin_create.button_cancel': 'Cancel',
  'page_admin_create.button_save': 'Save',
  'page_admin_create.error_email_required': 'Email is required.',
  'page_admin_create.error_role_required': 'Role is required.',
  'page_admin_create.error_password_required': 'Password is required.',
  'page_admin_create.error_password_min':
    'Password must be at least 8 characters.',
  'page_admin_create.error_password_max':
    'Password must be less than 255 characters.',
  'page_admin_create.error_password_uppercase':
    'Password must contain at least one uppercase letter.',
  'page_admin_create.error_password_lowercase':
    'Password must contain at least one lowercase letter.',
  'page_admin_create.error_password_number':
    'Password must contain at least one number.',
  'page_admin_create.error_password_special':
    'Password must contain at least one special character.',
  'page_admin_create.error_password_confirmation':
    'Password confirmation is required.',
  'page_admin_create.validation_password_not_match': 'Password do not match.',
  'page_admin_create.error_password_confirmation_required':
    'Password confirmation is required.',
  'page_admin_create.error_password_mismatch':
    'Password and confirmation password do not match.',
  'page_admin_create.create_success': 'Admin created successfully.',

  // Page Admin Edit
  'page_admin_edit.title': 'Edit Admin',
  'page_admin_edit.description': 'Edit admin.',
  'page_admin_edit.edit_first_name': 'First Name',
  'page_admin_edit.edit_last_name': 'Last Name',
  'page_admin_edit.edit_role': 'Role',
  'page_admin_edit.edit_role_placeholder': 'Select a role',
  'page_admin_edit.edit_phone_number': 'Phone Number',
  'page_admin_edit.edit_phone_number_placeholder': 'Enter phone number',
  'page_admin_edit.button_cancel': 'Cancel',
  'page_admin_edit.button_save': 'Save',

  // Page Role Overview
  'page_role_overview.title': 'Roles',
  'page_role_overview.description': 'View roles.',
  'page_role_overview.empty': 'No roles found.',
  'page_role_overview.table_columns_name': 'Name',
  'page_role_overview.table_columns_permissions': 'Permissions',
  'page_role_overview.table_columns_actions': 'Actions',
  'page_role_overview.button_create': 'Create',
  'page_role_overview.input_name_placeholder': 'Search by name...',
  'page_role_overview.popup_delete_title': 'Are you sure delete this?',
  'page_role_overview.popup_delete_description':
    "You won't be able to revert this!",
  'page_role_overview.popup_delete_confirm': 'Yes, delete it!',
  'page_role_overview.popup_delete_cancel': 'Cancel',

  // Page Role Create
  'page_role_create.title': 'Create Role',
  'page_role_create.description': 'Create a new role.',
  'page_role_create.create_name': 'Name',
  'page_role_create.create_permissions': 'Permissions',
  'page_role_create.button_cancel': 'Cancel',
  'page_role_create.button_save': 'Save',
  'page_role_create.create_success': 'Role created successfully.',

  // Page Role Edit
  'page_role_edit.title': 'Edit Role',
  'page_role_edit.description': 'Edit role.',
  'page_role_edit.edit_name': 'Name',
  'page_role_edit.edit_permissions': 'Permissions',
  'page_role_edit.button_cancel': 'Cancel',
  'page_role_edit.button_save': 'Save',
  'page_role_edit.edit_success': 'Role updated successfully.',

  // Page Role Detail
  'page_role_detail.title': 'Role Detail',
  'page_role_detail.description': 'Description',
  'page_role_detail.card_title': 'Role Information',
  'page_role_detail.id': 'ID',
  'page_role_detail.name': 'Role Name',
  'page_role_detail.permissions': 'Permissions',
  'page_role_detail.created_at': 'Created At',
  'page_role_detail.updated_at': 'Updated At',
  'page_role_detail.popup_delete_title': 'Are you sure delete this?',
  'page_role_detail.popup_delete_description':
    "You won't be able to revert this!",
  'page_role_detail.popup_delete_confirm': 'Yes, delete it!',
  'page_role_detail.popup_delete_cancel': 'Cancel',
  'page_role_detail.edit_success': 'Role updated successfully.',
  'page_role_detail.delete_success': 'Role deleted successfully.',
  'page_role_detail.button_back': 'Back',
  'page_role_detail.button_edit': 'Edit',
  'page_role_detail.button_delete': 'Delete',

  // Page Profile Account
  'page_profile_account.title': 'Account',
  'page_profile_account.description': 'Manage your account.',
  'page_profile_account.section_profile': 'Profile',
  'page_profile_account.edit_first_name': 'First Name',
  'page_profile_account.edit_last_name': 'Last Name',
  'page_profile_account.edit_phone_number': 'Phone Number',
  'page_profile_account.edit_phone_number_placeholder': 'Enter phone number',
  'page_profile_account.section_password': 'Password',
  'page_profile_account.edit_current_password': 'Current Password',
  'page_profile_account.edit_new_password': 'New Password',
  'page_profile_account.edit_password_confirmation': 'Confirmation Password',
  'page_profile_account.button_save_profile': 'Save',
  'page_profile_account.button_save_password': 'Save',
  'page_profile_account.edit_success': 'Account updated successfully.',
  'page_profile_account.password_success': 'Password updated successfully.',
  'page_profile_account.error_current_password':
    'Current password is required.',
  'page_profile_account.error_new_password': 'New password is required.',
  'page_profile_account.error_password_confirmation':
    'Password confirmation is required.',
  'page_profile_account.error_password_mismatch':
    'New password and confirmation password do not match.',
  'page_profile_account.error_password_not_match':
    'Current password is not match.',
  'page_profile_account.error_password_min':
    'Password must be at least {{min}} characters.',
  'page_profile_account.error_password_max':
    'Password must be less than {{max}} characters.',
  'page_profile_account.error_password_uppercase':
    'Password must contain at least one uppercase letter.',
  'page_profile_account.error_password_lowercase':
    'Password must contain at least one lowercase letter.',
  'page_profile_account.error_password_number':
    'Password must contain at least one number.',
  'page_profile_account.error_password_special':
    'Password must contain at least one special character.',
  'page_profile_account.error_upload_avatar': 'Please upload a avatar image.',

  // Page Login
  'page_login.title': 'Welcome Back',
  'page_login.description': 'Login to your Honkai Portal account.',
  'page_login.login_email': 'Email',
  'page_login.login_password': 'Password',
  'page_login.button_login': 'Login',
  'page_login.button_forgot_password': 'Forgot Password?',
  'page_login.login_success': 'Login successfully.',
  'page_login.message': "Don't have an account? {{link}}",
  'page_login.terms':
    'By continuing, you agree to the Terms of Service and Privacy Policy.',

  // Page Forgot Password
  'page_forgot_password.title': 'Forgot Password',
  'page_forgot_password.description': 'Reset your password.',
  'page_forgot_password.forgot_email': 'Email',
  'page_forgot_password.button_send': 'Send',
  'page_forgot_password.forgot_success': 'Email sent successfully.',
  'page_forgot_password.message': "Don't have an account? {{link}}",
  'page_forgot_password.description_email':
    'Enter your email address and we will send you a link to reset your password.',
  'page_forgot_password.button_back': 'Back',

  // Page Reset Password
  'page_reset_password.title': 'Reset Password',
  'page_reset_password.description': 'Reset your password.',
  'page_reset_password.reset_password': 'Password',
  'page_reset_password.reset_password_placeholder': 'Enter new password',
  'page_reset_password.reset_password_confirmation': 'Password Confirmation',
  'page_reset_password.reset_password_confirmation_placeholder':
    'Enter password confirmation',
  'page_reset_password.button_reset': 'Reset',
  'page_reset_password.reset_success': 'Password reset successfully.',
  'page_reset_password.button_back': 'Back',

  // Page Setting
  'page_settings.title': 'Settings',

  // Page User Overview
  'page_user_overview.title': 'Users',
  'page_user_overview.button_create': 'Create',

  // Page User Detail
  'page_user_detail.title': 'User Detail',
  'page_user_detail.description': 'View user detail.',
  'page_user_detail.card_title': 'User Information',
  'page_user_detail.id': 'ID',
  'page_user_detail.phone_number': 'Phone Number',
  'page_user_detail.first_name': 'First Name',
  'page_user_detail.last_name': 'Last Name',
  'page_user_detail.full_name': 'Full Name',
  'page_user_detail.email': 'Email',
  'page_user_detail.avatar': 'Avatar',
  'page_user_detail.last_login_at': 'Last Login At',
  'page_user_detail.email_verified': 'Email Verified',
  'page_user_detail.active': 'Active',
  'page_user_detail.inactive': 'Inactive',
  'page_user_detail.ip_address': 'IP Address',
  'page_user_detail.created_at': 'Created At',
  'page_user_detail.updated_at': 'Updated At',
  'page_user_detail.button_edit': 'Edit',
  'page_user_detail.button_delete': 'Delete',
  'page_user_detail.button_back': 'Back',

  // Page User Create
  'page_user_create.title': 'Create user',
  'page_user_create.description': 'Create a new user.',
  'page_user_create.create_email': 'Email',
  'page_user_create.create_first_name': 'First Name',
  'page_user_create.create_last_name': 'Last Name',
  'page_user_create.create_role': 'Role',
  'page_user_create.create_role_placeholder': 'Select a role',
  'page_user_create.create_phone_number': 'Phone Number',
  'page_user_create.create_phone_number_placeholder': 'Enter phone number',
  'page_user_create.create_password': 'Password',
  'page_user_create.create_password_confirmation': 'Confirmation Password',
  'page_user_create.button_cancel': 'Cancel',
  'page_user_create.button_save': 'Save',
  'page_user_create.error_email_required': 'Email is required.',
  'page_user_create.error_role_required': 'Role is required.',
  'page_user_create.error_password_required': 'Password is required.',
  'page_user_create.error_password_min':
    'Password must be at least 8 characters.',
  'page_user_create.error_password_max':
    'Password must be less than 255 characters.',
  'page_user_create.error_password_uppercase':
    'Password must contain at least one uppercase letter.',
  'page_user_create.error_password_lowercase':
    'Password must contain at least one lowercase letter.',
  'page_user_create.error_password_number':
    'Password must contain at least one number.',
  'page_user_create.error_password_special':
    'Password must contain at least one special character.',
  'page_user_create.error_password_confirmation':
    'Password confirmation is required.',
  'page_user_create.validation_password_not_match': 'Password do not match.',
  'page_user_create.error_password_confirmation_required':
    'Password confirmation is required.',
  'page_user_create.error_password_mismatch':
    'Password and confirmation password do not match.',
  'page_user_create.create_success': 'USer created successfully.',

  // Page User Edit
  'page_user_edit.title': 'Edit user',
  'page_user_edit.description': 'Edit user.',
  'page_user_edit.edit_first_name': 'First Name',
  'page_user_edit.edit_last_name': 'Last Name',
  'page_user_edit.edit_phone_number': 'Phone Number',
  'page_user_edit.edit_phone_number_placeholder': 'Enter phone number',
  'page_user_edit.button_cancel': 'Cancel',
  'page_user_edit.button_save': 'Save',

  // Page Overview
  'page_overview.title': 'Pages',
  'page_overview.table_columns_slug': 'Slug',
  'page_overview.table_columns_status': 'Status',
  'page_overview.table_columns_created_at': 'Created At',
  'page_overview.table_columns_actions': 'Actions',
  'page_overview.table_columns_title': 'Title',
  'page_overview.table_columns_screen': 'Screen',
  'page_overview.table_columns_position': 'Position',
  'page_overview.popup_delete_title': 'Are you sure delete this?',
  'page_overview.popup_delete_description': "You won't be able to revert this!",
  'page_overview.popup_delete_confirm': 'Yes, delete it!',
  'page_overview.popup_delete_cancel': 'Cancel',
  'page_overview.button_create': 'Create',
  'page_overview.button_drag_mode': 'Drag Mode',
  'page_overview.button_back': 'Back',

  // Page Create
  'page_create.title': 'Create Page',
  'page_create.button_cancel': 'Cancel',
  'page_create.button_save': 'Save',
  'page_create.create_status': 'Status',
  'page_create.create_screen': 'Screen',
  'page_create.create_position': 'Position',
  'page_create.create_order': 'Order',
  'page_create.create_slug': 'Slug',

  // Page Detail
  'page_detail.card_title': 'Page Detail',
  'page_detail.status': 'Status',
  'page_detail.screen': 'Screen',
  'page_detail.position': 'Position',
  'page_detail.slug': 'Slug',
  'page_detail.created_at': 'Created At',
  'page_detail.updated_at': 'Updated At',
  'page_detail.title': 'Page Detail',
  'page_detail.button_back': 'Back',
  'page_detail.button_edit': 'Edit',
  'page_detail.button_delete': 'Delete',
  'page_detail.order': 'Page Order',

  // Page Edit
  'page_edit.title': 'Edit Page',

  // Button
  'button.delete': 'Delete',
  'button.create': 'Create',
  'button.edit': 'Edit',
  'button.back': 'Back',
  'button.save': 'Save',
  'button.cancel': 'Cancel',
  'button.duplicate': 'Duplicate',

  // Form
  'form.not_available': 'Not available',
}
