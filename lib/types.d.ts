import mongoose, { Document, Schema } from 'mongoose';

type CollectionType = {
  _id: string;
  title: string;
  description: string;
  image: string;
  products: ProductType[];
}

type PoliklinikType = {
  _id: string;
  name: string;
  desc: string;
}

type LayananType = {
  _id: string;
  name: string;
  description: string;
  price: number;
  idPoliklinik: string;
  typeRawat: number;
}

type ReservasiType =  {
  _id: string;
  jenisKunjungan: number,
  typeRawat: number,
  triase: string,
  namaPasien: string,
  noRekamMedis: string,
  kategoriPasien: string,
  tanggalLahir: string,
  jenisKelamin: number,
  alamat: string,
  nomorTelepon: string,
  email: string,
  polikliniks: PoliklinikType,
  layanans: LayananType,
  idnakes: string,
  tanggalKonsultasi: string,
  jamKonsultasi: string,
  jamSlot: string,
}

type RekamMedisType = {
  _id: string;
  idPasien: string,
  namaPasien: string,
  suhu: string,
  nadi: string,
  sistole: string,
  diastole: string,
  frekuensiPernapasan: string,
  obatDiKonsumsi: string,
  diagnosis: string,
  resepObat: string,
  keluhan: string,
  riwayatPenyakit: string,
  riwayatAlergi: string,
  idNakes: string,
  nakes: string,
  noRekamMedis: string,
  createdAt: string,
}

type ProductType = {
  _id: string;
  title: string;
  description: string;
  media: [string];
  category: string;
  collections: [CollectionType];
  tags: [string];
  sizes: [string];
  colors: [string];
  price: number;
  expense: number;
  createdAt: Date;
  updatedAt: Date;
}

export type Roles = 'admin' | 'dokter' | 'pasien'

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      role?: Roles
    }
  }
}
