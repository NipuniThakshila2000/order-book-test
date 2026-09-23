export type ChamberSit = {
  title: string;
  forThis: string;
  onThis: string;
  how: string;
  inhale: number;
  hold: number;
  exhale: number;
  phases: { inhale: string; hold: string; exhale: string; rest: string };
  guidance: string[];
};

export const chamberSits: Record<string, ChamberSit> = {
  "el-mistater": {
    title: "The unveiling",
    forThis:
      "This sitting is for El Mistater — the Hidden One. Occupancy asked Jesus to leave it alone. You are not emptying your mind. You are consenting to unveiling: what was concealed in you may now be shown.",
    onThis:
      "Meditate on this, and only this: God is present in the place you have kept dark. Not a theory of the Hidden One. The actual room in you that still says “let us alone.” Hold that room in the light without explaining it.",
    how: "Hand on your chest. Eyes closed or lowered. When fear of the hidden rises, do not solve it. Stay. Two minutes.",
    inhale: 4,
    hold: 4,
    exhale: 6,
    phases: {
      inhale: "I receive the Hidden One. He is not absent.",
      hold: "What was concealed may now be shown. Do not add a thought.",
      exhale: "Fear of the hidden may leave down the breath.",
      rest: "Stay with the unveiling. Do not cover it again.",
    },
    guidance: [
      "He is El Mistater — hidden, and here.",
      "Consent to the place you have kept dark.",
      "Stay until fear of the hidden yields.",
    ],
  },
  "an-offensive-kingdom": {
    title: "Quiet occupancy",
    forThis:
      "This sitting is for An Offensive Kingdom. The King did not take the land by spectacle. He walked in quietly, and occupancy shifted. You have been invading — loud, bright, exhausted. This breath is infiltration.",
    onThis:
      "Meditate on this: the ground is already His. You are not seizing it. You are occupying it the way He did — unobserved, without a parade. Watch the urge to make a showing, and let it pass.",
    how: "Sit smaller than you want to. No performance in the breath. If the mind starts a campaign, return to the quiet occupancy of this room.",
    inhale: 4,
    hold: 2,
    exhale: 6,
    phases: {
      inhale: "This ground is already Yours.",
      hold: "I do not take it by noise.",
      exhale: "Spectacle may leave. I occupy quietly.",
      rest: "Infiltration, not invasion. Stay.",
    },
    guidance: [
      "The kingdom advances by infiltration.",
      "He already owns this ground.",
      "Quiet occupancy. No parade.",
    ],
  },
  "order-and-rank": {
    title: "Rank, not rage",
    forThis:
      "This sitting is for Order and Rank. Freedom flourishes within structure. Occupancy sits in seats that are not its own. You are not here to seize a throne. You are here to take your place under Christ’s command.",
    onThis:
      "Meditate on your actual station: under the King, not beside Him, not instead of Him. Picture the false throne in your house, your mind, your work. Do not argue with it. Rank it. Servants of occupancy turn when a rightful word is spoken.",
    how: "Spine easy, not rigid. You are sitting in order, not bracing for a fight. Two minutes of rank — no speech yet.",
    inhale: 4,
    hold: 4,
    exhale: 4,
    phases: {
      inhale: "I take my place under the King.",
      hold: "Rank, not rage. Do not add a campaign.",
      exhale: "False thrones lose their seat.",
      rest: "Freedom lives inside this structure. Stay.",
    },
    guidance: [
      "Take your place. Do not seize.",
      "False thrones lose their seat.",
      "Freedom flourishes within structure.",
    ],
  },
  "the-trap-of-offense": {
    title: "Release the trap",
    forThis:
      "This sitting is for The Trap of Offense. Offense is a legal right given away. The scandalon is bait. You have been collecting the wound as if it were a title deed. This breath is how you stop taking the bait.",
    onThis:
      "Meditate on the specific offense you are still carrying — a name, a sentence, a scene. See it as a trap on the path, not as your identity. You are not minimizing what happened. You are refusing the legal right occupancy wants from it.",
    how: "Name the person or the moment once, inwardly. Then breathe. Every time the story starts again, return to the exhale: I will not take the bait.",
    inhale: 4,
    hold: 4,
    exhale: 8,
    phases: {
      inhale: "I see the trap. I do not deny the wound.",
      hold: "I will not take the bait.",
      exhale: "I release the legal right of offense.",
      rest: "The debt is not yours to collect. Stay.",
    },
    guidance: [
      "Offense is a legal right given away.",
      "See the trap. Do not step in.",
      "Release the right to keep collecting.",
    ],
  },
  "yoked-to-the-king": {
    title: "Match His stride",
    forThis:
      "This sitting is for Yoked to the King. The yoke is not a burden. It is an alignment mechanism — love and fire in one stride. You have been rushing, or fighting, or collapsing. This breath times you to Him.",
    onThis:
      "Meditate on the yoke itself: two walking together, His pace, not yours. Not collapse. Not combat. Feel where you pull ahead or stall. Let the yoke correct you without shame.",
    how: "Imagine a yoke that does not crush. Inhale with Him. Exhale with Him. If you rush, slow. If you stall, step.",
    inhale: 5,
    hold: 2,
    exhale: 5,
    phases: {
      inhale: "I take Your yoke. Match His stride.",
      hold: "It times me. It does not crush.",
      exhale: "Love and fire, one step.",
      rest: "If you rushed, slow. If you stalled, step.",
    },
    guidance: [
      "The yoke is alignment, not a weight.",
      "Love and fire, one stride.",
      "He times you. Stay in the pace.",
    ],
  },
  "school-of-the-wilderness": {
    title: "The classroom",
    forThis:
      "This sitting is for School of the Wilderness. The dry place is a classroom, not a curse. You have been reading the wilderness as abandonment. This breath is how you sit in it as a student.",
    onThis:
      "Meditate on the actual wilderness you are in — the delay, the stripping, the unanswered place. Do not ask it to end for two minutes. Ask who is teaching you in it. He is not absent because it is dry.",
    how: "Do not fill the silence with plans of escape. Sit as if the desert has a desk. Two minutes of being taught, not rescued.",
    inhale: 4,
    hold: 6,
    exhale: 6,
    phases: {
      inhale: "This dry place is a classroom.",
      hold: "You are the teacher here. I will not rush the lesson.",
      exhale: "I stop calling this a curse.",
      rest: "Stay in the school. Do not leave the desk.",
    },
    guidance: [
      "The wilderness is a classroom.",
      "He is the teacher in the dry place.",
      "Do not call this a curse.",
    ],
  },
  "principalities-and-powers": {
    title: "Creatures, not equals",
    forThis:
      "This sitting is for Principalities and Powers. They are creatures. They can be commanded. You have been fighting them as if they were peers. This breath restores the hierarchy: they were made through Him and for Him.",
    onThis:
      "Meditate on rank, not on the demonology. Whatever has been thundering in your life is a created thing. You do not negotiate with it as an equal. You sit under the King who made it, until fighting-as-peer feels unnecessary.",
    how: "Do not rehearse the war. Sit above the panic. If a name of a power arises, do not dialogue. Return to: creature. Commanded. Not my equal.",
    inhale: 4,
    hold: 4,
    exhale: 6,
    phases: {
      inhale: "They are creatures. They were made through Him.",
      hold: "I will not fight them as equals.",
      exhale: "Rank is restored. They can be commanded.",
      rest: "Stay under the King who made them.",
    },
    guidance: [
      "They are creatures.",
      "You do not fight them as equals.",
      "They can be commanded.",
    ],
  },
  "the-supremacy-of-christ": {
    title: "Held together",
    forThis:
      "This sitting is for The Supremacy of Christ. In Him all things consist — including you. You have been the one holding the house up. This breath is rest as proof of His preeminence, not as a nap.",
    onThis:
      "Meditate on Colossians 1 in the body: this breath is given, not produced. You are not sustaining the world. He is. On the hold, notice that you are being held.",
    how: "Let the need to manage pass. You are not keeping this inhale going by will. Two minutes of being held.",
    inhale: 4,
    hold: 6,
    exhale: 6,
    phases: {
      inhale: "This breath is given. I do not produce it.",
      hold: "In Him all things hold together — including me.",
      exhale: "I release the need to sustain everything.",
      rest: "Preeminence. Striving may go.",
    },
    guidance: [
      "He has the preeminence — including in you.",
      "You are being held.",
      "You do not hold this together.",
    ],
  },
  "raise-the-standard": {
    title: "The banner",
    forThis:
      "This sitting is for Raise the Standard. When the standard is lifted, the field changes. Occupancy has been setting the high ground. This breath is the banner going up over your actual field — house, mind, work — before you speak a word.",
    onThis:
      "Meditate on Christ Himself as the lifted standard, not on your effort to be braver. See the field of your life. The banner is already His. You are agreeing that it flies here.",
    how: "Sit as if a banner were being raised over this room. You are not the flag. You are the agreement. Two minutes.",
    inhale: 4,
    hold: 4,
    exhale: 6,
    phases: {
      inhale: "I lift the standard. It is Christ.",
      hold: "The field must answer the banner.",
      exhale: "Occupancy loses the high ground.",
      rest: "The standard is up. Stay under it.",
    },
    guidance: [
      "The standard is Christ.",
      "When it is lifted, the field changes.",
      "Occupancy loses the high ground.",
    ],
  },
  "the-tribunal-of-the-heart": {
    title: "The courtroom",
    forThis:
      "This sitting is for The Tribunal of the Heart. Conscience is the courtroom Heaven uses. You are not here to prosecute yourself. You are here to let the Spirit search, without shame running the trial.",
    onThis:
      "Meditate on being searched — Psalm 139 as a sitting, not a verse. Invite light into the hidden motive, the quiet agreement, the place you have not wanted judged. Stay in the court. Do not flee into explanation.",
    how: "Hands open. You are a witness, not the judge. If condemnation speaks, it is not the Spirit. Return to: Search me. I will not run.",
    inhale: 4,
    hold: 6,
    exhale: 6,
    phases: {
      inhale: "Search me. I will not hide.",
      hold: "Conscience is Your courtroom. Shame is not the judge.",
      exhale: "Truth may stay. Condemnation may leave.",
      rest: "Remain in the tribunal. Do not adjourn early.",
    },
    guidance: [
      "Conscience is Heaven’s courtroom.",
      "You are being searched, not shamed.",
      "Stay. Do not explain it away.",
    ],
  },
  "from-stronghold-to-freedom": {
    title: "Name the occupant",
    forThis:
      "This sitting is for From Stronghold to Freedom. A stronghold is occupancy with a legal story. You have been fighting the symptom. This breath is how you sit long enough to see the structure in the palace — not the mood, the occupant.",
    onThis:
      "Meditate on the stronghold as a sitting occupant with a claim: “this is just who I am,” “I have to,” “they owe me.” Do not diagnose yet. See that it is a structure with a story, and that the story is not your name.",
    how: "Ask once: who has been sitting in the palace? Then breathe. Do not build a theology in the two minutes. See the occupant.",
    inhale: 4,
    hold: 4,
    exhale: 6,
    phases: {
      inhale: "I name the occupant — not the symptom.",
      hold: "It is a structure. It is not my name.",
      exhale: "The legal story loses its breath.",
      rest: "See it. Do not make peace with it.",
    },
    guidance: [
      "A stronghold is occupancy with a legal story.",
      "Name the occupant, not the mood.",
      "The story is not your name.",
    ],
  },
  "rejecting-legalism": {
    title: "Sonship, not a new jailer",
    forThis:
      "This sitting is for Rejecting Legalism. Law without the Spirit becomes a new jailer. You have replaced occupancy with performance — a cleaner prison. This breath is sonship: obedience that lives, not a form you serve.",
    onThis:
      "Meditate on the difference in the body: the tightness of getting it right versus the ease of being a child. Legalism will try to turn even this sitting into a score. Refuse the score. Receive the Spirit of sonship.",
    how: "If you start grading the breath, you have found the jailer. Smile if you can. Begin the next inhale as a son, not as a servant of the form.",
    inhale: 4,
    hold: 4,
    exhale: 6,
    phases: {
      inhale: "I receive the Spirit of sonship.",
      hold: "I am not a slave to the form.",
      exhale: "The jailer of law-without-life may go.",
      rest: "Stay a son. Do not earn this rest.",
    },
    guidance: [
      "Law without the Spirit is a new jailer.",
      "Sonship, not performance.",
      "Do not grade this sitting.",
    ],
  },
  "neuroscience-of-deliverance": {
    title: "Light in the body",
    forThis:
      "This sitting is for The Neuroscience of Deliverance. Freedom is spiritual — and the body keeps the score until light rewires it. You have been trying to think your way free while the old alarm still runs in the nerves. This breath is for the tissue.",
    onThis:
      "Meditate in the body, not the argument. Find the flinch — jaw, gut, chest, the startle. That is the old occupancy in the flesh. Invite His light there. You are not emptying sensation. You are letting a temple be occupied by its rightful Lord.",
    how: "One hand on the place that still flinches. Inhale into it. On the long exhale, let the alarm go down the breath. If tears or tremor come, they are not failure.",
    inhale: 4,
    hold: 4,
    exhale: 8,
    phases: {
      inhale: "This body is a temple. Light, enter here.",
      hold: "Reach the old alarm in the nerves.",
      exhale: "The flinch may leave down the breath.",
      rest: "Stay in the tissue. Do not go back up into the head.",
    },
    guidance: [
      "The body keeps the score.",
      "Light the place that still flinches.",
      "You are a temple. He dwells here.",
    ],
  },
  "anointed-to-rule": {
    title: "Reign from rest",
    forThis:
      "This sitting is for Anointed to Rule. You were anointed to govern, not merely endure. Survival has been your default. This breath is how you remember the oil — government from rest, not from striving to stay alive.",
    onThis:
      "Meditate on the anointing as a fact, not a feeling: you are a son, a daughter, meant to rule under the King. Endurance without dominion is still occupancy’s script. Sit as one who has been given a field.",
    how: "Sit taller without strain. You are not surviving this room. You are occupying it. Two minutes of government in the body.",
    inhale: 4,
    hold: 4,
    exhale: 6,
    phases: {
      inhale: "I was anointed to rule.",
      hold: "Rest is not passivity. It is station.",
      exhale: "Survival as my default may go.",
      rest: "Govern from here. Do not shrink.",
    },
    guidance: [
      "You were anointed to govern.",
      "Rest is station, not collapse.",
      "Survival is not your name.",
    ],
  },
  "man-of-lawlessness": {
    title: "No vacancy",
    forThis:
      "This sitting is for Man of Lawlessness. Lawlessness is occupancy without a rightful king — a vacant throne, and something sits in it. This breath is how you close the vacancy. There is a King in this house.",
    onThis:
      "Meditate on the empty seat occupancy loves: the place you have not submitted, the rule you have postponed, the “I will decide later.” See that later is already a government. Fill it with Christ, not with a better intention.",
    how: "Inwardly walk the house. Any room without a king is the sitting. Return the keys on the breath. Two minutes. No vacancy.",
    inhale: 4,
    hold: 4,
    exhale: 6,
    phases: {
      inhale: "There is a King in this house.",
      hold: "No vacancy. I will not postpone the throne.",
      exhale: "Occupancy without rank may leave.",
      rest: "The seat is filled. Stay under Him.",
    },
    guidance: [
      "Lawlessness loves a vacant throne.",
      "There is a King in this house.",
      "No vacancy.",
    ],
  },
  "exiting-the-matrix": {
    title: "Occupy the real",
    forThis:
      "This sitting is for Exiting the Matrix. There is a false interface — the constructed story occupancy prefers you live in. This breath is leaving it. You are not analyzing the illusion. You are occupying what is real in Christ.",
    onThis:
      "Meditate on the difference between the story you have been running and the actual presence of the King. The matrix is the rehearsed identity, the predicted reaction, the screen. The real is this breath, this body, this Lord. Step out.",
    how: "When the old story starts playing, label it: interface. Return to what is here. Two minutes of the real.",
    inhale: 4,
    hold: 4,
    exhale: 6,
    phases: {
      inhale: "I consent to the real.",
      hold: "The false interface has no claim.",
      exhale: "I leave the constructed story.",
      rest: "Occupy what is here. Do not go back to the screen.",
    },
    guidance: [
      "Leave the false interface.",
      "The constructed story is not the real.",
      "Occupy what is here, in Him.",
    ],
  },
  "deus-revelatus": {
    title: "The Revealed God",
    forThis:
      "This sitting is for Deus Revelatus — the close of Part One. What was hidden is shown. El Mistater has unveiled. You are not putting God back in the dark because the rooms are finished. This breath is how you stay with the Revealed God.",
    onThis:
      "Meditate on what this part has actually shown you — not the whole book, the unveiling in you. God as He has disclosed Himself here, not the God you had managed. You will not cover Him again to stay comfortable.",
    how: "Remember one thing that was hidden and is now seen. Hold it in the light. Two minutes of remaining with what was revealed.",
    inhale: 4,
    hold: 6,
    exhale: 6,
    phases: {
      inhale: "You are revealed. I receive what You have shown.",
      hold: "I will not put You back in hiding.",
      exhale: "I walk in what has been unveiled.",
      rest: "Deus Revelatus. Stay. Do not close the curtain.",
    },
    guidance: [
      "What was hidden is shown.",
      "Do not put Him back in hiding.",
      "Walk in what has been unveiled.",
    ],
  },
};
