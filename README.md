# Navratri Quiz

A beautiful, interactive Navratri mythology quiz application with bilingual support (English/Hindi) and local data collection with live participant counter.

## Features

- 🌸 30 Multiple choice questions on Navratri mythology
- 🌍 Bilingual support (English/Hindi)
- ⏱️ 5-minute timer
- 📊 Automatic scoring and results
- 👥 **Live participant counter** on homepage
- 📧 Email collection for participant records
- 📱 Responsive design
- 🪔 Beautiful Navratri-themed UI
- 📈 **Admin dashboard** for monitoring

## 🚀 Quick Start (Automatic Setup)

### One-Command Start
```bash
./start.sh
```
This will automatically:
- Install dependencies (if needed)
- Start the data server (port 3001)
- Start the quiz website (port 8080)
- Show current participant count

### Manual Start
```bash
# Terminal 1: Start data server
npm start

# Terminal 2: Start quiz website
python3 -m http.server 8080
```

## 🧪 Test Everything
```bash
./test.sh
```
This runs comprehensive tests to verify:
- ✅ Servers are running
- ✅ Data submission works
- ✅ Counter updates correctly
- ✅ Data persistence

## 🌐 Access Points

- **🎮 Quiz Application**: http://localhost:8080
- **📊 Admin Dashboard**: http://localhost:8080/admin.html
- **🔧 Data API**: http://localhost:3001/api/participants

## 📊 Data Management

### View All Data
- **Admin Dashboard**: Real-time stats and participant table
- **JSON File**: Open `participants.json` for raw data
- **API Endpoint**: `GET /api/participants` for JSON response

### Current Stats
- **Total Participants**: Displayed on homepage and admin dashboard
- **Average Score**: Calculated automatically
- **Average Time**: Calculated automatically

### Reset Data
```bash
rm participants.json
# Server will create new empty file on restart
```

## 📁 File Structure

```
navratri-quiz/
├── index.html              # Main quiz application
├── admin.html              # Admin dashboard
├── script.js               # Quiz logic and data submission
├── style.css               # Styling and responsive design
├── server.js               # Node.js backend server
├── package.json            # Node.js dependencies
├── participants.json       # Participant data storage
├── start.sh                # Auto-start script
├── test.sh                 # Test script
└── README.md              # This file
```

## 🔧 Technical Details

### Backend API
- **POST** `/api/participants` - Submit quiz results
- **GET** `/api/participants/count` - Get participant count
- **GET** `/api/participants` - Get all participant data

### Data Storage
- JSON file-based storage (`participants.json`)
- Automatic backup and counting
- No database required

### Technologies
- HTML5, CSS3, JavaScript (ES6+)
- Node.js & Express
- JSON file storage
- Responsive design

## 🎯 Usage Instructions

1. **Start the system**: `./start.sh`
2. **Access quiz**: Open http://localhost:8080
3. **Monitor results**: Open http://localhost:8080/admin.html
4. **View data**: Check `participants.json` or API endpoints

## 📈 Features Overview

- **Live Counter**: Shows total participants on homepage
- **Real-time Updates**: Counter updates after each submission
- **Admin Dashboard**: Complete monitoring interface
- **Data Export**: JSON format for easy analysis
- **Responsive Design**: Works on all devices
- **Bilingual Support**: English and Hindi

## 🛠️ Troubleshooting

### Servers not starting?
```bash
# Check if ports are available
lsof -i :3001
lsof -i :8080

# Kill processes if needed
kill -9 <PID>
```

### Data not saving?
- Check if `participants.json` exists and is writable
- Verify server is running on port 3001
- Check browser console for network errors

### Counter not updating?
- Make sure both servers are running
- Check CORS settings in browser
- Verify API endpoints are accessible

## 🚀 Production Deployment

For production use:
1. Deploy Node.js server to hosting service (Heroku, Railway, etc.)
2. Update `SERVER_URL` in `script.js` to production URL
3. Host static files on any web server
4. Update CORS settings for production domain

---

**🎉 Your Navratri Quiz system is now fully operational with automatic participant tracking!**
