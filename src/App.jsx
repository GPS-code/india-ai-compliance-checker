/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Analytics } from "@vercel/analytics/react";

const MODULES = [
  {
    id: "m1",
    title: "Applicability",
    label: "MODULE 1",
    color: "#1a56a0",
    bg: "#e8f0fb",
    desc: "Does Indian AI governance even apply to your system?",
    questions: [
      {
        id: "q1_1",
        text: "Does your AI system process personal data of individuals who are in India?",
        law: "DPDP Act 2023 — Territorial Scope",
        def: "Personal data means any data about an individual who is identifiable by or in relation to such data (DPDP Act S.2(t)). Processing means any operation performed on personal data — including collection, storage, use, sharing, or deletion. If your AI system does any of these with data about identifiable individuals in India, answer Yes.",
        yes: { flag: null, note: "DPDP Act applies. Continue." },
        no: { flag: "limited", note: "DPDP Act does not apply. NITI Aayog voluntary principles may still apply as guidance." },
      },
      {
        id: "q1_2",
        text: "Is the personal data in digital form — collected digitally or converted to digital?",
        law: "DPDP Act 2023 S.2 — Digital Personal Data",
        def: "The DPDP Act applies only to digital personal data — data collected in digital form, or data originally collected in non-digital form (e.g. paper forms) and subsequently digitised. If your AI system works with paper records that are never digitised, the Act does not apply. If those same records are scanned or entered into a system, it does.",
        yes: { flag: "dpdp", note: "Full DPDP Act obligations apply." },
        no: { flag: "limited", note: "DPDP Act does not apply to non-digital data. Voluntary frameworks still apply." },
      },
      {
        id: "q1_3",
        text: "Is your organisation a government agency, or acting under a direct government mandate?",
        law: "DPDP Act 2023 S.17 — Government Exemptions",
        def: "Government agency here means an instrumentality of the State — central or state government departments, statutory bodies, and entities performing public functions under law. NGOs working in partnership with government are typically not government agencies themselves — they are usually Data Processors under the DPDP Act. If unsure, answer No and apply standard obligations.",
        yes: { flag: "govt", note: "Wider exemptions apply for national security and public order — but constitutional safeguards still apply." },
        no: { flag: null, note: "Standard full obligations apply. No special exemptions." },
      },
    ],
  },
  {
    id: "m2",
    title: "Data & Consent",
    label: "MODULE 2",
    color: "#b45309",
    bg: "#fef3c7",
    desc: "What specific data obligations apply to your AI system?",
    questions: [
      {
        id: "q2_1",
        text: "Does your AI system collect data from or about individuals under 18 years of age?",
        law: "DPDP Act 2023 S.9 — Children's Data",
        def: "The DPDP Act sets the age of consent at 18, consistent with the Indian Contract Act 1872. Any individual under 18 is a child for the purposes of this Act. This applies even if the child themselves is using your system — age of the data subject matters, not who operates the device. Note: the Act requires 'verifiable' parental consent, but the mechanism for verification has not yet been specified in the Rules.",
        yes: { flag: "high", note: "🚨 CRITICAL: Verifiable parental/guardian consent required. No tracking. No targeted advertising. Penalty up to INR 200 crore for breach." },
        no: { flag: null, note: "Standard consent obligations apply." },
      },
      {
        id: "q2_2",
        text: "Does the AI system make automated decisions that significantly affect individuals — grading, loan approval, benefit eligibility, or health diagnosis?",
        law: "MeitY AI Guidelines 2025 — High Risk Classification",
        def: "An automated decision is one made by an AI system with little or no human involvement before the decision takes effect. 'Significantly affects' means the decision has material consequences for the individual — access to a service, financial standing, educational outcome, or health treatment. If a human reviews every AI output before it becomes a decision, this may not apply — but the review must be substantive, not rubber-stamping.",
        yes: { flag: "high", note: "Human review mechanism required. Decision must be explainable on request. MeitY High Risk classification applies." },
        no: { flag: null, note: "Standard transparency obligations apply." },
      },
      {
        id: "q2_3",
        text: "Does the AI system collect more data than strictly necessary for its stated purpose?",
        law: "DPDP Act 2023 S.8 — Data Minimisation",
        def: "The DPDP Act requires that personal data collected must be limited to what is necessary for the specific purpose for which consent was given. 'Stated purpose' is what you told the individual when obtaining consent. Collecting additional fields, inferences, or behavioural data beyond that stated purpose would trigger this question. When in doubt, apply the principle: if you could achieve the same outcome with less data, you probably should.",
        yes: { flag: "warn", note: "Data minimisation violation: reduce data collection to minimum necessary and review all data flows." },
        no: { flag: null, note: "Data minimisation principle satisfied." },
      },
      {
        id: "q2_4",
        text: "Does your organisation process personal data at large scale, or process sensitive categories of data — such as health, financial, or biometric data — where a breach or misuse could significantly harm individuals?",
        law: "DPDP Act 2023 S.10 — Significant Data Fiduciary (threshold not yet notified by government)",
        def: "A Significant Data Fiduciary (SDF) is any Data Fiduciary designated as such by the central government based on: volume and sensitivity of personal data processed, risk to rights of Data Principals, potential national security impact, and other factors. Importantly, the DPDP Act does not specify a numerical threshold — the government has discretion to designate any entity. The designation list has not yet been notified. A Data Fiduciary is any entity that determines the purpose and means of processing personal data — if your organisation decides what data to collect and why, you are a Data Fiduciary.",
        yes: { flag: "warn", note: "Significant Data Fiduciary risk: the government has not yet notified the exact designation threshold, but organisations processing data at scale or handling sensitive categories should monitor for MeitY's SDF designation notification — expected within 12 months of DPDP Rules (November 2025). Prepare for: DPO appointment, Data Protection Impact Assessment, and annual audits." },
        no: { flag: null, note: "SDF designation less likely — but monitor MeitY notifications as the threshold has not yet been officially set." },
      },
      {
        id: "q2_5",
        text: "Do you share personal data with third-party AI vendors or technology partners?",
        law: "DPDP Act 2023 — Data Processor Obligations",
        def: "A Data Processor is any person who processes personal data on behalf of a Data Fiduciary. If you use a third-party vendor — an EdTech platform, an AI analytics tool, a cloud provider — and that vendor processes personal data you collected, they are a Data Processor. You as the Data Fiduciary remain responsible for how they handle the data. The DPDP Act requires a valid contract between you and the processor governing how data is handled.",
        yes: { flag: "warn", note: "Formal data processing agreement required with vendor. Vendor must comply with DPDP Act. Contract must include audit rights." },
        no: { flag: null, note: "No vendor data-sharing obligations triggered." },
      },
    ],
  },
  {
    id: "m3",
    title: "Sector",
    label: "MODULE 3",
    color: "#166534",
    bg: "#dcfce7",
    desc: "Which sector-specific obligations apply?",
    questions: [
      {
        id: "q3_1",
        text: "Does your AI system operate in the education sector — schools, learning platforms, FLN programmes, or EdTech?",
        law: "DPDP Act S.9 + NITI Aayog Principles + MeitY Guidelines",
        def: "Education sector here covers any AI system whose primary users or beneficiaries are students, teachers, or educational institutions — including government schools, private EdTech platforms, foundational learning programmes, and teacher training systems. If your AI collects or processes data about learners — even aggregated learning outcomes — as part of an educational programme, this applies.",
        yes: { flag: "sector_edu", note: "Education rules apply: children's data protections, bias testing, human oversight for assessment AI, no algorithmic discrimination by gender/caste/language." },
        no: { flag: null, note: "Education sector rules not applicable." },
      },
      {
        id: "q3_2",
        text: "Does your AI system operate in the health sector — diagnostics, telemedicine, mental health, or patient management?",
        law: "CDSCO Medical Device Rules + Telemedicine Guidelines 2020 + NITI Aayog",
        def: "Health sector AI includes any system that informs, supports, or automates clinical decisions — diagnostic tools, symptom checkers, patient risk scoring, mental health chatbots, telemedicine triage, or patient data management. A system that tracks beneficiary health data for a welfare programme (e.g. nutrition monitoring in an ICDS programme) may also fall here. If AI outputs could influence a health-related decision for an individual, answer Yes.",
        yes: { flag: "sector_health", note: "Health rules apply: physician oversight required; AI cannot replace clinical judgment; CDSCO approval may be needed; patient consent mandatory." },
        no: { flag: null, note: "Health sector rules not applicable." },
      },
      {
        id: "q3_3",
        text: "Does your AI system operate in the financial sector — credit, insurance, payments, or banking?",
        law: "RBI FREE-AI Framework 2025",
        def: "Financial sector AI covers systems operated by or for RBI-regulated entities — banks, NBFCs, insurance companies, payment aggregators, and fintechs. The RBI FREE-AI Framework 2025 applies to all Regulated Entities (REs) using AI. If your organisation is not itself a Regulated Entity but builds AI tools for one, the RE is responsible for compliance — but you as vendor will need to demonstrate your tool meets their governance requirements.",
        yes: { flag: "sector_fin", note: "Finance rules apply: RBI FREE-AI Framework 2025; board-approved AI policy required; explainable credit decisions; bias testing mandatory." },
        no: { flag: null, note: "Financial sector rules not applicable." },
      },
      {
        id: "q3_4",
        text: "Is your AI system being procured by or deployed for a government department or public programme — including as an NGO implementing partner?",
        law: "MeitY AI Guidelines 2025 + NITI Aayog Part 2",
        def: "This applies when: (a) a government department is directly deploying your AI system, or (b) your organisation is an implementing partner in a government programme and the AI tool will be used within that programme. In scenario (b), the government department is typically the Data Fiduciary for government-collected data, and your organisation is a Data Processor — which means a formal data processing agreement governs your use of that data. The MOU or partnership contract should explicitly cover data governance.",
        yes: { flag: "sector_govt", note: "Government sector rules apply: responsible procurement checklist required; data governance in MOU; constitutional proportionality test for any surveillance use." },
        no: { flag: null, note: "Government sector rules not applicable." },
      },
    ],
  },
  {
    id: "m4",
    title: "Risk Level",
    label: "MODULE 4",
    color: "#92400e",
    bg: "#fef9c3",
    desc: "How risky is your AI system? Each answer adds or subtracts from your risk score.",
    questions: [
      {
        id: "q4_1",
        text: "Does the AI make decisions affecting an individual's access to education, healthcare, financial services, employment, or government benefits?",
        law: "MeitY AI Guidelines 2025 — High Risk indicators",
        def: "MeitY classifies AI as High Risk when it makes or significantly influences decisions in these domains. 'Affecting access' means the AI output directly determines or strongly shapes whether a person receives a service, passes an assessment, gets a loan, or is enrolled in a programme. An AI that merely assists a human who then makes an independent decision may be lower risk — but only if the human genuinely exercises independent judgment, not just approves AI recommendations.",
        yes: { flag: "risk+2", note: "+2 HIGH RISK points" },
        no: { flag: "risk0", note: "No risk points added." },
      },
      {
        id: "q4_2",
        text: "Does the AI system process data of vulnerable populations — children, elderly, persons with disabilities, or low-income communities?",
        law: "NITI Aayog Principles 2 & 3",
        def: "NITI Aayog's Responsible AI framework identifies vulnerable populations as groups with reduced capacity to contest or seek remedy for AI harms — due to age, disability, power asymmetries, or digital literacy gaps. In the Indian context this explicitly includes low-income and rural communities, scheduled caste and tribal communities, and migrant workers. If your AI system's outputs primarily affect these groups, even if they are not directly using the system, answer Yes.",
        yes: { flag: "risk+2", note: "+2 HIGH RISK points" },
        no: { flag: "risk0", note: "No risk points added." },
      },
      {
        id: "q4_3",
        text: "Does the AI system use facial recognition, biometric data, or real-time location tracking?",
        law: "NITI Aayog FRT Discussion Paper 2022",
        def: "Biometric data means data generated by technical processing of physical, physiological or behavioural characteristics that allows unique identification — fingerprints, iris scans, facial geometry, voice prints, gait. Facial recognition means any AI system that identifies or verifies a person from a facial image or video. Real-time location tracking means continuous or near-continuous tracking of an individual's physical location. Even if biometric data is processed by a third party on your behalf, this question applies.",
        yes: { flag: "risk+2", note: "+2 HIGH RISK points" },
        no: { flag: "risk0", note: "No risk points added." },
      },
      {
        id: "q4_4",
        text: "Can the AI system's decisions be easily reviewed and overridden by a human before they take effect?",
        law: "NITI Aayog Principle 6 — Human Oversight",
        def: "Meaningful human oversight means a qualified person can review the AI's reasoning, access the underlying data, and change the outcome before it affects the individual. It does not count as oversight if: the human only sees the final output (not the reasoning); the review is a formality with no real ability to override; or the volume of decisions makes genuine review impractical. If a teacher rubber-stamps AI-generated grades without seeing why the score was assigned, that is not meaningful oversight.",
        yes: { flag: "risk-1", note: "-1 point (mitigating factor: meaningful human oversight present)" },
        no: { flag: "risk+2", note: "+2 HIGH RISK points — no human override capability" },
      },
      {
        id: "q4_5",
        text: "Is the AI system's logic explainable in plain terms to the individuals it affects?",
        law: "NITI Aayog Principle 5 — Transparency & Explainability",
        def: "Explainability means a person affected by an AI decision can receive a meaningful explanation of why that decision was made — in language they understand. It does not require full technical transparency of model weights. A practical test: could a frontline worker explain to a beneficiary why the AI gave them a particular score or outcome? If the answer requires a data scientist, the system is not sufficiently explainable for high-stakes use. MeitY Guidelines 2025 require explainability for all High Risk AI.",
        yes: { flag: "risk-1", note: "-1 point (mitigating factor: explainability present)" },
        no: { flag: "risk+1", note: "+1 MEDIUM RISK point — no explainability" },
      },
      {
        id: "q4_6",
        text: "Has the AI system been tested for bias across gender, caste, religion, language, and geographic groups?",
        law: "NITI Aayog Principle 2 + MeitY Advisory 2024",
        def: "Bias testing means systematically evaluating whether the AI system produces systematically different — and potentially discriminatory — outcomes for different demographic groups. In India this must include: gender, caste and tribal identity, religion, language and dialect, and urban vs rural geography. Testing only on English-language or urban data and deploying in Hindi-belt or rural contexts is a common gap. Answer Yes only if you have documented evidence of bias testing — an intention to test is not sufficient.",
        yes: { flag: "risk-1", note: "-1 point (mitigating factor: bias testing documented)" },
        no: { flag: "risk+1", note: "+1 MEDIUM RISK point — no bias testing" },
      },
      {
        id: "q4_7",
        text: "Is your AI system classified as operating in a regulated sector — finance (RBI), health (CDSCO), or law enforcement?",
        law: "RBI FREE-AI + CDSCO + MeitY sector guidance",
        def: "A regulated sector is one that already has a statutory regulator with authority over AI or technology governance. For this tool: Finance means RBI-regulated entities (banks, NBFCs, payment aggregators, insurers under IRDAI); Health means entities subject to CDSCO for medical devices or the Telemedicine Guidelines; Law enforcement means police, intelligence agencies, or entities providing AI tools to them. If your AI operates in education or social development — which have no binding AI regulator yet — answer No.",
        yes: { flag: "risk+1", note: "+1 MEDIUM RISK point (sector-regulated — additional obligations apply)" },
        no: { flag: "risk0", note: "No additional risk points." },
      },
    ],
  },
];

