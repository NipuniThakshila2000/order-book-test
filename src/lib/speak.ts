export function canSpeak() {
  return typeof window !== "undefined" && "speechSynthesis" in window;
}

export function teachingSpeech(blocks: string[]): string {
  return blocks
    .filter((p) => !p.startsWith("[[img:"))
    .map((p) => {
      if (p.startsWith("## ")) return p.slice(3);
      if (p.startsWith("> ")) {
        const [text, ref] = p.slice(2).split(" ||| ");
        return ref ? `${text} ${ref}` : text;
      }
      return p;
    })
    .join(" ");
}

function chunkText(text: string): string[] {
  const clean = text.replace(/\s+/g, " ").trim();
  if (!clean) return [];
  const sentences = clean.split(/(?<=[.!?])\s+/);
  const chunks: string[] = [];
  let buf = "";
  for (const s of sentences) {
    const next = buf ? `${buf} ${s}` : s;
    if (next.length > 240 && buf) {
      chunks.push(buf);
      buf = s;
    } else {
      buf = next;
    }
  }
  if (buf) chunks.push(buf);
  return chunks;
}

let stopped = true;
let keepAlive: number | null = null;

function clearKeepAlive() {
  if (keepAlive != null) {
    window.clearInterval(keepAlive);
    keepAlive = null;
  }
}

function startKeepAlive() {
  clearKeepAlive();
  keepAlive = window.setInterval(() => {
    if (!window.speechSynthesis.speaking) return;
    window.speechSynthesis.pause();
    window.speechSynthesis.resume();
  }, 9000);
}

export function speak(text: string, onEnd?: () => void, rate = 1) {
  if (!canSpeak()) return;
  stopSpeak();
  const chunks = chunkText(text);
  if (!chunks.length) {
    onEnd?.();
    return;
  }
  stopped = false;
  let i = 0;
  const playNext = () => {
    if (stopped) return;
    if (i >= chunks.length) {
      clearKeepAlive();
      onEnd?.();
      return;
    }
    const u = new SpeechSynthesisUtterance(chunks[i++]);
    u.rate = rate;
    u.pitch = 1;
    u.onend = playNext;
    u.onerror = () => {
      if (!stopped) playNext();
    };
    window.speechSynthesis.speak(u);
  };
  startKeepAlive();
  playNext();
}

export function stopSpeak() {
  stopped = true;
  clearKeepAlive();
  if (!canSpeak()) return;
  window.speechSynthesis.cancel();
}
