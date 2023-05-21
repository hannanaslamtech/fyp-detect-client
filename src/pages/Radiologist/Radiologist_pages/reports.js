import React, { useState, useEffect } from 'react';
import { Paper, Typography } from "@material-ui/core";
import { Col, Container, Row } from "react-bootstrap";
import Header from "../Header/Header";
import backgroundImage from '../adminBackground.jpg';
import axios from 'axios';
import AlertComp from '../../../components/Alert/Alert_Comp';
import ToastComp from "../../../components/Toast/Toast_Comp";
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import { useLocation } from 'react-router-dom';



const Reports = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [result, setResult] = useState("");
  const [toast, setToast] = useState(false);
  const [error, setError] = useState(null);
  const [check, setCheck] = useState(false);
  const [image, setImage] = useState(null);
  const location = useLocation();
  const rowData = location.state?.rowData;



  useEffect(() => {
    setResult("");
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // create a new FormData object
      const formData = new FormData();
      console.log(selectedFile);

      // append the selected file path to the form data
      formData.append('image', selectedFile);

      // send a POST request to the MERN server with the form data
      const response = await axios.post('/detection/classifyimage', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log(response.data);
      if (response.data.error) {
        setToast(true);
      } else {
        setResult(response.data.report.output);
        setImage(response.data.report.image)
        setError(null);
        setCheck(true);
      }

    } catch (error) {
      setError(error);
      console.error(error, "here");
    }
  };


  const handleGeneratePDF = async () => {
    try {
      const pdfDoc = await PDFDocument.create();
      const page = pdfDoc.addPage();

      // Set font and text sizes
      const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
      const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);
      const titleFontSize = 16;
      const infoFontSize = 8;

      // Calculate page dimensions
      const pageWidth = page.getWidth();
      const pageHeight = page.getHeight();
      const newPageWidth = 800; // Set the desired page width
      page.setWidth(newPageWidth);

      if (check) {
        page.drawText(`Report: ${result}`, {
          x: 50,
          y: pageHeight - 270,
          font: fontBold,
          fontSize: titleFontSize,
          color: rgb(0, 0, 0),
          textAlign: 'left',
        });
      }

      // Add image
      if (image) {
        const imageBytes = await fetch(`data:image/jpeg;base64,${image}`).then((res) => res.arrayBuffer());
        const embeddedImage = await pdfDoc.embedJpg(imageBytes);
        const imageWidth = 230;
        const imageHeight = imageWidth * (embeddedImage.height / embeddedImage.width);

        // Calculate image positioning
        const imageX = (pageWidth - imageWidth) / 2; // Center horizontally
        const imageY = pageHeight - 100 - imageHeight - 230; // Adjust vertical position with a margin of 20 pixels

        page.drawImage(embeddedImage, {
          x: imageX,
          y: imageY,
          width: imageWidth,
          height: imageHeight,
        });
      }

      // Add row data
      const textX = 50;
      const textY = pageHeight - 50 - 40; // Adjust the textY value with a margin of 20 pixels
      const lineHeight = 20;
      const textOptions = {
        font: fontRegular,
        fontSize: infoFontSize,
        color: rgb(0, 0, 0),
        textAlign: 'left',
      };

      page.drawText(`Patient Contact No: ${rowData.patientContactno}`, { x: textX, y: textY, ...textOptions });
      page.drawText(`Patient Name: ${rowData.patient_name}`, { x: textX, y: textY - lineHeight, ...textOptions });
      page.drawText(`Doctor Name: ${rowData.doctor_name}`, { x: textX, y: textY - 2 * lineHeight, ...textOptions });
      page.drawText(`Date/Time: ${rowData.date_Time}`, { x: textX, y: textY - 3 * lineHeight, ...textOptions });

      // Generate the PDF

      // Generate the PDF
      const pdfBytes = await
        pdfDoc.save();
      // Create a Blob from the PDF bytes
      const pdfBlob = new Blob([pdfBytes], { type: 'application/pdf' });

      // Create a download link and trigger the download
      const downloadLink = document.createElement('a');
      downloadLink.href = URL.createObjectURL(pdfBlob);
      downloadLink.download = 'report.pdf';
      downloadLink.click();
      // Create a print link and trigger the print dialog

      // Create a print button and trigger the print dialog

    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };







  return (
    <>
      <Header />
      <div
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          height: 'auto',
          width: '100%',
          minHeight: '88vh',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundImage: `url(${backgroundImage})`,
        }}
      >
        <ToastComp
          setToast={setToast}
          renderToast={toast}
          msg="Model run"
        />
        <Container fluid style={{ paddingTop: "5px" }}>
          {error && (
            <AlertComp variant="danger" msg={"Invalid file"} />
          )}

          <Row>
            <Col md={6} className="mx-auto mt-4 ">
              <Paper
                style={{ background: 'linear-gradient(to right, #dfe4e7, #909497)' }}
                className="p-4 shadow rounded"
              >
                <Typography
                  className="text-center text-primary mb-3"
                  variant="h5"
                >
                  <h4 style={{
                    color: '#072A37',
                    fontWeight: 'bold',
                    fontSize: '20px',
                    textDecoration: 'underline',
                    letterSpacing: '2px',
                    textTransform: 'uppercase',
                    fontFamily: 'Arial, sans-serif',
                    textAlign: 'center'
                  }}>
                    Tumor detection
                  </h4>
                </Typography>
                <form onSubmit={handleSubmit}>
                  <div>
                    <input
                      style={{ color: '#ffffff' }}
                      type="file" onChange={(e) => { setSelectedFile(e.target.files[0]) }} />
                  </div>

                  <button
                    className="mt-2"
                    variant="contained"
                    style={{ border: '2px glow #ffcc00', width: '100px', padding: '5px 10px', backgroundColor: '#34AEDC', color: '#ffffff' }}
                    type="submit">
                    Upload
                  </button>
                  <button
                    className="mt-2"
                    variant="contained"
                    style={{ border: '2px glow #ffcc00', width: '100px', padding: '5px 10px', backgroundColor: '#34AEDC', color: '#ffffff', marginLeft: '10px' }}
                    type="button"
                    onClick={handleGeneratePDF}
                  >
                    PDF
                  </button>


                </form>
                <div
                  className="text-center"
                  style={{
                    marginTop: "20px",
                    border: "1px solid White",
                    padding: "10px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center"
                  }}
                >
                  <h3 style={{ color: "black" }}>Report of the uploaded scan</h3>
                  {check && (
                    <div>
                      <p
                        style={{
                          background: "linear-gradient(to right, #009EDB, #00001C)",
                          color: "#FFFFFF",
                          transition: "color 0.3s ease-in-out",
                          marginRight: "30px",
                          fontWeight: "bold",
                          fontSize: "28px",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                          textDecoration: "underline",
                          textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
                          letterSpacing: "2px",
                          textTransform: "uppercase",
                          fontFamily: "Arial, sans-serif",
                          textAlign: "center"
                        }}
                      >
                        Report: {result}
                      </p>
                    </div>
                  )}
                  {image ? (
                    <div style={{ margin: "20px" }}>
                      <img src={`data:image/jpeg;base64,${image}`} alt="" style={{ maxWidth: "100%", height: "auto" }} />
                    </div>
                  ) : (
                    <div></div>
                  )}
                </div>
              </Paper>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Reports;