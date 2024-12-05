import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { useState } from "react";
import axios from "axios";

const App = () => {
  const initialMessage = {
    password: "",
    decodedMessage: "",
    encodedMessage: "",
  };

  const [message, setMessage] = useState(initialMessage);
  const [isEncoding, setIsEncoding] = useState(false);
  const [isDecoding, setIsDecoding] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setMessage((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const encodeMessage = async () => {
    if (!message.password || !message.decodedMessage) {
      return;
    }

    const sending = {
      password: message.password,
      message: message.decodedMessage,
    };

    try {
      setIsEncoding(true);
      const { data } = await axios.post(
        "http://localhost:8000/encode",
        sending
      );
      setMessage((prevState) => ({
        ...prevState,
        encodedMessage: data.encoded,
      }));
    } catch {
      console.log("Error.");
    } finally {
      setIsEncoding(false);
    }
  };

  const decodeMessage = async () => {
    if (!message.password || !message.encodedMessage) {
      return;
    }

    const sending = {
      password: message.password,
      message: message.encodedMessage,
    };

    try {
      setIsDecoding(true);
      const { data } = await axios.post(
        "http://localhost:8000/decode",
        sending
      );
      setMessage((prevState) => ({
        ...prevState,
        decodedMessage: data.decoded,
      }));
    } catch {
      console.log("Error.");
    } finally {
      setIsDecoding(false);
    }
  };

  return (
    <div className="container-sm mt-5" style={{ maxWidth: "700px" }}>
      <div className="mb-3">
        <label className="form-label">Decoded message</label>
        <input
          type="text"
          className="form-control"
          value={message.decodedMessage}
          onChange={handleChange}
          name="decodedMessage"
          placeholder=""
        />
      </div>

      <div className="d-flex m-3">
        <button
          className="btn btn-primary me-3"
          onClick={encodeMessage}
          disabled={isEncoding || !message.password || !message.decodedMessage}
        >
          {isEncoding ? "Encoding" : "⇩"}
        </button>
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            value={message.password}
            onChange={handleChange}
            name="password"
            placeholder="Enter password"
          />
        </div>
        <button
          className="btn btn-primary ms-3"
          onClick={decodeMessage}
          disabled={isDecoding || !message.password || !message.encodedMessage}
        >
          {isDecoding ? "Decoding" : "⇧"}
        </button>
      </div>

      <div className="mb-3">
        <label className="form-label">Encoded message</label>
        <input
          type="text"
          className="form-control"
          value={message.encodedMessage}
          onChange={handleChange}
          name="encodedMessage"
          placeholder=""
        />
      </div>
    </div>
  );
};

export default App;
