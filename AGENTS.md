# AGENTS.md

## Project Guidelines

### 1. Project Structure

- Club content, including programs, coaches, branches, belts, and FAQs, is maintained in `src/content/site.ts`.
- Treat this file as the single source of truth for club-related content.
- Pages and components should consume data from the central content file instead of duplicating text or hardcoding the same information in multiple places.
- When updating existing content, modify the central source to keep information consistent across the application.
- Follow the existing project structure and conventions when adding new features or content.

### 2. Code Quality

- Inspect relevant files and existing implementations before making changes.
- Follow the project's established coding patterns, naming conventions, and component architecture.
- Prefer reusable components and maintainable solutions over duplicated code.
- Keep changes focused on the requested task and avoid unnecessary refactoring or dependencies.
- Preserve existing functionality unless a change explicitly requires modifying it.
- Avoid introducing placeholder content, fabricated information, or unnecessary hardcoded values.

### 3. UI & Styling

- Maintain consistency with the existing design system, including colors, typography, spacing, and component styles.
- Ensure all pages and components work correctly across mobile, tablet, and desktop screen sizes.
- Prioritize accessibility, semantic HTML, keyboard navigation, and clear interaction states.
- Avoid inconsistent styling, unnecessary visual changes, and UI regressions.

### 4. Data & Content

- Keep content separate from presentation wherever practical.
- Reuse existing data structures and types when possible.
- Ensure content updates are reflected everywhere the relevant data is used.
- Validate user-facing content for accuracy, consistency, and readability.

### 5. Validation

- Run relevant build commands, type checks, linting, and tests when available.
- Fix errors introduced by your changes.
- Check affected pages and components for unintended side effects.
- Never claim a build or test passed unless it was actually executed successfully.

### General Principles

- Understand the existing implementation before changing it.
- Prefer simple, focused, and maintainable solutions.
- Do not modify unrelated files or functionality without a clear reason.
- When completing a task, summarize the changes made and mention any outstanding issues or validation steps.
