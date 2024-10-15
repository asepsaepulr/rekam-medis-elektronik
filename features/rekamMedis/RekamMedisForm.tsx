"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {Controller, useForm} from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useUser } from '@clerk/nextjs'


import {useEffect, useState} from "react";
import toast from "react-hot-toast";
import rekamMedisFormSchemas from "@/features/rekamMedis/RekamMedisForm.schemas";
import { RekamMedisType } from "@/lib/types";
import PageHeader from "@/components/ui/PageHeader";
import Paper from "@/components/base/Paper";
import TextField from "@/components/base/Textfield";
import Textarea from "@/components/base/Textarea";
import Button from "@/components/base/Button";
import Select from "@/components/base/Select";
import {getListPasien} from "@/app/(dashboard)/admin/actions";
import type {SelectItem} from "@/types/inputs";

interface RekamMedisFormProps {
  initialData?: RekamMedisType | null; //Must have "?" to make it optional
}

const RekamMedisForm: React.FC<RekamMedisFormProps> = ({ initialData }) => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [listPasien, setListPasien] = useState<SelectItem[]>([]);


  const form = useForm<z.infer<typeof rekamMedisFormSchemas>>({
    resolver: zodResolver(rekamMedisFormSchemas),
    defaultValues: initialData
      ? initialData
      : {
          idPasien: "",
          suhu: "",
          nadi: "",
          sistole: "",
          diastole: "",
          frekuensiPernapasan: "",
          obatDiKonsumsi: "",
          diagnosis: "",
          resepObat: "",
          keluhan: "",
          riwayatPenyakit: "",
          riwayatAlergi: "",
          nakes:"",
          idNakes: "",
          noRekamMedis: "",
        },
  });

  const {  user } = useUser()
  const nakesId = user ? `${user.id || ''}` : '';
  const nakes = user ? `${user.firstName || ''} ${user.lastName || ''}`.trim() : 'Guest';

  const getPasien = async () => {
    try {
      const pasien = await getListPasien();
      setListPasien(pasien);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const generateRandomNumberWithPrefix = (prefix: string, length: number): string => {
    const randomNumber = Math.floor(Math.random() * Math.pow(10, length));
    return `${prefix}${randomNumber.toString().padStart(length, '0')}`;
  };

  const handleBack = () => {
    router.push('/rekamMedis');
  };

  const onSubmit = async (values: z.infer<typeof rekamMedisFormSchemas>) => {
    try {
      setLoading(true);
      const url = initialData
        ? `/api/rekamMedis/${initialData._id}`
        : "/api/rekamMedis";


      values.noRekamMedis = String(generateRandomNumberWithPrefix("RKE", 6));
      values.idNakes = nakesId;
      values.nakes = nakes;
      const res = await fetch(url, {
        method: "POST",
        body: JSON.stringify(values),
      });
      if (res.ok) {
        setLoading(false);
        toast.success(`RekamMedis ${initialData ? "updated" : "created"}`);
        window.location.href = "/rekamMedis";
        router.push("/rekamMedis");
      }
    } catch (err) {
      console.log("[rekamMedis_POST]", err);
      toast.error("Something went wrong! Please try again.");
    }
  };

  useEffect(() => {
    getPasien();
  }, []);

  return (
    <div className="flex flex-col gap-5 my-5">
      <PageHeader
        title={`${!initialData ? 'Create' : 'Edit'} Rekam Medis`}
        crumbs={[
          {
            label: 'Rekam Medis',
            href: '/rekamMedis',
          },
          {label: `${!initialData ? 'Create' : 'Edit'} Rekam Medis`}]}
        showBackBtn
        onClickBackBtn={handleBack}
      />
      <Paper title="Nakes Pengkaji">
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-5 mt-5">
          <TextField
            {...form.register('nakes')}
            label="Tenaga Kesehatan"
            value={nakes}
            placeholder="Enter Tenaga Kesehatan"
            disabled
            autoFocus
            block
          />
          <input
            {...form.register('idNakes')}
            type="text"
            value={nakesId}
            hidden
          />
        </div>
      </Paper>
      <Paper title="Data Pasien">
        <div className="grid lg:grid-cols-4 grid-cols-1 gap-5 mt-5">
          <Controller
            control={form.control}
            name="idPasien"
            render={({
                 field: {
                   ref,
                   value,
                   onChange,
                   name,
                 },
                 fieldState: {error},
               }) => (
              <Select
                ref={ref}
                name={name}
                label="Nama Pasien"
                placeholder="Select Pasien"
                options={listPasien}
                value={value}
                labelLayout="vertical"
                onChange={onChange}
                error={!!error}
                message={error && error.message}
                block
              />
            )}
          />
        </div>
        <Paper title="Tanda - Tanda Vital">
          <div className="grid lg:grid-cols-3 grid-cols-1 gap-5 mt-5">
            <TextField
              {...form.register('suhu')}
              label="Suhu Tubuh"
              error={!!form.formState.errors.suhu}
              message={form.formState.errors.suhu && form.formState.errors.suhu.message}
              placeholder="Enter Suhu Tubuh"
              className="w-1/2"
              block
            />
            <TextField
              {...form.register('nadi')}
              label="Nadi"
              error={!!form.formState.errors.nadi}
              message={form.formState.errors.nadi && form.formState.errors.nadi.message}
              placeholder="Enter Nadi"
              className="w-1/2"
              block
            />
          </div>
            <div className="grid lg:grid-cols-3 grid-cols-1 gap-5 mt-5">
              <TextField
                {...form.register('sistole')}
                label="Sistole"
                error={!!form.formState.errors.sistole}
                message={form.formState.errors.sistole && form.formState.errors.sistole.message}
                placeholder="Enter Sistole"
                className="w-1/2"
                block
              />
              <TextField
                {...form.register('diastole')}
                label="Diastole"
                error={!!form.formState.errors.diastole}
                message={form.formState.errors.diastole && form.formState.errors.diastole.message}
                placeholder="Enter Diastole"
                className="w-1/2"
                block
              />
              <TextField
                {...form.register('frekuensiPernapasan')}
                label="Frekuensi Pernapasan"
                error={!!form.formState.errors.frekuensiPernapasan}
                message={form.formState.errors.frekuensiPernapasan && form.formState.errors.frekuensiPernapasan.message}
                placeholder="Enter Frekuensi Pernapasan"
                className="w-1/2"
                block
              />
            </div>
        </Paper>
        <Paper title="Data Kesehatan">
          <div className="grid lg:grid-cols-2 grid-cols-1 gap-5 mt-5">
            <TextField
              {...form.register('keluhan')}
              label="Keluhan Utama"
              error={!!form.formState.errors.keluhan}
              message={form.formState.errors.keluhan && form.formState.errors.keluhan.message}
              placeholder="Enter Keluhan Utama"

              block
            />
            <TextField
              {...form.register('riwayatPenyakit')}
              label="Riwayat Penyakit"
              error={!!form.formState.errors.riwayatPenyakit}
              message={form.formState.errors.riwayatPenyakit && form.formState.errors.riwayatPenyakit.message}
              placeholder="Enter Riwayat Penyakit"

              block
            />
            <TextField
              {...form.register('riwayatAlergi')}
              label="Riwayat Alergi"
              error={!!form.formState.errors.riwayatAlergi}
              message={form.formState.errors.riwayatAlergi && form.formState.errors.riwayatAlergi.message}
              placeholder="Enter Riwayat Alergi"
              block
            />
          </div>
        </Paper>
      </Paper>
      <Paper title="Hasil Pemeriksaan Tambahan">
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-5 mt-5">
          <Textarea
            {...form.register('diagnosis')}
            label="Diagnosis Lainya"
            error={!!form.formState.errors.diagnosis}
            message={form.formState.errors.diagnosis && form.formState.errors.diagnosis.message}
            placeholder="Enter Diagnosis"
            block
          />
          <Textarea
            {...form.register('resepObat')}
            label="Resep Obat"
            error={!!form.formState.errors.resepObat}
            message={form.formState.errors.resepObat && form.formState.errors.resepObat.message}
            placeholder="Enter Resep Obat"
            block
          />
        </div>
      </Paper>
      <div className="flex justify-end gap-4 [&>*]:w-36 py-6">
        <Button
          variant="outline"
          color="danger"
        >
          Cancel
        </Button>
        <Button
          onClick={form.handleSubmit(onSubmit)}
          color="primary"
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

export default RekamMedisForm;
