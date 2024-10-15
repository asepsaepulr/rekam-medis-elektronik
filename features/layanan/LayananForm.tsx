"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import Button from "@/components/base/Button";
import Radio from "@/components/base/Radio"
import Textarea from "@/components/base/Textarea";
import {useEffect, useState} from "react";
import toast from "react-hot-toast";
import layananFormSchemas from "@/features/layanan/LayananForm.schemas";
import { LayananType} from "@/lib/types";
import type { ChangeEvent } from 'react';
import { Controller } from 'react-hook-form';
import Select from "@/components/base/Select"
import type {SelectItem} from "@/types/inputs";
import PageHeader from "@/components/ui/PageHeader";
import Paper from "@/components/base/Paper";
import TextField from "@/components/base/Textfield";

interface LayananFormProps {
  initialData?: LayananType | null; //Must have "?" to make it optional
}

const LayananForm: React.FC<LayananFormProps> = ({ initialData }) => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [poliklinik, setPoliklinik] = useState<SelectItem[]>([]);

  const form = useForm<z.infer<typeof layananFormSchemas>>({
    resolver: zodResolver(layananFormSchemas),
    defaultValues: initialData
      ? initialData
      : {
          name: "",
          description: "",
          price: 0,
          idPoliklinik: "",
          typeRawat: 0,
        },
  });

  const handleBack = () => {
    router.push('/layanan');
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement> | React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  }

  const onSubmit = async (values: z.infer<typeof layananFormSchemas>) => {
    try {
      setLoading(true);
      const url = initialData
        ? `/api/layanan/${initialData._id}`
        : "/api/layanan";
      const res = await fetch(url, {
        method: "POST",
        body: JSON.stringify(values),
      });
      if (res.ok) {
        setLoading(false);
        toast.success(`Layanan ${initialData ? "updated" : "created"}`);
        window.location.href = "/layanan";
        router.push("/layanan");
      }
    } catch (err) {
      console.log("[layanan_POST]", err);
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

  useEffect(() => {
    getPoliklinik();
  }, []);

  return (
    <div className="flex flex-col gap-5 my-5">
      <PageHeader
        title={`${!initialData ? 'Create' : 'Edit'} Layanan`}
        crumbs={[
          {
            label: 'Layanan',
            href: '/layanan',
          },
          {label: `${!initialData ? 'Create' : 'Edit'} Layanan`}]}
        showBackBtn
        onClickBackBtn={handleBack}
      />
      <Paper title="Layanan Form">
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-5">
          <TextField
            {...form.register('name')}
            label="Nama Layanan"
            error={!!form.formState.errors.name}
            message={form.formState.errors.name && form.formState.errors.name.message}
            placeholder="Enter Layanan"
            required
            block
          />
        </div>
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-8 mt-2">
          <Textarea
            {...form.register('description')}
            label="Deskripsi"
            error={!!form.formState.errors.description}
            message={form.formState.errors.description && form.formState.errors.description.message}
            placeholder="Enter Deskripsi"
            block
          />
        </div>
      </Paper>
      <Paper title="Perawatan Form">
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-5">
          <TextField
            {...form.register('price')}
            label="Harga Layanan"
            error={!!form.formState.errors.price}
            message={form.formState.errors.price && form.formState.errors.price.message}
            placeholder="Harga Layanan"
            required
            block
          />
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
                       label: 'Rawat Inap',
                       value: '2',
                    }]}
                label="Type Perawatan Kunjungan"
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
            name="idPoliklinik"
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
                label="Nama Poliklinik"
                placeholder="Select Poliklinik"
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

export default LayananForm;
