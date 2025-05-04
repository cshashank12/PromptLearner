import streamlit as st
import re
import json
from pathlib import Path

st.set_page_config(page_title="Prompt Learner", page_icon="📝", layout="wide")

# --- Prompt Storage ---
PROMPT_FILE = Path("prompts.json")
def save_prompt(prompt):
    prompts = []
    if PROMPT_FILE.exists():
        with open(PROMPT_FILE, "r", encoding="utf-8") as f:
            try:
                prompts = json.load(f)
            except Exception:
                prompts = []
    prompts.append({"prompt": prompt, "timestamp": str(st.session_state.get('prompt_time', ''))})
    with open(PROMPT_FILE, "w", encoding="utf-8") as f:
        json.dump(prompts, f, indent=2)

# --- Sidebar ---
st.sidebar.image("https://img.icons8.com/color/96/000000/artificial-intelligence.png", width=64)
st.sidebar.title("Prompt Learner")
st.sidebar.markdown("""
**Welcome!** 👋\
Craft high-quality, secure, and ethical prompts for GenAI projects.

- 🟦 Real-time scoring
- 🟩 Actionable hints
- 🟨 Gamified feedback
- 🟧 Educational tips

*Start typing your prompt to get instant feedback!*
""")
st.sidebar.markdown("<hr>", unsafe_allow_html=True)

# --- Main Area Layout ---
col1, col2 = st.columns([2, 1])
with col1:
    st.markdown("<h2 style='color:#4F8BF9;'>📝 Prompt Learner</h2>", unsafe_allow_html=True)
    st.markdown("<span style='color:#222;font-size:18px;'>Learn to craft high-quality, secure, and ethical prompts for GenAI projects!</span>", unsafe_allow_html=True)
    prompt = st.text_area(
        "Enter your prompt:",
        height=180,
        placeholder="e.g. Write a step-by-step guide for making a cup of coffee. Include an example output.",
        max_chars=500,
        help="Be as clear and specific as possible."
    )
    st.caption(f"{len(prompt)}/500 characters")

# --- Scoring Rubric Functions ---
def rubric_clarity(prompt):
    score = 0
    hints = []
    if len(prompt.strip()) >= 20:
        score += 10
    else:
        hints.append("Prompt is too short or vague. Add more details.")
    if any(x in prompt for x in ['please', 'explain', 'describe', 'how', 'what', 'why', 'step']):
        score += 5
    else:
        hints.append("Use clear, direct instructions.")
    return score, hints

def rubric_structure(prompt):
    score = 0
    hints = []
    if any(x in prompt for x in ['<', '>', '[', ']', '{', '}', 'Section', 'Step', 'Output:', 'Input:']):
        score += 10
    else:
        hints.append("Add structure or formatting (e.g., sections, tags, or output format).")
    return score, hints

def rubric_examples(prompt):
    score = 0
    hints = []
    if 'example' in prompt.lower() or 'e.g.' in prompt.lower() or 'for instance' in prompt.lower():
        score += 10
    else:
        hints.append("Provide examples to illustrate the desired output.")
    return score, hints

def rubric_reasoning(prompt):
    score = 0
    hints = []
    if 'step-by-step' in prompt.lower() or 'chain of thought' in prompt.lower() or 'reasoning' in prompt.lower():
        score += 10
    else:
        hints.append("Encourage step-by-step or chain-of-thought reasoning.")
    return score, hints

def rubric_output_spec(prompt):
    score = 0
    hints = []
    if 'output:' in prompt.lower() or 'format:' in prompt.lower() or 'return' in prompt.lower():
        score += 10
    else:
        hints.append("Specify the required output format or structure.")
    return score, hints

def rubric_security_ethics(prompt):
    score = 0
    hints = []
    if not re.search(r"password|secret|token|hate|violence|discriminate|delete|drop|shutdown", prompt, re.I):
        score += 15
    else:
        hints.append("Avoid unsafe, unethical, or sensitive content (e.g., passwords, hate, violence, destructive actions).")
    return score, hints

def rubric_model_alignment(prompt):
    score = 0
    hints = []
    if 'do not' in prompt.lower() or 'avoid' in prompt.lower() or 'only' in prompt.lower():
        score += 10
    else:
        hints.append("Tailor the prompt to the model's strengths/weaknesses (e.g., avoid unsupported requests, be explicit).")
    return score, hints

# --- Main App Logic ---
score = 0
hints = []
breakdown = {}

if prompt:
    c_score, c_hints = rubric_clarity(prompt)
    s_score, s_hints = rubric_structure(prompt)
    e_score, e_hints = rubric_examples(prompt)
    r_score, r_hints = rubric_reasoning(prompt)
    o_score, o_hints = rubric_output_spec(prompt)
    se_score, se_hints = rubric_security_ethics(prompt)
    m_score, m_hints = rubric_model_alignment(prompt)
    total = c_score + s_score + e_score + r_score + o_score + se_score + m_score
    score = int((total / 75) * 100)  # Normalize to 100
    hints = c_hints + s_hints + e_hints + r_hints + o_hints + se_hints + m_hints
    breakdown = {
        "Clarity": c_score,
        "Structure": s_score,
        "Examples": e_score,
        "Reasoning": r_score,
        "Output Spec": o_score,
        "Security/Ethics": se_score,
        "Model Alignment": m_score
    }
    with col2:
        st.markdown("<h4 style='color:#4F8BF9;'>Your Prompt Score</h4>", unsafe_allow_html=True)
        st.metric("Score", f"{score}/100")
        st.progress(score, text="Prompt Quality")
        if score == 100:
            st.success("Excellent! Your prompt is high-quality, secure, and ethical.", icon="✅")
        elif score >= 80:
            st.info("Great job! Just a few tweaks needed.", icon="💡")
        elif score >= 50:
            st.warning("Room for improvement. Check the hints!", icon="⚠️")
        else:
            st.error("Prompt needs significant improvement.", icon="❌")
    with col1:
        with st.expander("🔍 Score Breakdown", expanded=False):
            st.write(breakdown)
        with st.expander("💡 Hints to Improve", expanded=True):
            for hint in hints:
                st.write(f"- {hint}")
        st.markdown("<br>", unsafe_allow_html=True)
        save_col1, save_col2 = st.columns([1,2])
        with save_col1:
            if st.button("💾 Save Prompt", use_container_width=True):
                st.session_state['prompt_time'] = st.session_state.get('prompt_time', st.time())
                save_prompt(prompt)
                st.success("Prompt saved!", icon="✅")
else:
    with col2:
        st.info("Awaiting your prompt input above to provide feedback.", icon="📝")

# --- Professional Footer ---
footer = '''
<style>
.footer-bar {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    background: #f7f7fa;
    color: #888;
    text-align: center;
    padding: 0.7em 0 0.5em 0;
    font-size: 0.95em;
    border-top: 1px solid #e0e0e0;
    z-index: 100;
    letter-spacing: 0.02em;
}
@media (max-width: 600px) {
    .footer-bar { font-size: 0.85em; }
}
</style>
<div class="footer-bar">
  <span>Prompt Learner &copy; 2025 &mdash; Designed by <b>Prompt UX Studio</b> | Built with <span style='color:#4F8BF9;'>Streamlit</span></span>
</div>
'''
st.markdown(footer, unsafe_allow_html=True)

st.markdown("<hr style='margin-top:2em;margin-bottom:1em;'>", unsafe_allow_html=True)
