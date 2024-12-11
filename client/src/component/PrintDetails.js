import React, { useEffect, useRef, useState } from "react";
import Layout from "../core/Layout";

const PrintDetails = ({ history }) => {
	const canvasRef = useRef(null);
	const [text, setText] = useState("");

	const headerImage = new Image();
	const footerImage = new Image();

	headerImage.src =
		"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQq7xGaH6_XfwaWUojx-ToBd2sg6q08QSr9GQ&s";

	footerImage.src =
		"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQq7xGaH6_XfwaWUojx-ToBd2sg6q08QSr9GQ&s";

	function updateCanvas() {
		const canvas = canvasRef.current;
		if (canvas) {
			const context = canvas.getContext("2d");
			context.clearRect(0, 0, canvas.width, canvas.height);
			context.fillStyle = "#000000";
			context.font = `20px Roboto sans-serif`;

			//Header Image
			context.drawImage(headerImage, 0, 0, canvas.width, 50);

			// Footer Image
			context.drawImage(
				footerImage,
				0,
				canvas.height - 30,
				canvas.width,
				50
			);

			context.fillText(text, 50, 100);
		}
	}

	const printCanvas = () => {
		const elem = canvasRef.current;
	};

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
					height={300}
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
