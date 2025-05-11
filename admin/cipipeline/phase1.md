````markdown
# Continuous Integration Pipeline

This file describes our full CI/CD strategy—including the tools we chose, how they fit together, and exactly where each step lives in GitHub Actions.

---

## Overview & Key Stages

1. **Code Push** – Developers push commits to a feature branch.  
2. **Pull Request** – A PR proposes merging into `main`.  
3. **Automated Checks (GitHub Actions)**  
   * **Unit Tests** (Jest)  
   * **Linting** (ESLint, HTMLHint, Style‑lint)  
   * **Documentation Build** (JSDoc)  
   * **Build / Bundle** (when applicable)  
4. **Manual Review** – Code review and quick play‑test.  
5. **Merge to `main`** – Only after all green checks.  
6. **Deployment** – Static site and docs published with GitHub Pages.  
7. **Continuous Documentation** – Fresh JSDoc is attached to the workflow run or published to `docs/`.

---

### Minimal GitHub Actions Workflow

```yaml
# .github/workflows/ci.yml
name: CI

on:
  push:        { branches: [main] }
  pull_request:{ branches: [main] }

jobs:
  build-test-docs:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with: { node-version: 20 }

      - name: Install deps
        run: npm ci

      - name: Run tests
        run: npm test

      - name: Run linters
        run: |
          npm run lint:js
          npm run lint:html
          npm run lint:css || true  # Stylelint soon™

      - name: Build JSDoc
        run: npm run docs

      - name: Upload docs (PRs only)
        if: github.ref != 'refs/heads/main'
        uses: actions/upload-artifact@v4
        with: { name: jsdoc, path: docs/ }

      - name: Deploy site (main)
        if: github.ref == 'refs/heads/main'
        uses: peaceiris/actions-gh-pages@v4
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./public
````

---

## Unit Tests

We use **Jest** because:

* It’s the framework taught in class (low learning curve).
* Fast, zero‑configuration for vanilla projects.
* Easily hooks into GitHub Actions.

<details>
<summary>Typical output</summary>

```text
PASS  tests/app.test.js
✓ Grid System should create an nxn grid correctly (2 ms)
✓ Grid System should validate card placement on grid
…
Test Suites: 1 passed, 1 total
Tests:       N passed, N total
Time:        X.XXX s
```

</details>

---

## Documentation

We generate API docs with **JSDoc**.

* Widely adopted across JS projects.
* Single command: `jsdoc -c jsdoc.json src -d docs`.
* Output automatically uploaded as a workflow artifact and/or deployed to GitHub Pages.

---

## Linting

| Layer          | Tool                        | Why                                                                                                                                                                             |
| -------------- | --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **HTML**       | **HTMLHint**                | Popular, quick setup.                                                                                                                                                           |
| **CSS**        | **Stylelint** (coming soon) | Robust modern CSS linter.                                                                                                                                                       |
| **JavaScript** | **ESLint**                  | Industry standard; strong plugin ecosystem.<br/>Dependencies we use: `@typescript-eslint/parser`, `@typescript-eslint/eslint-plugin`, plus the default naming‑convention rules. |

---

## GitHub Pages Deployment

We deploy two things:

1. **`public/` site** – live playable game.
2. **JSDoc** – API reference (either in `docs/` branch or `/docs` folder).

> GitHub Pages is free for public repos; private repos require a paid plan.

---

## Command‑Line Snapshot

```bash
$ npm test
$ npm run docs
$ npm run lint:js
```
![CI/CD Pipeline Diagram](./phase1.png)


### Summary of Tools

* **Version Control:** Git + GitHub
* **CI/CD:** GitHub Actions
* **Testing:** Jest
* **Linting:** ESLint · HTMLHint · Style‑lint (planned)
* **Documentation:** JSDoc
* **Deployment:** GitHub Pages

