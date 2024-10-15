"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from 'next/link';

import { TABLE_COLUMNS } from "@/features/poliklinik/PoliklinikColumns";
import DataTable from "@/components/ui/DataTable";
import IcAdd from "@/components/icons/IcAdd"
import IcTrash from "@/components/icons/IcTrash"
import Loader from "@/components/custom ui/Loader";
import PageHeader from "@/components/ui/PageHeader";
import Button from "@/components/base/Button";
import Paper from "@/components/base/Paper"
import {PoliklinikType} from "@/lib/types";
import toast from "react-hot-toast";
import IcEyeOpen from "@/components/icons/IcEyeOpen";


const Poliklinik = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [poliklinik, setPoliklinik] = useState([]);

  const getPoliklinik = async () => {
    try {
      const res = await fetch("/api/poliklinik", {
        method: "GET",
      });
      const data = await res.json();
      setPoliklinik(data);
      setLoading(false);
    } catch (err) {
      console.log("[polikliniks_GET]", err);
    }
  };
  const handleDetail = async (props: PoliklinikType) => {
    router.push(`/reservasi/${props._id}`);
  }

  const handleDelete = async (props: PoliklinikType) => {
    console.log(props);
    try {
      const res = await fetch(`/api/poliklinik/${props._id}`, {
        method: "DELETE",
      })

      if (res.ok) {
        window.location.href = (`/poliklinik`)
        toast.success(`poliklinik deleted`)
      }
    } catch (err) {
      console.log(err)
      toast.error("Something went wrong! Please try again.")
    }
  }

  useEffect(() => {
    getPoliklinik();
  }, []);

  return loading ? <Loader /> : (
    <>
      <PageHeader
        title="Poliklinik"
        crumbs={[{ label: 'Poliklinik' }]}
        className="mb-6"
      >
        <Link href="/poliklinik/new">
          <Button
            className="h-fit"
            color="primary"
            startIcon={<IcAdd />}
          >
            Create Poliklinik
          </Button>
        </Link>
      </PageHeader>
      <Paper>
        <DataTable
          columns={TABLE_COLUMNS}
          data={poliklinik}
          rowActions={[
            {
              color: 'primary',
              icon: <IcEyeOpen />,
              onClick: (row) => handleDetail(row),
              tooltip: 'View detail',
            },
            {
              color: 'danger',
              icon: <IcTrash />,
              onClick: (row) => handleDelete(row),
              tooltip: 'Delete data',
            },
          ]}
          searchPlaceholder="Search by Poliklinik"
          showPagination
          uniqueRowKey="poliklinikId"
          totalData={10}
          showCountTotal
        />
      </Paper>
    </>
  );
};

export default Poliklinik;
