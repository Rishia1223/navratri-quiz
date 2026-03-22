// Navratri Quiz - Complete Implementation with Google Forms Integration

let currentLanguage = 'en';
let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 300; // 5 minutes
let timerInterval;
let participantName = '';
let participantEmail = '';
let participantPhone = '';
let startTime = 0;
let userAnswers = [];

// Local Server Configuration for Data Collection
const SERVER_URL = 'http://localhost:3001';

// Quiz Questions in English and Hindi
const quizQuestions = [
    {
        en: { q: "What is the first day of Navratri called?", opts: ["Pratipada", "Dwitiya", "Tritiya", "Chaturthi"], ans: 0 },
        hi: { q: "नवरात्रि का पहला दिन क्या कहलाता है?", opts: ["प्रतिपदा", "द्वितीया", "तृतीया", "चतुर्थी"], ans: 0 }
    },
    {
        en: { q: "How long does Navratri last?", opts: ["Seven days", "Eight days", "Nine days", "Ten days"], ans: 2 },
        hi: { q: "नवरात्रि कितने दिनों तक चलता है?", opts: ["सात दिन", "आठ दिन", "नौ दिन", "दस दिन"], ans: 2 }
    },
    {
        en: { q: "Which goddess is worshipped on the first day of Navratri?", opts: ["Durga", "Shailaputri", "Brahmacharini", "Chandraghanta"], ans: 1 },
        hi: { q: "नवरात्रि के पहले दिन किस देवी की पूजा की जाती है?", opts: ["दुर्गा", "शैलपुत्री", "ब्रह्मचारिणी", "चंद्रघंटा"], ans: 1 }
    },
    {
        en: { q: "What is the significance of Garba in Navratri?", opts: ["Traditional food", "Dance and worship", "Prayer ritual", "Fasting method"], ans: 1 },
        hi: { q: "नवरात्रि में गरबा का महत्व क्या है?", opts: ["परंपरागत भोजन", "नृत्य और पूजा", "प्रार्थना अनुष्ठान", "उपवास विधि"], ans: 1 }
    },
    {
        en: { q: "Which state is famous for its Navratri celebrations?", opts: ["Punjab", "Gujarat", "Tamil Nadu", "Kerala"], ans: 1 },
        hi: { q: "नवरात्रि के लिए कौन सा राज्य प्रसिद्ध है?", opts: ["पंजाब", "गुजरात", "तमिलनाडु", "केरल"], ans: 1 }
    },
    {
        en: { q: "What does the color red symbolize during Navratri?", opts: ["Prosperity", "Strength and Power", "Knowledge", "Purity"], ans: 1 },
        hi: { q: "नवरात्रि में लाल रंग क्या दर्शाता है?", opts: ["समृद्धि", "शक्ति और शक्ति", "ज्ञान", "पवित्रता"], ans: 1 }
    },
    {
        en: { q: "Which is the traditional attire worn during Navratri?", opts: ["Saree", "Chaniya Choli", "Salwar", "Lehenga"], ans: 1 },
        hi: { q: "नवरात्रि के दौरान कौन सी पारंपरिक पोशाक पहनी जाती है?", opts: ["साड़ी", "चनिया चोली", "सलवार", "लहंगा"], ans: 1 }
    },
    {
        en: { q: "On which day is Durga Ashtami celebrated?", opts: ["Sixth day", "Seventh day", "Eighth day", "Ninth day"], ans: 2 },
        hi: { q: "दुर्गा अष्टमी किस दिन मनाई जाती है?", opts: ["छठे दिन", "सातवें दिन", "आठवें दिन", "नवें दिन"], ans: 2 }
    },
    {
        en: { q: "What is the meaning of Navratri?", opts: ["Nine days", "Nine nights", "Nine prayers", "Nine forms"], ans: 1 },
        hi: { q: "नवरात्रि का अर्थ क्या है?", opts: ["नौ दिन", "नौ रातें", "नौ प्रार्थनाएं", "नौ रूप"], ans: 1 }
    },
    {
        en: { q: "What food is prepared during fasting?", opts: ["Biryani", "Kuttu ki puri", "Butter chicken", "Samosa"], ans: 1 },
        hi: { q: "उपवास के दौरान कौन सा भोजन तैयार किया जाता है?", opts: ["बिरयानी", "कुट्टू की पूरी", "मक्खन चिकन", "समोसा"], ans: 1 }
    },
    {
        en: { q: "Which instrument is commonly played during Garba?", opts: ["Sitar", "Dandiya", "Tambura", "Sarangi"], ans: 1 },
        hi: { q: "गरबे के दौरान कौन सा वाद्य यंत्र बजाया जाता है?", opts: ["सितार", "डंडिया", "तंबूरा", "सारंगी"], ans: 1 }
    },
    {
        en: { q: "Which goddess is worshipped on the last day of Navratri?", opts: ["Kali", "Saraswati", "Siddhidatri", "Lakshmi"], ans: 2 },
        hi: { q: "नवरात्रि के आखिरी दिन किस देवी की पूजा की जाती है?", opts: ["काली", "सरस्वती", "सिद्धिदात्री", "लक्ष्मी"], ans: 2 }
    },
    {
        en: { q: "What is the importance of the Kanya Poojan?", opts: ["Prayer ceremony", "Worship of young girls", "Fasting ritual", "Dancing event"], ans: 1 },
        hi: { q: "कन्या पूजन का महत्व क्या है?", opts: ["प्रार्थना समारोह", "युवा लड़कियों की पूजा", "उपवास अनुष्ठान", "नृत्य कार्यक्रम"], ans: 1 }
    },
    {
        en: { q: "What is the main theme of Navratri?", opts: ["Fasting", "Victory of good over evil", "Celebration", "Charity"], ans: 1 },
        hi: { q: "नवरात्रि का मुख्य विषय क्या है?", opts: ["उपवास", "बुराई पर अच्छाई की जीत", "उत्सव", "दान"], ans: 1 }
    },
    {
        en: { q: "What is the traditional sweet prepared during Navratri?", opts: ["Gulab Jamun", "Singhare ke atta ke ladoo", "Kheer", "Barfi"], ans: 1 },
        hi: { q: "नवरात्रि के दौरान कौन सी पारंपरिक मिठाई तैयार की जाती है?", opts: ["गुलाब जामुन", "सिंघाड़े के आटे के लड्डू", "खीर", "बर्फी"], ans: 1 }
    },
    {
        en: { q: "How many forms of Durga are worshipped during Navratri?", opts: ["Five", "Seven", "Nine", "Eleven"], ans: 2 },
        hi: { q: "नवरात्रि के दौरान दुर्गा के कितने रूपों की पूजा की जाती है?", opts: ["पांच", "सात", "नौ", "ग्यारह"], ans: 2 }
    },
    {
        en: { q: "What does the color yellow represent in Navratri?", opts: ["Courage", "Knowledge", "Energy", "Purity"], ans: 1 },
        hi: { q: "नवरात्रि में पीला रंग क्या दर्शाता है?", opts: ["साहस", "ज्ञान", "ऊर्जा", "पवित्रता"], ans: 1 }
    },
    {
        en: { q: "Which flower is commonly associated with Navratri?", opts: ["Rose", "Sunflower", "Marigold", "Lotus"], ans: 2 },
        hi: { q: "नवरात्रि से कौन सा फूल आमतौर पर जुड़ा है?", opts: ["गुलाब", "सूरजमुखी", "गेंदा", "कमल"], ans: 2 }
    },
    {
        en: { q: "In which month does Navratri usually fall?", opts: ["August", "September-October", "November", "December"], ans: 1 },
        hi: { q: "नवरात्रि आमतौर पर किस महीने में पड़ता है?", opts: ["अगस्त", "सितंबर-अक्टूबर", "नवंबर", "दिसंबर"], ans: 1 }
    },
    {
        en: { q: "What does the color green symbolize during Navratri?", opts: ["Strength", "Prosperity", "Healing", "Growth"], ans: 1 },
        hi: { q: "नवरात्रि में हरा रंग क्या दर्शाता है?", opts: ["शक्ति", "समृद्धि", "उपचार", "वृद्धि"], ans: 1 }
    },
    {
        en: { q: "What is celebrated on Vijayadashami?", opts: ["New Year", "Victory of Rama over Ravana", "Harvest Festival", "Spring Festival"], ans: 1 },
        hi: { q: "विजयदशमी पर क्या मनाया जाता है?", opts: ["नया साल", "राम की रावण पर जीत", "फसल का त्योहार", "वसंत त्योहार"], ans: 1 }
    },
    {
        en: { q: "Which type of dance is performed during Navratri?", opts: ["Bharatanatyam", "Garba and Dandiya Raas", "Kathak", "Odissi"], ans: 1 },
        hi: { q: "नवरात्रि के दौरान कौन सा नृत्य किया जाता है?", opts: ["भरतनाट्यम", "गरबा और डंडिया राস", "कथक", "ओडिसी"], ans: 1 }
    },
    {
        en: { q: "Which festival is celebrated after Navratri?", opts: ["Holi", "Dussehra", "Diwali", "Baisakhi"], ans: 1 },
        hi: { q: "नवरात्रि के बाद कौन सा त्योहार मनाया जाता है?", opts: ["होली", "दशहरा", "दिवाली", "बैसाखी"], ans: 1 }
    },
    {
        en: { q: "What is the significance of fasting during Navratri?", opts: ["Losing weight", "Spiritual cleansing", "Medical purpose", "Tradition"], ans: 1 },
        hi: { q: "नवरात्रि के दौरान उपवास का महत्व क्या है?", opts: ["वजन कम करना", "आध्यात्मिक शुद्धिकरण", "चिकित्सा उद्देश्य", "परंपरा"], ans: 1 }
    },
    {
        en: { q: "What is the last day of Navratri called?", opts: ["Ashtami", "Navami", "Dashami", "Ekadashi"], ans: 1 },
        hi: { q: "नवरात्रि का आखिरी दिन क्या कहलाता है?", opts: ["अष्टमी", "नवमी", "दशमी", "एकादशी"], ans: 1 }
    },
    {
        en: { q: "What have devotees been known to do during Navratri?", opts: ["Sleep more", "Offer prayers and do rituals", "Travel", "Play games"], ans: 1 },
        hi: { q: "नवरात्रि के दौरान भक्त क्या करते हैं?", opts: ["ज्यादा सोना", "प्रार्थना करना और अनुष्ठान करना", "यात्रा करना", "खेल खेलना"], ans: 1 }
    },
    {
        en: { q: "What is the significance of the nine days of Navratri?", opts: ["Nine battles", "Nine forms of Goddess Durga", "Nine festivals", "Nine communities"], ans: 1 },
        hi: { q: "नवरात्रि के नौ दिनों का महत्व क्या है?", opts: ["नौ लड़ाइयां", "देवी दुर्गा के नौ रूप", "नौ त्योहार", "नौ समुदाय"], ans: 1 }
    },
    {
        en: { q: "What is a common practice among devotees during Navratri?", opts: ["Playing sports", "Participating in Garba nights", "Watching movies", "Reading books"], ans: 1 },
        hi: { q: "नवरात्रि के दौरान भक्तों में एक आम प्रथा क्या है?", opts: ["खेल खेलना", "गरबे की रातों में भाग लेना", "फिल्में देखना", "किताबें पढ़ना"], ans: 1 }
    },
    {
        en: { q: "What do the nine nights symbolize?", opts: ["Nine months", "Nine forms of Durga", "Nine planets", "Nine colors"], ans: 1 },
        hi: { q: "नौ रातें क्या दर्शाती हैं?", opts: ["नौ महीने", "दुर्गा के नौ रूप", "नौ ग्रह", "नौ रंग"], ans: 1 }
    },
    {
        en: { q: "Which animal is associated with Goddess Durga?", opts: ["Tiger", "Lion", "Elephant", "Horse"], ans: 1 },
        hi: { q: "देवी दुर्गा से कौन सा जानवर जुड़ा है?", opts: ["बाघ", "शेर", "हाथी", "घोड़ा"], ans: 1 }
    },
    {
        en: { q: "What do people decorate their homes with during Navratri?", opts: ["Glass", "Flowers and lights", "Plastic", "Paper"], ans: 1 },
        hi: { q: "नवरात्रि के दौरान लोग अपने घरों को किससे सजाते हैं?", opts: ["कांच", "फूल और रोशनी", "प्लास्टिक", "कागज"], ans: 1 }
    },
    {
        en: { q: "What is Navratri also known as?", opts: ["Durga Puja", "Dussehra only", "Festival of Nine Nights", "Garba Festival"], ans: 2 },
        hi: { q: "नवरात्रि को और क्या कहा जाता है?", opts: ["दुर्गा पूजा", "केवल दशहरा", "नौ रातों का त्योहार", "गरबा त्योहार"], ans: 2 }
    }
];

