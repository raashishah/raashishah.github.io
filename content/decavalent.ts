export type DictionaryCitation = {
  label?: string;
  example: string;
};

export const decavalentDictionary = {
  lemma: "decavalent",
  pronunciation: "dɪˈkeɪ.və.lənt",
  partOfSpeech: "adjective",
  grammarLabel: "chemistry",
  gloss:
    "having a valence of ten; having an unusually high capacity to combine or bond",
  citations: [
    { example: "a decavalent atom" },
    {
      label: "figurative",
      example:
        "combining different ideas, technologies and people into something more valuable.",
    },
  ] as const satisfies readonly DictionaryCitation[],
  origin:
    "From Greek deka ‘ten’ + valent, from Latin valentia ‘capacity’.",
} as const;
