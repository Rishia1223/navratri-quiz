const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;
const DATA_FILE = path.join(__dirname, 'participants.json');

// Middleware
app.use(cors({
  origin: ['http://localhost:8080', 'https://rishia1223.github.io', 'https://navratri-quiz.vercel.app'],
  credentials: true
}));
app.use(express.json());

// Initialize data file if it doesn't exist
if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify({ participants: [], totalCount: 0 }, null, 2));
}

// Routes
app.get('/api/participants/count', (req, res) => {
    try {
        const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
        res.json({ count: data.totalCount });
    } catch (error) {
        res.status(500).json({ error: 'Failed to read participant count' });
    }
});

app.get('/api/participants', (req, res) => {
    try {
        const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to read participants data' });
    }
});

app.post('/api/participants', (req, res) => {
    try {
        const participantData = req.body;

        // Read existing data
        const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));

        // Add new participant
        const newParticipant = {
            id: Date.now(),
            timestamp: new Date().toISOString(),
            ...participantData
        };

        data.participants.push(newParticipant);
        data.totalCount = data.participants.length;

        // Write back to file
        fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));

        res.json({
            success: true,
            message: 'Participant data saved successfully',
            count: data.totalCount
        });
    } catch (error) {
        console.error('Error saving participant:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to save participant data'
        });
    }
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Navratri Quiz Server running on port ${PORT}`);
    console.log(`📊 Data file: ${DATA_FILE}`);
});