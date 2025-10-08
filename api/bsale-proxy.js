export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { token, endpoint = 'clients.json' } = req.query;

  if (!token) {
    return res.status(400).json({ error: 'Token de BSale requerido' });
  }

  try {
    const url = `https://api.bsale.io/v1/${endpoint}`;
    
    const response = await fetch(url, {
      method: req.method,
      headers: {
        'access_token': token,
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        error: 'Error en BSale',
        details: data
      });
    }

    return res.status(200).json(data);

  } catch (error) {
    return res.status(500).json({
      error: 'Error del servidor',
      details: error.message
    });
  }
}