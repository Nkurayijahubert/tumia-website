// Main API endpoint
module.exports = (req, res) => {
  res.status(200).json({
    name: 'Tumia API',
    version: '1.0.0',
    status: 'ok',
    timestamp: new Date().toISOString(),
    endpoints: [
      { path: '/api/_health', method: 'GET', description: 'Health check endpoint' },
      { path: '/api/_waitlist', method: 'POST', description: 'Join the waitlist' }
    ],
    message: 'Tumia API is running - use one of the available endpoints'
  });
};