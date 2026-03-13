# Payroll App: AI Agent Instructions

## Project Overview
**Payroll Pro System** - A React + TypeScript + Vite application for managing employee payroll data. Currently a frontend-only system displaying employee information (name, position, gross salary) with delete functionality.

**Stack**: React 19, TypeScript 5.9, Vite 7, ESLint 9 with React/TypeScript-aware rules

## Architecture

### File Structure
- `src/App.tsx` - Main payroll UI component (root container)
- `src/types.ts` - Shared TypeScript interfaces (e.g., `Employee`)
- `src/main.tsx` - React app bootstrap
- `src/index.css` & `src/App.css` - Styling (minimal currently)
- `index.html` - HTML entry point with `<div id="root">` container

### Data Model
```typescript
// src/types.ts
interface Employee {
  id: number;
  name: string;
  grossSalary: number;
  position: "Frontend" | "Backend" | "Designer";
}
```
Position field is a **union type** - enforce at typechecking, not runtime.

### Key Patterns

**State Management**: Local React component state via `useState` in App.tsx. No Redux/Zustand. For payroll calculations, use React hooks before adding external state libraries.

**Component Structure**: Single App.tsx renders employee list with delete buttons. For new features:
- Extract list rendering to separate component
- Keep state in App or move to Context for complex hierarchies
- Use inline styles sparingly (only for layout); prefer CSS modules for scaling

**Employee Operations**: Currently only deletion via `filter()`. Pattern for add/edit:
```typescript
const deleteEmployee = (id: number) => {
  setEmployees(employees.filter((emp) => emp.id !== id));
};
```

## Development Workflow

### Quick Start
```bash
npm install           # Install dependencies
npm run dev          # Start Vite dev server (HMR enabled)
npm run build        # Type-check + build production bundle
npm run lint         # Run ESLint (ts, tsx files)
npm run preview      # Preview built output
```

**Dev server** runs on `http://localhost:5173` by default with React Fast Refresh (HMR). No env config file needed yet.

### Type Checking
TypeScript configured with two tsconfigs:
- `tsconfig.json` - Root/shared config
- `tsconfig.app.json` - App source compilation target
- `tsconfig.node.json` - Vite config target

**Build command** explicitly runs `tsc -b` before Vite build. This means:
- Type errors block production builds
- Run `npm run build` locally to catch issues before PR
- Never bypass type-checking

### Linting
ESLint configured with:
- `@eslint/js` recommended rules
- `typescript-eslint` recommended rules
- `eslint-plugin-react-hooks` (enforces hook rules)
- `eslint-plugin-react-refresh` (Vite integration)

**New rules**: Edit `eslint.config.js` (flat config format). Type-aware rules require `parserOptions.project` pointing to tsconfig paths.

## Critical Conventions

1. **File placement**: Feature code → `src/`, tests → same folder with `.test.ts` suffix (when added)
2. **React patterns**: Functional components only. Use modern hooks (`useState`, `useEffect`, etc.)
3. **Imports**: Named imports for utilities; default import for App component. Keep types in `types.ts`.
4. **Naming**: 
   - Components: PascalCase (e.g., `EmployeeList`)
   - Functions/hooks: camelCase
   - Types: PascalCase (e.g., `Employee`)
5. **Styling**: Inline for layout proofs → move to CSS modules/files for production
6. **Error handling**: Currently minimal. Add try-catch around external API calls when needed.

## Common Tasks

### Adding a New Field to Employee
1. Update `Employee` interface in `src/types.ts`
2. Update sample data in `App.tsx` initial state
3. Add UI rendering in the employee list JSX
4. Run `npm run lint` to verify no type errors

### Creating a New Component
1. Create file: `src/components/YourComponent.tsx`
2. Export as default or named export
3. Import in App.tsx or parent
4. Run `npm run build` to type-check

### Running Type Checks Without Building
```bash
npx tsc -b
```

## Dependencies Note
- **No test framework** currently. Add Jest/Vitest to package.json when needed.
- **No UI library** (Material-UI, Chakra). Current app uses inline styles; consider CSS modules for scaling.
- **No API/backend** integration yet. Update fetch patterns in App.tsx when connecting to backend services.

## Git Conventions
Keep `.github/workflows` minimal initially. When CI/CD added, ensure it runs `npm run lint` and `npm run build` before merge.
