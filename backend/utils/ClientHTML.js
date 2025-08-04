module.exports.clientHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Thank You - Message Received</title>
  <style>
    * {
      box-sizing: border-box;
    }

    body {
      margin: 0;
      padding: 0;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'SF Pro Display', Roboto, Helvetica, Arial, sans-serif;
      background: #ffffff;
      color: #1f2937;
      line-height: 1.6;
      min-height: 100vh;
      padding: 20px 0;
    }

    .email-container {
      max-width: 680px;
      margin: 0 auto;
      background: #ffffff;
      border-radius: 24px;
      overflow: hidden;
      box-shadow:
        0 8px 16px rgba(0, 0, 0, 0.05),
        0 2px 4px rgba(0, 0, 0, 0.03);
      border: 1px solid #e5e7eb;
    }

    .email-header {
      padding: 48px 40px 40px;
      text-align: center;
    }

    .email-header h1 {
      color: #111827;
      font-size: 28px;
      font-weight: 700;
      margin: 0 0 12px 0;
      letter-spacing: -0.5px;
    }

    .email-header p {
      color: #4b5563;
      font-size: 16px;
      margin: 0;
      font-weight: 400;
    }

    .email-body {
      padding: 48px 40px;
      background: #ffffff;
    }

    .greeting {
      font-size: 18px;
      font-weight: 600;
      color: #111827;
      margin-bottom: 24px;
      line-height: 1.4;
    }

    .content-text {
      font-size: 16px;
      line-height: 1.75;
      color: #4b5563;
      margin-bottom: 24px;
    }

    .highlight-box {
      background: #f1f5f9;
      border-left: 4px solid #0ea5e9;
      padding: 20px 24px;
      margin: 32px 0;
      border-radius: 0 12px 12px 0;
      position: relative;
    }

    .highlight-box::before {
      content: '💡';
      position: absolute;
      top: 20px;
      right: 24px;
      font-size: 20px;
    }

    .highlight-text {
      font-size: 15px;
      color: #0c4a6e;
      margin: 0;
      font-weight: 500;
    }

    .cta-section {
      text-align: center;
      margin: 40px 0 32px;
    }

    .cta-button {
      display: inline-block;
      background: #2563eb;
      color: white;
      text-decoration: none;
      padding: 16px 32px;
      border-radius: 50px;
      font-weight: 600;
      font-size: 15px;
      letter-spacing: 0.5px;
      transition: all 0.3s ease;
    }

    .cta-button:hover {
      background: #1d4ed8;
    }

    .signature-section {
      border-top: 1px solid #e5e7eb;
      padding-top: 32px;
      margin-top: 40px;
    }

    .signature {
      display: flex;
      align-items: center;
      gap: 16px;
    }

    .signature-avatar {
      display: none; /* Removed avatar circle */
    }

    .signature-content {
      flex: 1;
    }

    .signature-name {
      font-size: 16px;
      font-weight: 600;
      color: #111827;
      margin: 0 0 4px 0;
    }

    .signature-title {
      font-size: 14px;
      color: #6b7280;
      margin: 0;
    }

    .email-footer {
      padding: 32px 40px;
      text-align: center;
      border-top: 1px solid #e2e8f0;
    }

    .footer-text {
      font-size: 13px;
      color: #64748b;
      margin: 0;
      line-height: 1.6;
    }

    /* Responsive Design */
    @media (max-width: 640px) {
      body {
        padding: 10px 0;
      }

      .email-container {
        margin: 0 10px;
        border-radius: 16px;
      }

      .email-header {
        padding: 32px 24px 24px;
      }

      .email-header h1 {
        font-size: 24px;
      }

      .email-header p {
        font-size: 15px;
      }

      .email-body {
        padding: 32px 24px;
      }

      .greeting {
        font-size: 16px;
      }

      .content-text {
        font-size: 15px;
      }

      .highlight-box {
        padding: 16px 20px;
        margin: 24px 0;
      }

      .cta-button {
        padding: 14px 28px;
        font-size: 14px;
      }

      .email-footer {
        padding: 24px 24px;
      }
    }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="email-header">
      <h1>Message Received!</h1>
      <p>Thank you for reaching out. Your inquiry is important to me.</p>
    </div>
    
    <div class="email-body">
      <div class="greeting">
        Hi {{clientName}},
      </div>
      
      <p class="content-text">
        Thank you for getting in touch! I've received your message and truly appreciate you taking the time to reach out.
      </p>
      
      <p class="content-text">
        I'll personally review your inquiry and get back to you as soon as possible — typically within 24 hours. I believe in providing thoughtful, personalized responses to every message I receive.
      </p>
      
      <div class="highlight-box">
        <p class="highlight-text">
          In the meantime, feel free to explore my portfolio and recent work. I'm always excited to connect with new people and discuss potential collaborations.
        </p>
      </div>
      
      <div class="cta-section">
        <a href="https://santusht.me/" class="cta-button">View My Portfolio</a>
      </div>
      
     <div class="signature-section">
  <div class="signature">
    <div class="signature-content">
      <div class="signature-heading" style="font-size: 14px; color: #6b7280; margin-bottom: 4px;">
        Thanks again,
      </div>
      <div class="signature-name">Santusht</div>
    </div>
  </div>
</div>

    
    <div class="email-footer">
      <p class="footer-text">
        This is an automated response to confirm I've received your message.<br>
        You'll hear from me personally very soon.
      </p>
    </div>
  </div>
</body>
</html>
`;

module.exports.MyHTMLTemplate = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>New Inquiry</title>
    <style>
      body {
        margin: 0;
        padding: 48px 24px;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
        font-size: 16px;
        color: #444;
        background: #fff;
        line-height: 1.75;
      }

      .container {
        max-width: 640px;
        margin: 0 auto;
      }

      .heading {
        font-size: 20px;
        font-weight: 600;
        color: #222;
        margin-bottom: 32px;
      }

      .field {
        margin-bottom: 24px;
      }

      .label {
        font-weight: 600;
        font-size: 15px;
        color: #333;
        margin-bottom: 4px;
      }

      .value {
        font-size: 16px;
        color: #555;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="heading">📩 New Client Inquiry Received</div>

      <div class="field">
        <div class="label">Name</div>
        <div class="value">{{clientName}}</div>
      </div>

      <div class="field">
        <div class="label">Email</div>
        <div class="value">{{clientEmail}}</div>
      </div>

      <div class="field">
        <div class="label">Phone</div>
        <div class="value">{{clientPhone}}</div>
      </div>

      <div class="field">
        <div class="label">Message</div>
        <div class="value">{{clientMessage}}</div>
      </div>
    </div>
  </body>
</html>
`;
