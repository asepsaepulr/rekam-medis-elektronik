"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { TABLE_COLUMNS } from "@/features/layanan/LayananColumns";
import DataTable from "@/components/ui/DataTable";
import Button from "@/components/base/Button";
import Loader from "@/components/custom ui/Loader";
import PageHeader from "@/components/ui/PageHeader";
import Link from "next/link";
import IcAdd from "@/components/icons/IcAdd";
import Paper from "@/components/base/Paper";
import IcTrash from "@/components/icons/IcTrash";
import {LayananType} from "@/lib/types";
import toast from "react-hot-toast";
import IcEyeOpen from "@/components/icons/IcEyeOpen";

const Layanan = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [layanan, setLayanan] = useState([]);

  const getLayanan = async () => {
    try {
      const res = await fetch("/api/layanan", {
        method: "GET",
      });
      const data = await res.json();
      setLayanan(data);
      setLoading(false);
    } catch (err) {
      console.log("[layanan_GET]", err);
    }
  };

  const handleDetail = async (props: LayananType) => {
    router.push(`/layanan/${props._id}`);
  }



  const handleDelete = async (props: LayananType) => {
    console.log(props);
    try {
      const res = await fetch(`/api/layanan/${props._id}`, {
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
    getLayanan();
  }, []);

  return loading ? <Loader /> : (
    <>
      <PageHeader
        title="Layanan"
        crumbs={[{ label: 'Layanan' }]}
        className="mb-6"
      >
        <Link href="/layanan/new">
          <Button
            className="h-fit"
            color="primary"
            startIcon={<IcAdd />}
          >
            Create Layanan
          </Button>
        </Link>
      </PageHeader>
      <Paper>
        <DataTable
          columns={TABLE_COLUMNS}
          data={layanan}
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
          searchPlaceholder="Search by Layanan"
          showPagination
          uniqueRowKey="_id"
          totalData={10}
          showCountTotal
        />
      </Paper>
    </>
  );
};

export default Layanan;
