document.addEventListener("DOMContentLoaded", () => {
    const quizContainer = document.getElementById('quiz-container');
    const resultContainer = document.getElementById('result');
    const leaderboardTable = document.querySelector('#leaderboard tbody');
    const submitButton = document.getElementById('submit-btn');

    // Space quiz questions (add more questions as needed)
    const questions = [
        {
            question: "What is the closest planet to the Sun?",
            options: ["Mercury", "Venus", "Earth", "Mars"],
            answer: "Mercury"
        },
        {
            question: "What is the largest planet in our Solar System?",
            options: ["Jupiter", "Saturn", "Neptune", "Earth"],
            answer: "Jupiter"
        },
        {
            question: "How long does it take for the Earth to orbit the Sun?",
            options: ["24 hours", "365 days", "30 days", "12 months"],
            answer: "365 days"
        },
        {
            question: "What is the name of the galaxy we live in?",
            options: ["Andromeda", "Milky Way", "Whirlpool", "Sombrero"],
            answer: "Milky Way"
        },
        {
            question: "Which planet is known for its rings?",
            options: ["Venus", "Saturn", "Neptune", "Mars"],
            answer: "Saturn"
        },
        {
            question: "What is a supernova?",
            options: [
                "A giant star explosion",
                "A type of comet",
                "A star being born",
                "A solar eclipse"
            ],
            answer: "A giant star explosion"
        },
        {
            question: "What is the force that keeps planets in orbit around the Sun?",
            options: ["Magnetism", "Gravity", "Inertia", "Electromagnetism"],
            answer: "Gravity"
        },
        {
            question: "What is the name of the closest star to Earth?",
            options: ["Proxima Centauri", "Sirius", "Alpha Centauri", "Sun"],
            answer: "Sun"
        },
        {
            question: "What phenomenon is responsible for the red color of Mars?",
            options: ["Iron oxide", "Copper", "Water", "Sulfur"],
            answer: "Iron oxide"
        },
        {
            question: "What is the smallest planet in our solar system?",
            options: ["Mercury", "Mars", "Earth", "Pluto"],
            answer: "Mercury"
        }
    ];

    let userAnswers = [];

    // Shuffle questions and pick 10 random questions
    function shuffleQuestions() {
        return questions.sort(() => Math.random() - 0.5).slice(0, 10);
    }

    function loadQuiz() {
        quizContainer.innerHTML = "";
        const shuffledQuestions = shuffleQuestions();

        shuffledQuestions.forEach((q, index) => {
            const questionDiv = document.createElement('div');
            questionDiv.classList.add('quiz-question');
            questionDiv.innerHTML = `
                <p><strong>Q${index + 1}:</strong> ${q.question}</p>
                ${q.options.map(option => `
                    <label>
                        <input type="radio" name="question${index}" value="${option}">
                        ${option}
                    </label>
                `).join('<br>')}
            `;
            quizContainer.appendChild(questionDiv);
        });

        // Store the current questions so we can check answers later
        userAnswers = shuffledQuestions;
    }

    function calculateScore() {
        let score = 0;
        userAnswers.forEach((q, index) => {
            const selectedOption = document.querySelector(`input[name="question${index}"]:checked`);
            if (selectedOption && selectedOption.value === q.answer) {
                score += 1;
            }
        });
        return score;
    }

    function displayResult() {
        const score = calculateScore();
        resultContainer.innerHTML = `<p>You scored ${score} out of 10!</p>`;
        const userName = prompt("Enter your name for the leaderboard:");
        if (userName) {
            addToLeaderboard(userName, score);
        }
    }

    function addToLeaderboard(name, score) {
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td>${name}</td>
            <td>${score}</td>
        `;
        leaderboardTable.appendChild(newRow);
    }

    // Event Listeners
    submitButton.addEventListener('click', () => {
        displayResult();
        // After submission, disable the submit button to prevent multiple submissions
        submitButton.disabled = true;
    });

    // Load quiz initially
    loadQuiz();
});
