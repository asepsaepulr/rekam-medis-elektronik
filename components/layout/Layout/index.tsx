'use client';

import type {ReactNode} from "react";
import Sidebar from '@/components/layout/Sidebar';
import Content from '@/components/layout/Content';
import Header from '@/components/layout/Header';

import { LayoutProvider } from '../../../contexts/LayoutContext';
import id from "date-fns/locale/id";

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';


const Layout = ({ children }: { children: ReactNode }) => (
  <LocalizationProvider
    dateAdapter={AdapterDateFns}
    adapterLocale={id}
  ><LayoutProvider>
  <div className="relative bg-neutral font-sans">

    <Header />
    <div className="relative">
      <Sidebar />
      <Content>
        {children}
      </Content>

    </div>

  </div>
  </LayoutProvider>
  </LocalizationProvider>
);

export default Layout;
