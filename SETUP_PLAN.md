# Repository Setup Plan for AI LLM

This document provides step-by-step instructions for an AI LLM to set up a new repository based on the technology stack outlined in AAT.md. The stack is designed for a React-based SPA with server-state management, schema-driven forms, and modern development tools.

## Prerequisites

Before starting, ensure you have:
- Node.js (version 18 or higher recommended)
- npm or yarn package manager
- Git

## Phase 1: Repository Initialization

### Step 1.1: Create Project Structure
```bash
# Create a new directory for the project
mkdir my-app
cd my-app

# Initialize git repository
git init

# Create initial directory structure
mkdir -p src/{components,pages,hooks,utils,services,types}
mkdir -p public
mkdir -p config
```

### Step 1.2: Initialize Package.json
```bash
npm init -y
```

Update the generated `package.json` with:
```json
{
  "name": "my-app",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "lint": "standard",
    "lint:fix": "standard --fix"
  }
}
```

## Phase 2: Core Application Setup

### Step 2.1: Install Vite Build Tool
```bash
npm install --save-dev vite @vitejs/plugin-react
```

Create `vite.config.js`:
```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true
  },
  build: {
    outDir: 'dist',
    sourcemap: true
  }
})
```

### Step 2.2: Install React
```bash
npm install react react-dom
npm install --save-dev @types/react @types/react-dom
```

Create `src/main.jsx`:
```javascript
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

Create `src/App.jsx`:
```javascript
import React from 'react'

function App() {
  return (
    <div className="App">
      <h1>Welcome to My App</h1>
    </div>
  )
}

export default App
```

Create `index.html` in root:
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>My App</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

### Step 2.3: Install React Router v7
```bash
npm install react-router-dom
```

Update `src/App.jsx` to include routing:
```javascript
import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
```

Create placeholder pages:
- `src/pages/HomePage.jsx`
- `src/pages/AboutPage.jsx`

## Phase 3: Data & Networking

### Step 3.1: Install TanStack Query
```bash
npm install @tanstack/react-query
npm install --save-dev @tanstack/react-query-devtools
```

Create `src/services/queryClient.js`:
```javascript
import { QueryClient } from '@tanstack/react-query'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      cacheTime: 1000 * 60 * 30, // 30 minutes
      retry: 2,
      refetchOnWindowFocus: false,
    },
  },
})
```

Wrap App with QueryClientProvider in `src/main.jsx`:
```javascript
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { queryClient } from './services/queryClient'

// ... in render:
<QueryClientProvider client={queryClient}>
  <App />
  <ReactQueryDevtools initialIsOpen={false} />
</QueryClientProvider>
```

### Step 3.2: Setup WebSocket Support
```bash
npm install socket.io-client
```

Create `src/services/websocket.js`:
```javascript
import { io } from 'socket.io-client'

export const socket = io(import.meta.env.VITE_WS_URL || 'ws://localhost:3001', {
  autoConnect: false,
})

export const connectWebSocket = () => {
  if (!socket.connected) {
    socket.connect()
  }
}

export const disconnectWebSocket = () => {
  if (socket.connected) {
    socket.disconnect()
  }
}
```

Create `src/hooks/useWebSocket.js`:
```javascript
import { useEffect, useState } from 'react'
import { socket } from '../services/websocket'

export const useWebSocket = (event, callback) => {
  useEffect(() => {
    socket.on(event, callback)
    return () => socket.off(event, callback)
  }, [event, callback])
}
```

## Phase 4: Forms & JSON Schema

### Step 4.1: Install react-jsonschema-form
```bash
npm install @rjsf/core @rjsf/validator-ajv8 @rjsf/utils
```

If using MUI (Option A):
```bash
npm install @rjsf/mui
```

Create `src/components/SchemaForm.jsx`:
```javascript
import React from 'react'
import Form from '@rjsf/core'
import validator from '@rjsf/validator-ajv8'

