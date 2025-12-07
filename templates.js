/**
 * Templates Module
 * Curated prompt templates for various use cases
 */

const TEMPLATES = [
    // Writing Templates
    {
        id: 'blog-post',
        category: 'writing',
        title: 'Blog Post Generator',
        preview: 'Generate engaging blog posts on any topic with SEO optimization and clear structure.',
        template: `You are an experienced content writer specializing in engaging, SEO-optimized blog posts.

Topic: [YOUR TOPIC]
Target Audience: [YOUR AUDIENCE]
Tone: [Professional/Casual/Informative/Entertaining]

Requirements:
- Length: 800-1000 words
- Include an attention-grabbing headline
- Start with a hook that captures reader interest
- Use H2 subheadings to organize content
- Include actionable tips or insights
- End with a compelling call-to-action
- Incorporate 3-5 relevant keywords naturally

Write the blog post now:`
    },
    {
        id: 'email-professional',
        category: 'writing',
        title: 'Professional Email',
        preview: 'Craft clear, professional emails for any business situation.',
        template: `Write a professional email with the following details:

Purpose: [e.g., Follow-up, Request, Introduction, Thank you]
Recipient: [e.g., Client, Manager, Colleague]
Context: [Brief background]
Key Points: [What you need to convey]
Desired Outcome: [What action you want them to take]

Requirements:
- Tone: Professional yet friendly
- Length: Concise (under 200 words)
- Clear subject line
- Proper greeting and sign-off
- One clear call-to-action`
    },
    {
        id: 'story-creative',
        category: 'writing',
        title: 'Creative Story Starter',
        preview: 'Generate engaging story openings with vivid descriptions and compelling hooks.',
        template: `You are a creative writer known for captivating opening scenes.

Genre: [Fantasy/Sci-Fi/Mystery/Romance/Horror]
Setting: [Time and place]
Main Character: [Brief description]
Mood: [Tense/Whimsical/Dark/Hopeful]

Write an engaging opening scene (250-300 words) that:
- Hooks the reader immediately
- Establishes atmosphere through sensory details
- Introduces the protagonist in action
- Hints at the central conflict
- Uses vivid, evocative language

Begin the story:`
    },

    // Coding Templates
    {
        id: 'code-review',
        category: 'coding',
        title: 'Code Review Assistant',
        preview: 'Get thorough code reviews with actionable improvement suggestions.',
        template: `You are a senior software engineer conducting a thorough code review.

Language: [Programming Language]
Code Purpose: [What the code does]

Review the following code for:
1. **Bugs & Errors**: Logic errors, edge cases, potential crashes
2. **Code Quality**: Readability, naming, DRY principles
3. **Performance**: Inefficiencies, optimization opportunities
4. **Security**: Vulnerabilities, input validation, sensitive data
5. **Best Practices**: Design patterns, language conventions

\`\`\`[language]
[YOUR CODE HERE]
\`\`\`

Provide feedback as:
- 🔴 Critical issues (must fix)
- 🟡 Suggestions (should consider)
- 🟢 Good practices (keep doing)`
    },
    {
        id: 'debug-helper',
        category: 'coding',
        title: 'Debugging Assistant',
        preview: 'Systematic debugging help with step-by-step analysis.',
        template: `You are an expert debugger. Help me solve this issue systematically.

Language/Framework: [e.g., Python, React, Node.js]
Error Message: [Paste the exact error]
Expected Behavior: [What should happen]
Actual Behavior: [What happens instead]

Relevant Code:
\`\`\`
[YOUR CODE]
\`\`\`

Please:
1. Explain what the error means in simple terms
2. Identify the most likely causes (ranked by probability)
3. Provide step-by-step debugging approach
4. Suggest the fix with code example
5. Explain how to prevent this issue in the future`
    },
    {
        id: 'code-documentation',
        category: 'coding',
        title: 'Documentation Generator',
        preview: 'Generate comprehensive documentation for your code.',
        template: `Generate comprehensive documentation for the following code.

\`\`\`[language]
[YOUR CODE]
\`\`\`

Create documentation that includes:
1. **Overview**: What the code does (2-3 sentences)
2. **Parameters**: Each parameter with type and description
3. **Returns**: Return value type and description
4. **Exceptions**: What errors it can throw
5. **Usage Examples**: 2-3 practical examples
6. **Notes**: Any important considerations

Format: Use proper docstring format for [language]`
    },

    // Analysis Templates
    {
        id: 'data-analysis',
        category: 'analysis',
        title: 'Data Analysis Plan',
        preview: 'Create a structured analysis plan for any dataset.',
        template: `You are a data analyst creating an analysis plan.

Dataset Description: [What data you have]
Business Question: [What you need to answer]
Available Variables: [Key columns/fields]

Create an analysis plan that includes:

1. **Data Understanding**
   - Key metrics to calculate
   - Data quality checks needed

2. **Exploratory Analysis**
   - Distributions to examine
   - Relationships to explore
   - Segmentations to consider

3. **Statistical Analysis**
   - Appropriate tests/methods
   - Hypothesis to test

4. **Visualization Recommendations**
   - Chart types for each insight
   - Dashboard layout suggestions

5. **Expected Deliverables**
   - Key findings format
   - Recommendations structure`
    },
    {
        id: 'research-summary',
        category: 'analysis',
        title: 'Research Summary',
        preview: 'Summarize research papers or articles with key insights.',
        template: `Summarize the following research/article for [AUDIENCE: e.g., executives, students, practitioners].

[PASTE TEXT OR PROVIDE URL]

Structure your summary as:

**Key Takeaways** (3-5 bullet points)
- Main findings in plain language

**Methodology** (if applicable)
- How the research was conducted

**Implications**
- What this means for [specific field/industry]

**Limitations**
- Caveats to keep in mind

**Questions for Further Exploration**
- What this raises for future investigation

Keep the summary under 400 words.`
    },

    // Creative Templates
    {
        id: 'brainstorm',
        category: 'creative',
        title: 'Brainstorming Session',
        preview: 'Generate creative ideas using structured thinking techniques.',
        template: `You are a creative director leading a brainstorming session.

Challenge: [What problem are we solving?]
Constraints: [Budget, time, resources, etc.]
Target: [Who are we creating for?]

Generate ideas using these approaches:

1. **Wild Ideas** (3 ideas)
   - No constraints, sky's the limit

2. **Practical Solutions** (3 ideas)
   - Realistic, implementable now

3. **Combinations** (2 ideas)
   - Merge concepts from different fields

4. **Opposites** (2 ideas)
   - What if we did the reverse?

5. **Recommended Approach**
   - Your top pick with justification

For each idea, include:
- Name/Title
- One-sentence description
- Key benefit
- Potential challenge`
    },
    {
        id: 'marketing-copy',
        category: 'creative',
        title: 'Marketing Copy Generator',
        preview: 'Create compelling marketing copy for various channels.',
        template: `You are a conversion-focused copywriter.

Product/Service: [What you're promoting]
Unique Value: [What makes it special]
Target Audience: [Who you're targeting]
Channel: [Website/Email/Social/Ad]
Goal: [Awareness/Leads/Sales]

Create marketing copy that:

1. **Headlines** (provide 3 options)
   - Attention-grabbing, benefit-focused

2. **Body Copy** (100-150 words)
   - Pain point identification
   - Solution presentation
   - Social proof hint
   - Clear call-to-action

3. **CTA Options** (3 variations)
   - Action-oriented, urgent

Use these persuasion techniques:
- FOMO (fear of missing out)
- Social proof
- Benefit-focused language`
    },

    // Business Templates
    {
        id: 'meeting-agenda',
        category: 'business',
        title: 'Meeting Agenda Generator',
        preview: 'Create focused, productive meeting agendas.',
        template: `Create a meeting agenda for the following:

Meeting Type: [Status update/Brainstorm/Decision/Planning]
Duration: [30min/60min/90min]
Attendees: [Roles of participants]
Main Objective: [What must be accomplished]

Generate an agenda with:

**Pre-Meeting**
- Materials to review
- Questions to consider

**Agenda Items**
For each item include:
- Topic name
- Owner/Presenter
- Time allocation
- Type: [Inform/Discuss/Decide]
- Expected outcome

**Time Buffer**
- Reserve 10% for overflow

**Post-Meeting**
- Action items template
- Follow-up schedule`
    },
    {
        id: 'proposal-outline',
        category: 'business',
        title: 'Business Proposal Outline',
        preview: 'Structure compelling business proposals.',
        template: `Create a business proposal outline for:

Client/Stakeholder: [Who you're presenting to]
Proposal Type: [Project/Partnership/Funding/Service]
Key Objective: [What you want to achieve]
Budget Range: [If applicable]

Structure the proposal with:

1. **Executive Summary** (key points in 150 words)

2. **Problem Statement**
   - Current situation
   - Pain points
   - Cost of inaction

3. **Proposed Solution**
   - Approach overview
   - Key deliverables
   - Timeline milestones

4. **Why Us**
   - Unique qualifications
   - Relevant experience
   - Team highlights

5. **Investment Required**
   - Pricing breakdown
   - Payment terms
   - ROI projection

6. **Next Steps**
   - Clear call-to-action
   - Decision timeline`
    },
    {
        id: 'swot-analysis',
        category: 'business',
        title: 'SWOT Analysis',
        preview: 'Conduct thorough SWOT analysis for any business situation.',
        template: `Conduct a comprehensive SWOT analysis for:

Subject: [Company/Product/Project/Strategy]
Industry: [Your industry]
Context: [Current situation or decision being evaluated]

Analyze and provide:

**Strengths** (Internal positive factors)
- List 4-6 strengths with brief explanations

**Weaknesses** (Internal negative factors)
- List 4-6 weaknesses with brief explanations

**Opportunities** (External positive factors)
- List 4-6 opportunities with potential impact

**Threats** (External negative factors)
- List 4-6 threats with risk assessment

**Strategic Recommendations**
Based on this analysis, suggest:
1. How to leverage strengths to capture opportunities
2. How to use strengths to mitigate threats
3. How to address weaknesses to pursue opportunities
4. Defensive strategies for weaknesses vs threats`
    }
];

