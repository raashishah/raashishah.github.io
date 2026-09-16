export type DictionarySense = {
  gloss: string;
  examples: readonly string[];
};

export const decavalentDictionary = {
  lemma: "decavalent",
  partOfSpeech: "adjective",
  subjects: ["CHEMISTRY", "specialized"] as const,
  pronunciations: {
    uk: "/dɪˈkeɪ.və.lənt/",
    us: "/dɪˈkeɪ.və.lənt/",
  },
  senses: [
    {
      gloss: "having a valence of ten",
      examples: [
        "Decavalent is a chemistry term meaning 'having a valence of ten'. Valence is an atom's capacity to combine or bond.",
        "I liked the idea of unusually high capacity for connection — one thing capable of combining with many others.",
      ],
    },
    {
      gloss: "representing the power of connection",
      examples: [
        "For us, it represents the power of connection — taking different ideas, technologies and people and combining them into something more valuable.",
      ],
    },
  ] as const satisfies readonly DictionarySense[],
} as const;
