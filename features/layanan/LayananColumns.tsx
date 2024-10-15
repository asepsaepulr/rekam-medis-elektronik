"use client";

import type {TableColumn} from "@/types/tables";

export const TABLE_COLUMNS: TableColumn[] = [
  {
    name: 'Nama Layanan',
    dataKey: 'name',
    sortable: true,
    sortKey: 'title',
  },
  {
    name: 'Deskripsi',
    dataKey: 'description',
    sortable: true,
    sortKey: 'title',
  },
  {
    name: 'Harga',
    dataKey: 'price',
    sortable: true,
    sortKey: 'title',
  },
];
