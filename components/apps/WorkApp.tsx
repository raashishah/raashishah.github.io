"use client";

import { useState } from "react";
import { roles } from "@/content/roles";

export function WorkApp() {
  const [expanded, setExpanded] = useState(false);
  const featured = roles.filter((r) => r.featured);
  const collapsed = roles.filter((r) => !r.featured);

  return (
    <ul className="role-list">
      {featured.map((role) => (
        <li key={role.company} className="role-item">
          <div className="role-item__header">
            <span className="role-item__company">
              {role.company} · {role.title}
            </span>
            <span className="role-item__meta">{role.years}</span>
          </div>
          <p className="role-item__insight">{role.insight}</p>
        </li>
      ))}
      {collapsed.length > 0 ? (
        <li className="role-item">
          <button
            type="button"
            onClick={() => setExpanded(!expanded)}
            className="role-item__toggle"
          >
            {expanded ? "▾" : "▸"} Kawa Space · Kotak Neo · Solid
          </button>
          {expanded
            ? collapsed.map((role) => (
                <div key={role.company} className="role-item__collapsed">
                  <div className="role-item__header">
                    <span className="role-item__company">
                      {role.company} · {role.title}
                    </span>
                    <span className="role-item__meta">{role.years}</span>
                  </div>
                  <p className="role-item__insight">{role.insight}</p>
                </div>
              ))
            : null}
        </li>
      ) : null}
    </ul>
  );
}