// Current filter state
let currentCategory = 'all';

/**
 * Filter templates by category
 */
function filterTemplates(category) {
    currentCategory = category;
    renderTemplates();

    // Update filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.category === category);
    });
}

/**
 * Render templates grid
 */
function renderTemplates() {
    const container = document.getElementById('templates-grid');
    if (!container) return;

    const filtered = currentCategory === 'all'
        ? TEMPLATES
        : TEMPLATES.filter(t => t.category === currentCategory);

    container.innerHTML = filtered.map(template => `
        <div class="template-card" data-id="${template.id}">
            <div class="template-header">
                <span class="template-title">${template.title}</span>
                <span class="template-category">${getCategoryLabel(template.category)}</span>
            </div>
            <p class="template-preview">${template.preview}</p>
            <div class="template-actions">
                <button class="copy-btn" onclick="copyTemplate('${template.id}')">
                    📋 Copy
                </button>
                <button class="use-btn" onclick="useTemplate('${template.id}')">
                    ✨ Use in Analyzer
                </button>
            </div>
        </div>
    `).join('');
}

/**
 * Get category label with emoji
 */
function getCategoryLabel(category) {
    const labels = {
        writing: '✍️ Writing',
        coding: '💻 Coding',
        analysis: '📊 Analysis',
        creative: '🎨 Creative',
        business: '💼 Business'
    };
    return labels[category] || category;
}

