const apikey = '21ed4b1c47204c5eab8ec268c69d3549';

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
    if ((isReal && currentHeadline.isReal) || (!isReal && !currentHeadline.isReal)) {
        score++;
    }
    rounds++;
    scoreElement.textContent = "Score: " + score;
    nextRound();
}

async function fetchRealHeadlines() {
    const categories = ['business', 'technology', 'health', 'entertainment', 'science'];
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];

    const response = await fetch(
        `https://newsapi.org/v2/top-headlines?country=us&category=${randomCategory}&apiKey=${apikey}`
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

function generateFakeHeadline() {
    const fakeHeadlines = [
        "Local cat elected mayor of small town: 'Whiskers for Mayor' - CNN",
        "Man claims to have trained pigeons to deliver Amazon packages: 'Pigeon Prime Now' - The New York Times",
        "New study finds pizza to be a superfood - National Geographic",
        "World's first underwater casino opens in the Pacific Ocean - Reuters",
        "Alien diplomats visit Earth to discuss intergalactic trade - BBC",
        "Scientists discover lost city of Atlantis, complete with mermaid residents - The Guardian",
        "Chocolate declared a new form of currency by European Union - Bloomberg",
        "Rare dinosaur fossils found on the moon - Associated Press",
        "Canadian government offers free maple syrup to all citizens - CBC",
        "Man survives a fall from an airplane without a parachute - USA Today",
        "Local Man Claims to Have Traveled Back in Time - The Onion",
        "Study Finds that Cats Can Speak Fluent French - National Enquirer",
        "Secret Alien Base Discovered on the Moon - Weekly World News",
        "World's Oldest Person Celebrates 150th Birthday by Skydiving - The Huffington Post",
        "China unveils plans for a moon colony, partners with SpaceX - Reuters",
        "NASA to auction naming rights for Jupiter's Great Red Spot - The New York Times",
        "World leaders gather for annual peace-making championship in Switzerland - BBC News",
        "Elon Musk reveals plans to build first Martian shopping mall - CNBC",
        "Amazon announces plans to deliver packages via hot air balloons - Bloomberg",
        "New study finds that chocolate is the key to eternal youth - The Washington Post",
        "Kim Jong-un declares world's best pizza in North Korea - CNN",
        "Oprah Winfrey announces presidential bid for 2024 - CNN",
        "NASA plans to build a city on the moon by 2030 - The New York Times",
        "Penguins found flying over the Antarctic, baffling researchers - The Guardian",
        "Russia to host the 2024 Summer Olympics, surprising decision - Associated Press",
        "World's largest chocolate bar sets new Guinness World Record - Reuters",
        "Apple to launch iPhone with built-in teleportation feature - CNET",
        "New covid-19 variant found in Antarctica, sparks global concern - Reuters",
        "Scientists discover secret to eternal youth in a remote Amazon tribe - National Geographic",

    ];
    const randomIndex = Math.floor(Math.random() * fakeHeadlines.length);
    return {
        isReal: false,
        text: fakeHeadlines[randomIndex]
    };
}

async function nextRound() {
    if (rounds < 20) {
        const realHeadlines = await fetchRealHeadlines();
        if (realHeadlines) {
            const filteredHeadlines = realHeadlines.filter(headline => !usedHeadlines.has(headline.text) && headline.text !== "[Removed]");
            if (filteredHeadlines.length > 0) {
                const headlines = [...filteredHeadlines, generateFakeHeadline()];
                const randomIndex = Math.floor(Math.random() * headlines.length);
                currentHeadline = headlines[randomIndex];
                usedHeadlines.add(currentHeadline.text);
                headlineElement.textContent = currentHeadline.text;
            } else {
                nextRound();
            }
        }
    } else {
        endGame();
    }
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
