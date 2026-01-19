export interface MenuItem {
  name: string;
  description?: string;
}

export interface MenuSection {
  key: string;
  title: string;
  options: MenuItem[];
}