const SchemaForm = ({ schema, uiSchema, formData, onSubmit }) => {
  return (
    <Form
      schema={schema}
      uiSchema={uiSchema}
      formData={formData}
      validator={validator}
      onSubmit={onSubmit}
    />
  )
}

export default SchemaForm
```

### Step 4.2: Create Custom Widgets (Example)
Create `src/components/widgets/CustomTextWidget.jsx`:
```javascript
import React from 'react'

const CustomTextWidget = (props) => {
  return (
    <input
      type="text"
      value={props.value || ''}
      onChange={(e) => props.onChange(e.target.value)}
      placeholder={props.placeholder}
    />
  )
}

export default CustomTextWidget
```

## Phase 5: Rich Text Editor (Tiptap)

### Step 5.1: Install Tiptap
```bash
npm install @tiptap/react @tiptap/starter-kit @tiptap/extension-link @tiptap/extension-underline
```

### Step 5.2: Create Inline Rich Text Component
Create `src/components/InlineRichText.jsx`:
```javascript
import React from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'

import Underline from '@tiptap/extension-underline'

const InlineRichText = ({ content, onChange }) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        // Disable document-style features
        heading: false,
        blockquote: false,
        codeBlock: false,
        horizontalRule: false,
      }),
      Link.configure({
        openOnClick: false,
      }),
      Underline,
    ],
    content: content,
    onUpdate: ({ editor }) => {
      onChange(editor.getJSON())
    },
  })

  return (
    <div className="inline-rich-text">
      <div className="toolbar">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor?.isActive('bold') ? 'active' : ''}
        >
          Bold
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor?.isActive('italic') ? 'active' : ''}
        >
          Italic
        </button>
        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={editor?.isActive('underline') ? 'active' : ''}
        >
          Underline
        </button>
      </div>
      <EditorContent editor={editor} />
    </div>
  )
}

export default InlineRichText
```

## Phase 6: Drag & Drop

### Step 6.1: Install @dnd-kit
```bash
npm install @dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities
```

### Step 6.2: Create Sortable List Component
Create `src/components/SortableList.jsx`:
```javascript
import React from 'react'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'

const SortableList = ({ items, onReorder }) => {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const handleDragEnd = (event) => {
    const { active, over } = event
    if (over && active.id !== over.id) {
      const oldIndex = items.findIndex((item) => item.id === active.id)
      const newIndex = items.findIndex((item) => item.id === over.id)
      onReorder(arrayMove(items, oldIndex, newIndex))
    }
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={items}
        strategy={verticalListSortingStrategy}
      >
        {/* Render sortable items here */}
      </SortableContext>
    </DndContext>
  )
}

export default SortableList
```

## Phase 7: UI Components & Theming

### Install MUI Core
```bash
npm install @mui/material @mui/icons-material @emotion/react @emotion/styled
```

Create `src/theme.js`:
```javascript
import { createTheme } from '@mui/material/styles'

export const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
  cssVariables: true, // Enable CSS variables for per-client reskins
})
```

Wrap App with ThemeProvider in `src/main.jsx`:
```javascript
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { theme } from './theme'

// ... in render:
<ThemeProvider theme={theme}>
  <CssBaseline />
  <App />
</ThemeProvider>
```

## Phase 8: Charts (Future Use)

### Step 8.1: Install Recharts
```bash
npm install recharts
```

Create example chart component in `src/components/ExampleChart.jsx`:
```javascript
import React from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'

const ExampleChart = ({ data }) => {
  return (
    <LineChart width={600} height={300} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="value" stroke="#8884d8" />
    </LineChart>
  )
}

export default ExampleChart
```

## Phase 9: Security Implementation

### Step 9.1: Install DOMPurify
```bash
npm install dompurify
npm install --save-dev @types/dompurify
```

Create `src/utils/sanitize.js`:
```javascript
import DOMPurify from 'dompurify'

