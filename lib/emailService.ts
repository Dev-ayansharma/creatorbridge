import nodemailer from "nodemailer"

const createtransport = nodemailer.createTransport({
    host:"smtp-relay.brevo.com",
    port:587,
    auth:{
        user:process.env.BREVO_USER,
        pass:process.env.BREVO_PASS
    }
})

export async function sendOTPEmail(email: string, otp: string) {
  await createtransport.sendMail({
    from: `"CreatorBridge" <${process.env.BREVO_USER}>`,
    to: email,
    subject: "Verify Your Email",
    html: `
      <h2>Email Verification</h2>
      <p>Your OTP is:</p>
      <h1>${otp}</h1>
      <p>This OTP expires in 10 minutes.</p>
    `
  });
}