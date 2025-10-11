This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement". Don't forget to give the project a star! Thanks again!

### Contribution Workflow

1. **Fork the Project**
2. **Create your Branch** (see branch naming conventions below)
3. **Commit your Changes** (follow conventional commits)
4. **Push to the Branch**
5. **Open a Pull Request** from your branch to `dev` branch
   - Include a summary of the changes you made
   - Include screenshots or GIFs if applicable
   - Include relevant links to issues or documentation
   - Assign to yourself
   - Request a review from the project maintainer(s)

### Branch Naming Conventions

Please use the following naming convention for branches:

| Prefix   | Use Case         | Example                         |
| :------- | :--------------- | :------------------------------ |
| task     | General tasks    | `task-update-dependencies`      |
| feature  | New features     | `feature-dark-mode-toggle`      |
| fix      | Bug fixes        | `fix-navigation-overflow`       |
| docs     | Documentation    | `docs-update-api-reference`     |
| refactor | Code refactoring | `refactor-service-architecture` |
| test     | Tests            | `test-add-component-tests`      |
| chore    | Maintenance      | `chore-update-eslint-config`    |

**Examples:**

```bash
git checkout -b task-my-awesome-task
git checkout -b feature-my-amazing-feature
git checkout -b fix-my-awesome-fix
```

### Commit Message Format

Follow the Conventional Commits rules:

- [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)
- [Conventional Commits Cheat Sheet](https://kapeli.com/cheat_sheets/Conventional_Commits.docset/Contents/Resources/Documents/index)

| Type     | Emoji | Code                    | Description              |
| :------- | :---- | :---------------------- | :----------------------- |
| feat     | ✨    | `:sparkles:`            | New feature              |
| fix      | 🐛    | `:bug:`                 | Bug fix                  |
| docs     | 📚    | `:books:`               | Documentation            |
| style    | 💎    | `:gem:`                 | Code style changes       |
| refactor | 🔨    | `:hammer:`              | Code refactoring         |
| perf     | 🚀    | `:rocket:`              | Performance improvements |
| test     | 🚨    | `:rotating_light:`      | Tests                    |
| build    | 📦    | `:package:`             | Build system changes     |
| ci       | 👷    | `:construction_worker:` | CI/CD changes            |
| chore    | 🔧    | `:wrench:`              | Other changes            |
| revert   | ⏪    | `:rewind:`              | Revert previous commit   |

**Commit Format:**

```bash
<type>[optional scope]: <emoji> <description>

[optional body]

[optional footer(s)]
```

**Examples:**

```bash
git commit -m "feat: ✨ add dark mode toggle"
git commit -m "fix: 🐛 resolve navigation menu overflow"
git commit -m "docs: 📚 update contributing guidelines"
```

**Breaking Changes:**

```bash
feat!: drop legacy auth

BREAKING CHANGE: removes basic auth in favor of OAuth2
```
