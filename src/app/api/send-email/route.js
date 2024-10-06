import { NextResponse } from "next/server";
import sgMail from "@sendgrid/mail";

export async function POST(request) {
  const { firstName, lastName, phoneNumber, email, message } =
    await request.json();

  // Set up SendGrid
  sgMail.setApiKey(process.env.REACT_APP_SENDGRID_API_KEY);

  const msg = {
    to: "sethshuey1@gmail.com",
    from: "abductedprairiedogstudio@gmail.com",
    subject: `Website Contact from ${firstName} ${lastName}`,
    text: `Name: ${firstName} ${lastName}\nPhone Number: ${phoneNumber}\nEmail: ${email}\nMessage: ${message}`,
    html: `
      <h1>Website Contact Form Submission</h1>
      <p><strong>First Name:</strong> ${firstName}</p>
      <p><strong>Last Name:</strong>  ${lastName}</p>
      <p><strong>Phone Number:</strong> ${phoneNumber}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong> ${message}</p>
    `,
  };

  try {
    await sgMail.send(msg);
    return NextResponse.json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { message: "Error sending email" },
      { status: 500 }
    );
  }
}
