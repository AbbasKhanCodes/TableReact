import { useState } from "react";
import axios from "axios";

const EmailForm = () => {
  const [emailData, setEmailData] = useState({
    to: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    console.log("Target:");
    console.log(e.target.name);
    console.log("Value:");
    console.log(e.target.value);
    setEmailData({ ...emailData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      const response = await axios.post(
        "http://localhost:5000/send-email",
        emailData
      );
      setStatus(response.data.message);
    } catch (error) {
      console.error(error);
      setStatus("Failed to send email.");
    }
  };

  return (
    <div>
      <h2>Send Secure Email</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="to"
          placeholder="Recipient Email"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="subject"
          placeholder="Subject"
          onChange={handleChange}
          required
        />
        <textarea
          name="message"
          placeholder="Message"
          onChange={handleChange}
          required
        ></textarea>
        <button type="submit">Send Email</button>
      </form>
      <p>{status}</p>
    </div>
  );
};

export default EmailForm;
