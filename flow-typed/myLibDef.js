declare type SessionHandler = {
  getUser(): Promise<User>,
  login(): void,
  logout(username: string): Promise<boolean>,
  signup(): void,
};

declare type NotificationsHandler = {
  getNotifications: () => Promise<Array<$NonMaybeType<Notification>>>,
};

declare type Role = "admin" | "guest";

declare type Link = {
  text: string,
  href: string,
  roles?: Array<Role>,
};

declare type Notification = {
  created_at: string,
  data: $Shape<{
    display_username: string,
    group_id: number,
    original_post_id: number,
    original_post_type: number,
    original_username: string,
    revision_number: number,
    topic_title: string,
  }>,
  fancy_title: string,
  id: number,
  notification_type: number,
  post_number: number,
  read: false,
  slug: string,
  topic_id: number,
};

declare type Alert = Notification;

declare type Message = Notification;

declare type User = {
  admin: boolean,
  automatically_unpin_topics: boolean,
  avatar_template: string,
  calendar_first_day_week: any,
  can_create_topic: boolean,
  can_edit: boolean,
  can_invite_to_forum: boolean,
  can_send_private_email_messages: boolean,
  custom_fields: Object,
  disable_jump_reply: boolean,
  dismissed_banner_key: any,
  dynamic_favicon: boolean,
  enable_quoting: boolean,
  external_links_in_new_tab: boolean,
  groups: Array<any>,
  hide_profile_and_presence: boolean,
  id: number,
  is_anonymous: boolean,
  link_posting_access: string,
  mailing_list_mode: boolean,
  moderator: boolean,
  muted_category_ids: Array<any>,
  name: string,
  notification_channel_position: any,
  post_queue_new_count: number,
  previous_visit_at: string,
  primary_group_id: number,
  read_faq: boolean,
  read_first_notification: boolean,
  redirect_to_wizard: boolean,
  reply_count: number,
  seen_notification_id: number,
  should_be_redirected_to_top: boolean,
  show_queued_posts: boolean,
  site_flagged_posts_count: number,
  staff: boolean,
  title: string,
  top_category_ids: Array<any>,
  topic_count: number,
  trust_level: number,
  unread_notifications: number,
  unread_private_messages: number,
  username: string,
};

// API Responses
declare type APISessionCurrent = {
  current_user: User,
};
