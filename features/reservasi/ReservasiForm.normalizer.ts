import {ReservasiType} from "@/lib/types";

const reservasiListNormalizer = (data: ReservasiType[]) => {

  const listData = (data || []).map(
    (el) => ({
      _id: el._id || '',
      nomorTelepon: el.nomorTelepon || '',
      namaPasien: el.namaPasien || '',
      triase: el.triase || '',
      tanggalKonsultasi: el.tanggalKonsultasi || '',
      polikliniks: el.polikliniks.name || '',
      layanans: el.layanans.name || '',
    }),
  );
  return listData
}

export default reservasiListNormalizer;
