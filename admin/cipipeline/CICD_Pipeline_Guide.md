# CI/CD Pipeline Guide

This document provides an overview of our Continuous Integration and Continuous Deployment (CI/CD) pipeline, including the tools chosen and their justifications.

## Overview

Our pipeline is designed to automate testing, linting, and deployment processes to ensure code quality and streamline development.

### Key Stages:

1.  **Code Push**: Developers push code to feature branches on GitHub.
2.  **Pull Request**: A pull request is created to merge changes into the `main` branch.
3.  **Automated Checks (GitHub Actions)**:
    *   **Unit Tests**: Jest tests are automatically run.
        *   *Example Command Line Output for Tests:*
            ```
            PASS  tests/app.test.js
            ✓ Grid System should create an nxn grid correctly (2ms)
            ✓ Grid System should validate card placement on grid
            ...
            Test Suites: 1 passed, 1 total
            Tests:       N passed, N total
            Snapshots:   0 total
            Time:        X.XXXs
            Ran all test suites.
            ```
    *   **Linting**: ESLint, HTMLHint, and Stylelint (planned) check code for style and errors.
    *   **Build**: The project is built (if applicable).
4.  **Manual Review**:
    *   Peer reviews are conducted.
    *   Manual play-testing is performed.
5.  **Merge to Main**: If all checks pass and reviews are positive, the code is merged into the `main` branch.
6.  **Deployment**: Code from the `main` branch is automatically deployed to GitHub Pages.
7.  **Documentation**: JSDoc is used to generate documentation.

## Tool Choices and Justifications

### Unit tests:

We will use *Jest* for our testing framework.
*   **Reasoning**: It is the tool taught in class, providing familiarity. It is also a simple and widely used framework, aligning with practical development approaches.

### Documentation:

We will use **JSDoc**.
*   **Reasoning**: It's one of the most commonly used documentation generators for JavaScript. Its format is shared across many languages, making it familiar to a wider audience.

### Linting:

#### HTML:
We will use **HTMLHint**.
*   **Reasoning**: It is a popular HTML linter with good documentation and an easy setup process.

#### CSS:
We will use **stylelint** (planned).
*   **Reasoning**: It appears to be a robust option among available CSS linters. Given that CSS styling might not have extensive variance, configuration is expected to be straightforward.

#### JavaScript:
We will use **ESLint**.
*   **Reasoning**: It is the most popular JavaScript linter, boasting extensive documentation and community support. It's easy to set up for both local development and as a GitHub Action.
*   **Dependencies**: This requires ESLint plugins like `@typescript-eslint/eslint-plugin` (for potential TypeScript use or advanced JS features) and `@typescript-eslint/parser`. These are stable and frequently used.

### GitHub Pages Deployment:

We aim to deploy our project to GitHub Pages.
*   **Goal**: To have a live demonstration of our changes on the web with every push or merge to the main branch.
*   **Considerations**: While this is known to be possible (e.g., as seen in the JFlap repository), we need to confirm if there are any limitations or payment requirements for our specific use case or repository type.

## Command Line Interactions

Here's an example of what typical command line interactions might look like during the testing phase. *(Placeholder for a command line image)*

```
// Example:
$ npm test

> project@1.0.0 test /path/to/project
> jest

PASS  tests/app.test.js
  Grid System
    ✓ should create an nxn grid correctly (2ms)
    ✓ should validate card placement on grid (1ms)
  ...

Test Suites: X passed, X total
Tests:       Y passed, Y total
Snapshots:   0 total
Time:        Z.ZZZs
Ran all test suites.
```

*(If you have a specific command line screenshot, you can embed it here using Markdown: ![Description](path/to/image.png))*

## Summary of Tools Used

*   **Version Control**: Git, GitHub
*   **CI/CD**: GitHub Actions
*   **Testing**: Jest
*   **Linting**:
    *   JavaScript: ESLint
    *   HTML: HTMLHint
    *   CSS: Stylelint (planned)
*   **Documentation**: JSDoc (planned)
*   **Deployment**: GitHub Pages (planned)

---

*This guide will be updated as the pipeline evolves and decisions are finalized.*