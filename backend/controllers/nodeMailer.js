const nodemailer = require("nodemailer");
require("dotenv").config();

let transporter = nodemailer.createTransport({
	host: "smtp.gmail.com",
	port: 587,
	secure: false,
	auth: {
		user: process.env.GMAIL_HOST_USER,
		pass: process.env.GMAIL_APP_PASS,
	},
});

exports.sendGmail = async (req, res) => {
	const { toEmail, text, subject } = req.body;
	try {
		let mailOption = {
			from: process.env.GMAIL_HOST_USER,
			to: toEmail,
			subject: subject,
			text: text,
		};

		const info = await transporter.sendMail(mailOption);
		console.log(info);

		// Ensure no response is sent twice
		if (!info) {
			return res.status(400).json({
				message: "Invalid credentials or email not sent",
			});
		}

		return res.status(200).json({
			message: "Email sent successfully",
		});
	} catch (error) {
		console.error(error);
		// Ensure a single response is sent in case of errors
		return res.status(500).json({
			message: "Failed to send email",
			error: error.message,
		});
	}
};
