import streamlit as st
import re
import json
from pathlib import Path

st.set_page_config(page_title="Prompt Learner", page_icon="📝", layout="centered")

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

st.title("📝 Prompt Learner")
st.markdown("<span style='color:#4F8BF9;font-size:20px;'>Learn to craft high-quality, secure, and ethical prompts for GenAI projects!</span>", unsafe_allow_html=True)

# Prompt input
prompt = st.text_area("Enter your prompt:", height=200)

# --- Scoring Functions ---
def score_quality(prompt):
    # Example: Check for clarity, specificity, length
    score = 0
    hints = []
    if len(prompt) < 20:
        hints.append("Prompt is too short. Add more details.")
    else:
        score += 30
    if '?' in prompt:
        score += 20
    else:
        hints.append("Consider asking a clear question.")
    if re.search(r"[A-Z]", prompt):
        score += 10
    else:
        hints.append("Start with a capital letter.")
    return score, hints

def score_security(prompt):
    # Example: Check for sensitive info, injection, etc. (OWASP GenAI)
    score = 25
    hints = []
    if re.search(r"password|secret|token", prompt, re.I):
        score -= 15
        hints.append("Avoid including sensitive information like passwords or tokens.")
    if re.search(r"delete|drop|shutdown", prompt, re.I):
        score -= 10
        hints.append("Avoid prompts that could cause destructive actions.")
    return max(score, 0), hints

def score_ethics(prompt):
    # Example: Check for bias, harmful content, etc.
    score = 25
    hints = []
    if re.search(r"hate|violence|discriminate", prompt, re.I):
        score -= 20
        hints.append("Avoid unethical or harmful language.")
    return max(score, 0), hints

# --- Main App Logic ---
score = 0
hints = []
breakdown = {}

if prompt:
    q_score, q_hints = score_quality(prompt)
    s_score, s_hints = score_security(prompt)
    e_score, e_hints = score_ethics(prompt)
    # Calculate the average score for fairness
    score = int((q_score + s_score + e_score) / 3)
    hints = q_hints + s_hints + e_hints
    breakdown = {
        "Quality": q_score,
        "Security": s_score,
        "Ethics": e_score
    }
    st.metric("Prompt Score", f"{score}/100")
    st.progress(score)
    st.subheader("Score Breakdown:")
    st.write(breakdown)
    st.subheader("Hints to Improve:")
    for hint in hints:
        st.write(f"- {hint}")
    if score == 100:
        st.success("Excellent! Your prompt is high-quality, secure, and ethical.")
    if st.button("Save Prompt"):
        st.session_state['prompt_time'] = st.session_state.get('prompt_time', st.time())
        save_prompt(prompt)
        st.success("Prompt saved!")
else:
    st.info("Start typing your prompt above to get feedback!")

st.markdown("<hr style='margin-top:2em;margin-bottom:1em;'>", unsafe_allow_html=True)
st.caption("Prompt Learner © 2025 | Built with Streamlit")
