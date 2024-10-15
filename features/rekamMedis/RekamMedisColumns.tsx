"use client";

import type { TableColumn } from '@/types/tables';

export const TABLE_COLUMNS: TableColumn[] = [
  {
    name: 'No Rekam Medis',
    dataKey: 'noRekamMedis',
    sortable: true,
    sortKey: 'title',
  },
  {
    name: 'Nama pasien',
    dataKey: 'namaPasien',
    sortable: true,
    sortKey: 'title',
  },
  {
    name: 'Nama Dokter',
    dataKey: 'nakes',
    sortable: true,
    sortKey: 'title',
  },
  {
    name: 'Tanggal Pemeriksaan',
    dataKey: 'createdAt',
    sortable: true,
    sortKey: 'title',
  },
];
