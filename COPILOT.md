# COPILOT Project Context - SAFE AI [4U]

## Project Overview

**SAFE AI [4U]** is a professional website for an AI company focused on responsible and ethical artificial intelligence solutions. The company's mission is to create AI that serves humanity responsibly across healthcare, education, and society.

### Company Mission

- Provide safe, responsible AI solutions for everyone
- Focus on ethical AI development and implementation
- Serve healthcare, education, and societal needs
- Led by David Belo (Founder & CEO) with 15+ years in AI research

## Technical Stack

### Core Technologies

- **Framework**: Next.js 15.3.4 with TypeScript
- **Styling**: Tailwind CSS v4 with @theme inline directive
- **UI Components**: shadcn/ui (Radix UI primitives)
- **Animations**: Framer Motion 12.19.2
- **Forms**: React Hook Form with Zod validation
- **Color System**: OKLCH color space for consistent theming
- **Package Manager**: npm

### Key Dependencies

```json
{
  "next": "15.3.4",
  "react": "^19.0.0",
  "framer-motion": "^12.19.2",
  "tailwindcss": "^4",
  "tw-animate-css": "^1.3.4"
}
```

## Architecture & File Structure

```
src/
├── app/
│   ├── globals.css          # Main theming system (cyberpunk colors)
│   ├── layout.tsx           # Root layout with navigation
│   ├── page.tsx             # Home page
│   ├── about/page.tsx       # About page with team info
│   ├── contact/page.tsx     # Contact form page
│   ├── projects/page.tsx    # Projects showcase
│   ├── services/page.tsx    # Services overview
│   └── workshops/page.tsx   # Educational workshops
├── components/
│   ├── animations/          # Framer Motion animation components
│   ├── navigation/          # Navigation components
│   ├── ui/                  # shadcn/ui components
│   ├── CallToAction.tsx     # Reusable CTA component
│   ├── Hero.tsx             # Hero section component
│   ├── ThemeToggle.tsx      # Light/dark mode toggle
│   └── [other components]
└── lib/
    └── utils.ts             # Utility functions
```

## Theming System (Cyberpunk)

### Current Theme Implementation

The project uses a **cyberpunk aesthetic** with the following characteristics:

- **Color Palette**: Cyan, blue, and purple dominance
- **Technology**: OKLCH color space for perceptual consistency
- **Modes**: Light and dark variants with strong contrast
- **Effects**: Neon glows, animated borders, holographic text

### Key Color Variables (Dark Mode)

```css
--background: oklch(0.02 0.02 240); /* Nearly black */
--foreground: oklch(0.98 0.15 180); /* Bright cyan-white */
--primary: oklch(0.85 0.35 180); /* Intense cyan */
--accent: oklch(0.25 0.15 290); /* Dark purple */
--accent-foreground: oklch(0.85 0.3 290); /* Bright purple */
--input: oklch(0.18 0.1 240); /* Brightened for button visibility */
```

### Key Color Variables (Light Mode)

```css
--background: oklch(0.96 0.02 220); /* Very light blue-gray */
--foreground: oklch(0.12 0.05 220); /* Dark blue-gray */
--primary: oklch(0.55 0.25 180); /* Bright cyan */
--accent: oklch(0.88 0.08 290); /* Light purple */
```

### Recent Color Fixes

- **Button Readability**: Increased `--input` brightness in dark mode from `oklch(0.08 0.05 240)` to `oklch(0.18 0.1 240)` for better visibility when used with opacity
- **Navigation Hover**: Changed accent colors from orange to purple for consistency
- **Primary Foreground**: Fixed dark mode primary-foreground for better contrast

## Animation System

### Animation Components

Located in `src/components/animations/`:

1. **FadeInUp**: Smooth fade-in with upward motion
2. **StaggerContainer**: Container for staggered child animations
3. **FloatingCard**: Floating hover effect for cards
4. **AnimatedCounter**: Number counting animations

### Animation Implementation Pattern

```tsx
// Typical page structure with animations
<StaggerContainer>
  <FadeInUp>
    <div>Content that fades in</div>
  </FadeInUp>

  <div className="grid gap-8 md:grid-cols-2">
    <FloatingCard delay={0.1}>
      <Card>First card</Card>
    </FloatingCard>
    <FloatingCard delay={0.2}>
      <Card>Second card</Card>
    </FloatingCard>
  </div>
</StaggerContainer>
```

### Animation Status

✅ **Completed**: All pages (home, services, projects, workshops, about, contact) have consistent animation implementations

## Component Patterns

### shadcn/ui Usage

- **Consistent**: All UI components use shadcn/ui patterns
- **Customized**: Components are themed with cyberpunk colors
- **Accessible**: Maintains accessibility features from Radix UI

