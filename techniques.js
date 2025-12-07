/**
 * Prompt Techniques Module
 * Contains all prompting technique content and examples
 */

const TECHNIQUES = {
    'zero-shot': {
        icon: '🎯',
        title: 'Zero-Shot Prompting',
        description: 'Zero-shot prompting is the simplest form of prompting where you directly instruct the model to perform a task without providing any examples. The model relies entirely on its pre-trained knowledge to understand and execute the task.',
        whenToUse: 'Use when the task is straightforward and the model likely understands the domain well.',
        examples: {
            good: `Classify the following text as positive, negative, or neutral.

Text: "The new restaurant exceeded all my expectations with their amazing food and service."

Sentiment:`,
            bad: `What do you think about this?

"The new restaurant exceeded all my expectations with their amazing food and service."`,
            output: 'Positive'
        },
        tips: [
            'Be specific about the expected output format',
            'Clearly define the task in one or two sentences',
            'Use action verbs like "classify", "summarize", "translate"'
        ],
        keyPhrases: ['classify', 'categorize', 'identify', 'determine', 'extract']
    },

    'few-shot': {
        icon: '📝',
        title: 'Few-Shot Prompting',
        description: 'Few-shot prompting involves providing a few examples of the desired input-output pairs before asking the model to perform the task. This helps the model understand the pattern and format you expect.',
        whenToUse: 'Use when zero-shot produces inconsistent results, or when you need a specific format.',
        examples: {
            good: `Classify the sentiment of movie reviews.

Review: "This film was a masterpiece of storytelling."
Sentiment: Positive

Review: "Waste of two hours, terrible acting."
Sentiment: Negative

Review: "It was okay, nothing special."
Sentiment: Neutral

Review: "Absolutely loved every minute of it!"
Sentiment:`,
            bad: `Good reviews are positive, bad reviews are negative.

"Absolutely loved every minute of it!"`,
            output: 'Positive'
        },
        tips: [
            'Use 2-5 diverse examples that cover different cases',
            'Keep consistent formatting across all examples',
            'Order examples from simple to complex',
            'Include edge cases in your examples'
        ],
        keyPhrases: ['example:', 'for instance:', 'like this:', 'here are examples']
    },

    'cot': {
        icon: '🔗',
        title: 'Chain-of-Thought (CoT) Prompting',
        description: 'Chain-of-Thought prompting encourages the model to break down complex reasoning into intermediate steps. By showing the model how to think through a problem step by step, it can handle more complex tasks that require multi-step reasoning.',
        whenToUse: 'Use for math problems, logical reasoning, or any task requiring multiple steps.',
        examples: {
            good: `Q: The odd numbers in this group add up to an even number: 4, 8, 9, 15, 12, 2, 1.
A: Let me work through this step by step.
First, identify the odd numbers: 9, 15, 1
Then, add them together: 9 + 15 + 1 = 25
Finally, check if 25 is even: No, 25 is odd.
Answer: False

Q: The odd numbers in this group add up to an even number: 17, 10, 19, 4, 8, 12, 24.
A:`,
            bad: `The odd numbers in this group add up to an even number: 17, 10, 19, 4, 8, 12, 24. True or False?`,
            output: `Let me work through this step by step.
First, identify the odd numbers: 17, 19
Then, add them together: 17 + 19 = 36
Finally, check if 36 is even: Yes, 36 is even.
Answer: True`
        },
        tips: [
            'Show the reasoning process in your examples',
            'Use phrases like "Let\'s think step by step"',
            'Break complex problems into smaller sub-problems',
            'Explicitly state intermediate results'
        ],
        keyPhrases: ['step by step', 'first,', 'then,', 'therefore', 'because', 'let me think']
    },

    'zero-cot': {
        icon: '💡',
        title: 'Zero-Shot Chain-of-Thought',
        description: 'Zero-Shot CoT is a simple but powerful technique where you append "Let\'s think step by step" to your prompt. This magic phrase triggers the model to break down its reasoning without needing examples.',
        whenToUse: 'Use when you need reasoning but don\'t have time to craft examples.',
        examples: {
            good: `I went to the market and bought 10 apples. I gave 2 apples to the neighbor and 2 to the repairman. I then went and bought 5 more apples and ate 1. How many apples did I remain with?

Let's think step by step.`,
            bad: `I went to the market and bought 10 apples. I gave 2 apples to the neighbor and 2 to the repairman. I then went and bought 5 more apples and ate 1. How many apples did I remain with?`,
            output: `Let's think step by step.
1. Started with: 10 apples
2. Gave to neighbor: 10 - 2 = 8 apples
3. Gave to repairman: 8 - 2 = 6 apples
4. Bought more: 6 + 5 = 11 apples
5. Ate one: 11 - 1 = 10 apples

I remain with 10 apples.`
        },
        tips: [
            'Simply add "Let\'s think step by step" at the end',
            'Works best with arithmetic and reasoning problems',
            'Can be combined with other techniques',
            'Alternative phrases: "Let me break this down", "Let\'s analyze this"'
        ],
        keyPhrases: ["let's think step by step", "let me break this down", "let's analyze"]
    },

    'react': {
        icon: '⚡',
        title: 'ReAct Prompting',
        description: 'ReAct (Reasoning + Acting) combines reasoning with actions, allowing the model to interact with external tools or knowledge bases. The model alternates between thinking (Thought), taking action (Action), and observing results (Observation).',
        whenToUse: 'Use when the model needs to retrieve information or perform actions to complete a task.',
        examples: {
            good: `Answer the following question using the Thought-Action-Observation pattern.

Question: What is the elevation range for the area that the eastern sector of the Colorado orogeny extends into?

Thought 1: I need to search Colorado orogeny, find the area that the eastern sector of the Colorado orogeny extends into.
Action 1: Search[Colorado orogeny]
Observation 1: The Colorado orogeny was an episode of mountain building in Colorado and surrounding areas.

Thought 2: It does not mention the eastern sector. I need to look for the eastern sector.
Action 2: Lookup[eastern sector]
Observation 2: The eastern sector extends into the High Plains.

Thought 3: Now I need to search High Plains and find its elevation range.
Action 3: Search[High Plains]
Observation 3: High Plains refers to one of two distinct land regions. The High Plains are a subregion of the Great Plains, with elevation from around 1,800 to 7,000 ft.

Thought 4: I found that High Plains' elevation range is 1,800 to 7,000 ft.
Action 4: Finish[1,800 to 7,000 ft]`,
            bad: `What is the elevation range for the area that the eastern sector of the Colorado orogeny extends into?`,
            output: '1,800 to 7,000 ft'
        },
        tips: [
            'Use clear Thought → Action → Observation cycles',
            'Define available actions (Search, Lookup, Calculate, Finish)',
            'Each Thought should explain the reasoning',
            'Best for complex queries requiring external knowledge'
        ],
        keyPhrases: ['thought:', 'action:', 'observation:', 'search[', 'lookup[', 'finish[']
    },

    'tot': {
        icon: '🌳',
        title: 'Tree of Thoughts (ToT)',
        description: 'Tree of Thoughts prompting explores multiple reasoning paths simultaneously, like a tree of possibilities. It allows the model to consider different approaches, evaluate them, and backtrack if needed.',
        whenToUse: 'Use for complex problems with multiple possible solutions or creative tasks.',
        examples: {
            good: `Imagine three different experts are answering this question.
All experts will write down 1 step of their thinking, then share it with the group.
Then all experts will go on to the next step, etc.
If any expert realizes they're wrong at any point then they leave.

The question is: How can we reduce carbon emissions in a city by 30% in 5 years?

Expert 1: First, I'll focus on transportation - the largest emission source in most cities...
Expert 2: I'll start with buildings and energy efficiency since it offers quick wins...
Expert 3: I'll consider a mix of policy changes and infrastructure investment...`,
            bad: `How can we reduce carbon emissions in a city by 30% in 5 years? Give me a plan.`,
            output: `[Experts deliberate through multiple rounds, eliminate weak approaches, and converge on the strongest solutions]`
        },
        tips: [
            'Use the "expert panel" format for easy implementation',
            'Allow for exploration and elimination of bad paths',
            'Works well for creative problem-solving',
            'Can combine with voting or scoring mechanisms'
        ],
        keyPhrases: ['expert', 'consider multiple', 'evaluate', 'explore different', 'multiple approaches']
    },

    'role': {
        icon: '🎭',
        title: 'Role Prompting',
        description: 'Role prompting assigns a specific persona, expertise, or character to the model. This helps focus the model\'s responses within a particular domain and can improve the quality and relevance of outputs.',
        whenToUse: 'Use when you need specialized expertise or a particular perspective.',
        examples: {
            good: `You are an experienced Python developer with 15 years of experience, specializing in clean code and best practices. You write code that is readable, maintainable, and well-documented.

Review the following code and suggest improvements:

\`\`\`python
def calc(x,y):
    return x+y
\`\`\``,
            bad: `Review this code:

def calc(x,y):
    return x+y`,
            output: `As an experienced Python developer, here are my suggestions:

1. **Function naming**: Use descriptive names - 'calc' is vague. Consider 'add_numbers' or 'calculate_sum'.

2. **Type hints**: Add type annotations for clarity:
\`\`\`python
def add_numbers(x: float, y: float) -> float:
\`\`\`

3. **Docstring**: Add documentation:
\`\`\`python
def add_numbers(x: float, y: float) -> float:
    """Calculate the sum of two numbers."""
    return x + y
\`\`\``
        },
        tips: [
            'Be specific about the role\'s expertise and background',
            'Include relevant traits (tone, style, approach)',
            'Combine with other techniques for better results',
            'Use "You are..." or "Act as..." to set the role'
        ],
        keyPhrases: ['you are', 'act as', 'as a', 'in the role of', 'expert in', 'specialist']
    },

    'instruction': {
        icon: '📋',
        title: 'Instruction Prompting',
        description: 'Instruction prompting focuses on giving clear, structured instructions to the model. Well-crafted instructions include the task, format requirements, constraints, and expected output format.',
        whenToUse: 'Use for any task where you need predictable, formatted outputs.',
        examples: {
            good: `Task: Write a product description for an e-commerce website.

Product: Wireless Bluetooth Headphones
Target audience: Young professionals

Requirements:
- Length: 100-150 words
- Tone: Professional yet approachable
- Include: Key features, benefits, and a call to action
- Format: Single paragraph

Begin the description:`,
            bad: `Write about some headphones.`,
            output: `Experience audio freedom with our premium Wireless Bluetooth Headphones, designed for the modern professional on the go. Featuring advanced noise-cancellation technology and 40-hour battery life, these headphones deliver crystal-clear sound whether you're in the office, commuting, or working from your favorite café. The ergonomic over-ear design ensures all-day comfort, while the sleek matte finish adds a touch of sophistication to any outfit. Quick-charge capability gives you 3 hours of playback from just 10 minutes of charging. Seamlessly connect to multiple devices and take calls with the built-in microphone. Elevate your listening experience—order now and discover what you've been missing.`
        },
        tips: [
            'Structure instructions with clear sections',
            'Specify format, length, and style requirements',
            'Use bullet points for multiple constraints',
            'Include positive examples when helpful',
            'Define what to avoid as well as what to include'
        ],
        keyPhrases: ['task:', 'requirements:', 'format:', 'constraints:', 'output:', 'do not', 'must include']
    }
};