const SECTOR_RULES = {
  sector_edu: {
    label: "Education",
    icon: "🎓",
    color: "#1a56a0",
    obligations: [
      "Verifiable parental consent for all under-18 student data (DPDP Act S.9)",
      "No tracking or targeted advertising directed at students",
      "Human oversight required for AI-based assessments with consequences",
      "Bias testing: no algorithmic discrimination by gender, caste, language, or region",
      "Vendor deploying AI in government schools must have data processing agreement",
      "Purpose limitation: cannot repurpose student data beyond stated educational use",
      "AI cannot be sole basis for admission, progression, or grading decisions",
    ],
  },
  sector_health: {
    label: "Health",
    icon: "🏥",
    color: "#166534",
    obligations: [
      "Physician/clinician oversight required — AI cannot replace clinical judgment",
      "Check if AI diagnostic tool requires CDSCO Medical Device Rules approval",
      "Explicit patient consent required for processing health data",
      "AI outputs must be explainable to clinician before acting on them",
      "Mental health AI: mandatory human escalation paths",
      "Children's health data: additional parental consent protections apply",
      "Cannot be sole basis for any treatment, triage, or diagnostic decision",
    ],
  },
  sector_fin: {
    label: "Finance",
    icon: "🏦",
    color: "#92400e",
    obligations: [
      "Board-approved AI governance policy required for all banks and NBFCs (RBI FREE-AI 2025)",
      "Credit/loan AI must be explainable — customer can contest automated decision",
      "Bias testing mandatory for credit scoring models",
      "Due diligence required on any third-party AI vendor",
      "Grievance mechanism for customers harmed by AI false positives",
      "Incident reporting mechanisms and internal AI inventory required",
      "Model risk management framework must cover all AI models in production",
    ],
  },
  sector_govt: {
    label: "Government",
    icon: "🏛️",
    color: "#4a1d96",
    obligations: [
      "Responsible AI procurement checklist required when evaluating vendors",
      "Data governance provisions must be included in any MOU or partnership agreement",
      "NGO/implementing partner acts as Data Processor — formal DPA with government department required",
      "Facial recognition: proportionality test + privacy impact assessment required",
      "No real-time mass surveillance without legal basis",
      "Purpose limitation applies even where consent is overridden for state services",
      "Constitutional proportionality test applies to all AI used in law enforcement",
    ],
  },
};

