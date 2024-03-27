// pages/api/clear-cookies.js

export default function handler(req, res) {
  // Get the list of cookies from the request headers
  const cookies = req.headers.cookie?.split(';') || [];
  console.log('totally cleared!')

  // Loop through each cookie and clear it
  cookies.forEach(cookie => {
    const [name, ...rest] = cookie.split('=');
    res.clearCookie(name, { path: '/' });
  });

  // Return a success response
  res.status(200).json({ message: 'Cookies cleared successfully' });
}