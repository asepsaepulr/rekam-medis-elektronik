import Customer from "../models/Customer";
import Order from "../models/Order";
import { connectToDB } from "../mongoDB"
import {getListUser} from "@/app/(dashboard)/admin/actions";
import {clerkClient} from "@clerk/nextjs/server";

export const getTotalSales = async () => {
  await connectToDB();
  const orders = await Order.find()
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((acc, order) => acc + order.totalAmount, 0)
  return { totalOrders, totalRevenue }
}

export const getTotalUsers = async () => {
  const users = await getListUser()
  const totalUsers = users.length
  return totalUsers
}

export const getTotalDokters = async () => {
  const listUser = await clerkClient.users.getUserList();
  const users = listUser.data;
  const pasienUsers = users.filter(user => user.publicMetadata?.role === 'dokter' && user.publicMetadata?.isBetaUser === true);
  const totalDokters = pasienUsers.length
  return totalDokters
}

export const getTotalPasiens = async () => {
  const listUser = await clerkClient.users.getUserList();
  const users = listUser.data;
  const pasienUsers = users.filter(user => user.publicMetadata?.role === 'pasien' && user.publicMetadata?.isBetaUser === true);
  const totalPasiens = pasienUsers.length
  return totalPasiens
}

export const getSalesPerMonth = async () => {
  await connectToDB()
  const orders = await Order.find()

  const salesPerMonth = orders.reduce((acc, order) => {
    const monthIndex = new Date(order.createdAt).getMonth(); // 0 for Janruary --> 11 for December
    acc[monthIndex] = (acc[monthIndex] || 0) + order.totalAmount;
    // For June
    // acc[5] = (acc[5] || 0) + order.totalAmount (orders have monthIndex 5)
    return acc
  }, {})

  const graphData = Array.from({ length: 12}, (_, i) => {
    const month = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(new Date(0, i))
    // if i === 5 => month = "Jun"
    return { name: month, sales: salesPerMonth[i] || 0 }
  })

  return graphData
}
