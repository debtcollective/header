export type Role = "admin" | "guest";

export type Link = {
  text: string,
  href: string,
  roles?: Array<Role>
};
