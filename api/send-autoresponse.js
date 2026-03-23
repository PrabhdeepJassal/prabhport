import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  const { name, email, message } = req.body;

  if (!name || !email) {
    return res.status(400).json({ success: false, message: "Name and email are required" });
  }

  try {
    // create transporter inside function (required for serverless)
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const mailToUser = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: `Welcome ${name}! Thank you for connecting 🚀`,
      html: `YOUR_HTML_TEMPLATE_HERE (same as before)`
    };

    await transporter.sendMail(mailToUser);

    return res.status(200).json({
      success: true,
      message: "Auto-response sent successfully!",
    });

  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to send auto-response",
      error,
    });
  }
}
