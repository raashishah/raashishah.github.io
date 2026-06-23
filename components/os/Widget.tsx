import { fragments } from "@/content/fragments";
import { metrics } from "@/content/site";

const fragment = fragments[0];

export function FragmentWidget() {
  return (
    <article className="widget widget--fragment glass" aria-label="Fragment">
      <p className="widget__label">Fragment</p>
      <h3 className="widget__title">{fragment.title}</h3>
      <p className="widget__body">{fragment.body}</p>
    </article>
  );
}

export function MetricsWidget() {
  return (
    <article className="widget widget--metrics glass" aria-label="Metrics">
      <p className="widget__label">Metrics</p>
      <div className="metrics-widget__row">
        <div>
          <p className="metrics-widget__value">{metrics.profiles}</p>
        </div>
        <div>
          <p className="metrics-widget__value">{metrics.pwa}</p>
        </div>
        <div>
          <p className="metrics-widget__value">{metrics.experience}</p>
        </div>
      </div>
    </article>
  );
}
