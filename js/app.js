const apiKey = 'fd0a00115d397d86a41cf059e7dc3b92';

const startButton = document.getElementById("start-button");
const realButton = document.getElementById("real-button");
const fakeButton = document.getElementById("fake-button");
const scoreElement = document.getElementById("score");
const endScreen = document.getElementById("end-screen");
const finalScore = document.getElementById("final-score");
const playAgainButton = document.getElementById("play-again-button");
const headlineElement = document.getElementById("headline");

let score = 0;
let rounds = 0;
let currentHeadline = null;
const usedHeadlines = new Set();
let shuffledHeadlines = [];
let progressBar = document.getElementById("progress-bar");
const maxRounds = 20;

startButton.addEventListener("click", startGame);
realButton.addEventListener("click", () => checkAnswer(true));
fakeButton.addEventListener("click", () => checkAnswer(false));
playAgainButton.addEventListener("click", resetGame);

// game functions
function startGame() {
    document.getElementById("start-screen").style.display = "none";
    document.getElementById("game-screen").style.display = "block";
    nextRound();
}

function checkAnswer(isReal) {
    let isCorrect = (isReal && currentHeadline.isReal) || (!isReal && !currentHeadline.isReal);

    if (isCorrect) {
        score++;
        scoreElement.textContent = "Score: " + score;

        scoreElement.classList.add("correct-feedback");
    } else {
        scoreElement.classList.add("incorrect-feedback");
    }

    realButton.disabled = true;
    fakeButton.disabled = true;

    setTimeout(() => {
        scoreElement.classList.remove("correct-feedback");
        scoreElement.classList.remove("incorrect-feedback");

        realButton.disabled = false;
        fakeButton.disabled = false;

        nextRound();
    }, 1000);
}

async function fetchRealHeadlines() {
    const categories = ['business', 'technology', 'health', 'entertainment', 'science'];
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];

    const response = await fetch(
        `https://gnews.io/api/v4/top-headlines?country=us&topic=${randomCategory}&token=${apiKey}`
    );

    const data = await response.json();
    const articles = data.articles;
    if (articles.length > 0) {
        return articles.map(article => {
            return {
                isReal: true,
                text: article.title
            };
        });
    }
}

