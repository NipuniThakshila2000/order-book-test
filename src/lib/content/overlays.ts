export type Work = {
  ponderings: string[];
  activation: { title: string; lines: string[] };
  exercise: { title: string; prompt: string };
  meditation?: { title: string; durationMin: number; inhale: number; hold: number; exhale: number; guidance: string[] };
  blurb?: string;
};

export const overlays: Record<string, Work> = {
  "el-mistater": {
    ponderings: [
      "Why does deliverance beat at the heart of Christ’s ministry — and where have you asked Him to “let us alone”?",
      "What did occupancy recognize in Him that you have refused to recognize?",
      "Where is God still El Mistater in you — hidden — and where is He unveiling?",
    ],
    activation: {
      title: "The Hidden One",
      lines: [
        "Father, You are El Mistater — the God who hides, and the God who reveals.",
        "Unveil what was concealed. I will not fear the hidden.",
        "I receive Your light in the places I have kept dark.",
        "Amen.",
      ],
    },
    exercise: {
      title: "Name the hidden",
      prompt:
        "Write one thing occupancy has asked Jesus to leave alone in you — and one unveiling you consent to before you leave this chamber.",
    },
    blurb:
      "Start here. Kirby asks why deliverance sits at the center of Jesus’ ministry — and what the demons recognized that we still miss. El Mistater is the Hidden One. This room is the unveiling. Don’t skip it to get to the “real” chapters.",
    meditation: {
      title: "The unveiling",
      durationMin: 2,
      inhale: 4,
      hold: 4,
      exhale: 6,
      guidance: ["The Hidden One is not absent.", "What was concealed may now be shown.", "Sit until fear of the hidden yields."],
    },
  },
  "an-offensive-kingdom": {
    ponderings: [
      "Where have you been invading (loud, bright, insistent) instead of infiltrating (quiet occupancy)?",
      "God never battles for what He already owns. What have you been fighting for that is already His?",
      "Where does spectacle still recoil the ones who need to draw near?",
    ],
    activation: {
      title: "Infiltration",
      lines: [
        "King Jesus, I receive Your strategy: infiltration, not invasion.",
        "I refuse spectacle as my default. I occupy quietly under Your command.",
        "This ground is already Yours. I take my place in it.",
        "Amen.",
      ],
    },
    exercise: {
      title: "One quiet occupancy",
      prompt: "Name one sphere where you have been loud. Write the quieter occupancy you will practice this week.",
    },
    blurb:
      "Jesus did not take the land by spectacle. He walked in quietly, and occupancy shifted. If your faith has been loud, public, and exhausted, this chamber is about a different way of advancing.",
  },
  "order-and-rank": {
    ponderings: [
      "Where is occupancy sitting in a seat that is not its own — in your house, your mind, your work?",
      "Jehu did not seize by force; he settled by rightful authority. Where have you been seizing?",
      "Who or what have you been propping up that Heaven has already judged?",
    ],
    activation: {
      title: "Rank restored",
      lines: [
        "I take my place under the command of Christ.",
        "False thrones, lose your seat. Servants of occupancy, turn and follow the King.",
        "Freedom flourishes within structure. I receive Order.",
        "Amen.",
      ],
    },
    exercise: {
      title: "Name the false throne",
      prompt: "Write the seat occupancy still holds. Then write the command of rank — not rage — you will speak over it.",
    },
    blurb:
      "Jehu, Jezebel, and why freedom is not the same as having no one over you. Rank is a kindness. This room asks who is sitting in a seat that isn’t theirs — including in your house.",
  },
  "the-trap-of-offense": {
    ponderings: [
      "What promise you thought God had given you went unfulfilled — and became an offense?",
      "Scandalon is the trigger in the trap. What still trips your momentum toward God?",
      "Who do you push against instead of moving in the flow of the Spirit?",
    ],
    activation: {
      title: "A conscience without offense",
      lines: [
        "Search me, O God. I strive to have a conscience without offense toward You and toward men.",
        "I name the scandalon. I release the debt. I refuse the trap.",
        "Blessed is the one who is not offended because of You. I receive that blessing.",
        "Amen.",
      ],
    },
    exercise: {
      title: "Name the scandalon",
      prompt:
        "Write the offense by its true name. Who it is against. What it has halted. Then write the forgiveness you will occupy.",
    },
    blurb:
      "That promise that didn’t come. The person who wounded you. The Greek is scandalon — the trigger in a trap. Offense will halt a life that was moving toward God. This is where you name it.",
  },
  "yoked-to-the-king": {
    ponderings: [
      "Have you asked for the inheritance and left the house? Where are you tending swine?",
      "The yoke is not a crush. It is a timing. Where are you rushing? Where are you stalling?",
      "Sonship is a posture. Where have you abandoned it for “freedom” that became poverty?",
    ],
    activation: {
      title: "The easy yoke",
      lines: [
        "Jesus, I take Your yoke. I refuse peace-at-any-cost and victory-at-any-cost.",
        "Love and fire, one stride. Time me.",
        "I come home. I am a son, not a hired hand.",
        "Amen.",
      ],
    },
    exercise: {
      title: "Take the yoke in writing",
      prompt: "Write: I refuse collapse. I refuse combat. Then name the one stride you will match with Him this week.",
    },
    blurb:
      "The prodigal didn’t just waste money. He left the house. The yoke of Jesus is not a crush — it keeps you in time with Him. If you’ve been collapsing or fighting, this is the chamber that asks you to walk.",
    meditation: {
      title: "The easy yoke",
      durationMin: 2,
      inhale: 5,
      hold: 2,
      exhale: 5,
      guidance: [
        "Imagine a yoke that does not crush — it times you.",
        "Inhale with the King. Exhale with the King.",
        "If you rush, slow. If you stall, step.",
      ],
    },
  },
  "school-of-the-wilderness": {
    ponderings: [
      "Where is grumbling the voice of entitlement rather than the cry of a son?",
      "Meekness means reined — not weak. Where are you un-reined?",
      "The wilderness is a classroom. What is it teaching you that offense has been refusing?",
    ],
    activation: {
      title: "Reined",
      lines: [
        "Father, I receive the wilderness as school, not curse.",
        "I repent of murmuring. I take the posture of a son under Your hand.",
        "Blessed are the meek. Rein me.",
        "Amen.",
      ],
    },
    exercise: {
      title: "Convert the murmur",
      prompt: "Write one complaint you have been rehearsing. Convert it into one sentence of sonship — reined, not entitled.",
    },
    blurb:
      "Grumbling is usually entitlement wearing a prayer. The wilderness is where God reins a son, not where He abandons one. If you’ve been muttering, this classroom is for you.",
  },
  "principalities-and-powers": {
    ponderings: [
      "What tower have you built to make a name, independent of God?",
      "They are creatures. Where have you treated a principality as an equal enemy instead of a being to command under Christ?",
      "Which “neutral” power in your life still serves a false throne?",
    ],
    activation: {
      title: "Command, do not duel",
      lines: [
        "Jesus Christ, You have preeminence over thrones, dominions, principalities, and powers.",
        "I refuse pitched battle as my identity. I command occupancy into rank under the King.",
        "What was created through Him and for Him returns to Him — including in me.",
        "Amen.",
      ],
    },
    exercise: {
      title: "Name the tower",
      prompt:
        "Write the name-making project. Then write the command you will speak: not expulsion in rage, but correction of station.",
    },
    blurb:
      "Babel, Nimrod, the tower built to make a name. Principalities are creatures — they can be commanded under Christ. You do not have to duel them as if they were equals.",
  },
  "the-supremacy-of-christ": {
    ponderings: [
      "Where have you given another name first place — in your house, your mind, your ministry?",
      "In Him all things consist. Where are you still trying to hold everything together?",
      "Rest is the proof of preeminence. Does your rest testify?",
    ],
    activation: {
      title: "Preeminence",
      lines: [
        "Jesus Christ, You have the preeminence in all things — including me.",
        "I confess where I have given other names first place.",
        "Hold me together. Hold my house together. Hold my mind together.",
        "I receive Your supremacy as rest, and from rest I will govern.",
        "Amen.",
      ],
    },
    exercise: {
      title: "First place",
      prompt:
        "List every name that has been sitting first. Reassign each one under Christ, in writing. Then sit until striving feels unnecessary.",
    },
    blurb:
      "Colossians 1 is not wallpaper. He is before all things, and in Him they hold. If you have been the one holding the house, the mind, the ministry together — sit here until you remember you are not.",
    meditation: {
      title: "Held together",
      durationMin: 2,
      inhale: 4,
      hold: 6,
      exhale: 6,
      guidance: [
        "On the hold, notice that you are being held.",
        "You do not sustain this breath. It is given.",
        "Remain in preeminence until striving feels unnecessary.",
      ],
    },
  },
  "raise-the-standard": {
    ponderings: [
      "Where has the standard been lowered so occupancy could remain comfortable?",
      "Justice is the operating system of the Kingdom. Where have you asked for wisdom without the fear of the Lord?",
      "What would change in one room of your life if the standard were lifted this week?",
    ],
    activation: {
      title: "Lift the standard",
      lines: [
        "Lord, righteousness and justice are the foundation of Your throne.",
        "I lift the standard You have given. I refuse a lowered bar that shelters occupancy.",
        "Fear of the Lord, begin again in me.",
        "Amen.",
      ],
    },
    exercise: {
      title: "One room, one standard",
      prompt: "Name one room (house, work, thought-life). Write the lowered standard. Write the standard you will lift, specifically.",
    },
    blurb:
      "When the standard drops, occupancy gets comfortable. Justice is how the Kingdom actually runs. This room is about lifting what you have quietly lowered — in one real place, not in theory.",
  },
  "the-tribunal-of-the-heart": {
    ponderings: [
      "Independence broke the world. Where are you still operating from self-trust?",
      "The conscience is the innermost chamber. Is it surrendered — or hard to hear?",
      "Your heart is a mirror. What does it currently reflect and uphold?",
    ],
    activation: {
      title: "Search the innermost",
      lines: [
        "Search me, O God, and know my heart. Try me and know my thoughts.",
        "See if there is any wicked way in me, and lead me in the way everlasting.",
        "I yield the tribunal. I will not judge by my own light.",
        "Amen.",
      ],
    },
    exercise: {
      title: "What the mirror shows",
      prompt: "Sit until the Spirit names one thing the heart is reflecting that is not His. Write it. Write the verdict of light.",
    },
    blurb:
      "Conscience is the innermost room of the heart — the place Heaven still holds court. Independence started in a garden and it still starts in us. Invite Him to search what the mirror is showing.",
  },
  "from-stronghold-to-freedom": {
    ponderings: [
      "A stronghold is occupancy with a legal story. What story does yours tell?",
      "What agreement, vow, or offense still grants it a right?",
      "Freedom is not a mood. What structure will hold it once the occupancy leaves?",
    ],
    activation: {
      title: "Break the agreement",
      lines: [
        "In Christ I revoke every agreement occupancy has claimed.",
        "The legal story ends at the Cross. I confess, I forgive, I repent.",
        "This ground is reassigned. Rank restored.",
        "Amen.",
      ],
    },
    exercise: {
      title: "The legal story",
      prompt:
        "Write the stronghold’s story in one paragraph — how it entered, what it promised, what it costs. Then write the revocation.",
    },
    blurb:
      "A stronghold is not a mood. It is occupancy with a story — a right it claims because of an agreement, a wound, a vow. This chamber is where you write that story down and revoke it.",
  },
  "rejecting-legalism": {
    ponderings: [
      "Where has law without the Spirit become a new jailer?",
      "What rule do you keep that is not His yoke?",
      "Legalism looks like order. How is it different from rank under Christ in your life?",
    ],
    activation: {
      title: "The Spirit, not the jailer",
      lines: [
        "Lord, I reject legalism as a counterfeit of Order.",
        "I receive Your yoke, not a heavier harness of my own making.",
        "Where I have bound others, I repent. Where I have bound myself, I am released.",
        "Amen.",
      ],
    },
    exercise: {
      title: "Name the counterfeit rule",
      prompt: "Write one law you enforce (on yourself or others) that is not His. Replace it with one sentence of the easy yoke.",
    },
    blurb:
      "Rules can look like Order and still be a jailer. If you have bound yourself or other people with a law that is not His yoke, this is the room that unhooks it.",
  },
  "neuroscience-of-deliverance": {
    ponderings: [
      "Illumination that never reaches the breath, the gut, the sleep, the startle — remains half-preached. Where is yours still only an idea?",
      "Where does the body still flinch while the mind agrees?",
      "What would it mean to occupy the body as a temple this week — not as a ghost at prayer?",
    ],
    activation: {
      title: "Temple",
      lines: [
        "This body is a temple. I am not a ghost at prayer.",
        "Light, reach the place that still flinches — the old alarm in the nerves.",
        "I yield the grooves of fear. Rewire me in peace.",
        "Amen.",
      ],
    },
    exercise: {
      title: "Let light reach the flinch",
      prompt:
        "Name where the body keeps the score (sleep, gut, startle, breath). Write one embodied practice you will keep daily until the idea becomes occupancy.",
    },
    blurb:
      "You can agree with the truth in your mind and still flinch in your sleep, your gut, your startle. Kirby will not let deliverance stay an idea. This chamber takes it into the body.",
    meditation: {
      title: "Temple breath",
      durationMin: 2,
      inhale: 4,
      hold: 4,
      exhale: 8,
      guidance: ["Place a hand on your chest. This is holy ground.", "Inhale: I am a temple.", "Exhale: The old alarm in the body may leave."],
    },
  },
  "anointed-to-rule": {
    ponderings: [
      "You were anointed to govern, not merely endure. Where are you still surviving?",
      "What sphere have you abdicated as a coheir?",
      "Rule from rest. Where is your governing still striving?",
    ],
    activation: {
      title: "Anointed to rule",
      lines: [
        "I receive the anointing to rule as a son, not a survivor.",
        "What I have endured, I now govern — under Christ, from rest.",
        "This sphere is reclaimed. I occupy it as an heir.",
        "Amen.",
      ],
    },
    exercise: {
      title: "Name the sphere",
      prompt:
        "Write one domain you have only endured. Write the first act of government (not control) you will occupy there this week.",
    },
    blurb:
      "The Spirit wants to inhabit, not visit. You were not anointed merely to survive what happened to you. This is the chamber that asks which sphere you will govern as a son, from rest.",
  },
  "man-of-lawlessness": {
    ponderings: [
      "Lawlessness is occupancy without a rightful king. Where have you preferred no king to His king?",
      "What sits in you that will not submit to Order?",
      "Where has “freedom” meant refusal of rank?",
    ],
    activation: {
      title: "Under a King",
      lines: [
        "I refuse lawlessness. I refuse a throne with no King.",
        "Jesus Christ, You are the law. I submit this occupancy to Order.",
        "What will not bow is cast down. What will bow is reassigned.",
        "Amen.",
      ],
    },
    exercise: {
      title: "The lawless occupancy",
      prompt: "Name the place in you that answers to no one. Write the submission — specific, dated, spoken.",
    },
    blurb:
      "Jude saw something corrosive enter a community quietly. Lawlessness is occupancy with no king — the kind of “freedom” that will not be told. If there is a place in you that answers to no one, start here.",
  },
  "exiting-the-matrix": {
    ponderings: [
      "What false interface do you still live inside — a story, a system, a feed, a fear?",
      "Exiting is not cynicism. It is occupancy of the real. What is the real, here?",
      "What would it cost you to leave the false frame this week?",
    ],
    activation: {
      title: "Exit",
      lines: [
        "I leave the false interface. I occupy what is real in Christ.",
        "I refuse the matrix of accusation, spectacle, and counterfeit order.",
        "Lead me out. Keep me out. I will not return as a tourist.",
        "Amen.",
      ],
    },
    exercise: {
      title: "One concrete exit",
      prompt:
        "Write the false frame. Write the one concrete exit (a practice, a boundary, a confession) you will occupy before the next chamber.",
    },
    blurb:
      "There is a false frame we live inside — a story, a feed, a fear, a way of seeing that is not the real. Leaving it is not cynicism. It is walking out. This chamber asks for one concrete exit.",
  },
  "deus-revelatus": {
    ponderings: [
      "What El Mistater hid, Deus Revelatus shows. What is being revealed in you now?",
      "Revelation is not information. What must become occupancy before you walk into Authority?",
      "Are you ready to be seen — by Him, and in community?",
    ],
    activation: {
      title: "The Revealed God",
      lines: [
        "Father, You are Deus Revelatus. What was hidden is shown.",
        "I receive the unveiling. I will not hide what You have lit.",
        "I walk from concealment into the Light — covered, not exposed for shame.",
        "Amen.",
      ],
    },
    exercise: {
      title: "The unveiling",
      prompt:
        "Write what has been revealed in Part One. One sentence of thanks. One act of obedience that proves you saw it. Then go to Authority — do not skip.",
    },
    blurb:
      "What the Hidden One concealed, the Revealed God shows. This is the close of Part One. Write what you actually saw — then go to Authority. Don’t skip the steps because the light felt nice.",
  },
};
