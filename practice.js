/**
 * Practice Module
 * Interactive challenges for learning prompt engineering
 */

const CHALLENGES = {
    beginner: [
        {
            id: 'b1',
            technique: 'zero-shot',
            title: 'Text Classification',
            description: 'Write a zero-shot prompt to classify the sentiment of a customer review.',
            scenario: 'You need to analyze: "The product arrived damaged and customer service was unhelpful."',
            hints: ['Be specific about output format', 'Define the categories clearly'],
            solution: `Classify the following customer review as Positive, Negative, or Neutral.

Review: "The product arrived damaged and customer service was unhelpful."

Sentiment:`,
            criteria: ['mentions classification/categorize', 'specifies output options', 'includes the review text']
        },
        {
            id: 'b2',
            technique: 'role',
            title: 'Expert Advice',
            description: 'Write a role prompt to get nutrition advice for a vegetarian meal plan.',
            scenario: 'You want advice on protein sources for a vegetarian athlete.',
            hints: ['Define the expert role clearly', 'Specify relevant expertise'],
            solution: `You are a certified nutritionist with 10 years of experience specializing in plant-based diets and sports nutrition.

A vegetarian athlete needs advice on getting enough protein. Provide 5 high-protein food recommendations with the grams of protein per serving.`,
            criteria: ['uses "you are" or similar role assignment', 'specifies expertise', 'asks clear question']
        },
        {
            id: 'b3',
            technique: 'instruction',
            title: 'Structured Output',
            description: 'Write an instruction prompt to generate a product description.',
            scenario: 'Create a description for a smart water bottle that tracks hydration.',
            hints: ['Specify length and format', 'Include tone requirements'],
            solution: `Task: Write a product description for an e-commerce listing.

Product: Smart Water Bottle with Hydration Tracking
Features: LED indicators, Bluetooth sync, temperature display

Requirements:
- Length: 80-100 words
- Tone: Enthusiastic and modern
- Include: 3 key benefits and a call-to-action
- Target audience: Health-conscious millennials`,
            criteria: ['structured with task/requirements', 'specifies format/length', 'includes constraints']
        }
    ],
    intermediate: [
        {
            id: 'i1',
            technique: 'few-shot',
            title: 'Email Tone Converter',
            description: 'Create a few-shot prompt to convert formal emails to friendly ones.',
            scenario: 'Help users make their professional emails more approachable.',
            hints: ['Provide 2-3 clear examples', 'Keep consistent format'],
            solution: `Convert formal emails to a friendlier tone while keeping the key message.

Formal: "Dear Mr. Johnson, I am writing to inquire about the status of my application."
Friendly: "Hi Mr. Johnson! Just checking in to see how my application is coming along."

Formal: "Please be advised that the meeting has been rescheduled to Friday."
Friendly: "Heads up! We've moved the meeting to Friday."

Formal: "I regret to inform you that your request cannot be accommodated at this time."
Friendly:`,
            criteria: ['contains 2+ examples', 'consistent format', 'clear input/output pattern']
        },
        {
            id: 'i2',
            technique: 'cot',
            title: 'Math Word Problem',
            description: 'Use Chain-of-Thought to solve a multi-step math problem.',
            scenario: 'A store has a 20% sale, then an additional 10% off. What is the total discount on a $100 item?',
            hints: ['Show step-by-step reasoning', 'Calculate intermediate values'],
            solution: `Let's solve this step by step.

Problem: A store has a 20% sale, then an additional 10% off. What is the final price and total discount on a $100 item?

Step 1: Calculate price after 20% off
Original price: $100
20% of $100 = $20
Price after first discount: $100 - $20 = $80

Step 2: Calculate additional 10% off
10% of $80 = $8
Price after second discount: $80 - $8 = $72

Step 3: Calculate total discount
Total discount = $100 - $72 = $28
Percentage discount = 28%

Final Answer: The final price is $72, representing a 28% total discount.`,
            criteria: ['shows steps', 'calculates intermediate values', 'provides clear answer']
        },
        {
            id: 'i3',
            technique: 'zero-cot',
            title: 'Logic Puzzle',
            description: 'Use Zero-Shot CoT to solve a logic puzzle.',
            scenario: 'Alice is taller than Bob. Charlie is shorter than Bob. Dana is taller than Alice. Who is the shortest?',
            hints: ['Use the magic phrase', 'The model will break it down'],
            solution: `Alice is taller than Bob. Charlie is shorter than Bob. Dana is taller than Alice. Who is the shortest?

Let's think step by step.`,
            criteria: ['contains the question', 'includes "let\'s think step by step" or similar']
        }
    ],
    advanced: [
        {
            id: 'a1',
            technique: 'react',
            title: 'Research Query',
            description: 'Create a ReAct prompt for answering a complex research question.',
            scenario: 'Find out who invented the World Wide Web and what company they worked for at the time.',
            hints: ['Use Thought-Action-Observation format', 'Plan the search strategy'],
            solution: `Answer the following question using the Thought-Action-Observation format.

Question: Who invented the World Wide Web and what company/organization did they work for at the time?

Thought 1: I need to find who invented the World Wide Web.
Action 1: Search[World Wide Web inventor]
Observation 1: Tim Berners-Lee invented the World Wide Web in 1989.

Thought 2: Now I need to find where he worked when he invented it.
Action 2: Search[Tim Berners-Lee 1989 employer]
Observation 2: Tim Berners-Lee was working at CERN when he invented the World Wide Web.

Thought 3: I now have both pieces of information.
Action 3: Finish[Tim Berners-Lee invented the World Wide Web while working at CERN]`,
            criteria: ['uses thought/action/observation', 'structured search strategy', 'reaches conclusion']
        },
        {
            id: 'a2',
            technique: 'tot',
            title: 'Creative Problem Solving',
            description: 'Use Tree of Thoughts for a creative business challenge.',
            scenario: 'A coffee shop wants to increase revenue by 20% without raising prices.',
            hints: ['Use multiple expert perspectives', 'Evaluate and eliminate weak ideas'],
            solution: `Imagine three business experts are brainstorming solutions to this problem. Each expert will propose one solution, explain their reasoning, evaluate its feasibility, and vote on the best approach.

Problem: A local coffee shop wants to increase revenue by 20% without raising prices on existing items.

Expert 1 (Operations): My approach focuses on increasing throughput...
- Idea: Implement mobile ordering to reduce wait times and serve more customers
- Reasoning: Faster service = more customers per hour
- Feasibility: Medium cost, high impact
- Vote: This could work well during peak hours

Expert 2 (Marketing): I'd focus on expanding the customer base...
- Idea: Launch a loyalty program with rewards
- Reasoning: Increases visit frequency and customer retention
- Feasibility: Low cost, proven results
- Vote: Strong option with quick implementation

Expert 3 (Product): Let's look at the menu...
- Idea: Add premium specialty drinks and seasonal items
- Reasoning: Higher margin items without raising base prices
- Feasibility: Low cost, moderate impact
- Vote: Good complement to other strategies

Consensus: Combine loyalty program with premium menu items for best results.`,
            criteria: ['multiple perspectives', 'evaluation/voting', 'converges on solution']
        }
    ]
};

