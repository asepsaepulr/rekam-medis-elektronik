import { Fragment } from 'react';
import Link from 'next/link';
import Image from 'next/image';


import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import type { ReactNode } from 'react';

import Button from '@/components/base/Button';
import Tooltip from '@/components/base/Tooltip';
import IcShow from '@/components/icons/IcShow';
import IcHide from '@/components/icons/IcHide';

import useSidebar from './index.hooks';

const MenuItem = (props: { menu: { id: string, path: string, icon: ReactNode, name: string } }) => {
  const {
    isCollapsed,
    isActive,
  } = useSidebar();
  const { menu } = props;
  const {
    path,
    icon,
    name,
  } = menu;
  return (
    <Tooltip title={isCollapsed ? menu.name : ''} placement="right">
      <Link
        href={path || ''}
        className="text-base font-normal no-underline whitespace-nowrap"
      >
        <ListItemButton
          classes={{
            root: `rounded-lg mb-2 justify-center group ${isActive(menu.path || '')
              ? 'bg-primary-600 shadow-inner text-primary-50'
              : 'text-n-1 hover:bg-primary-50 hover:text-primary-500 hover:shadow-inner'}`,
          }}
        >
          <ListItemIcon
            classes={{
              root: `[&>*]:fill-n-1 ${isCollapsed ? 'justify-center' : ''} ${isActive(menu.path || '')
                ? ''
                : '[&>*]:group-hover:fill-primary-500'
              } min-w-0 ${!isCollapsed ? 'mr-4' : ''}`,
            }}
          >
            {icon}
          </ListItemIcon>
          {!isCollapsed && (
            <ListItemText
              primary={name}
              classes={{ primary: 'text-base' }}
            />
          )}
        </ListItemButton>
      </Link>
    </Tooltip>
  );
};

const Sidebar = () => {
  const {
    isCollapsed,
    menus,
    toggleCollapsed,
  } = useSidebar();
  return (
    <aside
      className={`${!isCollapsed ? 'w-72' : 'w-24'} font-sans fixed h-full drop-shadow-xl z-50 transition-width transition-slowest ease`}
      aria-label="Sidebar"
    >
      <div className="overflow-y-auto bg-primary-500 h-full px-2">
        <div
          className={
            `flex justify-between gap-2 [&>img]:w-36 *:object-contain
            ${!isCollapsed ? 'px-3 py-5' : 'px-2 py-5'}`
          }
        >
          <Image
            src="/image/logo.png"
            alt="Brand Logo"
            width={360} height={80}
            className="min-h-11 h-11 w-auto object-contain"
            priority
          />
          <div className="grow"/>
          <Button variant="text" onClick={toggleCollapsed} type="button" className="p-0 [&>*>*]:fill-n-1">
            {
              !isCollapsed
                ? <IcHide width={15} height={15}/>
                : <IcShow width={15} height={15}/>
            }
          </Button>
        </div>
        <List
          component="div"
          disablePadding
        >
          {menus.map((menu) => (
            !menu.subMenu ? (
              <MenuItem menu={menu} key={menu.id}/>
            ) : (
              <Fragment key={menu.id}>
                <ListItemButton
                  classes={{
                    root: 'rounded-2xl mb-2 justify-center whitespace-nowrap text-primary-300 py-0',
                  }}
                >
                  {!isCollapsed && (
                  <ListItemText
                    classes={{ primary: 'font-secondary text-sm' }}
                    primary={menu.name}
                  />
                  )}
                </ListItemButton>
                <List
                  component="div"
                  disablePadding
                  className="mb-2"
                >
                  {
                      (menu.subMenu || []).map((submenu) => (
                        <MenuItem menu={submenu} key={submenu.id} />
                      ))
                    }
                </List>
              </Fragment>
            )
          ))}
        </List>
      </div>
    </aside>
  );
};
export default Sidebar;
