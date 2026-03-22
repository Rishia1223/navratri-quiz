#!/bin/bash

echo "🧪 Testing Navratri Quiz System..."
echo "=================================="

# Test 1: Check if servers are running
echo "1️⃣  Checking server status..."
if curl -s http://localhost:3001/api/participants/count > /dev/null; then
    echo "   ✅ Data server is running"
else
    echo "   ❌ Data server is not running"
    exit 1
fi

if curl -s -I http://localhost:8080 | grep -q "200 OK"; then
    echo "   ✅ Quiz website is running"
else
    echo "   ❌ Quiz website is not running"
    exit 1
fi

# Test 2: Check participant count
echo "2️⃣  Checking participant data..."
COUNT=$(curl -s http://localhost:3001/api/participants/count | grep -o '[0-9]*')
echo "   📊 Current participant count: $COUNT"

# Test 3: Submit test data
echo "3️⃣  Testing data submission..."
RESPONSE=$(curl -s -X POST -H "Content-Type: application/json" -d '{"name":"System Test","email":"test@system.com","phone":"0000000000","score":"30/30","percentage":"100%","timeTaken":"120"}' http://localhost:3001/api/participants)

if echo "$RESPONSE" | grep -q '"success":true'; then
    echo "   ✅ Data submission successful"
else
    echo "   ❌ Data submission failed"
    exit 1
fi

# Test 4: Verify count increased
echo "4️⃣  Verifying data persistence..."
NEW_COUNT=$(curl -s http://localhost:3001/api/participants/count | grep -o '[0-9]*')
EXPECTED_COUNT=$((COUNT + 1))

if [ "$NEW_COUNT" -eq "$EXPECTED_COUNT" ]; then
    echo "   ✅ Participant count updated correctly ($COUNT → $NEW_COUNT)"
else
    echo "   ❌ Count mismatch (expected: $EXPECTED_COUNT, got: $NEW_COUNT)"
    exit 1
fi

# Test 5: Check data file
echo "5️⃣  Checking data file..."
if [ -f "participants.json" ]; then
    PARTICIPANTS=$(grep -o '"name"' participants.json | wc -l)
    if [ "$PARTICIPANTS" -eq "$NEW_COUNT" ]; then
        echo "   ✅ Data file contains $PARTICIPANTS participants"
    else
        echo "   ❌ Data file mismatch"
        exit 1
    fi
else
    echo "   ❌ Data file not found"
    exit 1
fi

echo ""
echo "🎉 All tests passed! The Navratri Quiz system is working perfectly!"
echo "   🌐 Quiz: http://localhost:8080"
echo "   📊 API: http://localhost:3001"
echo "   👥 Total participants: $NEW_COUNT"