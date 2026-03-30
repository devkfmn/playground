export default function CreateIssue() {
  return (
    <div className="page">
      <h1>Create GitHub Issue</h1>
      <p className="page-lead">
        Create a GitHub issue aligned to the repository template.
      </p>

      <section className="info-section">
        <h2>Steps</h2>
        <ol>
          <li>
            Confirm issue type: <code>Feature</code>, <code>Bug</code>, or{' '}
            <code>Chore</code>.
          </li>
          <li>
            Use{' '}
            <code>.github/ISSUE_TEMPLATE/feature-bug-chore.yml</code> as the
            required structure.
          </li>
          <li>
            Draft the issue body with:
            <ul>
              <li>
                <code>Problem / Goal</code>
              </li>
              <li>
                <code>Expected Outcome</code>
              </li>
              <li>
                <code>Acceptance Criteria (rough)</code> with checkboxes
              </li>
              <li>
                <code>Context</code>
              </li>
            </ul>
          </li>
          <li>
            Keep scope small and implementation-ready (avoid broad or mixed
            goals).
          </li>
          <li>
            For new issues, apply <code>status:needs-plan</code> only (remove any
            other <code>status:*</code> labels). The canonical{' '}
            <code>status:*</code> set is:
            <ul>
              <li>
                <code>status:needs-plan</code> — new issue, not yet actively
                planned
              </li>
              <li>
                <code>status:in-progress</code> — planning or implementation in
                progress
              </li>
              <li>
                <code>status:in-review</code> — PR open, awaiting merge
              </li>
              <li>
                <code>status:done</code> — after merge (optional; GitHub may
                already have closed the issue via <code>Closes #</code> in the PR
                body)
              </li>
            </ul>
          </li>
          <li>
            Return the final issue title, labels, and body text for confirmation
            before submit.
          </li>
        </ol>
      </section>

      <section className="info-section">
        <h2>Notes</h2>
        <ul>
          <li>Prefer one issue per independently shippable change.</li>
          <li>Use exactly one active <code>status:*</code> label at a time.</li>
        </ul>
      </section>
    </div>
  )
}
