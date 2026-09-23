export type Spoken = {
  id: string;
  title: string;
  kicker: string;
  lines: string[];
  ref?: string;
};

export const prayers: Spoken[] = [
  {
    id: "opening",
    title: "Opening search",
    kicker: "Begin here — before a chamber, a step, or a hard day.",
    ref: "Psalm 139:23–24",
    lines: [
      "Search me, O God, and know my heart.",
      "Try me and know my thoughts.",
      "See if there is any wicked way in me,",
      "and lead me in the way everlasting.",
    ],
  },
  {
    id: "yoke",
    title: "The easy yoke",
    kicker: "When you are rushing or fighting.",
    lines: [
      "Jesus, I take Your yoke.",
      "I refuse collapse. I refuse combat as my default.",
      "Love and fire, one stride. Time me.",
      "Amen.",
    ],
  },
  {
    id: "covering",
    title: "Stay covered",
    kicker: "When you are tempted to walk this alone.",
    lines: [
      "Father, I will not walk this alone.",
      "Lead me to covering, to fellowship, to a trusted shepherd.",
      "Let my story become someone else’s hope.",
      "Amen.",
    ],
  },
  {
    id: "forgive",
    title: "Release the debt",
    kicker: "When you are still collecting.",
    lines: [
      "Father, I bring the name I have been carrying.",
      "I forgive. I release the debt. I will not keep this as a right.",
      "Where I have been the one who owes, I repent.",
      "Restore my stride. Amen.",
    ],
  },
  {
    id: "temple",
    title: "Dwell here",
    kicker: "When the body still flinches.",
    lines: [
      "Holy Spirit, this body is a temple. Dwell here.",
      "Reach the place in me that still startles — not only the thought.",
      "I consent. If tears come, they are not failure.",
      "Amen.",
    ],
  },
  {
    id: "wilderness",
    title: "Reined, not abandoned",
    kicker: "When you are murmuring, or the dry place feels like a curse.",
    lines: [
      "Father, I repent of entitlement dressed as prayer.",
      "Teach me in this wilderness. Rein me as a son.",
      "I will not accuse You of leaving me.",
      "Amen.",
    ],
  },
];

export const decrees: Spoken[] = [
  {
    id: "preeminence",
    title: "Preeminence",
    kicker: "Colossians 1 — He is before all things, including you.",
    ref: "Colossians 1:15–17",
    lines: [
      "Jesus Christ, You have the preeminence in all things — including me.",
      "I confess where I have given other names first place.",
      "Hold me together. Hold my house together. Hold my mind together.",
      "I receive Your supremacy as rest, and from rest I will govern.",
    ],
  },
  {
    id: "rank",
    title: "Rank restored",
    kicker: "Authority is command under obedience — not volume.",
    lines: [
      "I take my place under the command of Christ.",
      "I refuse lawlessness, and I refuse legalism.",
      "What was occupied without right is reassigned.",
      "Every name that sat first is named under Him.",
    ],
  },
  {
    id: "occupancy",
    title: "This ground is holy",
    kicker: "When a room still feels owned.",
    lines: [
      "This ground is holy. I am a temple. He dwells here.",
      "I yield the old alarm.",
      "What asked Jesus to leave me alone has no remaining right.",
      "I occupy this body, this house, this day, under the King.",
    ],
  },
  {
    id: "offense",
    title: "The trap is named",
    kicker: "When scandalon has halted your stride.",
    lines: [
      "I name the offense. I will not keep it as a right.",
      "I release the debt. I refuse identity built on the wound.",
      "Blessed is the one who is not offended because of You.",
      "My conscience is recovered. My stride is restored.",
    ],
  },
  {
    id: "sonship",
    title: "A son, not a hired hand",
    kicker: "When you have left the house, or come back as a servant.",
    lines: [
      "I come home as a son. I will not bargain for a wage.",
      "The yoke times me. It does not crush me.",
      "I refuse the prodigal’s independence and the elder brother’s ledger.",
      "I take my place in the house.",
    ],
  },
  {
    id: "standard",
    title: "The standard is lifted",
    kicker: "When occupancy got comfortable because the line dropped.",
    lines: [
      "I lift the standard in this house, this work, this mind.",
      "Justice is how the Kingdom runs. I will not lower it to keep peace.",
      "The fear of the Lord is first.",
      "What was out of rank is called back under Christ.",
    ],
  },
];

export const allPrayers = [...prayers, ...decrees];
