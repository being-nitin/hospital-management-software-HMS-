import React, { useRef , useState , useEffect} from "react";
import { Button } from "react-bootstrap";
import "./printStyle.css";
import Header from "../assets/header.PNG";
import Footer from "../assets/footer.PNG";
import Logo from "../assets/logo.PNG"
import { listSetting, updateSetting } from "../actions/settingAction";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const PrintLayout = ({ children , html , data , category }) => {
  const printRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userSetting = useSelector((state) => state.listSetting);
  const { settings } = userSetting;

  useEffect(() => {
      if (userInfo) {
          dispatch(listSetting());
      } else {
          navigate("/signin");
      }
  }, [dispatch, userInfo, navigate ]);

  const printAction = () => {
  
    const printContent = printRef.current;
    const printWindow = window.open("", "_blank");

    printWindow.document.open();
    printWindow.document.write(`
      <html>
        <head>
          <style>
            body {
              margin: 0;
              padding: 0;
              line-height : 1;
              font-family: Arial, sans-serif;
              position : relative;
            }
            .print-container {
              display: flex;
              flex-direction: column;
              min-height: 100vh;
              z-index: 1;
              width : 100%;
            }
            .header, .footer {
              position :fixed;
              width: 100%;
              text-align: center;
              object-fit : fill;
            }
              .header {
                top : 0px;
              }
 .content {
    flex: 1;
    padding: 20px;
    margin: 0 auto;
    width: 70%;
    height: 500px; 
    z-index: 1;
    overflow: auto; 
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
           
              text-align: center;
            }

            .flex {
             display : flex;
             width: 100%;
             justif-content : space-between;
             alignItems : center;
             gap : 90px;
            }

            .backgroundLogo {
                position : fixed;
               margin-left: auto;
               left: 0;
                bottom : 60;
            text-align: left;
             z-index: -1;
             width : 14rem;
            }
            
            @media print {
              @page { margin: 0;  }
             body {
             width : 1230px;
            background-image: url(${Logo}); /* Inline base64 image for print */
            background-repeat: no-repeat;
            background-position: center;
            background-size: cover; /* Ensure the image scales properly */
          }
              .print-button {
                display: none;
              }
             
              .content {
         
               width: 100%;
               margin: 0 auto;
               padding-left : 20px;
               z-index: 1;
               overflow: hidden;
               margin : 1.4 cm;
              }
              .footer {
               position:fixed;
                display: block;
                bottom: 0;
                padding-top : 20px;
                z-index: 10;
             
              }

          </style>
        </head>
        <body>
          <div class="print-container">
            <img src="${settings.data[`${category}`].header}" alt="Header" class="header" />
            <div style= "margin-top: 400px;" >
           ${html(data)}
           </div>
            <img src=${Logo} class="backgroundLogo"></img>
            <div class="content">
            ${printContent.innerHTML}<div>
            <div style = "margin-top : 90px; position: fixed;">
            <img src="${settings.data[`${category}`].footer}" alt="Footer" class="footer" />
            </div>
          </div>
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
    <div ref={printRef} >
  
      <div className="print-button d-flex justify-content-end mt-3">
        <Button variant="primary" onClick={printAction}>
          Print
        </Button>
      </div>
    </div>
  );
};

export default PrintLayout;
