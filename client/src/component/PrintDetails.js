import React, { useEffect, useRef, useState } from "react";
import Layout from "../core/Layout";

const PrintDetails = () => {
	const canvasRef = useRef(null);
	const [text, setText] = useState("");
	const [headerImage, setHeaderImage] = useState(null);
	const [footerImage, setFooterImage] = useState(null);

	function updateCanvas() {
		const canvas = canvasRef.current;
		if (canvas) {
			const context = canvas.getContext("2d");
			context.clearRect(0, 0, canvas.width, canvas.height);
			context.fillStyle = "#000000";
			context.font = `20px Roboto sans-serif`;

			// Draw header image if present
			if (headerImage) {
				const img = new Image();
				img.onload = () => {
					context.drawImage(img, 0, 0, canvas.width, 80);
				};
				img.src = headerImage;
			}

			// Draw footer image if present
			if (footerImage) {
				const img = new Image();
				img.onload = () => {
					context.drawImage(
						img,
						0,
						canvas.height - 80,
						canvas.width,
						80
					);
				};
				img.src = footerImage;
			}

			context.fillText(text, 50, 150);
		}
	}

	useEffect(() => {
		updateCanvas();
	}, [text, headerImage, footerImage]);

	const handleImageUpload = (e, setImage) => {
		const file = e.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onload = (event) => {
				setImage(event.target.result); // Store the Data URL
			};
			reader.readAsDataURL(file);
		}
	};

	return (
		<Layout>
			<h1 style={{ textAlign: "center" }}>Print Details</h1>
			<div style={styles.container}>
				<form>
					<div style={{ width: "100%" }}>
						<label for="text">Text:</label>
						<input
							id="text"
							type="text"
							value={text}
							style={styles.input}
							onChange={(e) => {
								setText(e.target.value);
							}}
						/>
					</div>
					<div style={{ width: "100%", marginTop: "10px" }}>
						<label htmlFor="headerImage">Header Image:</label>
						<input
							id="headerImage"
							type="file"
							style={styles.input}
							accept="image/*"
							onChange={(e) =>
								handleImageUpload(e, setHeaderImage)
							}
						/>
					</div>
					<div style={{ width: "100%", marginTop: "10px" }}>
						<label htmlFor="footerImage">Footer Image:</label>
						<input
							id="footerImage"
							type="file"
							style={styles.input}
							accept="image/*"
							onChange={(e) =>
								handleImageUpload(e, setFooterImage)
							}
						/>
					</div>
				</form>
				<canvas
					ref={canvasRef}
					width={400}
					height={500}
					style={{
						border: "1px solid black",
						width: "100%",
					}}></canvas>
			</div>
		</Layout>
	);
};

const styles = {
	container: {
		display: "flex",
		width: "100%",
		justifyContent: "space-between",
		padding: "20px",
	},
	input: {
		flex: 1,
		padding: "8px",
		width: "80%",
		border: "1px solid #ccc",
		borderRadius: "4px",
	},
};
export default PrintDetails;
