import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS, // Gmail App Password
  },
});

export const sendWelcomeMail = async (email, name) => {
  const htmlTemplate = `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <title>Welcome to Car Rental</title>
      <style>
        body {
          margin: 0;
          padding: 0;
          background-color: #f4f4f4;
          font-family: Arial, sans-serif;
        }
        .container {
          max-width: 600px;
          margin: 40px auto;
          background: #ffffff;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        }
        .header {
          background: linear-gradient(135deg, #ff7a18, #ff9f1c);
          padding: 30px;
          text-align: center;
          color: white;
        }
        .header h1 {
          margin: 0;
          font-size: 28px;
        }
        .content {
          padding: 30px;
          color: #333;
        }
        .content h2 {
          margin-top: 0;
        }
        .content p {
          line-height: 1.6;
          font-size: 16px;
        }
        .button {
          display: inline-block;
          margin-top: 20px;
          padding: 14px 28px;
          background: #ff7a18;
          color: #ffffff !important;
          text-decoration: none;
          border-radius: 30px;
          font-weight: bold;
          font-size: 16px;
        }
        .features {
          margin-top: 30px;
        }
        .feature {
          margin-bottom: 10px;
        }
        .footer {
          background: #f9f9f9;
          padding: 20px;
          text-align: center;
          font-size: 14px;
          color: #777;
        }
        .footer strong {
          color: #ff7a18;
        }
      </style>
    </head>

    <body>
      <div class="container">
        <div class="header">
          <h1>🚗 Welcome to Car Rental</h1>
        </div>

        <div class="content">
          <h2>Hello ${name} 👋</h2>

          <p>
            We’re thrilled to have you onboard! Your account has been
            <strong>successfully created</strong>.
          </p>

          <p>
            With <strong>Car Rental</strong>, you can easily book reliable,
            comfortable, and affordable cars anytime, anywhere.
          </p>

          <div class="features">
            <div class="feature">✔️ Easy car booking</div>
            <div class="feature">✔️ Secure & trusted service</div>
            <div class="feature">✔️ Wide range of vehicles</div>
          </div>

          <a href="http://localhost:5173/profile" class="button">
            Go to Dashboard
          </a>
        </div>

        <div class="footer">
          <p>
            Need help? Just reply to this email — we’re always happy to help 😊
          </p>
          <p>
            © ${new Date().getFullYear()} <strong>Car Rental</strong>. All rights reserved.
          </p>
        </div>
      </div>
    </body>
  </html>
  `;

  await transporter.sendMail({
    from: `"Car Rental 🚗" <${process.env.MAIL_USER}>`,
    to: email,
    subject: "🎉 Welcome to Car Rental – Let’s Get You Moving!!",
    html: htmlTemplate,
  });
};