/**
 * Copy template to clipboard
 */
function copyTemplate(templateId) {
    const template = TEMPLATES.find(t => t.id === templateId);
    if (!template) return;

    navigator.clipboard.writeText(template.template).then(() => {
        showToast('📋 Template copied to clipboard!', 'success');
    }).catch(() => {
        // Fallback for older browsers
        const textarea = document.createElement('textarea');
        textarea.value = template.template;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        showToast('📋 Template copied!', 'success');
    });
}

/**
 * Use template in analyzer
 */
function useTemplate(templateId) {
    const template = TEMPLATES.find(t => t.id === templateId);
    if (!template) return;

    // Navigate to analyzer tab
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelector('[data-tab="analyzer"]').classList.add('active');

    document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
    document.getElementById('analyzer').classList.add('active');

    // Fill in the template
    const promptInput = document.getElementById('prompt-input');
    if (promptInput) {
        promptInput.value = template.template;
        promptInput.focus();
        showToast('✨ Template loaded! Customize the placeholders.', 'success');
    }
}

/**
 * Show toast notification
 */
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

/**
 * Initialize templates module
 */
function initTemplates() {
    // Render initial templates
    renderTemplates();

    // Add filter button handlers
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            filterTemplates(btn.dataset.category);
        });
    });
}

// Export
window.initTemplates = initTemplates;
window.filterTemplates = filterTemplates;
window.copyTemplate = copyTemplate;
window.useTemplate = useTemplate;
