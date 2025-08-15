document.getElementById('generate-btn').addEventListener('click', async () => {
  const prompt = document.getElementById('prompt').value.trim();
  if (!prompt) {
    alert('Please enter a prompt!');
    return;
  }

  const statusEl = document.getElementById('status');
  statusEl.innerText = '⏳ Generating your reel... This may take up to a minute.';

  try {
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt })
    });

    const data = await response.json();
    console.log(data);

    if (data.url) {
      statusEl.innerHTML = `<video src="${data.url}" controls autoplay loop></video>`;
    } else {
      statusEl.innerText = '⚠️ No video returned. Try again with a different prompt.';
    }
  } catch (err) {
    statusEl.innerText = '❌ Error: ' + err.message;
  }
});
