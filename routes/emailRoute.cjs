const express = require('express');
const sgMail = require('@sendgrid/mail');

const router = express.Router();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const escapeHtml = (str = '') =>
  String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

router.post('/send-email', async (req, res) => {
  try {
    const { name, email, message } = req.body || {};

    if (!name || !email || !message) {
      return res
        .status(400)
        .json({ success: false, message: 'All fields are required.' });
    }

    if (!isValidEmail(email)) {
      return res
        .status(400)
        .json({ success: false, message: 'Invalid email address.' });
    }

    if (message.length > 5000 || name.length > 200) {
      return res
        .status(400)
        .json({ success: false, message: 'Payload too large.' });
    }

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeMessage = escapeHtml(message).replace(/\n/g, '<br/>');

    const msg = {
      to: process.env.MAIL_TO,
      from: process.env.MAIL_FROM,
      replyTo: email,
      subject: `Portfolio contact — ${safeName}`,
      text: `Company: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;padding:20px;border:1px solid #e5e7eb;border-radius:8px;">
          <h2 style="color:#1e3a8a;margin-top:0;">New Portfolio Message</h2>
          <p><strong>Company Name:</strong> ${safeName}</p>
          <p><strong>Sender Email:</strong> <a href="mailto:${safeEmail}">${safeEmail}</a></p>
          <hr style="border:none;border-top:1px solid #e5e7eb;"/>
          <p><strong>Message:</strong></p>
          <p style="white-space:pre-wrap;line-height:1.5;">${safeMessage}</p>
        </div>
      `,
    };

    await sgMail.send(msg);

    return res
      .status(200)
      .json({ success: true, message: 'Email sent successfully.' });
  } catch (err) {
    console.error('SendGrid error:', err.response?.body || err.message);
    return res
      .status(500)
      .json({ success: false, message: 'Failed to send email.' });
  }
});

module.exports = router;
