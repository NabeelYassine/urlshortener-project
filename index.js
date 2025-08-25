// index.js
// URL Shortener Microservice - Backend Implementation

const express = require('express');
const cors = require('cors');
const dns = require('dns');
const url = require('url');
const app = express();

// Enable CORS for FCC testing
app.use(cors({ optionsSuccessStatus: 200 }));

// Body parsing middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Serve static files
app.use(express.static('public'));

// In-memory storage for URLs (in production, use a database)
let urlDatabase = [];
let currentId = 1;

// Route handler for the root endpoint
app.get("/", (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

// API endpoint for URL shortening
app.post("/api/shorturl", (req, res) => {
  const originalUrl = req.body.url;
  
  // Validate URL format
  try {
    const parsedUrl = new URL(originalUrl);
    
    // Check if URL uses http or https
    if (parsedUrl.protocol !== 'http:' && parsedUrl.protocol !== 'https:') {
      return res.json({ error: 'invalid url' });
    }
    
    // Verify the hostname using DNS lookup
    dns.lookup(parsedUrl.hostname, (err) => {
      if (err) {
        return res.json({ error: 'invalid url' });
      }
      
      // Check if URL already exists in database
      const existingUrl = urlDatabase.find(entry => entry.original_url === originalUrl);
      
      if (existingUrl) {
        return res.json({
          original_url: existingUrl.original_url,
          short_url: existingUrl.short_url
        });
      }
      
      // Create new short URL
      const shortUrl = currentId++;
      urlDatabase.push({
        original_url: originalUrl,
        short_url: shortUrl
      });
      
      res.json({
        original_url: originalUrl,
        short_url: shortUrl
      });
    });
  } catch (error) {
    res.json({ error: 'invalid url' });
  }
});

// API endpoint for redirecting short URLs
app.get("/api/shorturl/:short_url", (req, res) => {
  const shortUrl = parseInt(req.params.short_url);
  
  // Find the URL in the database
  const urlEntry = urlDatabase.find(entry => entry.short_url === shortUrl);
  
  if (urlEntry) {
    res.redirect(urlEntry.original_url);
  } else {
    res.json({ error: 'short url not found' });
  }
});

// Listen on port set in environment variable or default to 3000
const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('URL Shortener Microservice is running on port ' + listener.address().port);
});

module.exports = app; 