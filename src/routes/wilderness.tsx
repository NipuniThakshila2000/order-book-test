import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Check, ChevronLeft, Download, Mic, MicOff, Pause, Scale, Shield, Volume2, VolumeX, X } from "lucide-react";
import { LEGAL_RIGHTS, type LegalRight } from "@/lib/wilderness/rights";
import { getWildernessReply } from "@/lib/wilderness/agent";
import "@/wilderness.css";

export const Route = createFileRoute("/wilderness")({ component: Wilderness });

type Stage = "intro" | "welcome" | "clerk" | "review" | "choose" | "court" | "complete" | "closed";
type CaseFile = { title: string; problem: string; recurringPattern: string; pressurePoints: string; desiredAuthority: string };
type Message = { speaker: "you" | "clerk" | "court" | "accuser"; content: string };
type Session = { stage: Stage; nickname: string; consent: boolean; caseFile: CaseFile; selected: string[]; messages: Message[]; step: number; responses: string[] };

const emptyCase: CaseFile = { title: "", problem: "", recurringPattern: "", pressurePoints: "", desiredAuthority: "" };
const freshSession = (): Session => ({ stage: "intro", nickname: "", consent: false, caseFile: { ...emptyCase }, selected: [], messages: [], step: 0, responses: [] });
const storageKey = "order-wilderness-session";
const transcriptKey = "order-wilderness-transcript";

const steps = [
  { name: "Identify the Curse", prompt: "What recurring cycle do you recognise in your own responses? Name only what is yours to own.", challenge: "A familiar response can feel inevitable. Where do you notice it beginning?" },
  { name: "Reveal the Stronghold", prompt: "What belief or pattern has held this cycle in place? What effect has it had on your choices?", challenge: "What has this pattern promised you, and what has it actually produced?" },
  { name: "Confess, Forgive & Repent", prompt: "Bring an agreement you want to release into the light. You may name forgiveness and a different choice without excusing harm.", challenge: "What agreement are you ready to leave behind?" },
  { name: "Submit to Order", prompt: "How will you bring your own thoughts, choices, and gifts under Christ's order?", challenge: "What would alignment look like in a concrete decision this week?" },
  { name: "Judge, Cast Down & Reassign", prompt: "Name the pattern's claim, reject its authority over your response, and choose what belongs in its place.", challenge: "What claim no longer gets to govern your choices?" },
  { name: "Command Alignment", prompt: "Which habits, resources, or divided intentions can you bring into alignment? Respect the choices of other people.", challenge: "Which part of your daily life needs a new direction?" },
  { name: "Testify & Maintain Honor", prompt: "What have you honestly recognised and chosen? How will you keep honour toward yourself and others?", challenge: "What will you remember and practice when you leave this room?" },
] as const;

function openingChallenge(session: Session) {
  const right = LEGAL_RIGHTS.find(item => item.id === session.selected[0]);
  const account = session.caseFile.problem.split(/[.!?\n]/)[0]?.trim() || "You named a recurring response";
  return `${account}. You chose ${right?.label.toLowerCase() || "this pattern"} as a possible ground. Where did your own choice give that pattern room?`;
}

function followupChallenge(session: Session, response: string, nextStep: number) {
  const right = LEGAL_RIGHTS.find(item => item.id === session.selected[Math.min(nextStep % Math.max(session.selected.length, 1), session.selected.length - 1)]);
  const shortReply = response.replace(/\s+/g, " ").slice(0, 110).trim();
  const questions = [
    `You said, “${shortReply}”. Does naming the cycle also name the choice you can make differently?`,
    `The pattern you selected was ${right?.label.toLowerCase() || "the one you named"}. What has it promised, and what has it actually produced in this case?`,
    `You spoke of change. What would keep that confession from becoming only another explanation?`,
    `Your intention is clear. Which concrete choice would show it when the same pressure returns?`,
    `The old claim has been named. Which part of your daily response still gives it authority?`,
    `You have chosen a direction. What will hold when the familiar pressure returns?`,
  ];
  return questions[Math.min(nextStep - 1, questions.length - 1)];
}