// Translations
const translations = {
    en: {
        title: "🌸 Navratri Mythology Quiz 🌸",
        subtitle: "Test your knowledge of Maa Durga and Indian mythology",
        rulesTitle: "📋 Quiz Rules",
        participationTitle: "📌 Participation Details",
        welcomeText: "Welcome to Navratri Quiz",
        startBtn: "Start the Quiz 🎮",
        question: "Questions",
        timeLimit: "Time Limit",
        winner: "Winner",
        goddessesTitle: "The 9 Forms of Maa Durga",
        participationDesc: "All participants will be required to provide their basic information before starting the quiz.",
        nameLabel: "Participant Name *",
        emailLabel: "Email Address *",
        phoneLabel: "Phone Number *",
        backBtn: "Back",
        startFormBtn: "Start Quiz",
        previousBtn: "← पिछला / Previous",
        nextBtn: "Next / अगला →",
        submitBtn: "Submit Quiz",
        quizTitle: "Navratri Quiz",
        progressText: "Question",
        of: "of",
        certTitle: "Certificate of Participation",
        certMessage: "शुभ नवरात्रि / Happy Navratri",
        scoreLabel: "Your Score:",
        percentageLabel: "Percentage:",
        timeLabel: "Time Taken:",
        reviewTitle: "Answer Review",
        homeBtn: "Back to Home",
        yourAnswer: "Your Answer:",
        correctAnswer: "Correct Answer:"
    },
    hi: {
        title: "🌸 नवरात्रि पौराणिक कथा क्विज 🌸",
        subtitle: "माँ दुर्गा और भारतीय पौराणिक कथाओं का परीक्षण करें",
        rulesTitle: "📋 क्विज नियम",
        participationTitle: "📌 भाग लेने का विवरण",
        welcomeText: "नवरात्रि क्विज में आपका स्वागत है",
        startBtn: "क्विज शुरू करें 🎮",
        question: "प्रश्न",
        timeLimit: "समय सीमा",
        winner: "विजेता",
        goddessesTitle: "माँ दुर्गा के 9 रूप",
        participationDesc: "सभी प्रतिभागियों को क्विज शुरू करने से पहले अपनी बुनियादी जानकारी प्रदान करनी होगी।",
        nameLabel: "प्रतिभागी का नाम *",
        emailLabel: "ईमेल पता *",
        phoneLabel: "फोन नंबर *",
        backBtn: "वापस",
        startFormBtn: "क्विज शुरू करें",
        previousBtn: "← पिछला / Previous",
        nextBtn: "Next / अगला →",
        submitBtn: "क्विज जमा करें",
        quizTitle: "नवरात्रि क्विज",
        progressText: "प्रश्न",
        of: "का",
        certTitle: "भागीदारी का प्रमाणपत्र",
        certMessage: "शुभ नवरात्रि / Happy Navratri",
        scoreLabel: "आपका स्कोर:",
        percentageLabel: "प्रतिशत:",
        timeLabel: "लिया गया समय:",
        reviewTitle: "उत्तर समीक्षा",
        homeBtn: "होम पर वापस जाएं",
        yourAnswer: "आपका उत्तर:",
        correctAnswer: "सही उत्तर:"
    }
};

