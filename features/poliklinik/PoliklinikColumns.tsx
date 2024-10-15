"use client";

import type { TableColumn } from '@/types/tables';

export const TABLE_COLUMNS: TableColumn[] = [
  {
    name: 'Nama Poliklinik',
    dataKey: 'name',
    sortable: true,
    sortKey: 'title',
  },
  {
    name: 'Deskripsi',
    dataKey: 'desc',
    sortable: true,
    sortKey: 'desc',
  },
];
