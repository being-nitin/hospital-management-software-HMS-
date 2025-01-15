import React, { useEffect, useRef, useState } from "react";
import Layout from "../core/Layout";
import { listSetting, updateSetting } from "../actions/settingAction";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const PrintDetails = () => {
    const canvasRef = useRef(null);
    const [text, setText] = useState("");
    const [alignment, setAlignment] = useState("left");
    const [headerImage, setHeaderImage] = useState(null);
    const [footerImage, setFooterImage] = useState(null);
    const [logoImage, setLogoImage] = useState(null);
    const [headerFile, setHeaderFile] = useState(null);
    const [footerFile, setFooterFile] = useState(null);
    const [logoFile, setLogoFile] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState("prescription");
    const ref = useRef();

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
    }, [dispatch, userInfo, navigate]);

    const reset = () => {
        ref.current.value = "";
      };
useEffect(() => {
    if (settings?.data?.[selectedCategory]) {
        const categorySettings = settings.data[selectedCategory];
        setText(settings.data.printText || "");
        setHeaderImage(categorySettings.header || null);
        setFooterImage(categorySettings.footer || null);
        setLogoImage(categorySettings.logo || null);
    } else {
        setText("");
        setHeaderImage(null);
        setFooterImage(null);
        setLogoImage(null);
    }

    // Clear file inputs on category change
    setHeaderFile(null);
    setFooterFile(null);
    setLogoFile(null);
    ref.current.value = ""
}, [selectedCategory]);

    useEffect(() => {
        updateCanvas();
    }, [text, headerImage, footerImage, logoImage, alignment]);

    const updateCanvas = () => {
        const canvas = canvasRef.current;
        if (canvas) {
            const context = canvas.getContext("2d");
            const scale = window.devicePixelRatio || 1;
            canvas.width = 600 * scale;
            canvas.height = 800 * scale;
            canvas.style.width = "600px";
            canvas.style.height = "800px";
            context.scale(scale, scale);
            context.clearRect(0, 0, canvas.width / scale, canvas.height / scale);

            if (headerImage) {
                const img = new Image();
                img.onload = () => {
                    const aspectRatio = img.height / img.width;
                    const headerHeight = 600 * aspectRatio;
                    context.drawImage(img, 0, 0, 600, headerHeight);
                };
                img.src = headerImage;
            }

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

            context.fillStyle = "#000000";
            context.font = `16px Roboto, sans-serif`;
            context.textAlign = alignment;
            const textYPosition = canvas.height / scale - 100;

            const textXPosition =
                alignment === "left"
                    ? 50
                    : alignment === "center"
                    ? canvas.width / (2 * scale)
                    : canvas.width / scale - 50;

            context.fillText(text, textXPosition, textYPosition);

            if (logoImage) {
                const img = new Image();
                img.onload = () => {
                    const logoWidth = 200;
                    const logoHeight = (img.height / img.width) * logoWidth;
                    const xPosition = 10;
                    const yPosition = canvas.height / scale - logoHeight - 150;
                    context.drawImage(img, xPosition, yPosition, logoWidth, logoHeight);
                };
                img.src = logoImage;
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
        const options = {
            header: headerFile,
            footer: footerFile,
            logo: logoFile,
            printText: text,
        };
        dispatch(updateSetting(selectedCategory, options));
        alert("Form submitted successfully");
        reset()
    };

    return (
        <Layout>
            <h1 style={{ textAlign: "center" }}>Print Details</h1>
            <div style={styles.container}>
                <form onSubmit={handleSubmit}>
                    <div>
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
                    <div>
                        <label htmlFor="text">Text:</label>
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
                    <div>
                        <label htmlFor="headerImage">Header Image:</label>
                        <input
                            id="headerImage"
                            type="file"
                            ref={ref}
                            style={styles.input}
                            accept="image/*"
                            onChange={(e) => handleImageUpload(e, setHeaderImage, setHeaderFile)}
                        />
                    </div>
                    <div>
                        <label htmlFor="logoImage">Logo Image:</label>
                        <input
                            id="logoImage"
                            type="file"
                            style={styles.input}
                            accept="image/*"
                            onChange={(e) => handleImageUpload(e, setLogoImage, setLogoFile)}
                        />
                    </div>
                    <div>
                        <label htmlFor="footerImage">Footer Image:</label>
                        <input
                            id="footerImage"
                            type="file"
                            style={styles.input}
                            accept="image/*"
                            ref ={ref}
                            onChange={(e) => {
                                setFooterFile(null)
                                handleImageUpload(e, setFooterImage, setFooterFile)
                            }}
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