// Set language
function setLanguage(lang) {
    currentLanguage = lang;
    updateLanguage();
}

// Update all text based on language
function updateLanguage() {
    const elements = document.querySelectorAll('[id]');
    elements.forEach(el => {
        const key = el.id.replace('-', '');
        if (translations[currentLanguage][key]) {
            el.textContent = translations[currentLanguage][key];
        }
    });
    
    // Update language buttons
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelectorAll('.lang-toggle-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    if (currentLanguage === 'en') {
        document.querySelectorAll('.lang-btn')[0].classList.add('active');
        document.querySelectorAll('.lang-toggle-btn')[0].classList.add('active');
    } else {
        document.querySelectorAll('.lang-btn')[1].classList.add('active');
        document.querySelectorAll('.lang-toggle-btn')[1].classList.add('active');
    }

    if (currentQuestionIndex >= 0 && currentQuestionIndex < quizQuestions.length) {
        loadQuestion();
    }
}

// Show registration form
function showRegistrationForm() {
    document.getElementById('home-page').classList.remove('active');
    document.getElementById('registration-page').classList.add('active');
}

// Start quiz from registration form
function startQuizFromForm() {
    const name = document.getElementById('participant-name-input').value.trim();
    const email = document.getElementById('participant-email').value.trim();
    const phone = document.getElementById('participant-phone').value.trim();

    if (!name || !email || !phone) {
        alert('Please fill in all required fields');
        return;
    }

    participantName = name;
    participantEmail = email;
    participantPhone = phone;

    document.getElementById('registration-page').classList.remove('active');
    document.getElementById('quiz-page').classList.add('active');
    document.getElementById('participant-display').textContent = `👤 ${participantName}`;

    startTime = Date.now();
    startTimer();
    loadQuestion();
}