/**
 * Render a technique's content
 */
function renderTechnique(techniqueId) {
    const technique = TECHNIQUES[techniqueId];
    if (!technique) return '';

    return `
        <div class="technique-header">
            <span class="technique-icon">${technique.icon}</span>
            <div>
                <h3 class="technique-title">${technique.title}</h3>
                <p class="technique-description">${technique.description}</p>
            </div>
        </div>
        
        <div class="technique-section">
            <h4>📌 When to Use</h4>
            <p style="color: var(--text-secondary);">${technique.whenToUse}</p>
        </div>
        
        <div class="technique-section">
            <h4>✅ Good Example</h4>
            <div class="code-block good">
                <span class="code-label">Prompt</span>
                <pre>${escapeHtml(technique.examples.good)}</pre>
            </div>
            ${technique.examples.output ? `
            <div class="code-block">
                <span class="code-label">Output</span>
                <pre>${escapeHtml(technique.examples.output)}</pre>
            </div>
            ` : ''}
        </div>
        
        <div class="technique-section">
            <h4>❌ Bad Example</h4>
            <div class="code-block bad">
                <span class="code-label">Avoid This</span>
                <pre>${escapeHtml(technique.examples.bad)}</pre>
            </div>
        </div>
        
        <div class="technique-section">
            <h4>💡 Pro Tips</h4>
            <div class="tip-box">
                <span class="tip-icon">💡</span>
                <div class="tip-content">
                    <ul style="margin: 0; padding-left: 1.2em;">
                        ${technique.tips.map(tip => `<li>${tip}</li>`).join('')}
                    </ul>
                </div>
            </div>
        </div>
        
        <button class="try-btn" onclick="tryTechnique('${techniqueId}')">
            <span>🎮</span>
            Try This Technique
        </button>
    `;
}

/**
 * Escape HTML for safe rendering
 */
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

/**
 * Try a technique - navigate to practice with this technique
 */
function tryTechnique(techniqueId) {
    // Navigate to practice tab
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelector('[data-tab="practice"]').classList.add('active');

    document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
    document.getElementById('practice').classList.add('active');

    // Load practice for this technique
    if (typeof loadPracticeChallenge === 'function') {
        loadPracticeChallenge(techniqueId);
    }
}

/**
 * Initialize techniques module
 */
function initTechniques() {
    const contentContainer = document.getElementById('technique-content');
    const pills = document.querySelectorAll('.technique-pill');

    // Render first technique
    contentContainer.innerHTML = renderTechnique('zero-shot');

    // Add click handlers
    pills.forEach(pill => {
        pill.addEventListener('click', () => {
            pills.forEach(p => p.classList.remove('active'));
            pill.classList.add('active');

            const techniqueId = pill.dataset.technique;
            contentContainer.innerHTML = renderTechnique(techniqueId);
        });
    });
}

// Export for use in other modules
window.TECHNIQUES = TECHNIQUES;
window.initTechniques = initTechniques;
