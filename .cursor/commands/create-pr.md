# Create Pull Request



Prepare a pull request for the current branch.



## Steps



1. Review local changes and summarize the user-visible or maintenance impact.

2. Draft a concise commit message based on the actual change.

3. Draft a PR title and body.

4. Include:

   - plan reference if one exists

   - verification command(s) run and pass/fail status

   - screenshots if UI changed, or an explicit screenshot waiver

   - notable follow-up items if something was intentionally deferred

   - **GitHub auto-close (when this PR closes an issue):** PR body must contain `Closes #<issue>` or `Fixes #<issue>` (merge into default branch closes the linked issue). If there is **no** linked issue, do **not** invent one; omit auto-close lines and add a short note in the body that there is no issue (e.g. chore, docs, or work tracked outside GitHub).

5. **Only when a tracked GitHub issue applies:** after opening or updating the PR, set the issue to **`status:in-review`** and remove any other `status:*` labels (exactly one `status:*` at a time). Do **not** set `status:done` at PR creation; use `status:done` only after merge if you still want that label on closed issues.

6. If operating-model files changed, mention that `docs/project_init.md` was updated as part of the same change.

7. If daily workflow guidance changed, mention whether `docs/operating_model_cheatsheet.md` was updated too.

