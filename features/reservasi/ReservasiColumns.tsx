"use client";

import {SelectItem} from "@/types/inputs";
import type {TableColumn} from "@/types/tables";

export const TABLE_COLUMNS: TableColumn[] = [
  {
    name: 'Nama Pasien',
    dataKey: 'namaPasien',
    sortable: true,
    sortKey: 'title',
  },
  {
    name: 'No telepon',
    dataKey: 'nomorTelepon',
    sortable: true,
    sortKey: 'title',
  },
  {
    name: 'Triase',
    dataKey: 'triase',
    sortable: true,
    sortKey: 'title',
  },
  {
    name: 'Poliklinik',
    dataKey: 'polikliniks',
    sortable: true,
    sortKey: 'title',
  },
  {
    name: 'Layanan',
    dataKey: 'layanans',
    sortable: true,
    sortKey: 'title',
  },
  {
    name: 'TGL dan jam Konsultasi',
    dataKey: 'tanggalKonsultasi',
    sortable: true,
    sortKey: 'title',
  },
];


export const TRIASE_OPTION: SelectItem[] = [
  {
    label: 'Level 1 (Resusitasi)',
    value: 'Level 1 (Resusitasi)',
  },
  {
    label: 'Level 2 (Emergent)',
    value: 'Level 2 (Emergent)',
  },
  {
    label: 'Level 3 (Urgent)',
    value: 'Level 3 (Urgent)',
  },
  {
    label: 'Level 4 (Less Urgent)',
    value: 'Level 4 (Less Urgent)',
  },
  {
    label: 'Level 5 (Non Urgent)',
    value: 'Level 5 (Non Urgent)',
  },
  {
    label: 'Level 6 (Dead on Arrival)',
    value: 'Level 6 (Dead on Arrival)',
  },
];

export const KATEGORI_PASIEN_OPTION: SelectItem[] = [
  {
    label: 'Penyakit Kronis',
    value: 'Penyakit Kronis',
  },
  {
    label: 'Penyakit Infeksi',
    value: 'Penyakit Infeksi',
  },
  {
    label: 'Penyakit Akut',
    value: 'Penyakit Akut',
  },
  {
    label: 'Lainya',
    value: 'Lainya',
  },
];

interface TimeSlot {
  time: string;
}

interface Props {
  timeSlot?: TimeSlot[];
}

