const { app } = require('@azure/functions');
const sgMail = require('@sendgrid/mail');

app.http('sendEmail', {
    methods: ['POST'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        context.log('Email function processed a request.');

        const apiKey = process.env.SENDGRID_API_KEY;
        if (!apiKey) {
            context.log('Error: SENDGRID_API_KEY is missing.');
            return { status: 500, body: 'Server misconfiguration: Missing email credentials.' };
        }

        sgMail.setApiKey(apiKey);

        try {
            const { to, subject, text, html } = await request.json();

            if (!to || !subject || (!text && !html)) {
                return { status: 400, body: 'Missing required fields: to, subject, and text/html.' };
            }

            const msg = {
                to,
                from: process.env.SENDGRID_FROM_EMAIL || 'no-reply@pave-demo.com', // Must be verified in SendGrid
                subject,
                text,
                html: html || text,
            };

            await sgMail.send(msg);
            context.log(`Email sent to ${to}`);
            return { status: 200, body: 'Email sent successfully.' };

        } catch (error) {
            context.log.error('Error sending email:', error);
            if (error.response) {
                context.log.error(error.response.body);
            }
            return { status: 500, body: 'Failed to send email.' };
        }
    }
});
