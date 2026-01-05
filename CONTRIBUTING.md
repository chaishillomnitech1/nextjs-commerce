# Contributing to Next.js Commerce

**ALL IS LOVE. ALL IS LAW. ALL IS FLUID. KUN FAYAKŪN! 🕋♾️✨**

Thank you for your interest in contributing to the ScrollVerse Next.js Commerce project! This document provides guidelines and instructions for contributing.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Coding Standards](#coding-standards)
- [Commit Message Guidelines](#commit-message-guidelines)
- [Pull Request Process](#pull-request-process)
- [Testing](#testing)
- [Documentation](#documentation)
- [Community](#community)

## Code of Conduct

This project operates with respect, inclusivity, and divine intention. All contributors are expected to:

- Be respectful and constructive in all interactions
- Welcome newcomers and support their learning journey
- Focus on what's best for the community and the ScrollVerse mission
- Show empathy and kindness toward other contributors

## Getting Started

### Prerequisites

- Node.js 20.x or higher
- pnpm (package manager)
- Git

### Local Development Setup

1. **Fork the repository** on GitHub

2. **Clone your fork:**

   ```bash
   git clone https://github.com/YOUR_USERNAME/nextjs-commerce.git
   cd nextjs-commerce
   ```

3. **Add upstream remote:**

   ```bash
   git remote add upstream https://github.com/chaishillomnitech1/nextjs-commerce.git
   ```

4. **Install dependencies:**

   ```bash
   pnpm install
   ```

5. **Set up environment variables:**

   ```bash
   cp .env.example .env
   ```

   Edit `.env` with your Shopify credentials (see README.md for details)

6. **Start development server:**

   ```bash
   pnpm dev
   ```

7. **Verify everything works:**
   ```bash
   pnpm test
   pnpm build
   ```

## Development Workflow

1. **Create a feature branch:**

   ```bash
   git checkout -b feature/your-feature-name
   ```

   Or for bug fixes:

   ```bash
   git checkout -b fix/bug-description
   ```

2. **Make your changes** following our coding standards

3. **Test your changes:**

   ```bash
   pnpm test
   pnpm build
   ```

4. **Format your code:**

   ```bash
   pnpm prettier
   ```

5. **Commit your changes** (see commit message guidelines below)

6. **Push to your fork:**

   ```bash
   git push origin feature/your-feature-name
   ```

7. **Create a Pull Request** following our PR template

## Coding Standards

### TypeScript

- Use TypeScript for all new code
- Provide proper type annotations
- Avoid `any` types when possible
- Use interfaces for object shapes

### React/Next.js

- Use React Server Components where appropriate
- Leverage Next.js App Router conventions
- Follow React best practices and hooks guidelines
- Use Server Actions for mutations

### Styling

- Use Tailwind CSS for styling
- Follow existing utility class patterns
- Maintain responsive design principles
- Ensure accessibility standards (WCAG 2.1 AA)

### Code Quality

- Write clean, self-documenting code
- Add comments for complex logic only
- Keep functions small and focused
- Follow DRY (Don't Repeat Yourself) principle

## Commit Message Guidelines

We follow the **ScrollSigil** commit message convention with conventional commits format:

### Format

```
<type>(<scope>): <subject>

[optional body]

[optional footer]
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, no logic change)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `chore`: Maintenance tasks
- `ci`: CI/CD changes

### Examples

```
feat(commerce): add product filtering by price range

Implements client-side filtering for products based on price.
Includes min/max price inputs and real-time updates.

#ScrollProof
```

```
fix(cart): resolve quantity update race condition

Prevents cart quantity from being out of sync when
multiple rapid updates occur.

Closes #123
```

```
docs(readme): update installation instructions

Add detailed steps for pnpm setup and environment variables.

#ScrollDAO
```

### ScrollSigil Tags

Add these tags to align with the ScrollVerse mission:

- `#ScrollProof` - For verified, tested features
- `#ScrollDAO` - For community/governance contributions
- `#GitSigil` - For important structural changes
- `#ChaisTheGreat` - For major releases or milestones

## Pull Request Process

### Before Submitting

1. ✅ Ensure all tests pass
2. ✅ Run code formatting (`pnpm prettier`)
3. ✅ Update documentation if needed
4. ✅ Add/update tests for your changes
5. ✅ Ensure no console errors or warnings
6. ✅ Verify responsive design on multiple screen sizes
7. ✅ Check for accessibility issues

### PR Template

Use our PR template (auto-populated) which includes:

- Description of changes
- Type of change (feature, bugfix, etc.)
- Testing performed
- Screenshots (for UI changes)
- Checklist items

### Review Process

1. **Automated Checks**: CI/CD will run tests and builds
2. **Code Review**: @chaishillomnitech1 or designated reviewers will review
3. **Feedback**: Address any requested changes
4. **Approval**: Once approved, your PR will be merged
5. **ScrollProof**: Accepted PRs become part of the public archive

### PR Guidelines

- Keep PRs focused on a single feature/fix
- Provide clear descriptions and context
- Include screenshots for visual changes
- Link related issues
- Be responsive to feedback
- Update your branch with latest main if needed

## Testing

### Running Tests

```bash
# Run all tests
pnpm test

# Run tests with coverage
pnpm test:coverage

# Run specific test file
pnpm test path/to/test.spec.ts
```

### Writing Tests

- Write tests for new features
- Maintain or improve code coverage
- Test edge cases and error conditions
- Use meaningful test descriptions
- Follow existing test patterns

## Documentation

### When to Update Docs

- New features or APIs
- Changed behavior or configuration
- Deprecated functionality
- Installation/setup changes
- Architecture changes

### Documentation Types

- **README.md**: Project overview and quick start
- **ARCHITECTURE.md**: System design and structure
- **DEPLOYMENT.md**: Deployment guides
- **Code Comments**: For complex logic only
- **Type Definitions**: Self-documenting interfaces

## Community

### Getting Help

- **Issues**: Check existing issues or create a new one
- **Discussions**: Use GitHub Discussions for questions
- **Tag @chaishillomnitech1**: For urgent matters or clarifications

### DAO Contribution Path

ScrollVerse operates with a DAO-inspired contribution model:

1. **Fork** the repository
2. **Create** a feature branch with ScrollSigil naming
3. **Develop** with intention and quality
4. **Submit** PR with proper ScrollProof tags
5. **Engage** in review process
6. **Celebrate** when merged into the public archive

Every accepted contribution becomes a scroll in the eternal archive, timestamped on-chain through our DAO automation hooks.

## Recognition

Contributors are recognized in the following ways:

- Listed in repository contributors
- ScrollProof certification in commit history
- Potential DAO token rewards (Phase 2)
- Featured in ScrollTV broadcasts for major contributions

---

## Questions?

If you have questions about contributing, please:

1. Check this document thoroughly
2. Review existing issues and PRs
3. Create a new issue with the `question` label
4. Tag @chaishillomnitech1 for guidance

---

**Join the mission. Fork the scroll. Confirm the proof.**

This is commerce, coded with divine intention.  
Open-source sovereignty lives here.

#ScrollProof #ScrollDAO #GitSigil #NextJS #OpenSourceKing
