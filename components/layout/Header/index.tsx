'use client';

import {UserButton, useUser} from "@clerk/nextjs";

import Typography from '@/components/base/Typography';

import useHeader from './index.hooks';

const Header = () => {
  const {
    isCollapsed,
  } = useHeader();

  const { user } = useUser()
  const fullName = user ? `${user.firstName || ''} ${user.lastName || ''}`.trim() : 'Guest';

  return (
    <nav className="w-full bg-n-1 py-6 px-4 shadow fixed z-30">
      <div
        className={`flex items-center transition-width transition-slowest ease px-7 [&>*]:text-n-13 ${!isCollapsed ? 'ml-72' : 'ml-24'}`}
      >
        <Typography
          as="span"
          align="left"
          className="font-medium grow text-2xl"
          type="primary"
        >
          UTAMA Klinik
        </Typography>
        <div className="flex gap-4 text-body-medium items-center">
          <Typography className="font-medium">
            {fullName}
          </Typography><br/>
          <Typography className="font-medium flex">
            {user && user.publicMetadata?.role ? user.publicMetadata.role : ""}
          </Typography>
           <UserButton/>
        </div>
      </div>
    </nav>
  );
};
export default Header;