// Start timer
function startTimer() {
    const timerElement = document.getElementById('timer');
    timerInterval = setInterval(() => {
        timeLeft--;
        const mins = Math.floor(timeLeft / 60);
        const secs = timeLeft % 60;
        timerElement.textContent = `${mins}:${secs < 10 ? '0' : ''}${secs}`;

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            submitQuiz();
        }
    }, 1000);
}

// Load question
function loadQuestion() {
    const question = quizQuestions[currentQuestionIndex][currentLanguage];
    document.getElementById('question-text').textContent = question.q;
    
    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = '';
    
    question.opts.forEach((option, index) => {
        const label = document.createElement('label');
        label.className = 'option-label';
        
        const input = document.createElement('input');
        input.type = 'radio';
        input.name = 'answer';
        input.value = index;
        input.checked = userAnswers[currentQuestionIndex] === index;
        
        const span = document.createElement('span');
        span.textContent = option;
        
        label.appendChild(input);
        label.appendChild(span);
        optionsContainer.appendChild(label);
    });

    // Update progress
    const total = quizQuestions.length;
    const progressPercent = ((currentQuestionIndex + 1) / total) * 100;
    document.getElementById('progress-fill').style.width = progressPercent + '%';
    document.getElementById('progress-text').textContent = `${translations[currentLanguage]['progressText']} ${currentQuestionIndex + 1} ${translations[currentLanguage]['of']} ${total}`;
}

