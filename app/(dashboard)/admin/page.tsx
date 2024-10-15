import React from 'react'
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import UserRow from './UserRow'
import PageHeader from "@/components/ui/PageHeader";
import Paper from "@/components/base/Paper"
import {getListUser} from "@/app/(dashboard)/admin/actions";

export const fetchCache = 'force-no-store';

async function Admin() {
  const users = await getListUser();

  return (
    <>
      <PageHeader
        title="User Activation"
        crumbs={[{ label: 'List User' }]}
        className="mb-6"
      >
      </PageHeader>
  <Paper>
    <div className="px-10 py-5">
      <div className="flex items-center justify-between">
        <Table className='border border-gray-200 rounded-lg'>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Set Role</TableHead>
              <TableHead className="text-right">Inactive/Active</TableHead>
              <TableHead>Last Active</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead>Updated At</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users?.map(u => (
              <UserRow key={u.id}
                       id={u.id}
                       name={`${u.firstName != null? u.firstName : ""} ${u.lastName != null? u.lastName : "" }`}
                       metadata={u.publicMetadata}
                       emailAddress={u.emailAddresses[0]?.emailAddress}
                       lastActiveAt={u.lastActiveAt !== null? u.lastActiveAt : 0}
                       createdAt={u.createdAt}
                       updatedAt={u.updatedAt}/>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  </Paper>
    </>
)
}

export default Admin
