#!/bin/bash

echo "🚀 Starting Navratri Quiz System..."
echo "=================================="

# Check if Node.js dependencies are installed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing Node.js dependencies..."
    npm install
fi

echo "🖥️  Starting data server on port 3001..."
npm start &
SERVER_PID=$!

echo "🌐 Starting quiz website on port 8080..."
python3 -m http.server 8080 &
WEBSITE_PID=$!

echo ""
echo "✅ Both servers are now running!"
echo "   📊 Data API: http://localhost:3001"
echo "   🎮 Quiz App: http://localhost:8080"
echo "   👥 Current participants: $(curl -s http://localhost:3001/api/participants/count | grep -o '[0-9]*')"
echo ""
echo "Press Ctrl+C to stop both servers"

# Wait for servers to be stopped
trap "echo '🛑 Stopping servers...'; kill $SERVER_PID $WEBSITE_PID; exit" INT
wait