export const sanitizeHTML = (dirty) => {
  return DOMPurify.sanitize(dirty, {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a', 'u'],
    ALLOWED_ATTR: ['href', 'target', 'rel'],
  })
}
```

### Step 9.2: Setup Content Security Policy
Create `public/security.txt` or add CSP headers in your server configuration:
```
Content-Security-Policy: 
  default-src 'self'; 
  script-src 'self'; 
  style-src 'self' 'unsafe-inline'; 
  img-src 'self' data: https:; 
  font-src 'self'; 
  connect-src 'self' wss:;
```

### Step 9.3: Ensure JSON Storage Pattern
Create `src/utils/storage.js`:
```javascript
// Always store structured JSON, never raw HTML
export const storeContent = (content) => {
  if (typeof content === 'string') {
    console.warn('String content detected. Convert to structured JSON.')
  }
  return JSON.stringify(content)
}

export const retrieveContent = (jsonString) => {
  try {
    return JSON.parse(jsonString)
  } catch (e) {
    console.error('Invalid JSON content:', e)
    return null
  }
}
```

## Phase 10: Development Tools

### Step 10.1: Install Standard.js for Linting
```bash
npm install --save-dev standard
```

Update `package.json` scripts:
```json
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview",
  "lint": "standard",
  "lint:fix": "standard --fix"
}
```

Standard.js requires no configuration file - it works out of the box with sensible defaults for JavaScript and React.

### Step 10.2: Setup Configuration File
Create `config/app.config.js`:
```javascript
export default {
  apiUrl: 'http://localhost:3001/api',
  wsUrl: 'ws://localhost:3001',
  appName: 'My App',
  features: {
    enableWebSockets: true,
    enableCharts: true,
  },
}
```

Import and use in your app:
```javascript
import config from './config/app.config.js'

// Use config values directly
const apiClient = createApiClient(config.apiUrl)
```

## Phase 11: Verification Steps

### Step 11.1: Verify Installation
Run these commands to verify everything is set up correctly:
```bash
# Install all dependencies
npm install

# Run linting
npm run lint

# Build the project
npm run build

# Start development server
npm run dev
```

### Step 11.2: Create Initial Commit
```bash
git add .
git commit -m "Initial project setup with complete tech stack"
```

### Step 11.3: Test Key Features
1. Navigate to http://localhost:3000
2. Test routing between pages
3. Test a form component with JSON Schema
4. Test the rich text editor
5. Test drag & drop functionality
6. Verify WebSocket connection (if server is running)

## Phase 12: Next Steps

### Recommended Follow-up Tasks
1. Set up authentication (JWT or OAuth2)
2. Implement API service layer with proper error handling
3. Create reusable custom hooks for common patterns
4. Build out component library with Storybook
5. Add E2E testing with Playwright or Cypress
6. Configure deployment pipeline
7. Set up monitoring and error tracking (Sentry, etc.)
8. Implement internationalization (i18n) if needed

## Troubleshooting

### Common Issues

**Issue**: Module not found errors
- **Solution**: Run `npm install` again, delete `node_modules` and reinstall

**Issue**: Vite port already in use
- **Solution**: Change port in `vite.config.js` or kill the process using port 3000

**Issue**: WebSocket connection fails
- **Solution**: Ensure backend server is running and config.wsUrl is correct

## Summary

This plan provides a complete setup for a modern React SPA with:
- ✅ Fast development with Vite
- ✅ Server state management with TanStack Query
- ✅ Schema-driven forms with RJSF
- ✅ Inline rich text with Tiptap
- ✅ Drag & drop with @dnd-kit
- ✅ Professional UI with MUI Core
- ✅ Security with DOMPurify and CSP
- ✅ Code quality with Standard.js
- ✅ Configuration via JavaScript config file

All dependencies are MIT or Apache-2.0 licensed, with no commercial restrictions or open-core traps.
