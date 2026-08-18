// All 20 questions transcribed from When-To-Use-AI-Game-20Q.html
// Each round: category label, title, scenario prompt, correct paradigm,
// and the explanatory feedback shown after answering.

export const OPTIONS = ['Humans', 'Rules / Code', 'Machine Learning', 'Generative AI']

export const QUESTIONS = [
  {
    id: 1,
    label: 'Trade-off matrix',
    title: 'A deterministic decision',
    prompt:
      'A purchase can proceed only when account_balance ≥ purchase_amount. The outcome must be exact, instant, inexpensive, and never hallucinated. Which paradigm is the best fit?',
    correct: 'Rules / Code',
    feedbackTitle: 'Rules / Code is the right choice.',
    feedback:
      'The logic is explicit, stable, and requires zero-error determinism. A database query or hard-coded check is fast, interpretable, and cheap. GenAI would add latency, token cost, and unacceptable hallucination risk.'
  },
  {
    id: 2,
    label: 'Humans',
    title: 'Judgement and accountability',
    prompt:
      'A customer message contains a threat of legal action and demands an exception to policy. It requires ethical context, nuanced judgement, and someone who can own the outcome. Which paradigm should decide?',
    correct: 'Humans',
    feedbackTitle: 'Humans are the right choice.',
    feedback:
      'Humans handle ambiguity, ethics, context, and accountability. They are slower, costly, and difficult to scale, but this is exactly where intentional human-in-the-loop design matters.'
  },
  {
    id: 3,
    label: 'Rules / Code',
    title: 'Exactness over flexibility',
    prompt:
      'A backend must use a fixed refund policy to determine eligibility after an intent has been classified. The policy is explicit and stable, and every execution must be traceable. Which paradigm should execute the action?',
    correct: 'Rules / Code',
    feedbackTitle: 'Rules / Code should execute it.',
    feedback:
      'Rules are deterministic: the same input produces the same output. They are fast, low-cost, interpretable, and do not hallucinate. Their limitation is brittleness when requirements or inputs fall outside defined parameters.'
  },
  {
    id: 4,
    label: 'Machine Learning',
    title: 'Patterns at scale',
    prompt:
      'A system has millions of structured historical records and needs to make a probabilistic prediction on new records. The patterns are too complex and evolving for static if/else logic. Which paradigm is the best fit?',
    correct: 'Machine Learning',
    feedbackTitle: 'Machine Learning fits this pattern.',
    feedback:
      'Traditional ML learns statistical patterns from structured historical data and can process high volumes efficiently. Its predictions are probabilistic, not deterministic, and it needs monitoring and retraining as model drift changes accuracy.'
  },
  {
    id: 5,
    label: 'Generative AI',
    title: 'Synthesis from unstructured text',
    prompt:
      'A team needs to read a long, messy collection of documents and produce a concise summary that combines the important ideas. The input is unstructured text and the task requires flexible synthesis. Which paradigm is the best fit?',
    correct: 'Generative AI',
    feedbackTitle: 'Generative AI is the right tool.',
    feedback:
      'GenAI excels at unstructured data, reasoning, synthesis, summarization, code generation, and agentic workflows. It remains non-deterministic, can hallucinate, and carries the highest cost and testing complexity.'
  },
  {
    id: 6,
    label: 'Hybrid architecture',
    title: 'Choose the first stop',
    prompt:
      'A customer sends free-text: "My bill is too high this month!" In the hybrid architecture, which paradigm should first interpret the unstructured message and classify the intent before deterministic execution or human escalation?',
    correct: 'Generative AI',
    feedbackTitle: 'GenAI is the router.',
    feedback:
      'GenAI translates unpredictable free text into a structured intent. Rules / Code then safely execute database and policy actions. Humans receive urgent, ambiguous, or legally sensitive edge cases where judgement and accountability are required.',
    pipeline: ['GenAI: route unstructured text', 'Rules: execute policy logic', 'Humans: resolve edge cases']
  },
  {
    id: 7,
    label: 'Machine Learning',
    title: 'Real-time anomaly detection',
    prompt:
      'A bank needs to flag potentially fraudulent credit card transactions in real-time across millions of accounts. The fraud patterns are complex, constantly evolving, and impossible to capture with static rules. Which paradigm is the best fit?',
    correct: 'Machine Learning',
    feedbackTitle: 'Machine Learning is the right fit.',
    feedback:
      'ML models trained on historical transaction data can detect subtle fraud patterns that static rules would miss. They adapt as new fraud techniques emerge, but require continuous monitoring for model drift and false positive rates.'
  },
  {
    id: 8,
    label: 'Rules / Code',
    title: 'Exact, auditable computation',
    prompt:
      'A payroll system must calculate tax withholdings based on fixed government tax brackets and employee W-4 selections. The calculation must be exact, auditable, and legally defensible — never an approximation. Which paradigm should handle this?',
    correct: 'Rules / Code',
    feedbackTitle: 'Rules / Code is the only safe choice.',
    feedback:
      'Tax calculations are governed by explicit, published rules. A deterministic algorithm guarantees the same result every time, produces a complete audit trail, and costs fractions of a cent per calculation. Using AI here introduces legal and financial risk with zero benefit.'
  },
  {
    id: 9,
    label: 'Humans',
    title: 'Holistic human evaluation',
    prompt:
      'A manager must conduct annual performance reviews, weighing team dynamics, unspoken contributions, career growth potential, and interpersonal factors that cannot be reduced to metrics. Which paradigm is required?',
    correct: 'Humans',
    feedbackTitle: 'Humans are irreplaceable here.',
    feedback:
      'Performance evaluation involves context, empathy, and accountability that no algorithm can replicate. A manager understands team morale, mentorship impact, and growth trajectory — qualitative factors that resist quantification. Automating this would be both inaccurate and ethically problematic.'
  },
  {
    id: 10,
    label: 'Generative AI',
    title: 'Natural language to structured code',
    prompt:
      'A developer needs to convert a natural language description of a database schema into a complete SQL migration script, handling edge cases like foreign keys, indexes, and constraints. Which paradigm is the best fit?',
    correct: 'Generative AI',
    feedbackTitle: 'Generative AI excels at this translation task.',
    feedback:
      'GenAI bridges unstructured natural language and structured code generation. It can infer schema relationships, generate boilerplate, and handle edge cases from context. However, the output must always be reviewed by a human developer before running against a production database.'
  },
  {
    id: 11,
    label: 'Rules / Code',
    title: 'Exact validation logic',
    prompt:
      'A signup form must validate that a password is at least 12 characters, contains uppercase, lowercase, a digit, and a special character. The rules are explicit and never change. Which paradigm should enforce this?',
    correct: 'Rules / Code',
    feedbackTitle: 'Rules / Code is the correct answer.',
    feedback:
      'Password validation is a textbook deterministic problem. A regex or series of explicit checks is instant, free, and never wrong. Using an LLM to validate passwords would be absurdly expensive and could hallucinate incorrect results.'
  },
  {
    id: 12,
    label: 'Humans',
    title: 'High-stakes medical triage',
    prompt:
      'An emergency room must decide which patient to treat first when multiple critical cases arrive simultaneously. The decision involves rapidly changing vital signs, limited resources, and life-or-death consequences. Which paradigm must own the final decision?',
    correct: 'Humans',
    feedbackTitle: 'Humans must own life-or-death decisions.',
    feedback:
      'Medical triage requires real-time clinical judgement, ethical reasoning, and legal accountability. While AI can assist with vital sign monitoring, the final decision to prioritize one life over another must rest with a licensed medical professional who bears legal and moral responsibility.'
  },
  {
    id: 13,
    label: 'Machine Learning',
    title: 'Personalized recommendations',
    prompt:
      "An e-commerce platform wants to show personalized product recommendations based on millions of users' browsing and purchase histories. The patterns are too nuanced for hand-crafted rules. Which paradigm is the best fit?",
    correct: 'Machine Learning',
    feedbackTitle: 'Machine Learning powers recommendation engines.',
    feedback:
      'Collaborative filtering and content-based ML models learn user preferences from structured behavioral data at massive scale. They continuously improve as more data arrives. Static rules cannot capture the subtlety of individual taste.'
  },
  {
    id: 14,
    label: 'Generative AI',
    title: 'Explain complex code',
    prompt:
      'A junior developer encounters a 500-line legacy function with no comments and needs a plain-English explanation of what it does, including potential bugs and edge cases. Which paradigm is the best fit?',
    correct: 'Generative AI',
    feedbackTitle: 'Generative AI is ideal for code explanation.',
    feedback:
      'GenAI can read unstructured source code, reason about control flow, identify patterns, and generate human-readable explanations. It can also flag potential bugs and suggest refactors. The developer should still verify the explanation against the actual code behavior.'
  },
  {
    id: 15,
    label: 'Rules / Code',
    title: 'Fixed-rate lookup table',
    prompt:
      'A logistics system must calculate shipping costs based on a published rate card: weight brackets, destination zones, and service levels. The rates are fixed and published quarterly. Which paradigm should compute the cost?',
    correct: 'Rules / Code',
    feedbackTitle: 'Rules / Code handles rate lookups perfectly.',
    feedback:
      'A rate card is a deterministic lookup table. A simple function or database query returns the exact cost every time, is trivially auditable, and costs essentially nothing. Using ML or GenAI for this would be architectural over-engineering.'
  },
  {
    id: 16,
    label: 'Machine Learning',
    title: 'Predicting customer behavior',
    prompt:
      'A SaaS company wants to predict which customers are likely to cancel their subscription in the next 30 days based on usage patterns, support ticket frequency, and billing history. Which paradigm is the best fit?',
    correct: 'Machine Learning',
    feedbackTitle: 'Machine Learning is the right tool for churn prediction.',
    feedback:
      'Churn prediction is a classic supervised ML problem. Models trained on historical churn data can identify subtle behavioral signals that precede cancellation. The output is probabilistic — a churn risk score — which the business team can act on with targeted interventions.'
  },
  {
    id: 17,
    label: 'Humans',
    title: 'Crisis communication strategy',
    prompt:
      'A company has suffered a data breach affecting millions of users. The CEO must craft a public statement that balances legal liability, brand reputation, user trust, and regulatory compliance. Which paradigm should lead this?',
    correct: 'Humans',
    feedbackTitle: 'Humans must lead crisis response.',
    feedback:
      'Crisis communication requires strategic judgement, emotional intelligence, legal counsel, and authentic leadership. An AI-generated statement would be perceived as tone-deaf and could worsen the reputational damage. GenAI can assist with drafting, but a human must own the final message.'
  },
  {
    id: 18,
    label: 'Machine Learning',
    title: 'Content classification at scale',
    prompt:
      'An email provider needs to classify billions of incoming messages as spam or legitimate. Spammers constantly adapt their tactics, making static keyword filters insufficient. Which paradigm is the best fit?',
    correct: 'Machine Learning',
    feedbackTitle: 'Machine Learning is the industry standard for spam detection.',
    feedback:
      'Spam filters use ML models trained on vast corpora of labeled messages. They learn to recognize evolving spam patterns, adapt to new tactics, and process billions of messages efficiently. Static rules alone cannot keep up with adversarial spammers.'
  },
  {
    id: 19,
    label: 'Generative AI',
    title: 'Generate documentation from source',
    prompt:
      'A team needs to generate comprehensive API documentation — including endpoint descriptions, request/response examples, and error codes — from a large codebase with inconsistent inline comments. Which paradigm is the best fit?',
    correct: 'Generative AI',
    feedbackTitle: 'Generative AI accelerates documentation.',
    feedback:
      'GenAI can read source code, infer API contracts, and generate structured documentation in OpenAPI/Swagger format. It handles the tedious synthesis work, but a developer should review the output for accuracy before publishing.'
  },
  {
    id: 20,
    label: 'Hybrid architecture',
    title: 'The complete pipeline',
    prompt:
      'A user uploads a photo of a handwritten complaint letter. The system must: (1) extract the text, (2) classify the complaint category, (3) look up the applicable policy, and (4) escalate if the complaint mentions legal action. Which paradigm should handle step 1 — extracting text from the image?',
    correct: 'Generative AI',
    feedbackTitle: 'GenAI handles the unstructured input.',
    feedback:
      'Extracting text from a handwritten image and classifying free-form complaints are GenAI strengths — handling messy, unstructured input. Rules then deterministically apply policy, and Humans receive legally sensitive escalations. This is the hybrid architecture in action: each paradigm does what it does best.',
    pipeline: ['GenAI: OCR + extract', 'GenAI: classify intent', 'Rules: apply policy', 'Humans: legal escalation']
  }
]

export const TOTAL = QUESTIONS.length
export const ROUND_SECONDS = 10
