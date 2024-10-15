"use client";


import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import Loader from "@/components/custom ui/Loader";
import Button from "@/components/base/Button";
import DataTable from "@/components/ui/DataTable";
import {RekamMedisType} from "@/lib/types";
import PageHeader from "@/components/ui/PageHeader";
import Link from "next/link";
import IcAdd from "@/components/icons/IcAdd";
import Paper from "@/components/base/Paper";
import { TABLE_COLUMNS } from "@/features/rekamMedis/RekamMedisColumns";
import IcTrash from "@/components/icons/IcTrash";
import IcEyeOpen from "@/components/icons/IcEyeOpen";

import toast from "react-hot-toast";
import rekamMedisListNormalizer from "#rekamMedis/RekamMedisList.normalizer";

const RekamMedis = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [rekamMedis, setRekamMedis] = useState([]);

  const getRekamMedis = async () => {
    try {
      const res = await fetch("/api/rekamMedis", {
        method: "GET",
      });
      const data = await res.json();
      const dataList = rekamMedisListNormalizer(data);
      console.log("norm",dataList)
      setRekamMedis(dataList);
      setLoading(false);
    } catch (err) {
      console.log("[rekamMedis_GET]", err);
    }
  };
  const handleDetail = async (props: RekamMedisType) => {
    router.push(`/rekamMedis/${props._id}`);
  }

  const handleDelete = async (props: RekamMedisType) => {
    console.log(props);
    try {
      const res = await fetch(`/api/rekamMedis/${props._id}`, {
        method: "DELETE",
      })

      if (res.ok) {
        window.location.href = (`/rekamMedis`)
        toast.success(`Rekam Medis deleted`)
      }
    } catch (err) {
      console.log(err)
      toast.error("Something went wrong! Please try again.")
    }
  }

  useEffect(() => {
    getRekamMedis();
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
      <PageHeader
        title="Rekam Medis"
        crumbs={[{ label: 'Rekam Medis' }]}
        className="mb-6"
      >
        <Link href="/rekamMedis/new">
          <Button
            className="h-fit"
            color="primary"
            startIcon={<IcAdd />}
          >
            Create Rekam Medis
          </Button>
        </Link>
      </PageHeader>
      <Paper>
        <DataTable
          columns={TABLE_COLUMNS}
          data={rekamMedis}
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
          searchPlaceholder="Search by Nama Pasien"
          showPagination
          uniqueRowKey="_id"
          totalData={10}
          showCountTotal
        />
      </Paper>
    </>
  );
};

export default RekamMedis;
