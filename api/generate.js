export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required' });
  }

  try {
    const response = await fetch("https://api.runwayml.com/v1/generations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.RUNWAYML_API_KEY}`
      },
      body: JSON.stringify({
        model: "gen2",
        prompt,
        mode: "text-to-video",
        size: "720p"
      })
    });

    const result = await response.json();
    console.log(result);

    if (result?.data && result.data[0]?.asset_url) {
      res.status(200).json({ url: result.data[0].asset_url });
    } else {
      res.status(500).json({ error: 'No video generated' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
    }
