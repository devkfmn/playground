export default function Planning() {
  return (
    <div className="page">
      <h1>Issue Planning Guide</h1>
      <p className="page-lead">
        A <strong>minimal manual planning loop</strong> for creating well-defined,
        actionable issues before implementation begins.
      </p>

      <section className="info-section">
        <h2>Core Flow</h2>
        <ol>
          <li>
            <strong>Create issue</strong> → set status to <code>needs-plan</code>
          </li>
          <li>
            <strong>Request planning</strong> → comment <code>@cursor plan this issue</code>
          </li>
          <li>
            <strong>Agent creates plan</strong> → plan markdown is added or updated
          </li>
          <li>
            <strong>Questions?</strong> → if questions exist, status becomes <code>awaiting-answers</code>
          </li>
          <li>
            <strong>You answer</strong> → reply in a comment
          </li>
          <li>
            <strong>Refine</strong> → comment <code>@cursor refine plan</code>
          </li>
          <li>
            <strong>Loop</strong> → repeat until no questions remain
          </li>
          <li>
            <strong>Ready</strong> → agent sets status to <code>ready</code>
          </li>
        </ol>
      </section>

      <section className="info-section">
        <h2>Status Labels</h2>
        <ul>
          <li><code>needs-plan</code> — Issue created, awaiting initial plan</li>
          <li><code>awaiting-answers</code> — Agent has questions that need answers</li>
          <li><code>ready</code> — Plan is complete, issue can be implemented</li>
        </ul>
      </section>

      <section className="info-section">
        <h2>Quick Reference</h2>
        <ul>
          <li>Start planning: <code>@cursor plan this issue</code></li>
          <li>Refine after answering: <code>@cursor refine plan</code></li>
        </ul>
      </section>
    </div>
  )
}
