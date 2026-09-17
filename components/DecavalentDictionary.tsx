import { Newsreader } from "next/font/google";
import { decavalentDictionary } from "@/content/decavalent";

const dictionarySerif = Newsreader({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-dictionary",
});

export function DecavalentDictionary() {
  const {
    lemma,
    pronunciation,
    partOfSpeech,
    grammarLabel,
    gloss,
    citations,
    origin,
  } = decavalentDictionary;

  return (
    <article
      className={`dictionary-entry ${dictionarySerif.className} ${dictionarySerif.variable}`}
      lang="en-GB"
      aria-label={`Dictionary entry for ${lemma}`}
    >
      <p className="dictionary-entry__headword">
        <span className="dictionary-entry__lemma">{lemma}</span>
        <span className="dictionary-entry__pronunciation">
          <span aria-hidden="true">| </span>
          <span className="dictionary-entry__ipa">{pronunciation}</span>
          <span aria-hidden="true"> |</span>
        </span>
      </p>

      <p className="dictionary-entry__pos">
        <span className="dictionary-entry__pos-word">{partOfSpeech}</span>{" "}
        <span className="dictionary-entry__grammar">[{grammarLabel}]</span>
      </p>

      <div className="dictionary-entry__sense">
        <p className="dictionary-entry__gloss">{gloss}:</p>
        <p className="dictionary-entry__citations">
          {citations.map((citation, index) => (
            <span key={citation.example}>
              {index > 0 ? (
                <>
                  <span className="dictionary-entry__pipe"> | </span>
                  {"label" in citation && citation.label ? (
                    <>
                      <span className="dictionary-entry__label">
                        [{citation.label}]
                      </span>
                      <span className="dictionary-entry__pipe"> : </span>
                    </>
                  ) : null}
                </>
              ) : null}
              <em className="dictionary-entry__example">
                {citation.example}
              </em>
            </span>
          ))}
        </p>
      </div>

      <footer className="dictionary-entry__etymology">
        <p className="dictionary-entry__origin-label">Origin</p>
        <div className="dictionary-entry__rule" aria-hidden="true" />
        <p className="dictionary-entry__origin">{origin}</p>
      </footer>
    </article>
  );
}
