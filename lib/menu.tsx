import {
  LayoutDashboard,
  Shapes,
  ShoppingBag,
  Tag,
  UsersRound,
} from "lucide-react";
import {Menu} from "@/types/menu";

// export const navLinks = [
//   {
//     url: "/dashboard",
//     icon: <LayoutDashboard />,
//     label: "Dashboard",
//   },
//   {
//     url: "/collections",
//     icon: <Shapes />,
//     label: "Collections",
//   },
//   {
//     url: "/products",
//     icon: <Tag />,
//     label: "Products",
//   },
//   {
//     url: "/orders",
//     icon: <ShoppingBag />,
//     label: "Orders",
//   },
//   {
//     url: "/admin",
//     icon: <UsersRound/>,
//     label: "User",
//   },
//   {
//     url: "/poliklinik",
//     icon: <UsersRound/>,
//     label: "Poliklinik",
//   },
//   {
//     url: "/layanan",
//     icon: <UsersRound/>,
//     label: "Layanan",
//   },
//   {
//     url: "/reservasi",
//     icon: <UsersRound/>,
//     label: "Reservasi",
//   },
//   {
//     url: "/rekamMedis",
//     icon: <UsersRound/>,
//     label: "Rekam Medis",
//   },
//   {
//     url: "/customers",
//     icon: <UsersRound />,
//     label: "Customers",
//     submenu: [
//       {
//         url: "/customers",
//         icon: <UsersRound />,
//         label: "Sub menu ku",
//       }
//     ]
//   },
// ];

const MENUS: Menu[] = [
  {
    id: '1',
    path: '/dashboard',
    name: 'Dashboard',
    icon: <LayoutDashboard />,
  },
  {
    id: '2',
    path: '/admin',
    name: 'User Aktifasi',
    icon: <UsersRound/>,
  },
  {
    id: '1',
    path: '/poliklinik',
    name: 'Poliklinik',
    icon: <LayoutDashboard />,
  },
  {
    id: '1',
    path: '/layanan',
    name: 'Layanan',
    icon: <LayoutDashboard />,
  },
  {
    id: '1',
    path: '/reservasi',
    name: 'Reservasi',
    icon: <LayoutDashboard />,
  },
  {
    id: '2',
    path: '/rekamMedis',
    name: 'Rekam Medis',
    icon: <UsersRound/>,
  },
];

export default MENUS;