// Track user progress
let userProgress = {
    completed: [],
    scores: {}
};

// Load from localStorage if available
function loadProgress() {
    const saved = localStorage.getItem('promptTeacherProgress');
    if (saved) {
        userProgress = JSON.parse(saved);
    }
    updateProgressDisplay();
}

// Save to localStorage
function saveProgress() {
    localStorage.setItem('promptTeacherProgress', JSON.stringify(userProgress));
    updateProgressDisplay();
}

// Update progress display
function updateProgressDisplay() {
    const totalChallenges = Object.values(CHALLENGES).flat().length;
    const completed = userProgress.completed.length;

    const progressText = document.getElementById('practice-progress');
    const progressFill = document.getElementById('practice-fill');

    if (progressText) progressText.textContent = `${completed}/${totalChallenges}`;
    if (progressFill) progressFill.style.width = `${(completed / totalChallenges) * 100}%`;

    updateBadges();
}

// Update badges display
function updateBadges() {
    const badgesContainer = document.getElementById('badges-container');
    if (!badgesContainer) return;

    const badges = [
        { id: 'first', name: '🌟 First Steps', condition: userProgress.completed.length >= 1 },
        { id: 'trio', name: '🔥 Hat Trick', condition: userProgress.completed.length >= 3 },
        { id: 'halfway', name: '🏃 Halfway', condition: userProgress.completed.length >= 4 },
        { id: 'master', name: '🏆 Master', condition: userProgress.completed.length >= 8 }
    ];

    badgesContainer.innerHTML = badges.map(badge => `
        <span class="badge ${badge.condition ? 'earned' : ''}">${badge.name}</span>
    `).join('');
}

