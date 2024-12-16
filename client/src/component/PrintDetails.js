import React, { useEffect, useRef, useState } from "react";
import Layout from "../core/Layout";
import HeaderImage from "../assets/header.PNG";
import FooterImage from "../assets/footer.PNG";

const PrintDetails = () => {
	const canvasRef = useRef(null);
	const [text, setText] = useState("");

	const headerImage = new Image();
	const footerImage = new Image();

	headerImage.src = HeaderImage;
	footerImage.src = FooterImage;

	function updateCanvas() {
		const canvas = canvasRef.current;
		if (canvas) {
			const context = canvas.getContext("2d");
			context.clearRect(0, 0, canvas.width, canvas.height);
			context.fillStyle = "#000000";
			context.font = `20px Roboto sans-serif`;

			//Header Image
			context.drawImage(headerImage, 0, 0, canvas.width, 80);

			// Footer Image
			context.drawImage(
				footerImage,
				0,
				canvas.height - 80,
				canvas.width,
				80
			);

			context.fillText(text, 50, 100);
		}
	}

	useEffect(() => {
		updateCanvas();
	});

	return (
		<Layout>
			<h1 style={{ textAlign: "center" }}>Print Details</h1>
			<div style={styles.container}>
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
				<canvas
					ref={canvasRef}
					width={500}
					height={600}
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