### Common Component Issues & Solutions

#### Avatar Component

**Correct Usage**:

```tsx
<Avatar className="h-24 w-24 mx-auto">
  <AvatarImage src="image-url" alt="Alt text" />
  <AvatarFallback>FB</AvatarFallback>
</Avatar>
```

**Incorrect** (was fixed):

```tsx
<AvatarImage>
  <Image src="..." alt="..." />
</AvatarImage>
```

## Development Guidelines

### Styling Approach

1. **Use Tailwind Classes**: Leverage Tailwind CSS for styling
2. **CSS Custom Properties**: Use for theming variables
3. **OKLCH Colors**: Maintain color consistency with OKLCH space
4. **Responsive Design**: Mobile-first approach

### Animation Guidelines

1. **Performance**: Use Framer Motion efficiently
2. **Accessibility**: Respect user motion preferences
3. **Consistency**: Use established animation components
4. **Timing**: Stagger animations with appropriate delays

### Component Development

1. **TypeScript**: Full type safety
2. **Accessibility**: Maintain ARIA standards
3. **Reusability**: Create reusable, composable components
4. **Documentation**: Clear prop interfaces

## Recent Implementation History

### Completed Features

1. **Animation System** (✅ Complete)

   - Added animations to all remaining pages
   - Consistent FadeInUp, StaggerContainer, and FloatingCard usage
   - Smooth page transitions and interactive elements

2. **Cyberpunk Theme** (✅ Complete)

   - Complete visual transformation from default to cyberpunk
   - OKLCH color system implementation
   - Light/dark mode variants with strong contrast
   - Custom CSS effects (neon glows, animated borders)

3. **UI/UX Improvements** (✅ Complete)

   - Fixed button readability issues in dark mode
   - Improved navigation hover states
   - Enhanced color contrast for accessibility

4. **ThemeToggle Implementation** (✅ Complete)
   - Light/dark mode switching
   - localStorage persistence
   - Integrated into navigation

### Current Status

- **Build Status**: ✅ Clean builds
- **Lint Status**: ✅ No linting errors
- **Theme Status**: ✅ Cyberpunk theme fully implemented
- **Animation Status**: ✅ All pages animated
- **Accessibility**: ✅ Maintained throughout implementation

## Content Structure

### Pages Overview

1. **Home** (`/`): Hero, services preview, testimonials, CTA
2. **About** (`/about`): Mission, team (David Belo), approach, partnerships
3. **Services** (`/services`): AI consulting, development, education
4. **Projects** (`/projects`): Case studies and implementations
5. **Workshops** (`/workshops`): Educational programs and training
6. **Contact** (`/contact`): Contact form and information

### Key Content Elements

- **Hero Sections**: Consistent across pages with badgeText, title, description
- **Call-to-Action**: Standardized CTA component usage
- **Cards**: Extensive use of Card components for content organization
- **Forms**: Contact form with React Hook Form and Zod validation

## Troubleshooting Notes

### Common Issues & Solutions

1. **Button Visibility in Dark Mode**

   - **Issue**: Buttons using `dark:bg-input/30` were barely visible
   - **Solution**: Increased `--input` brightness in dark mode

2. **Avatar Image Display**

   - **Issue**: Nesting Next.js Image inside AvatarImage
   - **Solution**: Pass src and alt directly to AvatarImage

3. **Theme Consistency**

   - **Issue**: Color inconsistencies across components
   - **Solution**: Centralized color system in globals.css

4. **Animation Performance**
   - **Consideration**: Monitor for performance with complex animations
   - **Solution**: Use efficient Framer Motion patterns

## Development Commands

```bash
# Development server
npm run dev

# Build for production
npm run build

# Linting
npm run lint

# Start production server
npm start
```

## Next Steps & Considerations

### Potential Enhancements

1. **Performance Optimization**: Image optimization, code splitting
2. **SEO Enhancement**: Advanced meta tags, structured data
3. **Content Management**: Consider headless CMS integration
4. **Analytics**: User interaction tracking
5. **Internationalization**: Multi-language support

### Maintenance Notes

- **Regular Updates**: Keep dependencies current
- **Color Accessibility**: Periodically check contrast ratios
- **Animation Performance**: Monitor on lower-end devices
- **Content Updates**: Regularly update project showcases

## Contact & Business Context

**Company**: SAFE AI [4U]  
**Website**: safe-ai-4u.eu  
**Founder**: David Belo (LinkedIn: djdasilva)  
**Focus**: Responsible AI solutions for healthcare, education, and society  
**Quote**: "We should stop playing with AI and use it with conscience."

---

_This document serves as comprehensive context for GitHub Copilot conversations about the SAFE AI [4U] project. It should be referenced at the start of new conversations to maintain project context and implementation consistency._
