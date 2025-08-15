document.getElementById("generateBtn").addEventListener("click", async () => {
    const button = document.getElementById("generateBtn");
    button.innerText = "Generating...";
    button.disabled = true;

    try {
        const response = await fetch("/api/generate", { method: "POST" });
        const data = await response.json();

        if (data.videoUrl) {
            alert("Video generated: " + data.videoUrl);
            // Optionally: window.open(data.videoUrl, "_blank");
        } else {
            alert("Failed to generate video");
        }
    } catch (error) {
        alert("Error: " + error.message);
    }

    button.innerText = "Generate Reel";
    button.disabled = false;
});