// Next question
function nextQuestion() {
    saveAnswer();
    if (currentQuestionIndex < quizQuestions.length - 1) {
        currentQuestionIndex++;
        loadQuestion();
    }
}

// Previous question
function previousQuestion() {
    saveAnswer();
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        loadQuestion();
    }
}

// Save answer
function saveAnswer() {
    const selected = document.querySelector('input[name="answer"]:checked');
    if (selected) {
        userAnswers[currentQuestionIndex] = parseInt(selected.value);
    }
}

// Submit quiz
function submitQuiz() {
    clearInterval(timerInterval);
    saveAnswer();
    
    // Calculate score
    score = 0;
    for (let i = 0; i < quizQuestions.length; i++) {
        if (userAnswers[i] === quizQuestions[i][currentLanguage].ans) {
            score++;
        }
    }

    const timeTaken = Math.round((Date.now() - startTime) / 1000);
    const percentage = Math.round((score / quizQuestions.length) * 100);

    // Submit to Google Sheets
    submitToGoogleSheets(participantName, participantEmail, participantPhone, score, percentage, timeTaken);

    // Show results
    showResults(score, percentage, timeTaken);
}

// Submit to Local Server
function submitToGoogleSheets(name, email, phone, score, percentage, timeTaken) {
    const data = {
        name: name,
        email: email,
        phone: phone,
        score: `${score}/30`,
        percentage: `${percentage}%`,
        timeTaken: timeTaken
    };

    fetch(`${SERVER_URL}/api/participants`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('HTTP error! Status: ' + response.status);
        }
        return response.json();
    })
    .then(result => {
        console.log('Submission response:', result);
        if (result.success) {
            updateParticipantCount();
        }
    })
    .catch(err => console.error('Failed to submit quiz to server:', err));
}

