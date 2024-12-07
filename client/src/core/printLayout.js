import React, { useRef } from "react";
import { Button } from "react-bootstrap";
import "./printStyle.css";
import Header from "../assets/header.PNG";
import Footer from "../assets/footer.PNG";

const PrintLayout = ({ children }) => {
  const printRef = useRef(null);

  const toBase64 = (imgPath) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.crossOrigin = "anonymous"; // Avoid CORS issues
      img.src = imgPath;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        resolve(canvas.toDataURL("image/png"));
      };
    });
  };

  const printAction = async () => {
    const printContent = printRef.current;
    const printWindow = window.open("", "_blank");


    const PAGE_HEIGHT = 1045
  const printElement = document.getElementById("print-component")
  if (printElement) {
      printElement.classList.add("temp-class-for-height")
      const height = printElement.clientHeight
      const numberOfPage = Math.ceil(height / PAGE_HEIGHT)
      const heightWithSingleHeader = numberOfPage*PAGE_HEIGHT
      let requiredHeight = heightWithSingleHeader
      if (numberOfPage > 1) {
          const headerHeight = printElement.getElementsByTagName("thead")?.[0]?.clientHeight
          const footerHeight = printElement.getElementsByTagName("tfoot")?.[0]?.clientHeight
          requiredHeight -= (numberOfPage - 1) * (headerHeight + footerHeight) 
      }
      printElement.style.height = `${requiredHeight}px`
      printElement.classList.remove("temp-class-for-height")
  }     
      // Generate printable content with images and styles

    //   const headerBase64 = await toBase64(Header);
    //   const footerBase64 = await toBase64(Footer);

      printWindow.document.open();
      printWindow.document.write(`
        <html>
          <head>
            <title>Print</title>
            <style>
              body {
                margin: 0;
                padding: 0;
                font-family: Arial, sans-serif;
              }
              img {
                display: block;
                margin: 0 auto;
                width: 100%;
                
                object-fit: fit;
              }
              table {
                width: 100%;
                border-collapse: collapse;
              }
              th, td {
                border: 1px solid #ddd;
                padding: 8px;
              }
              th {
                background-color: #f2f2f2;
                text-align: center;
              }
            </style>
          </head>
          <body>
            <img src="${Header}" alt="Header" />
            <div>${printContent.innerHTML}</div>
            <img src="${Footer}" alt="Footer" />
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.onload = () => {
        printWindow.print();
        printWindow.close();
      };
    
  };

  return (
    <div  ref={printRef}>
      <table>
        
        <tbody>
          <tr>
            <td>{children}</td>
          </tr>
        </tbody>
      </table>

      <div className="d-flex justify-content-end mt-3">
        <Button variant="primary" onClick={printAction}>
          Print
        </Button>
      </div>
    </div>
  );
};

export default PrintLayout;