function getRiskLevel(answers) {
  let score = 0;
  const m4Questions = MODULES[3].questions;

  m4Questions.forEach((q) => {
    const ans = answers[q.id];
    if (ans === undefined) return;

    const flag = ans === "yes" ? q.yes.flag : q.no.flag;
    if (flag === "risk+2") score += 2;
    if (flag === "risk+1") score += 1;
    if (flag === "risk-1") score -= 1;
  });

  if (score >= 3) return "high";
  if (score >= 1) return "medium";
  return "low";
}

function getRiskScore(answers) {
  let score = 0;
  MODULES[3].questions.forEach((q) => {
    const ans = answers[q.id];
    if (ans === undefined) return;

    const flag = ans === "yes" ? q.yes.flag : q.no.flag;
    if (flag === "risk+2") score += 2;
    if (flag === "risk+1") score += 1;
    if (flag === "risk-1") score -= 1;
  });
  return score;
}

const OBLIGATIONS_BY_RISK = {
  low: [
    { text: "Explicit consent before processing personal data", law: "DPDP Act 2023 S.6", required: true },
    { text: "Parental consent if any under-18 data is involved", law: "DPDP Act 2023 S.9", required: true },
    { text: "Data breach notification to Data Protection Board within 72 hours", law: "DPDP Act 2023 S.8(6)", required: true },
    { text: "Right to erasure — users can request deletion of their data", law: "DPDP Act 2023", required: true },
    { text: "Establish a grievance mechanism for AI-related complaints", law: "MeitY Guidelines 2025", required: false },
    { text: "Data minimisation — collect only what is necessary", law: "DPDP Act 2023 S.8", required: true },
    { text: "Label AI-generated outputs clearly where publicly facing", law: "MeitY Advisory 2024", required: false },
  ],
  medium: [
    { text: "All Low Risk obligations above", law: "", required: true },
    { text: "Bias testing across gender, caste, language, and geography", law: "NITI Aayog Principle 2 + MeitY Advisory 2024", required: true },
    { text: "Transparency disclosures about AI use to affected individuals", law: "MeitY AI Guidelines 2025", required: true },
    { text: "Grievance mechanism (Required at Medium Risk)", law: "DPDP Act S.13 + MeitY Guidelines", required: true },
    { text: "Document model purpose, training data, and known limitations", law: "NITI Aayog Principle 5", required: true },
    { text: "Test AI with representative local data — languages, dialects, demographics", law: "NITI Aayog Principles 2 & 3", required: true },
    { text: "Formal data processing agreement with all AI vendors", law: "DPDP Act — Data Processor obligations", required: true },
    { text: "Data deletion schedules — purge data when purpose is served", law: "DPDP Act 2023 S.8(7)", required: true },
    { text: "Data Protection Impact Assessment if >10,000 users (Recommended)", law: "DPDP Act — SDF obligations", required: false },
  ],
  high: [
    { text: "All Medium Risk obligations above", law: "", required: true },
    { text: "Human review required before any final high-stakes decision", law: "NITI Aayog Principle 6 + MeitY High Risk classification", required: true },
    { text: "Decision explanation available to affected individuals on request", law: "NITI Aayog Principle 5 + MeitY Guidelines", required: true },
    { text: "Audit trail and decision logs for all AI outputs", law: "NITI Aayog Principle 6 + MeitY Guidelines", required: true },
    { text: "Data Protection Impact Assessment if >10,000 users (Required)", law: "DPDP Act — SDF obligations", required: true },
    { text: "Annual review of AI system performance and fairness", law: "MeitY AI Guidelines 2025 Action Plan", required: true },
    { text: "Data Protection Officer appointment if SDF designation likely", law: "DPDP Act 2023 S.10", required: true },
    { text: "Maintain AI inventory / register of all AI systems in production", law: "RBI FREE-AI 2025 + MeitY Guidelines", required: true },
    { text: "Apply all sector-specific obligations from Module 3", law: "Sector-specific frameworks", required: true },
  ],
};