// Show results
function showResults(finalScore, percentage, timeTaken) {
    document.getElementById('quiz-page').classList.remove('active');
    document.getElementById('results-page').classList.add('active');

    document.getElementById('cert-name').textContent = `${participantName}`;
    document.getElementById('cert-message').textContent = `${translations[currentLanguage]['certMessage']}`;
    document.getElementById('final-score').textContent = `${finalScore}/30`;
    document.getElementById('final-percentage').textContent = `${percentage}%`;
    document.getElementById('final-time').textContent = `${Math.floor(timeTaken / 60)} minute${timeTaken >= 120 ? 's' : ''}`;

    showAnswerReview();
}

// Show answer review
function showAnswerReview() {
    const reviewContainer = document.getElementById('answer-review-container');
    reviewContainer.innerHTML = '';

    quizQuestions.forEach((q, index) => {
        const question = q[currentLanguage];
        const userAnswer = userAnswers[index] !== undefined ? question.opts[userAnswers[index]] : 'N/A';
        const correctAnswer = question.opts[question.ans];
        const isCorrect = userAnswers[index] === question.ans;

        const reviewDiv = document.createElement('div');
        reviewDiv.className = `review-item ${isCorrect ? 'correct' : 'incorrect'}`;
        reviewDiv.innerHTML = `
            <h4>Q${index + 1}: ${question.q}</h4>
            <p><strong>${translations[currentLanguage]['yourAnswer']}</strong> ${userAnswer}</p>
            <p><strong>${translations[currentLanguage]['correctAnswer']}</strong> ${correctAnswer}</p>
        `;
        reviewContainer.appendChild(reviewDiv);
    });
}

// Update participant count display
function updateParticipantCount() {
    fetch(`${SERVER_URL}/api/participants/count`)
        .then(response => response.json())
        .then(data => {
            const countElement = document.getElementById('participant-count');
            if (countElement) {
                countElement.textContent = data.count || 0;
            }
        })
        .catch(err => console.error('Failed to fetch participant count:', err));
}

// Load participant count when page loads
document.addEventListener('DOMContentLoaded', function() {
    updateParticipantCount();
});
    location.reload();
}

// Back to home
function backToHome() {
    document.getElementById('registration-page').classList.remove('active');
    document.getElementById('home-page').classList.add('active');
}