// Current challenge state
let currentChallenge = null;

// Load a practice challenge
function loadPracticeChallenge(techniqueId = null) {
    const difficulty = document.getElementById('difficulty')?.value || 'beginner';
    const challenges = CHALLENGES[difficulty];

    // Find challenge by technique or pick random
    if (techniqueId) {
        currentChallenge = challenges.find(c => c.technique === techniqueId) || challenges[0];
    } else {
        // Pick unfinished challenge or random
        const unfinished = challenges.filter(c => !userProgress.completed.includes(c.id));
        currentChallenge = unfinished.length > 0
            ? unfinished[Math.floor(Math.random() * unfinished.length)]
            : challenges[Math.floor(Math.random() * challenges.length)];
    }

    renderChallenge();
}

// Render current challenge
function renderChallenge() {
    const container = document.getElementById('practice-area');
    if (!container || !currentChallenge) return;

    const isCompleted = userProgress.completed.includes(currentChallenge.id);

    container.innerHTML = `
        <div class="challenge-card">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--spacing-md);">
                <span class="technique-tag" style="background: var(--accent-gradient); color: white;">
                    ${currentChallenge.technique.toUpperCase()}
                </span>
                ${isCompleted ? '<span class="badge earned">✓ Completed</span>' : ''}
            </div>
            <h3 class="challenge-title">${currentChallenge.title}</h3>
            <p class="challenge-description">${currentChallenge.description}</p>
            
            <div class="tip-box" style="margin: var(--spacing-lg) 0;">
                <span class="tip-icon">📝</span>
                <div class="tip-content">
                    <strong>Scenario:</strong> ${currentChallenge.scenario}
                </div>
            </div>
            
            <label for="challenge-input" style="color: var(--text-secondary); font-size: var(--font-size-sm); display: block; margin-bottom: var(--spacing-sm);">
                Your Prompt:
            </label>
            <textarea id="challenge-input" class="challenge-input" placeholder="Write your prompt here..."></textarea>
            
            <div class="challenge-actions">
                <button class="try-btn" onclick="showHints()" style="background: var(--bg-tertiary); flex: 1;">
                    💡 Hints
                </button>
                <button class="try-btn" onclick="checkChallenge()" style="flex: 2;">
                    ✓ Check Answer
                </button>
                <button class="try-btn" onclick="showSolution()" style="background: var(--bg-tertiary); flex: 1;">
                    👁 Solution
                </button>
            </div>
            
            <div id="hints-area" class="hidden" style="margin-top: var(--spacing-lg);">
                <div class="tip-box warning">
                    <span class="tip-icon">💡</span>
                    <div class="tip-content">
                        <strong>Hints:</strong>
                        <ul style="margin: var(--spacing-sm) 0 0; padding-left: 1.2em;">
                            ${currentChallenge.hints.map(h => `<li>${h}</li>`).join('')}
                        </ul>
                    </div>
                </div>
            </div>
            
            <div id="feedback-area" style="margin-top: var(--spacing-lg);"></div>
        </div>
        
        <div style="text-align: center; margin-top: var(--spacing-lg);">
            <button class="try-btn" onclick="loadPracticeChallenge()" style="background: var(--bg-tertiary);">
                🔄 Next Challenge
            </button>
        </div>
    `;
}

