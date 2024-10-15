import {clerkClient} from "@clerk/nextjs/server";
import ReservasiForm from "#reservasi/ReservasiForm";

async function ReservasiForms() {
  let res = await clerkClient.users.getUserList({})
  let users = res.data
  const dokterUsers = users.filter(user => user.publicMetadata?.role === 'dokter' && user.publicMetadata?.isBetaUser === true);
  const usersWithFullName = dokterUsers.map(user => ({
    label: `${user.firstName} ${user.lastName}`,
    value: user.id,
  }));
  return (
    <ReservasiForm
      metaData={usersWithFullName}
    />
  )
}

export default ReservasiForms