export default function App() {
  const [answers, setAnswers] = useState({});
  const [currentModule, setCurrentModule] = useState(0);
  const [currentQ, setCurrentQ] = useState(0);
  const [phase, setPhase] = useState("intro");
  const [orgType, setOrgType] = useState("");

  const allModuleQuestions = MODULES.flatMap((m) => m.questions.map((q) => ({ ...q, moduleId: m.id, moduleIdx: MODULES.indexOf(m) })));
  
  const totalQ = allModuleQuestions.length;
  const progress = Math.round((Object.keys(answers).length / totalQ) * 100);

  const curModule = MODULES[currentModule];
  const curQuestion = curModule?.questions[currentQ];

  function answer(val) {
    const newAnswers = { ...answers, [curQuestion.id]: val };
    setAnswers(newAnswers);

    const nextQ = currentQ + 1;
    if (nextQ < curModule.questions.length) {
      setCurrentQ(nextQ);
    } else {
      const nextMod = currentModule + 1;
      if (nextMod < MODULES.length) {
        setCurrentModule(nextMod);
        setCurrentQ(0);
      } else {
        setPhase("results");
      }
    }
  }

  function goBack() {
    if (currentQ > 0) {
      setCurrentQ(currentQ - 1);
    } else if (currentModule > 0) {
      setCurrentModule(currentModule - 1);
      setCurrentQ(MODULES[currentModule - 1].questions.length - 1);
    }
  }

  function restart() {
    setAnswers({});
    setCurrentModule(0);
    setCurrentQ(0);
    setPhase("intro");
    setOrgType("");
  }

  const riskLevel = getRiskLevel(answers);
  const riskScore = getRiskScore(answers);

  const sectorMap = {
    sector_edu: "q3_1",
    sector_health: "q3_2",
    sector_fin: "q3_3",
    sector_govt: "q3_4",
  };

  const activeSectorsList = Object.keys(SECTOR_RULES).filter((s) => answers[sectorMap[s]] === "yes");

  const flaggedIssues = allModuleQuestions.filter((q) => {
    const ans = answers[q.id];
    if (!ans) return false;
    const flag = ans === "yes" ? q.yes.flag : q.no.flag;
    return flag === "high" || flag === "warn" || flag === "children" || flag === "dpdp";
  });

  const riskColors = { high: "#dc2626", medium: "#d97706", low: "#16a34a" };
  const riskBgs = { high: "#fef2f2", medium: "#fffbeb", low: "#f0fdf4" };
  const riskLabels = { high: "HIGH RISK", medium: "MEDIUM RISK", low: "LOW RISK" };

  const styles = {
    app: { minHeight: "100vh", background: "#f8fafc", fontFamily: "'Georgia', serif" },
    header: { background: "#0f2d5c", padding: "0", borderBottom: "3px solid #f59e0b" },
    headerInner: { maxWidth: 780, margin: "0 auto", padding: "20px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" },
    headerTitle: { color: "white", fontSize: 20, fontWeight: 700, letterSpacing: "-0.3px" },
    headerSub: { color: "#93c5fd", fontSize: 12, marginTop: 3, fontFamily: "'Courier New', monospace" },
    badge: { background: "#f59e0b", color: "#0f2d5c", fontSize: 10, fontWeight: 800, padding: "3px 10px", borderRadius: 12, letterSpacing: 1 },
    main: { maxWidth: 780, margin: "0 auto", padding: "32px 24px 80px" },
    intro: { background: "white", borderRadius: 16, padding: 40, boxShadow: "0 4px 24px rgba(0,0,0,0.08)", border: "1px solid #e2e8f0" },
    introTitle: { fontSize: 28, fontWeight: 700, color: "#0f2d5c", marginBottom: 8, lineHeight: 1.2 },
    introSub: { color: "#64748b", fontSize: 15, lineHeight: 1.6, marginBottom: 28 },
    orgGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 28 },
    orgCard: { border: "2px solid #e2e8f0", borderRadius: 10, padding: "14px 16px", cursor: "pointer", transition: "all 0.15s", background: "white" },
    orgCardActive: { border: "2px solid #0f2d5c", background: "#f0f5ff" },
    orgCardIcon: { fontSize: 22, marginBottom: 6 },
    orgCardLabel: { fontSize: 13, fontWeight: 700, color: "#0f2d5c" },
    orgCardSub: { fontSize: 11, color: "#94a3b8", marginTop: 2 },
    startBtn: { width: "100%", padding: "14px 0", background: "#0f2d5c", color: "white", border: "none", borderRadius: 10, fontSize: 15, fontWeight: 700, cursor: "pointer", letterSpacing: 0.5 },
    moduleBar: { display: "flex", gap: 6, marginBottom: 24 },
    modulePill: { flex: 1, height: 4, borderRadius: 4, background: "#e2e8f0", transition: "background 0.3s" },
    modulePillActive: { background: "#f59e0b" },
    modulePillDone: { background: "#0f2d5c" },
    questionCard: { background: "white", borderRadius: 16, padding: 32, boxShadow: "0 4px 24px rgba(0,0,0,0.08)", border: "1px solid #e2e8f0", marginBottom: 16 },
    moduleTag: { display: "inline-block", fontSize: 10, fontWeight: 800, letterSpacing: 1.5, padding: "4px 10px", borderRadius: 20, marginBottom: 14, fontFamily: "'Courier New', monospace" },
    questionText: { fontSize: 18, fontWeight: 600, color: "#0f2d5c", lineHeight: 1.5, marginBottom: 8 },
    lawRef: { fontSize: 11, color: "#94a3b8", fontFamily: "'Courier New', monospace", marginBottom: 28 },
    btnRow: { display: "flex", gap: 12 },
    yesBtn: { flex: 1, padding: "14px 0", background: "#0f2d5c", color: "white", border: "none", borderRadius: 10, fontSize: 14, fontWeight: 700, cursor: "pointer" },
    noBtn: { flex: 1, padding: "14px 0", background: "white", color: "#0f2d5c", border: "2px solid #0f2d5c", borderRadius: 10, fontSize: 14, fontWeight: 700, cursor: "pointer" },
    progressRow: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 },
    progressLabel: { fontSize: 12, color: "#64748b", fontFamily: "'Courier New', monospace" },
    progressBar: { height: 4, background: "#e2e8f0", borderRadius: 4, marginBottom: 20, overflow: "hidden" },
    progressFill: { height: "100%", background: "#f59e0b", borderRadius: 4, transition: "width 0.4s" },
    navRow: { display: "flex", justifyContent: "space-between", alignItems: "center" },
    backBtn: { background: "none", border: "none", color: "#94a3b8", fontSize: 13, cursor: "pointer", padding: "6px 0" },
    resultHeader: { background: "#0f2d5c", borderRadius: 16, padding: "32px 32px 28px", marginBottom: 20, color: "white" },
    riskBadge: { display: "inline-block", padding: "6px 18px", borderRadius: 20, fontSize: 13, fontWeight: 800, letterSpacing: 1, marginBottom: 12 },
    resultTitle: { fontSize: 22, fontWeight: 700, marginBottom: 6, lineHeight: 1.3 },
    resultSub: { fontSize: 13, color: "#93c5fd", lineHeight: 1.5 },
    section: { background: "white", borderRadius: 14, padding: "24px 28px", marginBottom: 16, border: "1px solid #e2e8f0", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" },
    sectionTitle: { fontSize: 13, fontWeight: 800, letterSpacing: 1, color: "#64748b", marginBottom: 16, fontFamily: "'Courier New', monospace", textTransform: "uppercase" },
    oblItem: { display: "flex", gap: 10, padding: "10px 0", borderBottom: "1px solid #f1f5f9", alignItems: "flex-start" },
    oblDot: { width: 8, height: 8, borderRadius: "50%", marginTop: 6, flexShrink: 0 },
    oblText: { fontSize: 13, color: "#374151", lineHeight: 1.5, flex: 1 },
    oblLaw: { fontSize: 10, color: "#94a3b8", fontFamily: "'Courier New', monospace", marginTop: 2 },
    oblRequired: { fontSize: 10, fontWeight: 700, color: "#dc2626", fontFamily: "'Courier New', monospace", marginTop: 2 },
    issueItem: { background: "#fff7ed", border: "1px solid #fed7aa", borderRadius: 8, padding: "10px 14px", marginBottom: 8 },
    issueText: { fontSize: 13, color: "#92400e", fontWeight: 600 },
    issueNote: { fontSize: 12, color: "#b45309", marginTop: 3, lineHeight: 1.4 },
    sectorCard: { border: "1px solid #e2e8f0", borderRadius: 10, padding: "14px 18px", marginBottom: 10 },
    sectorTitle: { fontSize: 13, fontWeight: 700, marginBottom: 8 },
    sectorItem: { fontSize: 12, color: "#374151", padding: "5px 0", borderBottom: "1px solid #f8fafc", lineHeight: 1.4 },
    disclaimer: { background: "#f8fafc", borderRadius: 10, padding: "14px 18px", marginTop: 20, border: "1px solid #e2e8f0" },
    disclaimerText: { fontSize: 11, color: "#64748b", lineHeight: 1.6 },
    restartBtn: { width: "100%", padding: "14px 0", background: "white", color: "#0f2d5c", border: "2px solid #0f2d5c", borderRadius: 10, fontSize: 14, fontWeight: 700, cursor: "pointer", marginTop: 8 },
  };

  const ORG_TYPES = [
    { id: "ngo", icon: "🤝", label: "NGO / Civil Society", sub: "Deploying AI in programmes" },
    { id: "edtech", icon: "🎓", label: "EdTech / HealthTech", sub: "Building AI-powered products" },
    { id: "govt", icon: "🏛️", label: "Government Department", sub: "Evaluating AI vendors" },
    { id: "other", icon: "💼", label: "Other Organisation", sub: "Private sector / startup" },
  ];

  if (phase === "intro") {
    return (
      <div style={styles.app}>
        <Analytics />
        <header style={styles.header}>
          <div style={styles.headerInner}>
            <div>
              <div style={styles.headerTitle}>🇮🇳 India AI Compliance Checker</div>
              <div style={styles.headerSub}>Powered by DPDP Act 2023 · MeitY AI Guidelines 2025 · NITI Aayog Principles</div>
            </div>
            <div style={styles.badge}>DRAFT v1.0</div>
          </div>
        </header>

        <main style={styles.main}>
          <div style={styles.intro}>
            <h1 style={styles.introTitle}>Does your AI system comply with Indian regulations?</h1>
            <p style={styles.introSub}>
              India's AI governance landscape is evolving fast. This tool maps your AI system against the DPDP Act 2023,
              MeitY AI Governance Guidelines 2025, NITI Aayog's Responsible AI Principles, and sector-specific frameworks — and tells you what obligations apply.
              <br />
              <br />
              <b>5 modules · ~20 questions · ~5 minutes.</b>
            </p>

            <div style={styles.sectionTitle}>YOUR ORGANISATION TYPE</div>
            <div style={styles.orgGrid}>
              {ORG_TYPES.map((o) => (
                <div
                  key={o.id}
                  style={orgType === o.id ? { ...styles.orgCard, ...styles.orgCardActive } : styles.orgCard}
                  onClick={() => setOrgType(o.id)}
                >
                  <div style={styles.orgCardIcon}>{o.icon}</div>
                  <div style={styles.orgCardLabel}>{o.label}</div>
                  <div style={styles.orgCardSub}>{o.sub}</div>
                </div>
              ))}
            </div>

            <button style={{ ...styles.startBtn, opacity: orgType ? 1 : 0.5 }} onClick={() => { if (orgType) setPhase("quiz"); }} >
              Start Assessment →
            </button>

            <div style={styles.disclaimer}>
              <p style={styles.disclaimerText}>
                <b>⚠️ Disclaimer:</b> This tool provides general guidance only and does not constitute legal advice. India's AI regulatory framework is evolving — consult a qualified legal professional before making compliance decisions.
              </p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (phase === "quiz") {
    const modColor = curModule.color;
    const modBg = curModule.bg;
    const answeredSoFar = Object.keys(answers).length;

    return (
      <div style={styles.app}>
        <Analytics />
        <header style={styles.header}>
          <div style={styles.headerInner}>
            <div>
              <div style={styles.headerTitle}>🇮🇳 India AI Compliance Checker</div>
              <div style={styles.headerSub}>{curModule.label} — {curModule.title}</div>
            </div>
            <div style={styles.badge}>DRAFT v1.0</div>
          </div>
        </header>

        <main style={styles.main}>
          <div style={styles.progressRow}>
            <span style={styles.progressLabel}>Question {answeredSoFar + 1} of {totalQ}</span>
            <span style={styles.progressLabel}>{progress}% complete</span>
          </div>
          <div style={styles.progressBar}>
            <div style={{ ...styles.progressFill, width: `${progress}%` }} />
          </div>

          <div style={styles.moduleBar}>
            {MODULES.map((m, i) => (
              <div key={m.id} style={{ ...styles.modulePill, ...(i === currentModule ? styles.modulePillActive : i < currentModule ? styles.modulePillDone : {}) }} />
            ))}
          </div>

          <div style={styles.questionCard}>
            <div style={{ ...styles.moduleTag, color: modColor, background: modBg }}>{curModule.label} · {curModule.title.toUpperCase()}</div>
            <h2 style={styles.questionText}>{curQuestion.text}</h2>
            <div style={styles.lawRef}>📋 {curQuestion.law}</div>

            {curQuestion.def && (
              <div style={{ background: "#f8fafc", padding: "16px 20px", borderRadius: 10, marginBottom: 28, borderLeft: `4px solid ${modColor}` }}>
                <div style={{ fontSize: 10, fontWeight: 800, color: modColor, marginBottom: 6, letterSpacing: 1 }}>📖 DEFINITION & SCOPE</div>
                <div style={{ fontSize: 13, color: "#475569", lineHeight: 1.5 }}>{curQuestion.def}</div>
              </div>
            )}

            <div style={styles.btnRow}>
              <button style={styles.yesBtn} onClick={() => answer("yes")}>Yes</button>
              <button style={styles.noBtn} onClick={() => answer("no")}>No</button>
            </div>

            <div style={{ marginTop: 24, fontSize: 11, color: "#94a3b8", fontStyle: "italic", textAlign: "center" }}>
              <b>Why this matters:</b> {curQuestion.yes.note}
            </div>
          </div>

          <div style={styles.navRow}>
            <button style={styles.backBtn} onClick={goBack}>← Back</button>
            <div style={{ fontSize: 11, color: "#94a3b8" }}>{curModule.desc}</div>
          </div>
        </main>
      </div>
    );
  }

  if (phase === "results") {
    const riskColor = riskColors[riskLevel];
    
    const obligations = OBLIGATIONS_BY_RISK[riskLevel];

    const hasGovtFlag = answers["q1_3"] === "yes";
    const hasDPDPFlag = answers["q1_2"] === "yes";

    return (
      <div style={styles.app}>
        <Analytics />
        <header style={styles.header}>
          <div style={styles.headerInner}>
            <div>
              <div style={styles.headerTitle}>🇮🇳 India AI Compliance Checker — Results</div>
              <div style={styles.headerSub}>Assessment complete · {totalQ} questions answered</div>
            </div>
            <div style={styles.badge}>DRAFT v1.0</div>
          </div>
        </header>

        <main style={styles.main}>
          <div style={{ ...styles.resultHeader, background: riskColor }}>
            <div style={{ ...styles.riskBadge, background: "white", color: riskColor }}>{riskLabels[riskLevel]}</div>
            <h1 style={styles.resultTitle}>
              {riskLevel === "high" && "Your AI system requires comprehensive governance measures."}
              {riskLevel === "medium" && "Your AI system requires standard compliance measures."}
              {riskLevel === "low" && "Your AI system carries minimal regulatory risk."}
            </h1>
            <p style={{ ...styles.resultSub, color: "white", opacity: 0.9 }}>
              Risk Score: {riskScore} points ·{" "}
              {activeSectorsList.length > 0 ? `${activeSectorsList.length} sector(s) flagged` : "No sector-specific rules triggered"} ·{" "}
              {flaggedIssues.length} issue(s) flagged
            </p>
          </div>

          {flaggedIssues.length > 0 && (
            <div style={styles.section}>
              <div style={styles.sectionTitle}>⚠️ Issues & Flags Requiring Immediate Attention</div>
              {flaggedIssues.map((q) => {
                const ans = answers[q.id];
                const outcome = ans === "yes" ? q.yes : q.no;
                return (
                  <div key={q.id} style={styles.issueItem}>
                    <div style={styles.issueText}>{q.text}</div>
                    <div style={styles.issueNote}>{outcome.note}</div>
                    <div style={{ ...styles.oblLaw, marginTop: 6 }}>{q.law}</div>
                  </div>
                );
              })}
            </div>
          )}

          {activeSectorsList.length > 0 && (
            <div style={styles.section}>
              <div style={styles.sectionTitle}>📋 Sector-Specific Obligations</div>
              {activeSectorsList.map((s) => {
                const sr = SECTOR_RULES[s];
                return (
                  <div key={s} style={{ ...styles.sectorCard, borderLeft: `4px solid ${sr.color}` }}>
                    <div style={{ ...styles.sectorTitle, color: sr.color }}>{sr.icon} {sr.label} Sector</div>
                    {sr.obligations.map((ob, i) => (
                      <div key={i} style={styles.sectorItem}>• {ob}</div>
                    ))}
                  </div>
                );
              })}
            </div>
          )}

          <div style={styles.section}>
            <div style={styles.sectionTitle}>✅ Full Obligations Checklist — {riskLabels[riskLevel]}</div>
            {obligations.map((ob, i) => (
              <div key={i} style={styles.oblItem}>
                <div style={{ ...styles.oblDot, background: ob.required ? "#dc2626" : "#94a3b8" }} />
                <div style={styles.oblText}>
                  <div>{ob.text}</div>
                  {ob.law && <div style={styles.oblLaw}>{ob.law}</div>}
                </div>
                <div style={ob.required ? styles.oblRequired : { ...styles.oblLaw, fontWeight: 700 }}>
                  {ob.required ? "REQUIRED" : "RECOMMENDED"}
                </div>
              </div>
            ))}
          </div>

          {(hasGovtFlag || hasDPDPFlag) && (
            <div style={styles.section}>
              <div style={styles.sectionTitle}>📌 Special Context Notes</div>
              {hasGovtFlag && (
                <div style={{ marginBottom: 16 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "#4a1d96", marginBottom: 4 }}>Government Agency Exemptions (DPDP Act S.17)</div>
                  <div style={{ fontSize: 12, color: "#475569", lineHeight: 1.5 }}>
                    Wider exemptions apply for national security and public order. However, constitutional safeguards (proportionality test) still apply to all AI use, and the Supreme Court's mandated safeguards for surveillance remain in force.
                  </div>
                </div>
              )}
              {!hasDPDPFlag && (
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "#1e293b", marginBottom: 4 }}>DPDP Act May Not Apply</div>
                  <div style={{ fontSize: 12, color: "#475569", lineHeight: 1.5 }}>
                    If you confirmed your data is not in digital form, the DPDP Act 2023 does not directly apply. However, NITI Aayog's voluntary Responsible AI principles and MeitY Guidelines still apply as guidance — especially if you work with government programmes.
                  </div>
                </div>
              )}
            </div>
          )}

          <div style={styles.section}>
            <div style={styles.sectionTitle}>🕐 Gaps to Watch — India's Evolving Framework</div>
            {[
              "Digital India Act — expected 2026-27; will introduce consolidated AI classification",
              "Significant Data Fiduciary designation list — not yet notified by government",
              "Cross-border data transfer restriction list — expected within 12 months of DPDP Rules",
              "AI audit & certification standards — BIS and TEC developing; expected 2026-27",
              "Binding AI rules for education sector — no law yet; Ministry of Education guidance expected",
            ].map((gap, i) => (
              <div key={i} style={{ ...styles.oblText, padding: "4px 0" }}>→ {gap}</div>
            ))}
          </div>

          <div style={styles.disclaimer}>
            <p style={styles.disclaimerText}>
              <b>⚠️ Disclaimer:</b> This tool provides general guidance based on India's AI regulatory landscape as of February 2026. It does not constitute legal advice. The framework is evolving — consult a qualified legal professional before making compliance decisions.
              <br />
              <br />
              Sources: DPDP Act 2023 + Rules 2025 · MeitY AI Governance Guidelines (Nov 2025) · NITI Aayog Responsible AI (2021) · RBI FREE-AI Framework (Aug 2025) · IT Rules 2021 · MeitY Advisory 2024.
            </p>
          </div>

          <button style={styles.restartBtn} onClick={restart}>← Start a New Assessment</button>
        </main>
      </div>
    );
  }

  return null;
}
