import nodemailer from 'nodemailer';

export async function POST(request) {
  try {
    const { firstName, lastName, email, phone, message } = await request.json();

    // Validate required fields
    if (!firstName || !lastName || !email || !message) {
      return Response.json({ error: "Missing required fields" }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,  // Your Gmail
        pass: process.env.EMAIL_PASSWORD,  // Your App Password
      },
    });

    // Email to YOU (the website owner)
    await transporter.sendMail({
      from: `"Contact Form" <${process.env.EMAIL_USER}>`,  // Sender alias
      to: process.env.EMAIL_USER,  // Send to YOUR email
      subject: `New message from ${firstName} ${lastName}`,
      html: `
        <h1>New Contact Form Submission</h1>
        <p><strong>From:</strong> ${firstName} ${lastName} (${email})</p>
        <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
        <h2>Message:</h2>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    });

    // Optional: Send confirmation to the submitter
    await transporter.sendMail({
      from: `"Your Website" <${process.env.EMAIL_USER}>`,
      to: email,  // Reply to the submitter
      subject: "We received your message!",
      html: `<p>Hi ${firstName}, we'll get back to you soon!</p>`,
    });

    return Response.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return Response.json({ error: "Failed to send email" }, { status: 500 });
  }
}