function isClarification(response: string) {
  const text = response.trim();
  return text.length <= 180 && (text.endsWith("?") || /^(what (does|do|is)|i (do not|don't|did not|didn't) (understand|follow)|i'm confused|i am confused|can you (explain|clarify)|could you (explain|clarify)|please (explain|clarify))/i.test(text));
}

function Wilderness() {
  const [session, setSession] = useState<Session>(freshSession);
  const [ready, setReady] = useState(false);
  const [draft, setDraft] = useState("");
  const [listening, setListening] = useState(false);
  const [speechOn, setSpeechOn] = useState(false);
  const [speechError, setSpeechError] = useState("");
  const [busy, setBusy] = useState(false);
  const recognition = useRef<{ stop: () => void } | null>(null);
  const lastSpoken = useRef("");
  const conversationEnd = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(storageKey);
      if (raw) {
        const saved = JSON.parse(raw) as Session;
        if (saved && typeof saved.stage === "string" && Array.isArray(saved.selected)) setSession(saved);
      }
    } catch { /* A fresh private session is available. */ }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      if (session.stage === "closed" || session.stage === "complete") sessionStorage.removeItem(storageKey);
      else sessionStorage.setItem(storageKey, JSON.stringify(session));
      if (session.consent && session.messages.length) sessionStorage.setItem(transcriptKey, JSON.stringify(session.messages));
    } catch { /* The experience still works without browser storage. */ }
  }, [session, ready]);

  useEffect(() => { conversationEnd.current?.scrollIntoView({ block: "nearest" }); }, [session.messages.length]);
  useEffect(() => () => { recognition.current?.stop(); window.speechSynthesis?.cancel(); }, []);

  function patch(patchValue: Partial<Session>) { setSession(current => ({ ...current, ...patchValue })); }
  function go(stage: Stage) { stopListening(); patch({ stage }); window.scrollTo({ top: 0, behavior: "smooth" }); }
  function stopListening() { recognition.current?.stop(); recognition.current = null; setListening(false); }
  function speak(content: string) {
    if (!speechOn || typeof window === "undefined" || !window.speechSynthesis || !content) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(content);
    utterance.rate = 0.94;
    window.speechSynthesis.speak(utterance);
    lastSpoken.current = content;
  }
  function toggleMic() {
    if (listening) { stopListening(); return; }
    const speechWindow = window as typeof window & { SpeechRecognition?: new () => any; webkitSpeechRecognition?: new () => any };
    const SpeechRecognition = speechWindow.SpeechRecognition ?? speechWindow.webkitSpeechRecognition;
    if (!SpeechRecognition) { setSpeechError("Live dictation is unavailable in this browser. You can write your response below."); return; }
    try {
      const instance = new SpeechRecognition();
      instance.lang = "en-US"; instance.continuous = true; instance.interimResults = true;
      instance.onresult = (event: any) => {
        const words = Array.from(event.results as Iterable<any>).map((result: any) => result[0]?.transcript ?? "").join(" ").trim();
        if (words && words !== lastSpoken.current) setDraft(words);
      };
      instance.onerror = () => { setListening(false); setSpeechError("Microphone capture stopped. You can try again or write your response."); };
      instance.onend = () => setListening(false);
      window.speechSynthesis?.cancel(); instance.start(); recognition.current = instance; setListening(true); setSpeechError("");
    } catch { setSpeechError("Microphone access was unavailable. Please write your response instead."); }
  }
  async function sendClerk() {
    const content = draft.trim(); if (!content || busy) return;
    stopListening(); setDraft("");
    setSession(current => ({ ...current, messages: [...current.messages, { speaker: "you", content }], caseFile: { ...current.caseFile, problem: [current.caseFile.problem, content].filter(Boolean).join("\n\n") } }));
    const fallback = session.messages.filter(m => m.speaker === "you").length === 0
      ? "Thank you for sharing that. What response or pattern keeps showing up for you? You can add as much or as little as you wish, then review your summary."
      : "I have added that to your notes. When you are ready, review and edit the case file before choosing patterns.";
    setBusy(true);
    let reply = fallback;
    try { reply = await getWildernessReply({ data: { kind: "clerk", caseFile: session.caseFile, selected: [], messages: [...session.messages, { speaker: "you", content }].slice(-10), response: content.slice(0, 2000), step: 0 } }) || fallback; }
    catch { /* Guided wording remains available when no provider is configured. */ }
    setBusy(false);
    setSession(current => current.stage === "clerk" ? { ...current, messages: [...current.messages, { speaker: "clerk", content: reply }] } : current);
    speak(reply);
  }
  function finishClerk() {
    const first = session.caseFile.problem.split(/[.!?\n]/)[0]?.trim() || "Your reflection";
    setSession(current => ({ ...current, stage: "review", caseFile: { ...current.caseFile, title: current.caseFile.title || first.slice(0, 70), recurringPattern: current.caseFile.recurringPattern || "A recurring response I want to understand" } }));
    stopListening(); window.scrollTo(0, 0);
  }
  function toggleRight(id: string) {
    setSession(current => ({ ...current, selected: current.selected.includes(id) ? current.selected.filter(item => item !== id) : current.selected.length < 3 ? [...current.selected, id] : current.selected }));
  }
  async function beginCourt() {
    if (busy) return;
    const names = session.selected.map(id => LEGAL_RIGHTS.find(right => right.id === id)?.label).filter(Boolean).join(", ");
    const opening = `Accusations v. ${session.nickname.trim() || "the participant"}. This is a guided practice, not a verdict. You have chosen to explore ${names}. Speak in your own words and disagree with any challenge that does not fit.`;
    setBusy(true);
    let challenge = openingChallenge(session);
    try { challenge = await getWildernessReply({ data: { kind: "accuser", caseFile: session.caseFile, selected: session.selected, messages: [{ speaker: "court", content: opening }], response: "", step: 0 } }) || challenge; }
    catch { /* The court can continue with its guided challenge. */ }
    setBusy(false);
    setSession(current => current.stage === "choose" ? { ...current, stage: "court", messages: [...current.messages, { speaker: "court", content: opening }, { speaker: "accuser", content: challenge }] } : current);
    speak(opening); window.scrollTo(0, 0);
  }
  async function completeStep() {
    const response = draft.trim(); if (!response || busy) return;
    stopListening(); setDraft("");
    if (isClarification(response)) {
      setBusy(true);
      const fallback = `The question is about your own response in this case: ${steps[session.step].prompt} You can reject any allegation that does not fit the facts. What would an honest answer sound like in your own words?`;
      let clarification = fallback;
      try { clarification = await getWildernessReply({ data: { kind: "clarify", caseFile: session.caseFile, selected: session.selected, messages: [...session.messages, { speaker: "you", content: response }].slice(-10), response: response.slice(0, 2000), step: session.step } }) || fallback; }
      catch { /* Keep the guided clarification. */ }
      setBusy(false);
      setSession(current => current.stage === "court" ? { ...current, messages: [...current.messages, { speaker: "you", content: response }, { speaker: "court", content: clarification }] } : current);
      speak(clarification);
      return;
    }
    const next = session.step + 1;
    const acknowledgement = next === 7
      ? "You have completed the seven-step practice. Keep what is true, leave what does not fit, and continue in wise community and care."
      : `You have reflected on ${steps[session.step].name}. The next practice is ${steps[next].name}.`;
    setBusy(true);
    let challenge = next < 7 ? followupChallenge(session, response, next) : "";
    if (next < 7) {
      try { challenge = await getWildernessReply({ data: { kind: "accuser", caseFile: session.caseFile, selected: session.selected, messages: [...session.messages, { speaker: "you", content: response }, { speaker: "court", content: acknowledgement }].slice(-10), response: response.slice(0, 2000), step: next } }) || challenge; }
      catch { /* Keep the guided challenge. */ }
    }
    setBusy(false);
    setSession(current => current.stage === "court" ? { ...current, step: next, stage: next === 7 ? "complete" : "court", responses: [...current.responses, response], messages: [...current.messages, { speaker: "you", content: response }, { speaker: "court", content: acknowledgement }, ...(challenge ? [{ speaker: "accuser" as const, content: challenge }] : [])] } : current);
    speak(acknowledgement);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  function close() {
    stopListening(); window.speechSynthesis?.cancel();
    try { sessionStorage.removeItem(storageKey); if (!session.consent) sessionStorage.removeItem(transcriptKey); } catch { /* Optional storage. */ }
    setSession(current => ({ ...freshSession(), stage: "closed", consent: current.consent }));
  }
  function hasTemporaryTranscript() {
    try { return Boolean(sessionStorage.getItem(transcriptKey)); } catch { return false; }
  }
  function downloadTranscript() {
    let messages: Message[] = [];
    try { messages = JSON.parse(sessionStorage.getItem(transcriptKey) ?? "[]") as Message[]; } catch { return; }
    if (!messages.length) return;
    const text = messages.map(message => `${message.speaker.toUpperCase()}\n${message.content}`).join("\n\n");
    const url = URL.createObjectURL(new Blob([`THE WILDERNESS — PERSONAL TRANSCRIPT\n\n${text}`], { type: "text/plain" }));
    const anchor = document.createElement("a"); anchor.href = url; anchor.download = "wilderness-transcript.txt"; anchor.click(); URL.revokeObjectURL(url);
  }
  const chosen = session.selected.map(id => LEGAL_RIGHTS.find(right => right.id === id)).filter((right): right is LegalRight => Boolean(right));
  const canDownload = session.consent && (session.messages.length > 0 || (typeof window !== "undefined" && hasTemporaryTranscript()));

  return <main className="wild" aria-busy={!ready || busy}>
    <div className="wild-utility"><span>ORDER / THE WILDERNESS</span><Link to="/authority">Explore the seven steps <ArrowRight size={14} /></Link></div>
    {session.stage === "intro" && <>
      <section className="wild-reference-intro" aria-labelledby="wild-intro-title"><div className="wild-reference-copy"><div className="wild-reference-topline"><span className="wild-kicker">The Wilderness · Before you begin</span><button className="wild-back" onClick={() => go("welcome")}>Returning user? Skip intro <ArrowRight size={15} /></button></div><h1 id="wild-intro-title">Before you enter the court — here’s how it works.</h1><p className="wild-reference-lead">All it takes is 3 steps.</p><ol className="wild-reference-steps"><li><span>01</span><div><h2>Tell the court who you are and what you’re facing.</h2><p>Enter a nickname and describe, in your own words, a problem you’re carrying — a pattern, a fear, or a situation that keeps repeating.</p></div></li><li><span>02</span><div><h2>The court finds the legal ground.</h2><p>Review the case summary and choose from the {LEGAL_RIGHTS.length} patterns in the rights catalog. You decide which one to three fit your experience.</p></div></li><li><span>03</span><div><h2>Stand under accusation.</h2><p>Accusations can mix truth and error. This private practice lets you answer in your own words, reject what does not fit, and work through ORDER’s seven steps while keeping your dignity and agency.</p></div></li></ol><button className="wild-button" onClick={() => go("welcome")}>Continue to the court <ArrowRight size={16} /></button></div></section>
      <section className="wild-intro-note"><Shield size={22} /><div><h3>A private, voluntary exercise</h3><p>This court is a faith-based reflection exercise. Its prompts may be generated by AI when a provider is configured, or guided text otherwise. It is not a real verdict. Accusations may be untrue. You can disagree, ask for clarification, omit details, or end at any time. It is not crisis care or a substitute for pastoral, mental health, or medical support.</p></div></section>
    </>}
    {session.stage === "welcome" && <section className="wild-page wild-welcome"><div className="wild-page-head"><button className="wild-back" onClick={() => go("intro")}><ChevronLeft size={16} /> Introduction</button><span className="wild-kicker">Before you begin</span><h1>Welcome to the court.</h1><p>Start with a nickname if you like. Your case stays in this browser tab during the exercise. If live AI is configured, its provider processes the words you submit. You can leave names and identifying details out.</p></div><div className="wild-card"><label className="wild-field">Your nickname <span>Optional, used in the opening</span><input maxLength={40} autoComplete="off" value={session.nickname} onChange={event => patch({ nickname: event.target.value })} placeholder="What should we call you?" /></label><label className="wild-check"><input type="checkbox" checked={session.consent} onChange={event => patch({ consent: event.target.checked })} /><span><strong>Keep a temporary transcript for download</strong><small>Only in this browser tab. Unchecked by default. You can download or delete it after the session.</small></span></label><div className="wild-callout"><Shield size={18} /><p>Speak or type about your own choices without taking responsibility for another person’s harm. Live AI or guided text can make mistakes in framing; you decide what fits.</p></div><button className="wild-button" onClick={() => { patch({ stage: "clerk", messages: [{ speaker: "clerk", content: "Tell me what you are facing. What happened, and what would you like to understand or change in your own response?" }] }); window.scrollTo(0, 0); }}>Talk to the Clerk <ArrowRight size={17} /></button></div></section>}
    {session.stage === "clerk" && <section className="wild-page wild-conversation"><div className="wild-page-head"><span className="wild-kicker">01 / Tell your story</span><h1>Bring it into the light.</h1><p>Share what you are facing in your own words. Write or use live dictation if your browser supports it. You can edit every part of the summary next.</p></div><div className="wild-two-col"><div className="wild-card"><div className="wild-messages" aria-label="Conversation with the Clerk">{session.messages.map((message, index) => <article className={`wild-message ${message.speaker === "you" ? "is-you" : ""}`} key={index}><span>{message.speaker === "you" ? "You" : "The Clerk"}</span><p>{message.content}</p></article>)}<div ref={conversationEnd} /></div><div className="wild-compose"><textarea value={draft} onChange={event => setDraft(event.target.value)} placeholder="What are you facing? What keeps repeating?" rows={4} aria-label="Your response to the Clerk" /><div className="wild-compose-actions"><button type="button" className={`wild-icon-button ${listening ? "active" : ""}`} onClick={toggleMic} aria-label={listening ? "Stop dictation" : "Start dictation"}>{listening ? <MicOff size={18} /> : <Mic size={18} />}</button><button className="wild-button" disabled={busy || !draft.trim()} onClick={sendClerk}>Add to conversation <ArrowRight size={16} /></button></div>{speechError && <p className="wild-error" role="status">{speechError}</p>}</div></div><aside className="wild-aside"><img src="/images/wilderness/leviathan.jpg" alt="Engraved scene of Leviathan" /><div><span className="wild-kicker">Your pace</span><h2>You have the final word.</h2><p>Keep sharing until you are ready to shape the case file yourself.</p><button className="wild-button wild-button-light" disabled={busy || !session.caseFile.problem.trim()} onClick={finishClerk}>Finish speaking and review <ArrowRight size={16} /></button><button className="wild-text-button" onClick={close}>End session</button></div></aside></div></section>}
    {session.stage === "review" && <section className="wild-page"><div className="wild-page-head"><span className="wild-kicker">02 / Review on screen</span><h1>Your case, in your words.</h1><p>Correct or remove anything that does not fit. The microphone is off during this step.</p></div><div className="wild-card wild-form"><Field label="Title" value={session.caseFile.title} onChange={value => patch({ caseFile: { ...session.caseFile, title: value } })} /><Field label="The problem" multiline value={session.caseFile.problem} onChange={value => patch({ caseFile: { ...session.caseFile, problem: value } })} /><Field label="Recurring pattern" multiline value={session.caseFile.recurringPattern} onChange={value => patch({ caseFile: { ...session.caseFile, recurringPattern: value } })} /><Field label="Pressure points" multiline value={session.caseFile.pressurePoints} onChange={value => patch({ caseFile: { ...session.caseFile, pressurePoints: value } })} /><Field label="The authority or change you want to practice" multiline value={session.caseFile.desiredAuthority} onChange={value => patch({ caseFile: { ...session.caseFile, desiredAuthority: value } })} /><div className="wild-form-actions"><button className="wild-back" onClick={() => go("clerk")}><ChevronLeft size={16} /> Keep speaking</button><button className="wild-button" disabled={!session.caseFile.problem.trim()} onClick={() => go("choose")}>Choose patterns <ArrowRight size={16} /></button></div></div></section>}
    {session.stage === "choose" && <section className="wild-page"><div className="wild-page-head"><span className="wild-kicker">03 / Choose your ground</span><h1>What do you recognise?</h1><p>Choose one to three patterns from the source catalog. These are lenses for reflection, not a diagnosis or an accusation.</p></div><div className="wild-selection-summary"><span className="wild-kicker">Your own account</span><p>{session.caseFile.problem}</p></div><div className="wild-pattern-head"><span className="wild-kicker">The full catalog · {LEGAL_RIGHTS.length} patterns</span><strong>{session.selected.length} / 3 selected</strong></div><div className="wild-pattern-grid">{LEGAL_RIGHTS.map((right, index) => <button key={right.id} type="button" className={`wild-pattern ${session.selected.includes(right.id) ? "selected" : ""}`} aria-pressed={session.selected.includes(right.id)} disabled={session.selected.length >= 3 && !session.selected.includes(right.id)} onClick={() => toggleRight(right.id)}><span>{String(index + 1).padStart(2, "0")} / {right.principality}</span><strong>{right.label}</strong><small>{right.pattern}</small><i>{session.selected.includes(right.id) ? <Check size={16} /> : "+"}</i></button>)}</div><div className="wild-sticky-actions"><button className="wild-back" onClick={() => go("review")}><ChevronLeft size={16} /> Edit case file</button><button className="wild-button" disabled={busy || !session.selected.length} onClick={beginCourt}>Enter the court <ArrowRight size={16} /></button></div></section>}
    {session.stage === "court" && <section className="wild-court"><div className="wild-court-top"><div><span className="wild-kicker">04 / The court exercise</span><h1>{session.caseFile.title || "The Wilderness Court"}</h1></div><button className="wild-text-button" onClick={close}><X size={16} /> End session</button></div><div className="wild-progress"><div className="wild-progress-line" style={{ width: `${session.step / 7 * 100}%` }} />{steps.map((step, index) => <div className={`wild-progress-item ${index < session.step ? "done" : index === session.step ? "current" : ""}`} key={step.name}><b>{index < session.step ? <Check size={13} /> : index + 1}</b><span>{step.name}</span></div>)}</div><div className="wild-court-grid"><div className="wild-court-main"><div className="wild-court-tiles"><div className="wild-court-tile wild-accuser"><img src="/images/wilderness/leviathan.jpg" alt="" /><span>The challenge</span></div><div className="wild-court-tile wild-bench"><Scale size={74} strokeWidth={1} /><span>The court</span></div><div className="wild-court-tile wild-participant"><div>{session.nickname.trim().slice(0, 1).toUpperCase() || "Y"}</div><span>{session.nickname.trim() || "You"}</span></div></div><div className="wild-caption"><span>Reflect on this</span><p>{[...session.messages].reverse().find(message => message.speaker === "accuser")?.content ?? steps[session.step].challenge}</p></div><div className="wild-voice"><button className="wild-icon-button" onClick={() => { setSpeechOn(!speechOn); window.speechSynthesis?.cancel(); }} aria-label={speechOn ? "Turn voice off" : "Turn voice on"}>{speechOn ? <Volume2 size={18} /> : <VolumeX size={18} />}{speechOn ? "Voice on" : "Voice off"}</button><button className="wild-icon-button" disabled={!speechOn} onClick={() => speak([...session.messages].reverse().find(message => message.speaker === "accuser")?.content ?? steps[session.step].challenge)}>Replay challenge</button><button className="wild-icon-button" onClick={close}><Pause size={16} /> End session</button></div></div><aside className="wild-court-side"><span className="wild-kicker">Step {session.step + 1} of 7</span><h2>{steps[session.step].name}</h2><p>{steps[session.step].prompt}</p><details><summary>Your chosen patterns</summary>{chosen.map(right => <div className="wild-chosen" key={right.id}><strong>{right.label}</strong><small>{right.pattern}</small></div>)}</details><div className="wild-court-transcript" aria-label="Courtroom conversation">{session.messages.filter(message => message.speaker !== "clerk").slice(-5).map((message, index) => <article key={index} className={`wild-court-line is-${message.speaker}`}><strong>{message.speaker === "you" ? "You" : message.speaker === "accuser" ? "The Accuser" : "The Court"}</strong><p>{message.content}</p></article>)}</div><div className="wild-court-compose"><label htmlFor="wild-answer">Your response</label><textarea id="wild-answer" value={draft} onChange={event => setDraft(event.target.value)} placeholder="Speak or write in your own words…" rows={6} /><div className="wild-compose-actions"><button className={`wild-icon-button ${listening ? "active" : ""}`} onClick={toggleMic} aria-label={listening ? "Stop dictation" : "Start dictation"}>{listening ? <MicOff size={18} /> : <Mic size={18} />}</button><button className="wild-button" disabled={busy || !draft.trim()} onClick={completeStep}>{session.step === 6 ? "Finish practice" : "Complete this step"} <ArrowRight size={16} /></button></div>{speechError && <p className="wild-error" role="status">{speechError}</p>}<small>Ask a question to clarify the prompt, or answer in your own words to continue. Your response is not graded.</small></div></aside></div></section>}
    {session.stage === "complete" && <section className="wild-page wild-ending"><span className="wild-kicker">The session is complete</span><h1>Carry the light forward.</h1><p>You named a concern, chose {chosen.length} pattern{chosen.length === 1 ? "" : "s"} to explore, and wrote through all seven steps. This is a record of your practice, not a verdict about your worth or a claim of healing.</p><div className="wild-card"><span className="wild-kicker">Your seven reflections</span>{steps.map((step, index) => <article key={step.name}><b>{String(index + 1).padStart(2, "0")}</b><div><h3>{step.name}</h3><p>{session.responses[index]}</p></div></article>)}</div><div className="wild-ending-actions">{canDownload && <button className="wild-button wild-button-outline" onClick={downloadTranscript}><Download size={17} /> Download transcript</button>}<button className="wild-button" onClick={close}>Close the session <ArrowRight size={17} /></button></div><p className="wild-quiet">Closing clears the active case and responses from this tab. If you opted into a temporary transcript, you can delete it below.</p>{canDownload && <button className="wild-text-button" onClick={() => { sessionStorage.removeItem(transcriptKey); patch({ consent: false }); }}>Delete temporary transcript</button>}</section>}
    {session.stage === "closed" && <section className="wild-page wild-ending"><span className="wild-kicker">Session closed</span><h1>Take a breath.</h1><p>Your active case and responses have been cleared from this browser tab.</p><div className="wild-ending-actions">{canDownload && <button className="wild-button wild-button-outline" onClick={downloadTranscript}><Download size={17} /> Download transcript</button>}<button className="wild-button" onClick={() => setSession(freshSession())}>Begin again <ArrowRight size={17} /></button></div>{canDownload && <button className="wild-text-button" onClick={() => { sessionStorage.removeItem(transcriptKey); patch({ consent: false }); }}>Delete temporary transcript</button>}</section>}
  </main>;
}

function Field({ label, value, onChange, multiline = false }: { label: string; value: string; onChange: (value: string) => void; multiline?: boolean }) {
  return <label className="wild-field">{label}{multiline ? <textarea rows={4} value={value} onChange={event => onChange(event.target.value)} /> : <input value={value} onChange={event => onChange(event.target.value)} />}</label>;
}
