# Advanced Editable Data Table

A high-performance, editable data table built with React, Vite, and TypeScript. Designed to handle large datasets seamlessly with a stunning modern glassmorphism UI.

## Features

- **Inline Editing**: Edit text, numeric fields, and dropdowns directly within the table cells.
- **Action Controls**: Save or cancel row edits. Includes an **Undo** feature to revert a row back to its last saved state.
- **Virtual Scrolling**: Easily handles 10,000+ rows without performance degradation, powered by `react-window`.
- **Advanced Filtering & Sorting**: Global text search, dropdown filtering (Status, Department), and single-column togglable sorting.
- **Export to CSV**: Download your current view (respecting active filters and sorting) to a CSV file.
- **Unsaved Changes Tracker**: Global tracker that prompts the user if they try to leave the page with unsaved edits.
- **State Management**: Built entirely with React Context API (`TableContext`) for a clean, dependency-light state architecture.
- **Premium UI**: Custom CSS utilizing glassmorphism, modern typography (Inter & JetBrains Mono), and fluid hover interactions.

## Setup Instructions

1. **Install Dependencies**
   Make sure you have Node.js installed. Navigate to the project directory and run:
   ```bash
   npm install
   ```

2. **Run the Development Server**
   Start the local Vite dev server:
   ```bash
   npm run dev
   ```

3. **Build for Production**
   To create an optimized production build:
   ```bash
   npm run build
   ```

## Approach and Decisions

1. **Virtualization over Pagination**: Given the requirement to handle 10,000+ rows efficiently, I opted for virtual scrolling (`react-window`) over pagination. It provides a smoother and more modern UX for massive datasets by only rendering the rows visible in the viewport.
2. **Context API for State**: I used React's Context API to manage the global state (data, filters, sort configs, edit drafts, and history). This avoids prop drilling without introducing the overhead of a large library like Redux.
3. **Draft-based Editing**: Row edits are stored in a separate `editedRows` draft state dictionary. This ensures the main data array isn't mutated until the user explicitly hits "Save". It also allows us to easily track the global "Unsaved Changes" state.
4. **Custom CSS Architecture**: Instead of relying heavily on a component library like Material-UI, I built a custom, lightweight CSS architecture. It allowed me to perfectly achieve the requested modern, rich glassmorphism aesthetics without the bloat of an external UI framework.

## Known Limitations

- **Horizontal Scrolling**: The table currently uses fixed-width columns that fit nicely on desktop screens. On very small mobile screens, the table might require horizontal scrolling.
- **Multi-Column Sorting**: The sorting implementation currently supports sorting by a single column at a time (toggling between ascending, descending, and null). Full multi-column sorting (e.g., sort by Department, then by Name) would require an expanded UI for prioritization.
- **Persistence**: Data is generated randomly on mount (10,000 rows). Reloading the page will regenerate the dataset and wipe out any edits.

## Technologies Used

- React 19
- TypeScript
- Vite
- react-window (Virtualization)
- lucide-react (Icons)
- Framer Motion (Micro-animations)
