import React, { useEffect, useRef, useState } from "react";
import Layout from "../core/Layout";
import { listSetting, updateSetting } from "../actions/settingAction";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const PrintDetails = () => {
    const canvasRef = useRef(null);
    const [text, setText] = useState("");
    const [alignment, setAlignment] = useState("left"); // New state for text alignment
    const [headerImage, setHeaderImage] = useState(null);
    const [footerImage, setFooterImage] = useState(null);
    const [LogoImage, setLogoImage] = useState(null);
    const [header, setHeader] = useState(null);
    const [footer, setFooter] = useState(null);
    const [logo, setLogo] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState("prescription");

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
    }, [dispatch, userInfo, navigate, selectedCategory]);

    useEffect(() => {
        if (settings && settings.data && settings.data[selectedCategory]) {
            setText(settings.data.printText);
            setHeaderImage(settings.data[selectedCategory].header || null);
            setLogoImage(settings.data[selectedCategory].logo || null);
            setFooterImage(settings.data[selectedCategory].footer || null);
        } else {
            setText("");
            setHeaderImage(null);
            setLogoImage(null);
            setFooterImage(null);
        }
    }, [settings]);

    useEffect(() => {
        updateCanvas();
    }, [text, headerImage, footerImage, LogoImage, alignment]); // Include alignment in dependencies

    const updateCanvas = () => {
        const canvas = canvasRef.current;
        if (canvas) {
            const context = canvas.getContext("2d");

            // Adjust for high-DPI screens
            const scale = window.devicePixelRatio || 1;
            canvas.width = 600 * scale;
            canvas.height = 800 * scale;
            canvas.style.width = "600px";
            canvas.style.height = "800px";
            context.scale(scale, scale);

            // Clear the canvas
            context.clearRect(0, 0, canvas.width / scale, canvas.height / scale);

            // Draw header image
            if (headerImage) {
                const img = new Image();
                img.onload = () => {
                    const aspectRatio = img.height / img.width;
                    const headerHeight = 600 * aspectRatio;
                    context.drawImage(img, 0, 0, 600, headerHeight);
                };
                img.src = headerImage;
            }

            // Draw footer image
            if (footerImage) {
                const img = new Image();
                img.onload = () => {
                    const aspectRatio = img.height / img.width;
                    const footerHeight = 600 * aspectRatio;
                    context.drawImage(
                        img,
                        0,
                        canvas.height / scale - footerHeight,
                        600,
                        footerHeight
                    );
                };
                img.src = footerImage;
            }

            // Draw text with alignment
            context.fillStyle = "#000000";
            context.font = `16px Roboto, sans-serif`;
            context.textAlign = alignment; // Use the alignment state
            const textYPosition = canvas.height / scale - 100;

            // Adjust X position based on alignment
            const textXPosition =
                alignment === "left"
                    ? 50
                    : alignment === "center"
                    ? canvas.width / (2 * scale)
                    : canvas.width / scale - 50;

            context.fillText(text, textXPosition, textYPosition);

            // Draw logo image
            if (LogoImage) {
                const img = new Image();
                img.onload = () => {
                    const logoWidth = 200;
                    const logoHeight = (img.height / img.width) * logoWidth;
                    const xPosition = 10;
                    const yPosition = canvas.height / scale - logoHeight - 150;
                    context.drawImage(img, xPosition, yPosition, logoWidth, logoHeight);
                };
                img.src = LogoImage;
            }
        }
    };
    
    
    const handleImageUpload = (e, setImage, setFile) => {
        const file = e.target.files[0];
        if (file) {
            setFile(file);
            const reader = new FileReader();
            reader.onload = () => {
                setImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        let options = {};
        if (header) {
            options["header"] = header;
        }
        if (footer) {
            options["footer"] = footer;
        }
        if (logo) {
            options["logo"] = logo;
        }
        options["printText"] = text;
        dispatch(updateSetting(selectedCategory, options));
        alert("form submitted")
    };

    return (
        <Layout>
            <h1 style={{ textAlign: "center" }}>Print Details</h1>
            <div style={styles.container}>
                <form onSubmit={handleSubmit}>
                    <div style={{ width: "100%", marginTop: "20px" }}>
                        <label htmlFor="category">Category:</label>
                        <select
                            id="category"
                            style={styles.input}
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                        >
                            <option value="billing">Billing</option>
                            <option value="forms">Forms</option>
                            <option value="prescription">Prescription</option>
                            <option value="patient">Patient</option>
                            <option value="expense">Expense</option>
                        </select>
                    </div>
                    <label htmlFor="text">Text:</label>
                    <div style={{ width: "100%" }}>
                        <textarea
                            id="text"
                            value={text}
                            rows={7}
                            cols={60}
                            style={styles.textarea}
                            placeholder="Enter Text"
                            onChange={(e) => setText(e.target.value)}
                        />
                    </div>
                    <div>
                        <label>Alignment:</label>
                        <select
                            value={alignment}
                            onChange={(e) => setAlignment(e.target.value)}
                            style={styles.input}
                        >
                            <option value="left">Left</option>
                            <option value="center">Center</option>
                            <option value="right">Right</option>
                        </select>
                    </div>
                    <div style={{ width: "100%", marginTop: "20px" }}>
                        <label htmlFor="headerImage">Header Image:</label>
                        <input
                            id="headerImage"
                            type="file"
                            style={styles.input}
                            accept="image/*"
                            onChange={(e) => handleImageUpload(e, setHeaderImage, setHeader)}
                        />
                    </div>
                    <div style={{ width: "100%", marginTop: "20px" }}>
                        <label htmlFor="LogoImage">Logo Image:</label>
                        <input
                            id="LogoImage"
                            type="file"
                            style={styles.input}
                            accept="image/*"
                            onChange={(e) => handleImageUpload(e, setLogoImage, setLogo)}
                        />
                    </div>
                    <div style={{ width: "100%", marginTop: "20px" }}>
                        <label htmlFor="footerImage">Footer Image:</label>
                        <input
                            id="footerImage"
                            type="file"
                            style={styles.input}
                            accept="image/*"
                            onChange={(e) => handleImageUpload(e, setFooterImage, setFooter)}
                        />
                    </div>
                    <button className="btn btn-primary mt-4 w-25">Submit</button>
                </form>
                <canvas
                    ref={canvasRef}
                    width={600}
                    height={800}
                    style={{
                        border: "1px solid black",
                    }}
                ></canvas>
            </div>
        </Layout>
    );
};

const styles = {
    container: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        gap: "10px",
        width: "100%",
        padding: "20px",
    },
    input: {
        padding: "8px",
        marginBottom: "10px",
        width: "100%",
        border: "1px solid #ccc",
        borderRadius: "4px",
    },
    textarea: {
        borderRadius: "4px",
        padding: "8px",
    },
};

export default PrintDetails;
