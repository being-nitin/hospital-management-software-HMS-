import React, { useEffect, useRef, useState } from "react";
import Layout from "../core/Layout";
import { listSetting, updateSetting } from "../actions/settingAction";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const PrintDetails = () => {
    const canvasRef = useRef(null);
    const [text, setText] = useState("");
    const [headerImage, setHeaderImage] = useState(null);
    const [footerImage, setFooterImage] = useState(null);
    const [header, setHeader] = useState(null);
    const [footer, setFooter] = useState(null);

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

    useEffect(() => {
        if (settings) {
            setText(settings.data.printText || "");
            setHeaderImage(settings.data.header || null);
            setFooterImage(settings.data.footer || null);
        }
    }, [settings]);

    useEffect(() => {
        updateCanvas();
    }, [text, headerImage, footerImage]);

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
                    const headerHeight = 600 * aspectRatio; // Maintain aspect ratio for the resized width
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
    
        // Draw text closer to the footer
        const footerHeight = footerImage ? 100 : 0; // Approximate footer height
        context.fillStyle = "#000000";
        context.font = `16px Roboto, sans-serif`;

        // Position text above the footer
        const textYPosition = canvas.height / scale - footerHeight - 50;
        context.fillText(text, 50, textYPosition);
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

        dispatch(updateSetting({printText : text , header , footer}));
    };

    return (
        <Layout>
            <h1 style={{ textAlign: "center" }}>Print Details</h1>
            <div style={styles.container}>
                <form onSubmit={handleSubmit}>
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
        justifyContent:"space-around",
        gap:"10px",
        width: "100%",
        padding: "20px",
        
    },
    input: {
        padding: "8px",
        marginBottom:"10px",
        width: "100%",
        border: "1px solid #ccc",
        borderRadius: "4px",
    },
    textarea:{
        borderRadius:"4px",
        padding:"8px"
    }

};

export default PrintDetails;
