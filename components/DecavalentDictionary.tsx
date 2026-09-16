import { Source_Serif_4 } from "next/font/google";
import { decavalentDictionary } from "@/content/decavalent";

const dictionarySerif = Source_Serif_4({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export function DecavalentDictionary() {
  const { lemma, partOfSpeech, subjects, pronunciations, senses } = decavalentDictionary;

  return (
    <article
      className={`dictionary-entry ${dictionarySerif.className}`}
      aria-label={`Dictionary entry for ${lemma}`}
    >
      <p className="dictionary-entry__kicker">
        Meaning of <span className="dictionary-entry__kicker-lemma">{lemma}</span> in English
      </p>

      <p className="dictionary-entry__lemma">{lemma}</p>

      <p className="dictionary-entry__meta">
        <span className="dictionary-entry__pos">{partOfSpeech}</span>
        {subjects.map((subject) => (
          <span key={subject} className="dictionary-entry__subject">{subject}</span>
        ))}
      </p>

      <div className="dictionary-entry__pronunciations">
        <p className="dictionary-entry__pronunciation">
          <span className="dictionary-entry__locale">UK</span>
          <span className="dictionary-entry__ipa">{pronunciations.uk}</span>
        </p>
        <p className="dictionary-entry__pronunciation">
          <span className="dictionary-entry__locale">US</span>
          <span className="dictionary-entry__ipa">{pronunciations.us}</span>
        </p>
      </div>

      <div className="dictionary-entry__rule" aria-hidden="true" />

      <ol className="dictionary-entry__senses">
        {senses.map((sense, index) => (
          <li key={sense.gloss} className="dictionary-entry__sense">
            <p className="dictionary-entry__gloss">
              <span className="dictionary-entry__sense-index">{index + 1}.</span>
              <strong>{sense.gloss}</strong>
            </p>
            <ul className="dictionary-entry__examples">
              {sense.examples.map((example) => (
                <li key={example} className="dictionary-entry__example">
                  <em>{example}</em>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </article>
  );
}
