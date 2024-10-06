import { NextResponse } from "next/server";
import twilio from "twilio";

const accountSid = process.env.REACT_APP_TWILIO_ACCOUNT_SID;
const authToken = process.env.REACT_APP_TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

export async function POST(request) {
  // Log environment variables for debugging
  console.log("TWILIO_ACCOUNT_SID:", process.env.REACT_APP_TWILIO_ACCOUNT_SID);
  console.log("TWILIO_AUTH_TOKEN:", process.env.REACT_APP_TWILIO_AUTH_TOKEN);
  console.log(
    "TWILIO_PHONE_NUMBER:",
    process.env.REACT_APP_TWILIO_PHONE_NUMBER
  );

  try {
    const { phoneNumber, combinedMessage } = await request.json();

    const messageResponse = await client.messages.create({
      body: combinedMessage,
      from: process.env.REACT_APP_TWILIO_PHONE_NUMBER,
      to: phoneNumber,
    });

    return NextResponse.json({ success: true, sid: messageResponse.sid });
  } catch (error) {
    console.error("Error sending SMS:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
