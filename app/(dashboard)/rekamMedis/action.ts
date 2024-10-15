import {CONFIG as MAIL_CONFIG, sendMail} from "@/lib/mail";

export async function sendEmailRekamMedis(name: string, email: string, noRME: string) {
  console.log("email rekam", name, email, noRME)
  await sendMail({
    to: email,
    from: MAIL_CONFIG.from,
    subject: 'RME UTAMA Klinik - Rekam Medis.',
    html: `
    <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif;">
  <table role="presentation" style="width: 100%; border-collapse: collapse; margin: 0; padding: 0;">
    <tr>
      <td style="padding: 20px; background-color: #f4f4f4;">
        <table role="presentation" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-collapse: collapse;">
          <!-- Header -->
          <tr>
            <td style="background-color: #1c58c7; padding: 20px; text-align: center;">
              <h1 style="color: white; font-size: 24px;">UTAMA Klinik</h1>
            </td>
          </tr>
          <!-- Body -->
          <tr>
            <td style="padding: 20px;">
              <h2 style="font-size: 20px;">Pesanan Obat Anda Sudah Siap Diambil dan Anda bisa memeriksa hasil Rekam Medis via Aplikasi!</h2>
              <p style="font-size: 16px; color: #333;">Halo <strong>${name}</strong>,</p>
              <p style="font-size: 16px; color: #333;">Pesanan obat Anda di Utama Klinik sudah siap diambil. Berikut detailnya:</p>
              <table role="presentation" style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="font-size: 14px; padding: 10px; border: 1px solid #ddd;">Nama Pasien:</td>
                  <td style="font-size: 14px; padding: 10px; border: 1px solid #ddd;">${name}</td>
                </tr>
                <tr>
                  <td style="font-size: 14px; padding: 10px; border: 1px solid #ddd;">No. Rekam Medis:</td>
                  <td style="font-size: 14px; padding: 10px; border: 1px solid #ddd;">${noRME}</td>
                </tr>
              </table>
              <p style="font-size: 16px;">Silakan ambil obat Anda di apotek kami. Terima kasih!</p>
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
