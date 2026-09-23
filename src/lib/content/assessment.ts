export const assessIntro = [
  "This is a prayerful tool to uncover open doors, hidden influences, and inherited patterns that limit spiritual freedom. It is not necessary to use it every time you go through the 7 Steps to Taking Back Authority, but it is an excellent resource to have as part of your tool kit for checking in with the Holy Spirit on a regular basis.",
  "It begins with a questionnaire to discover potential entry points for a curse to have gained access and then moves to a checklist that highlights attitudes and actions that can have given a stronghold the legal right to have an influence in your life.",
  "Find a peaceful environment where you can spend 30–45 minutes undisturbed; have your Bible, a pen, and this page. Invite the Holy Spirit to bring clarity, not condemnation. Read each question slowly. Write truthfully. This is a sacred conversation between you and God.",
  "The goal is revelation, not guilt. What the Spirit reveals is not to shame you, but to set you free. Once identified, these areas can be surrendered and brought into alignment with Christ’s authority. If at any point you begin to feel overwhelmed, pause. Take a breath. Then reach out to a trusted spiritual leader. You were never meant to journey alone.",
];

export const assessPrayerOpen = [
  "Holy Spirit, I invite You to search my heart and shine Your light into every hidden place.",
  "As I read through each area, please show me the doorways that were opened to allow a demonic stronghold in my life.",
  "Let Your light expose every entry point and restore my authority in Christ. Amen.",
];

export const assessPrayerMid = [
  "Holy Spirit, reveal any entry point I have overlooked that has given access to a stronghold in my life.",
  "Show me the doorways that were opened and give me grace to close them.",
  "Let Your light expose every root and restore my authority in Christ. Amen.",
];

export const assessPrayerClose = [
  "Holy Spirit, reveal any other ways in which I have given legal rights to a stronghold in my life.",
  "Show me the agreements that I have made with darkness—in thought, or word, or deed—and let Your light expose each one so that my authority in Christ may be restored. Amen.",
];

export const assessFields = [
  {
    key: "assess-cycle",
    n: "01",
    t: "The repeating cycle",
    q: "What keeps happening no matter how you try to change it? The same fight. The same hole in the money. The same feeling of being unseen. Write it as a story, not a diagnosis.",
  },
  {
    key: "assess-door",
    n: "02",
    t: "The doorway",
    q: "How did it get in? A wound, a vow spoken in pain, an offense you kept, a pattern in the family, a night you can still date. Kirby is blunt: specificity is mercy. Vague is how it hides.",
  },
  {
    key: "assess-occupant",
    n: "03",
    t: "The occupant",
    q: "If you had to name the stronghold — not the symptom, the structure — what would you call it? Fear. Control. Accusation. A spirit of poverty. Write the name you would use in prayer.",
  },
  {
    key: "assess-story",
    n: "04",
    t: "The legal story",
    q: "What does it claim as its right to stay? “This is just who I am.” “I have to.” “They owe me.” “God hasn’t come through.” Write the sentence it uses. That sentence is the agreement.",
  },
];

export type EntryPoint = {
  id: string; n: string; title: string; ref: string; scripture: string; questions: string[];
};

