export default {
  // Config
  'config.version': 'Phiên bản: {{version}}',
  'config.language_vietnamese': 'Tiếng Việt',
  'config.language_english': 'Tiếng Anh',

  // Navigation
  'navigation_group_general.system': 'Hệ thống',
  'navigation_group_general.system_dashboard': 'Bảng điều khiển',
  'navigation_group_general.system_audit_logs': 'Nhật ký hệ thống',
  'navigation_group_general.system_admins': 'Quản trị viên',
  'navigation_group_general.system_users': 'Người dùng',
  'navigation_group_general.system_roles': 'Vai trò',
  'navigation_group_general.system_settings': 'Cài đặt',

  'navigation_user.account': 'Tài khoản',
  'navigation_user.logout': 'Đăng xuất',
  'navigation_user.notifications': 'Thông báo',

  // Validation
  'validation.required': '{{field}} là bắt buộc',
  'validation.email': '{{field}} phải là một địa chỉ email hợp lệ',
  'validation.min': '{{field}} phải có ít nhất {{min}} ký tự',
  'validation.max': '{{field}} phải có nhiều nhất {{max}} ký tự',
  'validation.file_size': '{{field}} phải nhỏ hơn {{max}} MB',
  'validation.file_type': '{{field}} phải thuộc loại tệp {{type}}',

  // Page Dashboard
  'page_dashboard.title': 'Bảng Điều Khiển',

  // Page Logs Overview
  'page_log_overview.title': 'Nhật ký hệ thống',
  'page_log_overview.description': 'Xem nhật ký hệ thống.',
  'page_log_overview.empty': 'Không tìm thấy nhật ký nào.',
  'page_log_overview.table_columns_actor': 'Người thực hiện',
  'page_log_overview.table_columns_action': 'Hành động',
  'page_log_overview.table_columns_entity': 'Loại tài nguyên',
  'page_log_overview.table_columns_resource_id': 'ID tài nguyên',
  'page_log_overview.table_columns_timestamp': 'Thời gian',

  // Page Log Detail
  'page_log_detail.title': 'Chi tiết nhật ký',
  'page_log_detail.description': 'Xem chi tiết nhật ký.',
  'page_log_detail.card_title': 'Thông tin nhật ký',
  'page_log_detail.id': 'ID',
  'page_log_detail.action': 'Hành động',
  'page_log_detail.entity': 'Loại tài nguyên',
  'page_log_detail.role': 'Vai trò',
  'page_log_detail.timestamp': 'Thời gian',
  'page_log_detail.actor': 'Người thực hiện',
  'page_log_detail.before': 'Trước',
  'page_log_detail.after': 'Sau',
  'page_log_detail.button_back': 'Quay lại',

  // Page Admin Overview
  'page_admin_overview.title': 'Quản trị viên',
  'page_admin_overview.description': 'Xem danh sách quản trị viên.',
  'page_admin_overview.empty': 'Không tìm thấy quản trị viên nào.',
  'page_admin_overview.table_columns_full_name': 'Họ tên',
  'page_admin_overview.table_columns_email': 'Email',
  'page_admin_overview.table_columns_role': 'Vai trò',
  'page_admin_overview.table_columns_created_at': 'Ngày tạo',
  'page_admin_overview.table_columns_actions': 'Hành động',
  'page_admin_overview.button_create': 'Tạo mới',
  'page_admin_overview.input_email_placeholder': 'Tìm kiếm theo email...',
  'page_admin_overview.popup_delete_title': 'Bạn chắc chắn muốn xóa?',
  'page_admin_overview.popup_delete_description':
    'Bạn sẽ không thể hoàn tác hành động này!',
  'page_admin_overview.popup_delete_confirm': 'Đúng, xóa đi!',
  'page_admin_overview.popup_delete_cancel': 'Hủy',

  // Page Admin Detail
  'page_admin_detail.title': 'Chi tiết quản trị viên',
  'page_admin_detail.description': 'Xem chi tiết quản trị viên.',
  'page_admin_detail.card_title': 'Thông tin quản trị viên',
  'page_admin_detail.id': 'ID',
  'page_admin_detail.phone_number': 'Số điện thoại',
  'page_admin_detail.first_name': 'Tên',
  'page_admin_detail.last_name': 'Họ',
  'page_admin_detail.full_name': 'Họ tên',
  'page_admin_detail.email': 'Email',
  'page_admin_detail.role': 'Vai trò',
  'page_admin_detail.avatar': 'Ảnh đại diện',
  'page_admin_detail.last_login_at': 'Lần đăng nhập cuối',
  'page_admin_detail.ip_address': 'Địa chỉ IP',
  'page_admin_detail.created_at': 'Ngày tạo',
  'page_admin_detail.updated_at': 'Ngày cập nhật',
  'page_admin_detail.button_edit': 'Chỉnh sửa',
  'page_admin_detail.button_delete': 'Xóa',
  'page_admin_detail.button_back': 'Quay lại',

  // Page Admin Create
  'page_admin_create.title': 'Tạo quản trị viên',
  'page_admin_create.description': 'Tạo mới một quản trị viên.',
  'page_admin_create.create_email': 'Email',
  'page_admin_create.create_first_name': 'Tên',
  'page_admin_create.create_last_name': 'Họ',
  'page_admin_create.create_role': 'Vai trò',
  'page_admin_create.create_role_placeholder': 'Chọn vai trò',
  'page_admin_create.create_phone_number': 'Số điện thoại',
  'page_admin_create.create_phone_number_placeholder': 'Nhập số điện thoại',
  'page_admin_create.create_password': 'Mật khẩu',
  'page_admin_create.create_password_confirmation': 'Xác nhận mật khẩu',
  'page_admin_create.button_cancel': 'Hủy',
  'page_admin_create.button_save': 'Lưu',
  'page_admin_create.error_email_required': 'Email là bắt buộc.',
  'page_admin_create.error_role_required': 'Vai trò là bắt buộc.',
  'page_admin_create.error_password_required': 'Mật khẩu là bắt buộc.',
  'page_admin_create.error_password_min': 'Mật khẩu phải có ít nhất 8 ký tự.',
  'page_admin_create.error_password_max': 'Mật khẩu phải dưới 255 ký tự.',
  'page_admin_create.error_password_uppercase':
    'Mật khẩu phải có ít nhất một chữ cái in hoa.',
  'page_admin_create.error_password_lowercase':
    'Mật khẩu phải có ít nhất một chữ cái thường.',
  'page_admin_create.error_password_number':
    'Mật khẩu phải có ít nhất một chữ số.',
  'page_admin_create.error_password_special':
    'Mật khẩu phải có ít nhất một ký tự đặc biệt.',
  'page_admin_create.error_password_confirmation':
    'Xác nhận mật khẩu là bắt buộc.',
  'page_admin_create.validation_password_not_match': 'Mật khẩu không khớp.',
  'page_admin_create.error_password_confirmation_required':
    'Xác nhận mật khẩu là bắt buộc.',
  'page_admin_create.error_password_mismatch':
    'Mật khẩu và xác nhận mật khẩu không khớp.',
  'page_admin_create.create_success': 'Tạo quản trị viên thành công.',

  // Page Admin Edit
  'page_admin_edit.title': 'Chỉnh sửa quản trị viên',
  'page_admin_edit.description': 'Chỉnh sửa thông tin quản trị viên.',
  'page_admin_edit.edit_first_name': 'Tên',
  'page_admin_edit.edit_last_name': 'Họ',
  'page_admin_edit.edit_role': 'Vai trò',
  'page_admin_edit.edit_role_placeholder': 'Chọn vai trò',
  'page_admin_edit.edit_phone_number': 'Số điện thoại',
  'page_admin_edit.edit_phone_number_placeholder': 'Nhập số điện thoại',
  'page_admin_edit.button_cancel': 'Hủy',
  'page_admin_edit.button_save': 'Lưu',

  // Page Role Overview
  'page_role_overview.title': 'Vai trò',
  'page_role_overview.description': 'Xem danh sách vai trò.',
  'page_role_overview.empty': 'Không tìm thấy vai trò nào.',
  'page_role_overview.table_columns_name': 'Tên',
  'page_role_overview.table_columns_permissions': 'Quyền',
  'page_role_overview.table_columns_actions': 'Hành động',
  'page_role_overview.button_create': 'Tạo mới',
  'page_role_overview.input_name_placeholder': 'Tìm kiếm theo tên...',
  'page_role_overview.popup_delete_title': 'Bạn chắc chắn muốn xóa?',
  'page_role_overview.popup_delete_description':
    'Bạn sẽ không thể hoàn tác hành động này!',
  'page_role_overview.popup_delete_confirm': 'Đúng, xóa đi!',
  'page_role_overview.popup_delete_cancel': 'Hủy',

  // Page Role Create
  'page_role_create.title': 'Tạo vai trò',
  'page_role_create.description': 'Tạo một vai trò mới.',
  'page_role_create.create_name': 'Tên',
  'page_role_create.create_permissions': 'Quyền',
  'page_role_create.button_cancel': 'Hủy',
  'page_role_create.button_save': 'Lưu',
  'page_role_create.create_success': 'Tạo vai trò thành công.',

  // Page Role Edit
  'page_role_edit.title': 'Chỉnh sửa vai trò',
  'page_role_edit.description': 'Chỉnh sửa vai trò.',
  'page_role_edit.edit_name': 'Tên',
  'page_role_edit.edit_permissions': 'Quyền',
  'page_role_edit.button_cancel': 'Hủy',
  'page_role_edit.button_save': 'Lưu',
  'page_role_edit.edit_success': 'Cập nhật vai trò thành công.',

  // Page Role Detail
  'page_role_detail.title': 'Chi tiết vai trò',
  'page_role_detail.description': 'Xem chi tiết vai trò.',
  'page_role_detail.card_title': 'Thông tin vai trò',
  'page_role_detail.id': 'ID',
  'page_role_detail.name': 'Tên vai trò',
  'page_role_detail.permissions': 'Quyền',
  'page_role_detail.created_at': 'Ngày tạo',
  'page_role_detail.updated_at': 'Ngày cập nhật',
  'page_role_detail.popup_delete_title': 'Bạn chắc chắn muốn xóa?',
  'page_role_detail.popup_delete_description':
    'Bạn sẽ không thể hoàn tác hành động này!',
  'page_role_detail.popup_delete_confirm': 'Đúng, xóa đi!',
  'page_role_detail.popup_delete_cancel': 'Hủy',
  'page_role_detail.edit_success': 'Cập nhật vai trò thành công.',
  'page_role_detail.delete_success': 'Xóa vai trò thành công.',
  'page_role_detail.button_back': 'Quay lại',
  'page_role_detail.button_edit': 'Chỉnh sửa',
  'page_role_detail.button_delete': 'Xóa',

  // Page Profile Account
  'page_profile_account.title': 'Tài khoản',
  'page_profile_account.description': 'Quản lý tài khoản của bạn.',
  'page_profile_account.section_profile': 'Hồ sơ',
  'page_profile_account.edit_first_name': 'Tên',
  'page_profile_account.edit_last_name': 'Họ',
  'page_profile_account.edit_phone_number': 'Số điện thoại',
  'page_profile_account.edit_phone_number_placeholder': 'Nhập số điện thoại',
  'page_profile_account.section_password': 'Mật khẩu',
  'page_profile_account.edit_current_password': 'Mật khẩu hiện tại',
  'page_profile_account.edit_new_password': 'Mật khẩu mới',
  'page_profile_account.edit_password_confirmation': 'Xác nhận mật khẩu',
  'page_profile_account.button_save_profile': 'Lưu',
  'page_profile_account.button_save_password': 'Lưu',
  'page_profile_account.edit_success': 'Cập nhật tài khoản thành công.',
  'page_profile_account.password_success': 'Cập nhật mật khẩu thành công.',
  'page_profile_account.error_current_password':
    'Mật khẩu hiện tại là bắt buộc.',
  'page_profile_account.error_new_password': 'Mật khẩu mới là bắt buộc.',
  'page_profile_account.error_password_confirmation':
    'Xác nhận mật khẩu là bắt buộc.',
  'page_profile_account.error_password_mismatch':
    'Mật khẩu mới và xác nhận không khớp.',
  'page_profile_account.error_password_not_match':
    'Mật khẩu hiện tại không đúng.',
  'page_profile_account.error_password_min':
    'Mật khẩu phải có ít nhất {{min}} ký tự.',
  'page_profile_account.error_password_max':
    'Mật khẩu phải nhỏ hơn {{max}} ký tự.',
  'page_profile_account.error_password_uppercase':
    'Mật khẩu phải có ít nhất một chữ cái in hoa.',
  'page_profile_account.error_password_lowercase':
    'Mật khẩu phải có ít nhất một chữ cái thường.',
  'page_profile_account.error_password_number':
    'Mật khẩu phải có ít nhất một chữ số.',
  'page_profile_account.error_password_special':
    'Mật khẩu phải có ít nhất một ký tự đặc biệt.',
  'page_profile_account.error_upload_avatar': 'Vui lòng tải lên ảnh đại diện.',

  // Page Login
  'page_login.title': 'Chào mừng trở lại',
  'page_login.description': 'Đăng nhập vào cổng thông tin Honkai của bạn.',
  'page_login.login_email': 'Email',
  'page_login.login_password': 'Mật khẩu',
  'page_login.button_login': 'Đăng nhập',
  'page_login.button_forgot_password': 'Quên mật khẩu?',
  'page_login.login_success': 'Đăng nhập thành công.',
  'page_login.message': 'Chưa có tài khoản? {{link}}',
  'page_login.terms':
    'Bằng cách tiếp tục, bạn đồng ý với Điều khoản dịch vụ và Chính sách bảo mật.',

  // Page Forgot Password
  'page_forgot_password.title': 'Quên mật khẩu',
  'page_forgot_password.description': 'Tìm lại mật khẩu cho tài khoản.',
  'page_forgot_password.forgot_email': 'Email',
  'page_forgot_password.button_send': 'Gửi',
  'page_forgot_password.forgot_success': 'Email đã gửi thành công.',
  'page_forgot_password.description_email':
    'Một email sẽ được gửi đến tài khoản email của bạn để xác nhận việc quên mật khẩu.',
  'page_forgot_password.button_back': 'Trờ về',

  // Page Reset Password
  'page_reset_password.title': 'Đặt lại mật khẩu',
  'page_reset_password.description':
    'Đặt lại mật khẩu cho tài khoản mới của bạn.',
  'page_reset_password.reset_password': 'Mật khẩu mới',
  'page_reset_password.reset_password_placeholder': 'Nhập mật khẩu mới',
  'page_reset_password.reset_password_confirmation': 'Xác nhận mật khẩu mới',
  'page_reset_password.reset_password_confirmation_placeholder':
    'Nhập lại mật khẩu mới',
  'page_reset_password.button_reset': 'Xác nhận',
  'page_reset_password.reset_success':
    'Đổi mật khẩu thành công. Bây giờ bạn có thể đăng nhập để tiếp tục',
  'page_reset_password.button_back': 'Trở về',

  // Page User Overview
  'page_user_overview.title': 'Người Dùng',
  'page_user_overview.button_create': 'Tạo mới',

  // Page User Detail
  'page_user_detail.title': 'Chi tiết người dùng',
  'page_user_detail.description': 'Xem chi tiết người dùng.',
  'page_user_detail.card_title': 'Thông tin người dùng',
  'page_user_detail.id': 'Mã ID',
  'page_user_detail.phone_number': 'Số điện thoại',
  'page_user_detail.first_name': 'Tên',
  'page_user_detail.last_name': 'Họ',
  'page_user_detail.full_name': 'Họ và tên',
  'page_user_detail.email': 'Email',
  'page_user_detail.avatar': 'Ảnh đại diện',
  'page_user_detail.last_login_at': 'Đăng nhập lần cuối',
  'page_user_detail.email_verified': 'Email đã xác thực',
  'page_user_detail.active': 'Hoạt động',
  'page_user_detail.inactive': 'Không hoạt động',
  'page_user_detail.ip_address': 'Địa chỉ IP',
  'page_user_detail.created_at': 'Ngày tạo',
  'page_user_detail.updated_at': 'Ngày cập nhật',
  'page_user_detail.button_edit': 'Chỉnh sửa',
  'page_user_detail.button_delete': 'Xóa',
  'page_user_detail.button_back': 'Quay lại',

  // Page User Create
  'page_user_create.title': 'Tạo người dùng',
  'page_user_create.description': 'Tạo mới một người dùng.',
  'page_user_create.create_email': 'Email',
  'page_user_create.create_first_name': 'Tên',
  'page_user_create.create_last_name': 'Họ',
  'page_user_create.create_role': 'Vai trò',
  'page_user_create.create_role_placeholder': 'Chọn vai trò',
  'page_user_create.create_phone_number': 'Số điện thoại',
  'page_user_create.create_phone_number_placeholder': 'Nhập số điện thoại',
  'page_user_create.create_password': 'Mật khẩu',
  'page_user_create.create_password_confirmation': 'Xác nhận mật khẩu',
  'page_user_create.button_cancel': 'Hủy',
  'page_user_create.button_save': 'Lưu',
  'page_user_create.error_email_required': 'Email là bắt buộc.',
  'page_user_create.error_role_required': 'Vai trò là bắt buộc.',
  'page_user_create.error_password_required': 'Mật khẩu là bắt buộc.',
  'page_user_create.error_password_min': 'Mật khẩu phải có ít nhất 8 ký tự.',
  'page_user_create.error_password_max': 'Mật khẩu phải ít hơn 255 ký tự.',
  'page_user_create.error_password_uppercase':
    'Mật khẩu phải chứa ít nhất một chữ hoa.',
  'page_user_create.error_password_lowercase':
    'Mật khẩu phải chứa ít nhất một chữ thường.',
  'page_user_create.error_password_number':
    'Mật khẩu phải chứa ít nhất một chữ số.',
  'page_user_create.error_password_special':
    'Mật khẩu phải chứa ít nhất một ký tự đặc biệt.',
  'page_user_create.error_password_confirmation':
    'Xác nhận mật khẩu là bắt buộc.',
  'page_user_create.validation_password_not_match': 'Mật khẩu không khớp.',
  'page_user_create.error_password_confirmation_required':
    'Xác nhận mật khẩu là bắt buộc.',
  'page_user_create.error_password_mismatch':
    'Mật khẩu và xác nhận mật khẩu không khớp.',
  'page_user_create.create_success': 'Tạo người dùng thành công.',

  // Page User Edit
  'page_user_edit.title': 'Cập nhật người dùng',
  'page_user_edit.description': 'Cập nhật thông tin người dùng.',
  'page_user_edit.edit_first_name': 'Tên',
  'page_user_edit.edit_last_name': 'Họ',
  'page_user_edit.edit_phone_number': 'Số điện thoại',
  'page_user_edit.edit_phone_number_placeholder': 'Nhập số điện thoại',

  // Button
  'button.delete': 'Xóa',
  'button.create': 'Tạo',
  'button.edit': 'Cập nhật',
  'button.back': 'Quay lại',
  'button.save': 'Lưu',
  'button.cancel': 'Hủy',
  'button.duplicate': 'Trùng lặp',
}
