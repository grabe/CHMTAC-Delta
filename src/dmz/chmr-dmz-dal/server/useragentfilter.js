/**
 * checks for known user-agent strings to block known bots
 */

export default (req, res, next) => {
    const userAgent = (req.headers['user-agent'] || '').toLowerCase();
    const knownBots = ['curl', 'wget', 'bot', 'crawler', 'spider', 'python-requests'];
    for (const bot of knownBots) {
      if (userAgent.includes(bot)) {
        return res.status(403).json({ error: 'Request Failed. Bot user-agent detected.' });
      }
    }
    next();
  };