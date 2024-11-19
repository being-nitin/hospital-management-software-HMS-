import React, { useState } from "react";
import axios from "axios";
import Layout from "../core/Layout";
import { useNavigate } from "react-router-dom";

const FileUpload = ({ history }) => {
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();
  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("uploadfile", file);
    setUploading(true);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      await axios.post(` http://localhost:8000/uploadfile`, formData, config);

      setUploading(false);
      navigate("/list-vendors");
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };
  const styles = {
    fileUploadContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "10px",
      padding: "15px",
      borderRadius: "8px",
      backgroundColor: "#f1f1f1",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      maxWidth: "400px",
      margin: "0 auto",
    },
    uploadLabel: {
      display: "inline-block",
      padding: "10px 20px",
      backgroundColor: "#0056d2",
      color: "#fff",
      borderRadius: "5px",
      cursor: "pointer",
      fontWeight: "bold",
      fontSize: "16px",
      transition: "background-color 0.3s",
    },
    fileInput: {
      display: "none", // Hide default input appearance
    },
    spinnerContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      marginTop: "10px",
    },
    spinner: {
      width: "2rem",
      height: "2rem",
      color: "#0056d2",
    },
  };

  return (
    <Layout title="Upload Vendors">
      <div className="form-group col-md-4" style={styles.fileUploadContainer}>
        <label
          htmlFor="exampleFormControlFile1"
          //   style={{
          //     fontFamily: "Roboto sans-serif",
          //   }}
          style={styles.uploadLabel}
        >
          Upload vendor Excel
        </label>
        <input
          type="file"
          onChange={uploadFileHandler}
          className="form-control-file"
          id="exampleFormControlFile1"
          style={styles.fileInput}
        />
        {uploading && (
          <div
            style={styles.spinnerContainer}
            className="d-flex justify-content-center"
          >
            <div
              className="spinner-border"
              role="status"
              style={styles.spinner}
            >
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default FileUpload;
