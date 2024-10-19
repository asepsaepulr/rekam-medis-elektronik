"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";

import DatePicker from '@/components/base/DatePicker';
import Button from "@/components/base/Button";
import Radio from "@/components/base/Radio"
import {useEffect, useState} from "react";
import toast from "react-hot-toast";
import reservasiFormSchemas from "@/features/reservasi/ReservasiForm.schemas";
import { ReservasiType } from "@/lib/types";
import type { ChangeEvent } from 'react';
import { Controller } from 'react-hook-form';
import Select from "@/components/base/Select"
import type {SelectItem} from "@/types/inputs";
import {KATEGORI_PASIEN_OPTION, TRIASE_OPTION} from "#reservasi/ReservasiColumns";
import formatDateApi from '../../utils/formatDateApi';
import PageHeader from "@/components/ui/PageHeader";
import Paper from "@/components/base/Paper";
import TextField from "@/components/base/Textfield";
import Textarea from "@/components/base/Textarea";

interface TimeSlot {
  time: string;
}

interface Props {
  timeSlot?: TimeSlot[];
}

interface ReservasiFormProps {
  initialData?: ReservasiType | null;
  metaData?: SelectItem[];
}

const ReservasiForm: React.FC<ReservasiFormProps> = ({ initialData, metaData }) => {
  const router = useRouter();

  const [listDokter, setListDokter] = useState(metaData);
  const [loading, setLoading] = useState(false);
  const [poliklinik, setPoliklinik] = useState<SelectItem[]>([]);
  const [layanan, setLayanan] = useState<SelectItem[]>([]);
  const [timeSlot,setTimeSlot]= useState<TimeSlot[]>([]);
  const [selectedTimeSlot,setSelectedTimeSlot]= useState("");
  const form = useForm<z.infer<typeof reservasiFormSchemas>>({
    resolver: zodResolver(reservasiFormSchemas),
    defaultValues: initialData
      ? initialData
      : {
        jenisKunjungan: 0,
        typeRawat: 0,
        triase: "",
        namaPasien: "",
        noRekamMedis: "",
        kategoriPasien: "",
        tanggalLahir: "",
        jenisKelamin: 0,
        alamat: "",
        nomorTelepon: "",
        email: "",
        polikliniks: "",
        layanans: "",
        idnakes: "",
        tanggalKonsultasi: "",
        jamKonsultasi: "",
        jamSlot: "",
        },
  });

  const handleBack = () => {
    router.push('/reservasi');
  };

  const onSubmit = async (values: z.infer<typeof reservasiFormSchemas>) => {
    try {
      setLoading(true);
      const url = initialData
        ? `/api/reservasi/${initialData._id}`
        : "/api/reservasi";

      values.jamSlot = selectedTimeSlot;
      const res = await fetch(url, {
        method: "POST",
        body: JSON.stringify(values),
      });
      if (res.ok) {
        setLoading(false);
        toast.success(`Reservasi ${initialData ? "updated" : "created"}`);
        window.location.href = "/reservasi";
        router.push("/reservasi");
      }
    } catch (err) {
      console.log("[reservasi_POST]", err);
      toast.error("Something went wrong! Please try again.");
    }
  };

  const getPoliklinik = async () => {
    try {
      const res = await fetch("/api/poliklinik", {
        method: "GET",
      });
      const data = await res.json();
      const listPoli = (data || []).map((item:any) => ({
        value: item._id || '',
        label: item.name || '',
      }));
      setPoliklinik(listPoli);
      setLoading(false);
    } catch (err) {
      console.log("[polikliniks_GET]", err);
    }
  };

  const getLayanan = async () => {
    try {
      const res = await fetch("/api/layanan", {
        method: "GET",
      });
      const data = await res.json();
      const listLayanan = (data || []).map((item:any) => ({
        value: item._id || '',
        label: item.name || '',
      }));
      setLayanan(listLayanan);
      setLoading(false);
    } catch (err) {
      console.log("[layanan_GET]", err);
    }
  };

  const getTime = () => {
    const timeList = [];
    for (let i = 10; i <= 18; i++) {
      timeList.push({
        time: i + ':00'
      })
      timeList.push({
        time: i + ':30'
      })
    }

    setTimeSlot(timeList)
  }

  useEffect(() => {
    getPoliklinik();
    getLayanan();
    getTime();
  }, []);

  return (
    <div className="flex flex-col gap-5 my-5">
      <PageHeader
        title={`${!initialData ? 'Create' : 'Edit'} Reservasi`}
        crumbs={[
          {
            label: 'Reservasi',
            href: '/reservasi',
          },
          {label: `${!initialData ? 'Create' : 'Edit'} Reservasi`}]}
        showBackBtn
        onClickBackBtn={handleBack}
      />
      <Paper title="Jenis Pendaftaran">
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-5 mt-5">
          <div className="col-span-2 w-full">
            <Controller
              control={form.control}
              name="jenisKunjungan"
              render={({
                   field: {
                     ref,
                     onChange,
                     value,
                     name
                   },
                   fieldState: {error},
                 }) => (
                <Radio
                  name={name}
                  ref={ref}
                  options={[{
                    label: 'Kunjungan Sakit',
                    value: '1',
                  },
                    {
                      label: 'Kunjungan Sehat',
                      value: '2',
                    }]}
                  label="Jenis Kunjungan"
                  classes={{container: 'flex items-center h-16'}}
                  required
                  onChange={(event: ChangeEvent<HTMLInputElement>) => {
                    onChange(Number(event.target.value));
                  }}
                  checkedValue={String(value)}
                />
              )}
            />
          </div>
            <Controller
              control={form.control}
              name="typeRawat"
              render={({
                   field: {
                     ref,
                     onChange,
                     value,
                     name
                   },
                   fieldState: {error},
                 }) => (
                <Radio
                  name={name}
                  ref={ref}
                  options={[{
                    label: 'Rawat Jalan',
                    value: '1',
                  },
                    {
                      label: 'Promotif Preverentif',
                      value: '2',
                    }]}
                  label="Jenis Perawatan"
                  classes={{container: 'flex items-center h-16'}}
                  required
                  onChange={(event: ChangeEvent<HTMLInputElement>) => {
                    onChange(Number(event.target.value));
                  }}
                  checkedValue={String(value)}
                />
              )}
            />
            <Controller
              control={form.control}
              name="triase"
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
                  label="Triase"
                  placeholder="Select Triase"
                  options={TRIASE_OPTION}
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
      </Paper>
      <Paper title="Data Pasien">
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-5">
          <TextField
            {...form.register('namaPasien')}
            label="Nama Pasien"
            error={!!form.formState.errors.namaPasien}
            message={form.formState.errors.namaPasien && form.formState.errors.namaPasien.message}
            placeholder="Enter Nama Pasien"
            required
            block
          />
          <TextField
            {...form.register('email')}
            label="Email"
            error={!!form.formState.errors.email}
            message={form.formState.errors.email && form.formState.errors.email.message}
            placeholder="Enter Email"
            required
            block
          />
            <Controller
              control={form.control}
              name="kategoriPasien"
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
                  label="Kategori Pasien"
                  placeholder="Select Kategori"
                  options={KATEGORI_PASIEN_OPTION}
                  value={value}
                  labelLayout="vertical"
                  onChange={onChange}
                  error={!!error}
                  message={error && error.message}
                  block
                />
              )}
            />
          <Controller
            control={form.control}
            name="tanggalLahir"
            render={({
                 field: {
                   ref,
                   onChange,
                   value,
                   name,
                 },
                 fieldState: { error },
               }) => (
              <DatePicker
                ref={ref}
                name={name}
                label="Tanggal Lahir"
                placeholder="Select tanggal lahir"
                error={!!error}
                message={error && error.message}
                onChange={
                  (inputValue) => onChange(inputValue ? formatDateApi(inputValue) : '')
                }
                value={value ? new Date(value) : null}
                block
                required
              />
            )}
          />
            <Controller
              control={form.control}
              name="jenisKelamin"
              render={({
                         field: {
                           ref,
                           onChange,
                           value,
                           name
                         },
                         fieldState: {error},
                       }) => (
                <Radio
                  name={name}
                  ref={ref}
                  options={[{
                    label: 'Laki-Laki',
                    value: '1',
                  },
                    {
                      label: 'Perempuan',
                      value: '2',
                    }]}
                  label="Jenis Kelamin"
                  classes={{container: 'flex items-center h-16'}}
                  required
                  onChange={(event: ChangeEvent<HTMLInputElement>) => {
                    onChange(Number(event.target.value));
                  }}
                  checkedValue={String(value)}
                />
              )}
            />
          <TextField
            {...form.register('nomorTelepon')}
            label="Nomor Telepon"
            error={!!form.formState.errors.nomorTelepon}
            message={form.formState.errors.nomorTelepon && form.formState.errors.nomorTelepon.message}
            placeholder="Enter Nomor Telepon"
            required
            block
          />
          <Textarea
            {...form.register('alamat')}
            label="Alamat"
            error={!!form.formState.errors.alamat}
            message={form.formState.errors.alamat && form.formState.errors.alamat.message}
            placeholder="Enter Alamat"
            block
          />
        </div>
      </Paper>
      <Paper title="Nakes & Jadwal Kunjungan">
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-5">
          <Controller
            control={form.control}
            name="polikliniks"
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
                label="Poliklinik"
                placeholder="Select Poliklink"
                options={poliklinik}
                value={value}
                labelLayout="vertical"
                onChange={onChange}
                error={!!error}
                message={error && error.message}
                block
              />
            )}
          />
          <Controller
            control={form.control}
            name="layanans"
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
                label="Layanan"
                placeholder="Select Layanan"
                options={layanan}
                value={value}
                labelLayout="vertical"
                onChange={onChange}
                error={!!error}
                message={error && error.message}
                block
              />
            )}
          />
          <Controller
            control={form.control}
            name="idnakes"
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
                label="Nama Dokter"
                placeholder="Select Dokter"
                options={listDokter}
                value={value}
                labelLayout="vertical"
                onChange={onChange}
                error={!!error}
                message={error && error.message}
                block
              />
            )}
          />
          <Controller
            control={form.control}
            name="tanggalKonsultasi"
            render={({
                       field: {
                         ref,
                         onChange,
                         value,
                         name,
                       },
                       fieldState: {error},
                     }) => (
              <DatePicker
                ref={ref}
                name={name}
                label="Tanggal Konsultasi"
                placeholder="Select Tanggal Konsultasi"
                error={!!error}
                message={error && error.message}
                onChange={
                  (inputValue) => onChange(inputValue ? formatDateApi(inputValue) : '')
                }
                value={value ? new Date(value) : null}
                block
                required
              />
            )}
          />
          <TextField
            {...form.register('jamKonsultasi')}
            label="Jam Konsultasi"
            error={!!form.formState.errors.jamKonsultasi}
            message={form.formState.errors.jamKonsultasi && form.formState.errors.jamKonsultasi.message}
            placeholder="Enter Jam Konsultasi"
            required
            block
          />
          {/* Time Slot  */}
          <input
            {...form.register('jamSlot')}
            type="text"
            value={selectedTimeSlot}
            hidden
          />
          <div className=' mt-3 md:mt-0'>
            <h2 className='flex gap-2 items-center mb-3'>
              Select Time Slot
            </h2>
            <div className='grid grid-cols-3 gap-2 border
                        rounded-lg p-5'>
              {timeSlot?.map((item, index) => (
                <h2
                  key={index}
                  onClick={() => setSelectedTimeSlot(item.time)}
                  className={`p-2 border cursor-pointer
                      text-center hover:bg-green-600 hover:text-white
                      rounded-full
                      ${item.time === selectedTimeSlot ? 'bg-green-600 text-white' : ''}`}>
                  {item.time}
                </h2>
              ))}
            </div>
          </div>
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

export default ReservasiForm;
