/**
 * Analyzer Module
 * Comprehensive prompt analysis with scoring and feedback
 */

// Analysis patterns and rules
const ANALYSIS_RULES = {
    quality: {
        clarity: {
            patterns: [
                { regex: /\?$/, score: 10, message: 'Ends with a question' },
                { regex: /^[A-Z]/, score: 5, message: 'Starts with capital letter' },
                { regex: /[.!?]$/, score: 5, message: 'Ends with proper punctuation' }
            ],
            lengthRanges: [
                { min: 0, max: 20, score: 0, message: 'Very short - add more context' },
                { min: 20, max: 50, score: 10, message: 'Brief but could use more detail' },
                { min: 50, max: 200, score: 20, message: 'Good length for simple tasks' },
                { min: 200, max: 500, score: 25, message: 'Detailed prompt' },
                { min: 500, max: Infinity, score: 20, message: 'Long prompt - ensure clarity' }
            ]
        },
        specificity: {
            keywords: [
                { words: ['specific', 'exactly', 'precisely'], score: 5 },
                { words: ['example', 'such as', 'like'], score: 5 },
                { words: ['format', 'structure', 'output'], score: 5 },
                { words: ['step', 'steps', 'first', 'then'], score: 5 },
                { words: ['must', 'should', 'requirement'], score: 5 }
            ]
        },
        structure: {
            patterns: [
                { regex: /\n\n/, score: 5, message: 'Uses paragraph breaks' },
                { regex: /[-•]\s/, score: 5, message: 'Uses bullet points' },
                { regex: /\d+[.)]\s/, score: 5, message: 'Uses numbered lists' },
                { regex: /```/, score: 5, message: 'Uses code blocks' },
                { regex: /:[\n\r]/, score: 5, message: 'Uses labeled sections' }
            ]
        }
    },
    security: {
        risks: [
            { regex: /password|secret|token|api.?key|credential/i, score: -20, severity: 'high', message: 'Contains sensitive keywords (password, secret, token)' },
            { regex: /delete|drop|truncate|remove.+all/i, score: -15, severity: 'medium', message: 'Contains potentially destructive commands' },
            { regex: /ignore.+(previous|above|instructions)/i, score: -25, severity: 'critical', message: 'Potential prompt injection attempt' },
            { regex: /pretend|roleplay|act as.+evil/i, score: -15, severity: 'medium', message: 'Attempts to bypass safety guidelines' },
            { regex: /\b(hack|exploit|bypass|crack)\b/i, score: -10, severity: 'low', message: 'Contains security-sensitive terms' },
            { regex: /\b\d{3}[-.]?\d{3}[-.]?\d{4}\b/, score: -15, severity: 'medium', message: 'Contains phone number pattern' },
            { regex: /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/, score: -10, severity: 'low', message: 'Contains email address' },
            { regex: /\b\d{4}[- ]?\d{4}[- ]?\d{4}[- ]?\d{4}\b/, score: -20, severity: 'high', message: 'Contains credit card pattern' }
        ],
        baseScore: 25
    },
    ethics: {
        concerns: [
            { regex: /\b(hate|hatred|racist|sexist|discriminat)/i, score: -25, severity: 'critical', message: 'Contains discriminatory language' },
            { regex: /\b(kill|murder|harm|hurt|attack)\b/i, score: -20, severity: 'high', message: 'Contains violent language' },
            { regex: /\b(illegal|crime|criminal|fraud)\b/i, score: -10, severity: 'medium', message: 'References illegal activities' },
            { regex: /\b(manipulate|deceive|trick|scam)\b/i, score: -15, severity: 'medium', message: 'Contains deceptive intent' },
            { regex: /\b(private|confidential|personal).+(data|information)/i, score: -10, severity: 'low', message: 'Requests private information' }
        ],
        baseScore: 25
    }
};

// Technique detection patterns
const TECHNIQUE_PATTERNS = {
    'zero-shot': {
        name: 'Zero-Shot',
        patterns: [/^(classify|categorize|identify|determine|extract|summarize|translate)/i],
        negative: [/example:/i, /here are/i]
    },
    'few-shot': {
        name: 'Few-Shot',
        patterns: [/example:/i, /for instance/i, /input:.+output:/is, /\n.+:\s*.+\n.+:\s*.+\n/],
        minExamples: 2
    },
    'cot': {
        name: 'Chain-of-Thought',
        patterns: [/step by step/i, /first,.+then/is, /let me (think|break|work)/i, /step \d/i]
    },
    'react': {
        name: 'ReAct',
        patterns: [/thought.+action.+observation/is, /search\[/i, /lookup\[/i]
    },
    'tot': {
        name: 'Tree of Thoughts',
        patterns: [/expert/i, /multiple (approaches|perspectives)/i, /consider different/i]
    },
    'role': {
        name: 'Role Prompting',
        patterns: [/^you are/i, /act as/i, /as a[n]? (expert|professional|specialist)/i]
    },
    'instruction': {
        name: 'Instruction',
        patterns: [/task:/i, /requirements?:/i, /format:/i, /constraints?:/i]
    }
};

/**
 * Analyze a prompt comprehensively
 */
function analyzePrompt(prompt) {
    const results = {
        quality: analyzeQuality(prompt),
        security: analyzeSecurity(prompt),
        ethics: analyzeEthics(prompt),
        techniques: detectTechniques(prompt),
        overall: 0,
        hints: []
    };

    // Calculate overall score
    results.overall = Math.round(
        (results.quality.score + results.security.score + results.ethics.score) / 3
    );

    // Collect all hints
    results.hints = [
        ...results.quality.hints,
        ...results.security.hints,
        ...results.ethics.hints
    ];

    return results;
}

/**
 * Analyze prompt quality
 */
function analyzeQuality(prompt) {
    let score = 0;
    const hints = [];
    const positives = [];

    // Length analysis
    const length = prompt.trim().length;
    for (const range of ANALYSIS_RULES.quality.clarity.lengthRanges) {
        if (length >= range.min && length < range.max) {
            score += range.score;
            if (range.score < 15) {
                hints.push({ type: 'quality', icon: '📏', text: range.message });
            } else {
                positives.push(range.message);
            }
            break;
        }
    }

    // Pattern analysis
    for (const pattern of ANALYSIS_RULES.quality.clarity.patterns) {
        if (pattern.regex.test(prompt)) {
            score += pattern.score;
            positives.push(pattern.message);
        }
    }

    // Specificity keywords
    for (const group of ANALYSIS_RULES.quality.specificity.keywords) {
        if (group.words.some(word => prompt.toLowerCase().includes(word))) {
            score += group.score;
        }
    }

    // Structure patterns
    for (const pattern of ANALYSIS_RULES.quality.structure.patterns) {
        if (pattern.regex.test(prompt)) {
            score += pattern.score;
            positives.push(pattern.message);
        }
    }

    // Add improvement hints for low scores
    if (score < 30) {
        hints.push({ type: 'quality', icon: '✍️', text: 'Add more specific details and context to your prompt' });
    }
    if (!prompt.includes('?') && !prompt.match(/task:|requirements:/i)) {
        hints.push({ type: 'quality', icon: '❓', text: 'Consider framing as a clear question or task' });
    }
    if (!prompt.match(/[-•]\s|\d+[.)]\s/)) {
        hints.push({ type: 'quality', icon: '📋', text: 'Use bullet points or numbered lists for complex requirements' });
    }

    return {
        score: Math.min(50, Math.max(0, score)),
        maxScore: 50,
        hints,
        positives
    };
}

/**
 * Analyze security concerns
 */
function analyzeSecurity(prompt) {
    let score = ANALYSIS_RULES.security.baseScore;
    const hints = [];
    const issues = [];

    for (const risk of ANALYSIS_RULES.security.risks) {
        if (risk.regex.test(prompt)) {
            score += risk.score;
            issues.push({
                severity: risk.severity,
                message: risk.message
            });
            hints.push({
                type: 'security',
                icon: risk.severity === 'critical' ? '🚨' : risk.severity === 'high' ? '⚠️' : '⚡',
                text: risk.message
            });
        }
    }

    // Bonus for explicit safety measures
    if (prompt.match(/\b(safe|ethical|appropriate|legal)\b/i)) {
        score += 5;
    }

    return {
        score: Math.min(25, Math.max(0, score)),
        maxScore: 25,
        hints,
        issues
    };
}

/**
 * Analyze ethical concerns
 */
function analyzeEthics(prompt) {
    let score = ANALYSIS_RULES.ethics.baseScore;
    const hints = [];
    const concerns = [];

    for (const concern of ANALYSIS_RULES.ethics.concerns) {
        if (concern.regex.test(prompt)) {
            score += concern.score;
            concerns.push({
                severity: concern.severity,
                message: concern.message
            });
            hints.push({
                type: 'ethics',
                icon: concern.severity === 'critical' ? '🚫' : '⚠️',
                text: concern.message
            });
        }
    }

    // Bonus for ethical considerations
    if (prompt.match(/\b(responsible|fair|inclusive|unbiased)\b/i)) {
        score += 5;
    }

    return {
        score: Math.min(25, Math.max(0, score)),
        maxScore: 25,
        hints,
        concerns
    };
}

/**
 * Detect prompting techniques used
 */
function detectTechniques(prompt) {
    const detected = [];

    for (const [id, technique] of Object.entries(TECHNIQUE_PATTERNS)) {
        const matches = technique.patterns.some(pattern => pattern.test(prompt));
        const notExcluded = !technique.negative || !technique.negative.some(n => n.test(prompt));

        if (matches && notExcluded) {
            detected.push({
                id,
                name: technique.name
            });
        }
    }

    // Special case for few-shot: count examples
    const exampleCount = (prompt.match(/(example|input|output|Q:|A:)/gi) || []).length;
    if (exampleCount >= 4 && !detected.find(d => d.id === 'few-shot')) {
        detected.push({ id: 'few-shot', name: 'Few-Shot' });
    }

    return detected;
}

/**
 * Render analysis results
 */
function renderAnalysisResults(results) {
    const getScoreClass = (score, max) => {
        const percentage = (score / max) * 100;
        if (percentage >= 70) return 'high';
        if (percentage >= 40) return 'medium';
        return 'low';
    };

    return `
        <div class="overall-score">
            <span class="overall-label">Overall Score</span>
            <span class="overall-value">${results.overall}/100</span>
        </div>
        
        <div class="scores-grid">
            <div class="score-card">
                <div class="score-label">Quality</div>
                <div class="score-value ${getScoreClass(results.quality.score, results.quality.maxScore)}">
                    ${results.quality.score}/${results.quality.maxScore}
                </div>
            </div>
            <div class="score-card">
                <div class="score-label">Security</div>
                <div class="score-value ${getScoreClass(results.security.score, results.security.maxScore)}">
                    ${results.security.score}/${results.security.maxScore}
                </div>
            </div>
            <div class="score-card">
                <div class="score-label">Ethics</div>
                <div class="score-value ${getScoreClass(results.ethics.score, results.ethics.maxScore)}">
                    ${results.ethics.score}/${results.ethics.maxScore}
                </div>
            </div>
        </div>
        
        ${results.techniques.length > 0 ? `
        <div class="detected-techniques">
            <h4>🎯 Detected Techniques</h4>
            <div class="technique-tags">
                ${results.techniques.map(t => `<span class="technique-tag">${t.name}</span>`).join('')}
            </div>
        </div>
        ` : ''}
        
        ${results.hints.length > 0 ? `
        <div class="hints-section">
            <h4>💡 Improvement Suggestions</h4>
            ${results.hints.map(hint => `
                <div class="hint-item">
                    <span class="hint-icon">${hint.icon}</span>
                    <span class="hint-text">${hint.text}</span>
                </div>
            `).join('')}
        </div>
        ` : `
        <div class="tip-box" style="background: var(--success-light); border-color: var(--success);">
            <span class="tip-icon">🎉</span>
            <div class="tip-content">
                <strong>Great prompt!</strong> No major issues detected. Your prompt follows best practices.
            </div>
        </div>
        `}
    `;
}

/**
 * Initialize analyzer module
 */
function initAnalyzer() {
    const analyzeBtn = document.getElementById('analyze-btn');
    const promptInput = document.getElementById('prompt-input');
    const resultsArea = document.getElementById('analysis-results');

    if (analyzeBtn && promptInput && resultsArea) {
        analyzeBtn.addEventListener('click', () => {
            const prompt = promptInput.value.trim();

            if (!prompt) {
                resultsArea.innerHTML = `
                    <div class="tip-box warning">
                        <span class="tip-icon">⚠️</span>
                        <div class="tip-content">Please enter a prompt to analyze.</div>
                    </div>
                `;
                return;
            }

            const results = analyzePrompt(prompt);
            resultsArea.innerHTML = renderAnalysisResults(results);
        });

        // Real-time character count
        promptInput.addEventListener('input', () => {
            // Could add live feedback here
        });
    }
}

// Export
window.analyzePrompt = analyzePrompt;
window.initAnalyzer = initAnalyzer;
