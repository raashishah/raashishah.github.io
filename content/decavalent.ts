export type DictionaryCitation = {
  label?: string;
  example: string;
};

export type DictionaryOriginSegment =
  | string
  | {
      text: string;
      emphasis?: true;
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
  originSegments: [
    "From Greek deka ",
    { text: "‘ten’", emphasis: true },
    " + valent, from Latin valentia ",
    { text: "‘capacity’", emphasis: true },
    ".",
  ] as const satisfies readonly DictionaryOriginSegment[],
} as const;
