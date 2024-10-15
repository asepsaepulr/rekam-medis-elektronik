"use client";


import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Plus } from "lucide-react";

import Loader from "@/components/custom ui/Loader";
import Button from "@/components/base/Button";
import DataTable from "@/components/ui/DataTable";
import {ProductType, RekamMedisType, ReservasiType} from "@/lib/types";
import PageHeader from "@/components/ui/PageHeader";
import Link from "next/link";
import IcAdd from "@/components/icons/IcAdd";
import Paper from "@/components/base/Paper";
import {TABLE_COLUMNS} from "#reservasi/ReservasiColumns";
import IcTrash from "@/components/icons/IcTrash";
import toast from "react-hot-toast";
import reservasiListNormalizer from "#reservasi/ReservasiForm.normalizer";
import IcEyeOpen from "@/components/icons/IcEyeOpen";

const Reservasi = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [reservasi, setReservasi] = useState([]);
  console.log("rese",reservasi )

  const getReservasi = async () => {
    try {
      const res = await fetch("/api/reservasi", {
        method: "GET",
      });
      const data = await res.json();
      const dataList = reservasiListNormalizer(data);
      console.log("norm",dataList)
      setReservasi(dataList);
      setLoading(false);
    } catch (err) {
      console.log("[reservasi_GET]", err);
    }
  };

  const handleDetail = async (props: ReservasiType) => {
    router.push(`/reservasi/${props._id}`);
  }

  const handleDelete = async (props: ReservasiType) => {
    console.log(props);
    try {
      const res = await fetch(`/api/reservasi/${props._id}`, {
        method: "DELETE",
      })

      if (res.ok) {
        window.location.href = (`/reservasi`)
        toast.success(`Reservasi deleted`)
      }
    } catch (err) {
      console.log(err)
      toast.error("Something went wrong! Please try again.")
    }
  }

  useEffect(() => {
    getReservasi();
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
      <PageHeader
        title="Reservasi"
        crumbs={[{ label: 'Reservasi' }]}
        className="mb-6"
      >
        <Link href="/reservasi/new">
          <Button
            className="h-fit"
            color="primary"
            startIcon={<IcAdd />}
          >
            Create Reservasi
          </Button>
        </Link>
      </PageHeader>
      <Paper>
        <DataTable
          columns={TABLE_COLUMNS}
          data={reservasi}
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

export default Reservasi;
