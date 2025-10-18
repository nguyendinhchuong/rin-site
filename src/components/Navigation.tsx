import * as React from 'react';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';

interface NavigationProps {
  currentLocale: string;
}

const Navigation = ({ currentLocale }: NavigationProps) => {
  const translations = {
    vi: {
      home: 'Trang chủ',
      about: 'Giới thiệu',
      products: 'Sản phẩm',
      services: 'Dịch vụ',
      blog: 'Tin tức',
      contact: 'Liên hệ',
    },
    en: {
      home: 'Home',
      about: 'About',
      products: 'Products',
      services: 'Services',
      blog: 'Blog',
      contact: 'Contact',
    },
  };

  const t = translations[currentLocale as keyof typeof translations] || translations.vi;

  const menuItems = [
    { href: `/${currentLocale}`, label: t.home },
    { href: `/${currentLocale}/about`, label: t.about },
    { href: `/${currentLocale}/products`, label: t.products },
    { href: `/${currentLocale}/services`, label: t.services },
    { href: `/${currentLocale}/blog`, label: t.blog },
    { href: `/${currentLocale}/contact`, label: t.contact },
  ];

  return (
    <NavigationMenu className="hidden md:flex">
      <NavigationMenuList>
        {menuItems.map((item) => (
          <NavigationMenuItem key={item.href}>
            <NavigationMenuLink
              href={item.href}
              className={cn(
                'group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50'
              )}
            >
              {item.label}
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default Navigation;

