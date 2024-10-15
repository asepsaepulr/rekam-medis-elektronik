"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";

import TextField from "@/components/base/Textfield"
import Paper from "@/components/base/Paper"
import Button from "@/components/base/Button"
import Textarea from "@/components/base/Textarea";
import PageHeader from "@/components/ui/PageHeader";
import { useState } from "react";
import toast from "react-hot-toast";
import poliklinikFormSchemas from "@/features/poliklinik/PoliklinikForm.schemas";
import {PoliklinikType} from "@/lib/types";

interface PoliklinikFormProps {
  initialData?: PoliklinikType | null; //Must have "?" to make it optional
}

const PoliklinikForm: React.FC<PoliklinikFormProps> = ({ initialData }) => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof poliklinikFormSchemas>>({
    resolver: zodResolver(poliklinikFormSchemas),
    defaultValues: initialData
      ? initialData
      : {
          name: "",
          desc: "",
        },
  });

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement> | React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  }

  const handleBack = () => {
    router.push('/poliklinik');
  };

  const onSubmit = async (values: z.infer<typeof poliklinikFormSchemas>) => {
    try {
      setLoading(true);
      const url = initialData
        ? `/api/poliklinik/${initialData._id}`
        : "/api/poliklinik";
      const res = await fetch(url, {
        method: "POST",
        body: JSON.stringify(values),
      });
      if (res.ok) {
        setLoading(false);
        toast.success(`Poliklinik ${initialData ? "updated" : "created"}`);
        window.location.href = "/poliklinik";
        router.push("/poliklinik");
      }
    } catch (err) {
      console.log("[poliklinik_POST]", err);
      toast.error("Something went wrong! Please try again.");
    }
  };

  return (
    <div className="flex flex-col gap-5 my-5">
      <PageHeader
        title={`${!initialData ? 'Create' : 'Edit'} Poliklinik`}
        crumbs={[
          {
            label: 'Poliklinik',
            href: '/poliklinik',
          },
          { label: `${!initialData ? 'Create' : 'Edit'} Poliklinik` }]}
        showBackBtn
        onClickBackBtn={handleBack}
      />
          <Paper title="Poliklinik Form">
            <div className="grid lg:grid-cols-2 grid-cols-1 gap-5">
              <TextField
                {...form.register('name')}
                label="Poliklinik"
                error={!!form.formState.errors.name}
                message={form.formState.errors.name && form.formState.errors.name.message}
                placeholder="Enter Poliklinik"
                required
                block
              />
            </div>
            <div className="grid lg:grid-cols-2 grid-cols-1 gap-8 mt-2">
              <Textarea
                {...form.register('desc')}
                label="Deskripsi"
                error={!!form.formState.errors.desc}
                message={form.formState.errors.desc && form.formState.errors.desc.message}
                placeholder="Enter Deskripsi"
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

export default PoliklinikForm;
