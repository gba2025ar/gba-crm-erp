import { Injectable } from '@nestjs/common';
import { menuSections } from './menu.data';
import { MenuSection } from './menu.types';

@Injectable()
export class MenuService {
  getMenu(): MenuSection[] {
    return menuSections;
  }
}
