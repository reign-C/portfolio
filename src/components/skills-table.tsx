import Link from "next/link";
import { Fragment } from "react";
import { skillLayers } from "@/lib/content";

export function SkillsTable() {
  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="border-t border-line py-12"
    >
      <h2
        id="skills-heading"
        className="text-[26px] leading-[1.15] font-semibold tracking-[-0.02em] text-ink"
      >
        Stack &amp; skills
      </h2>

      <div className="mt-6 overflow-x-auto">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-b border-line text-[13px] font-medium text-muted">
              <th scope="col" className="py-2.5 pr-6 font-medium">
                Layer
              </th>
              <th scope="col" className="py-2.5 pr-6 font-medium">
                Stack & tools
              </th>
              <th
                scope="col"
                className="hidden py-2.5 text-right font-medium sm:table-cell"
              >
                Applied in
              </th>
            </tr>
          </thead>
          <tbody>
            {skillLayers.map((row) => (
              <tr
                key={row.layer}
                className="border-b border-line align-baseline"
              >
                <th
                  scope="row"
                  className="whitespace-nowrap py-4 pr-6 text-[15px] font-semibold text-ink"
                >
                  {row.layer}
                </th>
                <td className="py-4 pr-6 text-[15px] leading-[1.6] text-ink">
                  {row.items.map((item, idx) => (
                    <Fragment key={item.name}>
                      {idx > 0 ? ", " : null}
                      {item.href ? (
                        <Link
                          href={item.href}
                          className={`underline decoration-line transition-colors duration-150 hover:decoration-ink ${
                            item.mono ? "mono text-[14px]" : ""
                          }`}
                        >
                          {item.name}
                        </Link>
                      ) : (
                        <span className={item.mono ? "mono text-[14px]" : ""}>
                          {item.name}
                        </span>
                      )}
                    </Fragment>
                  ))}
                </td>
                <td className="hidden whitespace-nowrap py-4 text-right text-[14px] sm:table-cell">
                  <Link
                    href={row.appliedIn.href}
                    className="font-medium text-ink underline decoration-muted transition-colors duration-150 hover:decoration-ink"
                  >
                    {row.appliedIn.label}
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