export const entryPoints: EntryPoint[] = [
  {
    id: "ancestry",
    n: "01",
    title: "Ancestry",
    ref: "Exodus 20:5",
    scripture: "You shall not bow down to them or serve them, for I, the LORD your God, am a jealous God, visiting the iniquity of the fathers upon the children…",
    questions: [
      "Have you noticed repeating family patterns of anger, addiction, divorce, poverty, or illness?",
      "Were there ancestral vows, rituals, or traditions that may have invited spiritual influence?",
      "Do you ever feel bound by something that “runs in the family”?",
    ],
  },
  {
    id: "lying",
    n: "02",
    title: "Lying and Deception",
    ref: "Ephesians 4:25",
    scripture: "Therefore, each of you must put off falsehood and speak truthfully to your neighbor, for we are all members of one body.",
    questions: [
      "Have you struggled with exaggeration, half-truths, or using words to manipulate outcomes?",
      "Do you hide the truth to protect your reputation or avoid conflict?",
      "Has dishonesty ever become a habit or a defense mechanism?",
    ],
  },
  {
    id: "unforgiveness",
    n: "03",
    title: "Unconfessed Unforgiveness",
    ref: "Luke 6:37",
    scripture: "Forgive, and you will be forgiven.",
    questions: [
      "Is there anyone (alive or deceased) whom you still hold resentment toward?",
      "Have you justified your bitterness by believing they “don’t deserve” forgiveness?",
      "Do certain memories still trigger pain, anger, or avoidance?",
    ],
  },
  {
    id: "anger",
    n: "04",
    title: "Anger, Bitterness, and Hatred",
    ref: "Ephesians 4:26–27",
    scripture: "Do not let the sun go down while you are still angry, and do not give the devil a foothold.",
    questions: [
      "Do you experience recurring irritation, rage, or inner hostility?",
      "Have you ever secretly wished harm or failure upon someone who hurt you?",
      "Do grudges feel easier to hold than to release?",
    ],
  },
  {
    id: "rejection",
    n: "05",
    title: "Rejection or Victimization",
    ref: "Psalm 118:22",
    scripture: "The stone the builders rejected has become the cornerstone.",
    questions: [
      "Do you often feel unseen, unwanted, or misunderstood?",
      "Have you used pain or rejection as justification for control, withdrawal, or resentment?",
      "Does your sense of purpose depend on proving your worth to others?",
    ],
  },
  {
    id: "trauma",
    n: "06",
    title: "Trauma",
    ref: "Psalm 147:3",
    scripture: "He heals the brokenhearted and binds up their wounds.",
    questions: [
      "Have you experienced betrayal, fear, accidents, or medical trauma that left deep emotional residue?",
      "Do certain sights, sounds, or situations trigger anxiety or panic?",
      "Have you had persistent nightmares related to past pain?",
    ],
  },
  {
    id: "childhood",
    n: "07",
    title: "Childhood Abuse",
    ref: "Psalm 27:10",
    scripture: "Even if my father and mother abandon me, the LORD will hold me close.",
    questions: [
      "Were you ever abused sexually, verbally, physically, or emotionally as a child?",
      "Did humiliation, neglect, or bullying shape how you see yourself today?",
      "Have you made inner vows like “I’ll never trust anyone again”?",
    ],
  },
  {
    id: "sexual",
    n: "08",
    title: "Sexual Impurity",
    ref: "1 Corinthians 6:18–20",
    scripture: "Flee from sexual immorality… You are not your own; you were bought at a price.",
    questions: [
      "Have you engaged in or been harmed by sexual sin—pornography, fornication, adultery, or perversion?",
      "Are there lingering soul ties or feelings of shame associated with past encounters?",
      "Do you use sexual behavior to cope with loneliness or pain?",
    ],
  },
  {
    id: "body",
    n: "09",
    title: "Dishonoring the Body-Temple",
    ref: "1 Corinthians 6:19",
    scripture: "Do you not know that your bodies are temples of the Holy Spirit?",
    questions: [
      "Have you used food, substances, or pleasure to escape emotional pain?",
      "Do you struggle with addiction, self-harm, or chronic neglect of health?",
      "Has your body become a battleground instead of a vessel of honor?",
    ],
  },
  {
    id: "occult",
    n: "10",
    title: "Occult / Secret Organizations",
    ref: "Ephesians 5:11",
    scripture: "Have nothing to do with the fruitless deeds of darkness but rather expose them.",
    questions: [
      "Have you participated in astrology, spells, psychic readings, or rituals?",
      "Have you ever taken an oath, pledge, or membership in a secret society?",
      "Do you own objects linked to occult or ancestral worship?",
    ],
  },
  {
    id: "doubt",
    n: "11",
    title: "Doubt, Unbelief, and Pride",
    ref: "Proverbs 3:5",
    scripture: "Trust in the Lord with all your heart and lean not on your own understanding.",
    questions: [
      "Do you resist trusting God or insist on controlling outcomes yourself?",
      "Do you struggle to admit weakness or receive correction?",
      "Has pride kept you from asking for help or repenting quickly?",
    ],
  },
  {
    id: "blasphemy",
    n: "12",
    title: "Blasphemy",
    ref: "Exodus 20:7",
    scripture: "Do not misuse the name of the Lord your God.",
    questions: [
      "Have you ever spoken irreverently about God, His people, or holy things?",
      "Do you treat spiritual realities with sarcasm or contempt?",
      "Has cynicism replaced reverence in your heart?",
    ],
  },
  {
    id: "objects",
    n: "13",
    title: "Wearable or Hangable Objects / Charms",
    ref: "Ezekiel 14:6",
    scripture: "Rid yourselves of all the idols you have set up.",
    questions: [
      "Do you own jewelry, symbols, or charms with occult or pagan origins?",
      "Were any personal items gifted through rituals, shrines, or questionable spiritual practices?",
      "Do you feel unease or attachment to objects you cannot part with?",
    ],
  },
];

export const legalRights: { id: string; label: string }[] = [
  { id: "lr-1", label: "Vacating a God-given position, leaving your assignment unguarded." },
  { id: "lr-2", label: "Lack of accountability, refusing oversight or counsel." },
  { id: "lr-3", label: "Covering mistakes instead of taking responsibility." },
  { id: "lr-4", label: "Exposing others’ faults for shame or advantage." },
  { id: "lr-5", label: "Unreasonable expectations disguised as faith." },
  { id: "lr-6", label: "Selfish ambition masked as God’s promise." },
  { id: "lr-7", label: "Unconfessed jealousy or comparison." },
  { id: "lr-8", label: "Suppressing others’ gifts to elevate your own." },
  { id: "lr-9", label: "Manipulation through finances or provision." },
  { id: "lr-10", label: "Manipulation through sickness or victimhood." },
  { id: "lr-11", label: "Entitlement rooted in lack or insecurity." },
  { id: "lr-12", label: "Hidden rage, offense, or spite." },
  { id: "lr-13", label: "Envy of another’s success while appearing supportive." },
  { id: "lr-14", label: "People-pleasing or fear of man." },
  { id: "lr-15", label: "Blame-shifting and avoiding ownership." },
  { id: "lr-16", label: "Gossip or slander against others." },
  { id: "lr-17", label: "Rigid opinions without self-reflection." },
  { id: "lr-18", label: "Advocacy driven by bitterness." },
  { id: "lr-19", label: "Dishonour toward authority or seniority." },
  { id: "lr-20", label: "Disregard for others’ expertise or domain." },
  { id: "lr-21", label: "Minimizing others’ effort or sacrifice." },
  { id: "lr-22", label: "Expecting loyalty without agreement." },
  { id: "lr-23", label: "Authoritarian control or silencing diversity." },
  { id: "lr-24", label: "Hidden suspicion and paranoia." },
  { id: "lr-25", label: "Chronic criticism or negativity." },
  { id: "lr-26", label: "Prying or over-questioning without discernment." },
  { id: "lr-27", label: "Lack of honor or graciousness." },
  { id: "lr-28", label: "Double standards or partiality." },
  { id: "lr-29", label: "Serving from obligation rather than Spirit leading." },
  { id: "lr-30", label: "Using spiritual gifts for self-validation." },
];

export const assessmentItems = legalRights;
