import { usePathname } from 'next/navigation';
import MENUS from "@/lib/menu";

import { useLayoutContext } from '../../../contexts/LayoutContext';

const useSidebar = () => {
  const { isCollapsed, toggleCollapsed } = useLayoutContext();
  const  menus  = MENUS;
  const location = usePathname();
  const isActive = (path: string): boolean => location.startsWith(path);

  return {
    isCollapsed,
    menus,
    isActive,
    toggleCollapsed,
  };
};

export default useSidebar;
