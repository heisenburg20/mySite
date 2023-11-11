import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.get("/about", (req, res) => {
    res.render("about.ejs");
});

app.get("/contact", (req, res) => {
    res.render("contact.ejs");
});

app.post('/send', (req, res) => {
    const { email, text } = req.body;
  
    // Create a nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'astleytac@gmail.com', // Your Gmail email address
        pass: 'd', // Your Gmail password
      },
    });
  
    // Email content
    const mailOptions = {
      from: 'your@gmail.com',
      to: email, // The recipient's email address from the form
      subject: 'Subject: ' + email, // You can customize the subject
      text: text,
    };
  
    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.status(500).send(error.toString());
      }
      res.send('Email sent: ' + info.response);
    });
  });

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})