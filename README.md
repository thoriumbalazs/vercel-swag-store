# Next.js Foundations Starter

A Turborepo monorepo starter for the Next.js Foundations certification course.

## Getting Started

```bash
# Install dependencies
pnpm install

# Run both apps in dev mode
pnpm dev

# Type check all packages
pnpm check-types

# Build all packages
pnpm build

# Format and lint
pnpm format
pnpm lint

# Check and fix issues
pnpm check:fix
```

## Project Structure

```
nextjs-foundations-starter/
├── apps/
│   ├── store/                  # Store site (localhost:3000)
├── packages/
│   ├── ui/                     # Shared UI components (shadcn/ui)
├── turbo.json                  # Turborepo configuration
├── biome.jsonc                 # Biome linting/formatting
└── package.json
```

## Apps

- **web** (`apps/store`) - Marketing site running on port 3000

## Packages

- **@repo/ui** - Shared React components

## Tech Stack

- [Next.js 16](https://nextjs.org/) - React framework
- [Turborepo](https://turbo.build/repo) - Monorepo build system
- [pnpm](https://pnpm.io/) - Package manager
- [Biome](https://biomejs.dev/) - Linting and formatting
- [TypeScript](https://www.typescriptlang.org/) - Type safety

## License

MIT
