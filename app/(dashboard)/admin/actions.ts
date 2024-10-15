'use server'

import { clerkClient } from "@clerk/nextjs/server"
import {CONFIG as MAIL_CONFIG, sendMail} from "@/lib/mail";

export async function setBetaStatus(userId: string, status: boolean) {
  await clerkClient.users.updateUserMetadata(userId, {
    publicMetadata: {
      isBetaUser: status
    }
  })
}

export async function setRole(formData: FormData) {
  await clerkClient().users.updateUserMetadata(formData.get('id') as string, {
    publicMetadata: {
      role: formData.get('role') as string
    }
  })
}

export async function removeRole(formData: FormData) {
  const res = await clerkClient().users.updateUserMetadata(formData.get('id') as string, {
    publicMetadata: {
      role: "null"
    }
  })
}

export async function getListUser() {
  const listUser = await clerkClient.users.getUserList()

  return listUser.data;
}

export async function getUserById(userId: string) {
  const userById = await clerkClient.users.getUser(userId)

  return userById;
}

export async function getListPasien() {
  const listUser = await clerkClient.users.getUserList();
  const users = listUser.data;
  const pasienUsers = users.filter(user => user.publicMetadata?.role === 'pasien' && user.publicMetadata?.isBetaUser === true);
  const usersWithFullName = pasienUsers.map(user => ({
    label: `${user.firstName || '-'} ${user.lastName || '-'}`.trim(),
    value: user.id,
  }));

  return usersWithFullName;
}

export async function sendEmailActivation(name: string, email: string) {
  await sendMail({
    to: email,
    from: MAIL_CONFIG.from,
    subject: 'RME UTAMA Klinik - Activation User.',
    html: `
      <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
  <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #f4f4f4;">
    <tr>
      <td style="padding: 20px;">
        <table role="presentation" style="width: 100%; max-width: 600px; margin: 0 auto; background-color: #ffffff; border-collapse: collapse; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
          <!-- Header -->
          <tr>
            <td style="background-color: #1c58c7; color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0;">
              <h1 style="margin: 0; font-size: 24px;">UTAMA Klinik</h1>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding: 20px; text-align: left;">
              <h2 style="font-size: 20px; margin-bottom: 10px;">Akun Anda Sudah Aktif!</h2>
              <p style="font-size: 16px;">Halo Bpk/Ibu <strong>${name}</strong>,</p>
              <p style="font-size: 16px;">Selamat! Akun Anda telah berhasil diaktifkan di <strong>Utama Klinik</strong>. Anda sekarang dapat mengakses semua layanan kami secara online.</p>
              <p style="font-size: 16px;">Untuk masuk ke akun Anda, silakan klik tautan berikut:</p>
              <p><a href="http://localhost:3000" style="color: #1c58c7; text-decoration: none;">Masuk ke Akun Anda</a></p>
              <p style="font-size: 16px;">Jika Anda memiliki pertanyaan atau membutuhkan bantuan lebih lanjut, jangan ragu untuk menghubungi tim dukungan kami.</p>
              <p style="font-size: 16px;">Terima kasih telah memilih Utama Klinik!</p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f4f4f4; padding: 20px; text-align: center; font-size: 12px; color: #777;">
              <p>&copy; 2024 Utama Klinik. Semua hak dilindungi.</p>
              <p>Jl. Cikutra No.204A, Sukapada, Kec. Cibeunying Kidul, Kota Bandung | Telp: (021) 123-4567</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>

              `,
  });

}