// fake headlines
function generateFakeHeadline() {
    const fakeHeadlines = [
        "Man claims to have trained pigeons to deliver Amazon packages: 'Pigeon Prime Now'",
        "World's first underwater casino opens in the Pacific Ocean",
        "Chocolate declared a new form of currency by European Union",
        "Rare dinosaur fossils found on the moon",
        "Man survives a fall from an airplane without a parachute",
        "Local Man Claims to Have Traveled Back in Time",
        "World's Oldest Person Celebrates 150th Birthday by Skydiving",
        "China unveils plans for a moon colony, partners with SpaceX",
        "NASA to auction naming rights for Jupiter's Great Red Spot",
        "World leaders gather for annual peace-making championship in Switzerland",
        "Elon Musk reveals plans to build first Martian shopping mall",
        "Amazon announces plans to deliver packages via hot air balloons",
        "Oprah Winfrey announces presidential bid for 2024",
        "NASA plans to build a city on the moon by 2030",
        "Penguins found flying over the Antarctic, baffling researchers",
        "Russia to host the 2024 Summer Olympics, surprising decision",
        "World's largest chocolate bar sets new Guinness World Record",
        "New covid-19 variant found in Antarctica, sparks global concern",
        "Scientists discover secret to eternal youth in a remote Amazon tribe",
        "AI-Powered Drones to Monitor Endangered Sea Turtles' Nesting Sites",
        "World's First Carbon-Negative Cement Plant Opens in Iceland",
        "Virtual Reality Therapy Proven Effective for Treating Arachnophobia",
        "Cryptocurrency Heist: $200 Million in NFTs Stolen from Online Art Gallery",
        "NASA's Perseverance Rover Discovers Organic Molecules on Mars",
        "World's First 3D-Printed Steel Bridge Opens to the Public in Amsterdam",
        "Groundbreaking Gene Editing Technique Offers Hope for Cystic Fibrosis Patients",
        "First-Ever Global Survey of Insect Decline Reveals Alarming Population Drop",
        "Moon's Mysterious 'Dark Side' Reveals Its Secrets: Scientists Explain",
        "Record-Breaking 100-Year-Old Runner Shares His Secrets to Longevity",
        "Artificial Intelligence Predicts Earthquake Patterns with Unprecedented Accuracy",
        "Lost Ancient City Discovered in Honduran Jungle",
        "AI-Powered Fashion Designer Creates Stunning Couture Collection",
        "World's Largest Solar Power Plant Goes Online in the Sahara Desert",
        "Major Breakthrough: Lab-Grown Human Hearts Successfully Transplanted",
        "Innovative urban farming project transforms abandoned warehouse into vertical farm",
        "This startup company creates eco-friendly packaging material from seaweed",
        "Tiny Mediterranean Island Embraces Renewable Energy, Aims to Be Carbon-Neutral by 2030",
        "Rare Picasso Painting Found in Attic Sells for $10 Million at Auction",
        "Unique Underwater Hotel in the Maldives Offers Guests an Unforgettable Experience",
        "Innovative Urban Farming Initiative Turns Abandoned Factories into Food Production Hubs",
        "Louis Vuitton CEO on how the fashion industry adopts sustainable practices to combat textile waste",
        "5-year-old raises thousands for cancer research by selling hand-painted rocks",
        "Town in Sweden switches to a 4-day workweek with impressive results",
        "Rural community in India achieves 100% renewable energy independence",
        "World-renowned chef Thomas Keller opens restaurant serving meals made from food waste",
        "Pioneering art therapy program brings healing to trauma survivors",
        "This local school's unique approach to teaching boosts student achievement",
        "Ground-breaking study reveals the psychological impact of remote work",
        "Olympic athlete Larisa Semyonovna Latynina shares inspiring journey from adversity to gold medal",
        "New smartphone app helps users reduce digital addiction",
        "Community garden project transforms vacant lot into vibrant urban oasis",
        "Hidden gem: forgotten 18th-century mansion discovered in the heart of the city",
        "Historic peace agreement reached in long-standing conflict",
        "Innovative recycling program converts ocean plastic into 3D-printed prosthetics",
        "Teen's invention to purify contaminated water wins prestigious science competition",
        "Autonomous drone delivery service launches in remote, underserved communities",
        "Oscar-Nominated Actor John Smith Confirmed as Lead Role in Upcoming Superhero Film",
        "World's Largest Solar Power Plant Opens in the Sahara Desert",
        "Record-Breaking Heatwave Sweeps Across Western Europe, Triggering Wildfires",
        "Nobel Prize in Medicine Awarded to Pioneering Geneticist for CRISPR Advancements",
        "New Michelin Three-Star Restaurant 'Gastronomie Étoile' Opens in Paris",
        "2023 Nobel Prize in Literature Awarded to Emerging Author from Zimbabwe",
        "Majority of European Cities Now Powered by 100% Renewable Energy Sources",
        "Record Number of Women Entrepreneurs Break Into the Billionaire Club",
        "2023 Oscar Nominations Announced: Surprises and Snubs",
        "Robotics Revolution in Agriculture: AI Tractors Boost Crop Yields by 30%",
        "New Dietary Guidelines Encourage Plant-Based Diet to Combat Climate Change",
        "Breakthrough Material Could Make Plastic Pollution a Thing of the Past"
    ];
    const randomIndex = Math.floor(Math.random() * fakeHeadlines.length);
    return {
        isReal: false,
        text: fakeHeadlines[randomIndex]
    };
}

async function nextRound() {
    rounds++;
    if (rounds <= 20) {
        if (shuffledHeadlines.length === 0) {
            const realHeadlines = await fetchRealHeadlines();
            if (realHeadlines) {
                const filteredHeadlines = realHeadlines.filter(
                    (headline) =>
                        !usedHeadlines.has(headline.text) && headline.text !== "[Removed]"
                );

                for (let i = 0; i < filteredHeadlines.length; i++) {
                    shuffledHeadlines.push(filteredHeadlines[i]);
                    shuffledHeadlines.push(generateFakeHeadline());
                }

                shuffledHeadlines = shuffleArray(shuffledHeadlines);
            }
        }

        currentHeadline = shuffledHeadlines.pop();
        usedHeadlines.add(currentHeadline.text);
        headlineElement.textContent = currentHeadline.text;

        progressBar.style.width = ((rounds / maxRounds) * 100) + "%";
            
    } else {
        endGame();
    }
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function endGame() {
    document.getElementById("game-screen").style.display = "none";
    endScreen.style.display = "block";
    const percentage = (score / 20) * 100;
    finalScore.textContent = `${score} out of 20 (${percentage}%)`;
}


function resetGame() {
    score = 0;
    rounds = 0;
    scoreElement.textContent = "Score: " + score;
    usedHeadlines.clear();
    progressBar.style.width = "0";
    document.getElementById("end-screen").style.display = "none";
    document.getElementById("start-screen").style.display = "block";
}

// button feedback
const optionButtons = document.querySelectorAll(".option-button");

optionButtons.forEach(button => {
    button.addEventListener("click", function () {
        button.classList.add("button-clicked");
        setTimeout(() => {
            button.classList.remove("button-clicked");
        }, 200);
    });
});
