import { connect } from "cloudflare:sockets";

/**
 * Edge-compatible SMTP client for Cloudflare Workers
 * Communicates with smtp.gmail.com:465 over secure TLS sockets.
 */
class SmtpSession {
  constructor(socket) {
    this.socket = socket;
    this.reader = socket.readable.getReader();
    this.writer = socket.writable.getWriter();
    this.encoder = new TextEncoder();
    this.decoder = new TextDecoder();
    this.buffer = "";
  }

  async sendCommand(cmd) {
    await this.writer.write(this.encoder.encode(cmd + "\r\n"));
  }

  async readResponse() {
    while (true) {
      const lineEnd = this.buffer.indexOf("\r\n");
      if (lineEnd !== -1) {
        const line = this.buffer.slice(0, lineEnd);
        this.buffer = this.buffer.slice(lineEnd + 2);
        // Multiline response in SMTP has format '250-...' while last line is '250 ...'
        if (/^\d{3}-/.test(line)) {
          continue;
        }
        if (/^\d{3} /.test(line) || /^\d{3}$/.test(line)) {
          return line;
        }
      }

      const { value, done } = await this.reader.read();
      if (done) {
        if (this.buffer.length > 0) {
          const rem = this.buffer;
          this.buffer = "";
          return rem;
        }
        throw new Error("SMTP connection closed unexpectedly by remote server");
      }
      this.buffer += this.decoder.decode(value, { stream: true });
    }
  }

  async close() {
    try {
      await this.sendCommand("QUIT");
    } catch {}
    try {
      this.reader.releaseLock();
    } catch {}
    try {
      this.writer.releaseLock();
    } catch {}
    try {
      await this.socket.close();
    } catch {}
  }
}

/**
 * Send an email via Gmail SMTP (SMTPS TLS port 465)
 */
export async function sendGmailSmtp({
  user,
  pass,
  from,
  to,
  replyTo,
  subject,
  html,
}) {
  if (!user || !pass) {
    throw new Error("Gmail SMTP credentials (EMAIL_USER / EMAIL_PASS) are missing");
  }

  const cleanPass = pass.replace(/\s+/g, "");
  const socket = connect(
    { hostname: "smtp.gmail.com", port: 465 },
    { secureTransport: "on", allowHalfOpen: false }
  );

  const session = new SmtpSession(socket);

  try {
    // 1. Read greeting (220)
    const greeting = await session.readResponse();
    if (!greeting.startsWith("220")) {
      throw new Error(`SMTP Greeting Failed: ${greeting}`);
    }

    // 2. Send EHLO
    await session.sendCommand("EHLO localhost");
    const ehloRes = await session.readResponse();
    if (!ehloRes.startsWith("250")) {
      throw new Error(`SMTP EHLO Failed: ${ehloRes}`);
    }

    // 3. Auth Login
    await session.sendCommand("AUTH LOGIN");
    const authPrompt1 = await session.readResponse();
    if (!authPrompt1.startsWith("334")) {
      throw new Error(`SMTP AUTH Prompt 1 Failed: ${authPrompt1}`);
    }

    // 4. Send Base64 Username
    const userB64 = Buffer.from(user).toString("base64");
    await session.sendCommand(userB64);
    const authPrompt2 = await session.readResponse();
    if (!authPrompt2.startsWith("334")) {
      throw new Error(`SMTP AUTH Prompt 2 Failed: ${authPrompt2}`);
    }

    // 5. Send Base64 Password
    const passB64 = Buffer.from(cleanPass).toString("base64");
    await session.sendCommand(passB64);
    const authRes = await session.readResponse();
    if (!authRes.startsWith("235")) {
      throw new Error(`SMTP Authentication Failed (Check Google App Password): ${authRes}`);
    }

    // 6. MAIL FROM
    await session.sendCommand(`MAIL FROM:<${user}>`);
    const mailFromRes = await session.readResponse();
    if (!mailFromRes.startsWith("250")) {
      throw new Error(`SMTP MAIL FROM Failed: ${mailFromRes}`);
    }

    // 7. RCPT TO
    await session.sendCommand(`RCPT TO:<${to}>`);
    const rcptToRes = await session.readResponse();
    if (!rcptToRes.startsWith("250")) {
      throw new Error(`SMTP RCPT TO Failed: ${rcptToRes}`);
    }

    // 8. DATA
    await session.sendCommand("DATA");
    const dataPrompt = await session.readResponse();
    if (!dataPrompt.startsWith("354")) {
      throw new Error(`SMTP DATA Prompt Failed: ${dataPrompt}`);
    }

    // 9. Build MIME Message
    const encodedSubject = `=?UTF-8?B?${Buffer.from(subject).toString("base64")}?=`;
    const messageId = `<${Date.now()}.${Math.random().toString(36).substring(2)}@santusht.online>`;
    const dateStr = new Date().toUTCString();
    const htmlB64 = Buffer.from(html, "utf-8").toString("base64");

    const mimeHeaders = [
      `From: ${from}`,
      `To: ${to}`,
      replyTo ? `Reply-To: ${replyTo}` : null,
      `Subject: ${encodedSubject}`,
      `Date: ${dateStr}`,
      `Message-ID: ${messageId}`,
      "MIME-Version: 1.0",
      "Content-Type: text/html; charset=UTF-8",
      "Content-Transfer-Encoding: base64",
    ]
      .filter(Boolean)
      .join("\r\n");

    const fullMessage = `${mimeHeaders}\r\n\r\n${htmlB64}\r\n.`;
    await session.sendCommand(fullMessage);

    const dataRes = await session.readResponse();
    if (!dataRes.startsWith("250")) {
      throw new Error(`SMTP Message Send Failed: ${dataRes}`);
    }

    return { success: true, response: dataRes };
  } finally {
    await session.close();
  }
}
