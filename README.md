# Simple UI Library

A modern, accessible React component library built with TypeScript, Tailwind CSS, and Storybook. Features a comprehensive set of reusable UI components with variant-based styling and full accessibility support.

## ✨ Features

- **🎨 Modern Design System** - Clean, consistent components with variant-based styling
- **♿ Accessibility First** - WCAG compliant components with proper ARIA attributes
- **🔧 TypeScript** - Full type safety and excellent developer experience
- **📚 Storybook Integration** - Interactive component documentation and testing
- **🧪 Testing Ready** - Vitest setup with browser testing capabilities
- **⚡ Performance Optimized** - Tree-shakeable exports and optimized bundle size

## 🚀 Quick Start

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd simple-ui-library

# Install dependencies
yarn install

# Start development server
yarn dev

# Launch Storybook
yarn storybook
```

### Basic Usage

```tsx
import { Button, Input, Dialog, Text } from 'simple-ui-library';

function App() {
  return (
    <div>
      <Text size='2xl' weight='bold'>
        Welcome to Simple UI
      </Text>
      <Input placeholder='Enter your name' />
      <Button variant='primary' size='lg'>
        Get Started
      </Button>
    </div>
  );
}
```

## 📦 Components

### Core Components

- **Button** - Multiple variants (primary, secondary, outline, ghost, destructive, link)
- **Input** - Form inputs of different types
- **Text** - Typography component with size, weight, and emphasis variants
- **Dialog** - Modal dialogs with header, content, and footer sections
- **Dropdown** - Accessible dropdown menus with keyboard navigation
- **Tooltip** - Contextual tooltips with positioning
- **Slider** - Range input component with customizable steps
- **Tabs** - Tab navigation with keyboard support

### Layout Components

- **Box** - Flexible container component
- **Stack** - Vertical layout component
- **Layout** - Page layout utilities

## 🎨 Design System

The library uses a consistent design system built on:

- **Class Variance Authority (CVA)** - Type-safe variant styling
- **Tailwind CSS** - Utility-first CSS framework
- **Tailwind Merge** - Intelligent class merging
- **Custom Color Palette** - Primary, secondary, and semantic colors

### Variant Examples

```tsx
// Button variants
<Button variant="primary">Primary Action</Button>
<Button variant="outline">Secondary Action</Button>
<Button variant="destructive">Delete</Button>

// Text variants
<Text size="sm" emphasis="low">Small text</Text>
<Text size="2xl" weight="bold">Large heading</Text>
```

## 📖 Documentation

### Storybook

Launch the interactive component documentation:

```bash
yarn storybook
```

Visit `http://localhost:6006` to explore all components with live examples and controls.

### Example Components

The library includes real-world examples:

- **LoginForm** - Complete authentication form
- **ProductCard** - E-commerce product display with interactions

## 🧪 Testing

```bash
# Run tests
yarn test

# Run tests with coverage
yarn test:coverage

# Run linting
yarn lint
```

## 🛠️ Development

### Project Structure

```
src/
├── components/          # Core UI components
│   ├── Button/
│   ├── Input/
│   ├── Dialog/
│   └── ...
├── examples/           # Example implementations
├── utils/              # Utility functions and types
└── index.css          # Global styles
```

### Adding New Components

1. Create component directory in `src/components/`
2. Implement component with TypeScript and CVA variants
3. Add Storybook stories
4. Export from `src/components/index.tsx`
5. Write tests

### Scripts

- `yarn dev` - Start development server
- `yarn build` - Build for production
- `yarn storybook` - Launch Storybook
- `yarn build-storybook` - Build Storybook for deployment
- `yarn lint` - Run ESLint
- `yarn preview` - Preview production build

## 🎯 Accessibility

All components follow accessibility best practices:

- Semantic HTML elements
- Proper ARIA attributes
- Keyboard navigation support
- Screen reader compatibility
- Focus management
- Color contrast compliance

## 🔧 Tech Stack

- **React 19** - Latest React with concurrent features
- **TypeScript** - Type safety and developer experience
- **Tailwind CSS 4** - Utility-first styling
- **Vite** - Fast build tool and dev server
- **Storybook 9** - Component documentation and testing
- **Vitest** - Fast unit testing framework
- **Class Variance Authority** - Type-safe variant styling
- **ESLint** - Code linting and formatting

## 📄 License

MIT License - see LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests and stories
5. Submit a pull request

## 📞 Support

For questions and support, please open an issue on GitHub.

---
