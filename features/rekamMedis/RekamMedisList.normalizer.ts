import {RekamMedisType} from "@/lib/types";
import formatDateList from "../../utils/formatDateList";

const rekamMedisListNormalizer = (data: RekamMedisType[]) => {

  const listData = (data || []).map(
    (el) => ({
      _id: el._id || '',
      namaPasien: el.namaPasien || '',
      noRekamMedis: el.noRekamMedis || '',
      nakes: el.nakes || '',
      createdAt: el.createdAt ? formatDateList(el.createdAt) : '',
    }),
  );
  console.log("d",listData)
  return listData
}

export default rekamMedisListNormalizer;