// Show hints
function showHints() {
    const hintsArea = document.getElementById('hints-area');
    if (hintsArea) {
        hintsArea.classList.toggle('hidden');
    }
}

// Check user's answer
function checkChallenge() {
    const input = document.getElementById('challenge-input')?.value.toLowerCase() || '';
    const feedbackArea = document.getElementById('feedback-area');

    if (!input.trim()) {
        feedbackArea.innerHTML = `
            <div class="tip-box warning">
                <span class="tip-icon">⚠️</span>
                <div class="tip-content">Please write your prompt first!</div>
            </div>
        `;
        return;
    }

    // Check criteria
    const metCriteria = currentChallenge.criteria.map(criterion => {
        const keywords = criterion.toLowerCase().split('/');
        return keywords.some(kw => input.includes(kw.trim()));
    });

    const score = Math.round((metCriteria.filter(Boolean).length / currentChallenge.criteria.length) * 100);

    // Generate feedback
    let feedback = '';
    if (score >= 80) {
        feedback = `
            <div class="tip-box" style="background: var(--success-light); border-color: var(--success);">
                <span class="tip-icon">🎉</span>
                <div class="tip-content">
                    <strong>Excellent!</strong> Score: ${score}/100<br>
                    Your prompt demonstrates a solid understanding of ${currentChallenge.technique} prompting!
                </div>
            </div>
        `;

        // Mark as completed
        if (!userProgress.completed.includes(currentChallenge.id)) {
            userProgress.completed.push(currentChallenge.id);
            userProgress.scores[currentChallenge.id] = score;
            saveProgress();
            showToast('🎉 Challenge completed!', 'success');
        }
    } else if (score >= 50) {
        feedback = `
            <div class="tip-box warning">
                <span class="tip-icon">🤔</span>
                <div class="tip-content">
                    <strong>Getting there!</strong> Score: ${score}/100<br>
                    Good start, but your prompt could be improved. Check the hints and compare with the solution.
                </div>
            </div>
        `;
    } else {
        feedback = `
            <div class="tip-box" style="background: var(--error-light); border-color: var(--error);">
                <span class="tip-icon">📚</span>
                <div class="tip-content">
                    <strong>Keep learning!</strong> Score: ${score}/100<br>
                    Review the technique guide and hints, then try again. You've got this!
                </div>
            </div>
        `;
    }

    feedbackArea.innerHTML = feedback;
}

// Show solution
function showSolution() {
    const feedbackArea = document.getElementById('feedback-area');
    feedbackArea.innerHTML = `
        <div class="technique-section">
            <h4>📋 Example Solution</h4>
            <div class="code-block good">
                <pre>${escapeHtml(currentChallenge.solution)}</pre>
            </div>
            <p style="color: var(--text-tertiary); font-size: var(--font-size-sm); margin-top: var(--spacing-sm);">
                This is one possible solution. Your prompt may be different but equally valid!
            </p>
        </div>
    `;
}

// Escape HTML
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Show toast notification
function showToast(message, type = '') {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toast-message');

    if (toast && toastMessage) {
        toastMessage.textContent = message;
        toast.className = `toast ${type}`;

        setTimeout(() => {
            toast.classList.add('hidden');
        }, 3000);
    }
}

// Initialize practice module
function initPractice() {
    loadProgress();

    // Load initial challenge
    loadPracticeChallenge();

    // Difficulty change handler
    const difficultySelect = document.getElementById('difficulty');
    if (difficultySelect) {
        difficultySelect.addEventListener('change', () => loadPracticeChallenge());
    }
}

// Export
window.initPractice = initPractice;
window.loadPracticeChallenge = loadPracticeChallenge;
