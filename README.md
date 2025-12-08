# 📘 FormCraft – Dynamic Form Builder (Nx Monorepo)

FormCraft is a fully interactive **Dynamic Form Builder** built using **React, TypeScript, Material UI, React Hook Form, Zod**, and scaffolded inside an **Nx workspace**.
It allows users to build custom form layouts, publish them as templates, fill forms, edit responses, and manage response data – all stored locally inside the browser.

---

# 🌟 1. SOURCE CODE DOCUMENTATION

## 📂 Project Structure (Nx Workspace)

```
FormBuilder/
├── apps/
│   └── FormBuilder/              # React application
│       ├── public/
│       └── src/
│           ├── app/              # Theme, Router
│           ├── Components/
│           │   ├── form-fill/    # Form fill UI (create/edit/view)
│           │   ├── Layout/       # Header, container layout
│           │   └── Preview/      # Preview renderer
│           ├── context/          # Global FormBuilderContext
│           ├── pages/            # Screens: Builder, Forms, Responses, Fill
│           ├── types/            # Shared TypeScript types
│           └── utils/            # storage.ts, schema-builder, helpers
├── .nx/
├── nx.json
├── package.json
├── tsconfig.base.json
└── README.md
```

## 🧩 Components Overview

### **FormBuilder**

* Adds sections, rows, and fields
* Validates row width (≤ 100%)
* Configures field type, size, required flag, options

### **FieldEditor**

* UI to edit a single row of fields
* Manages label, type, required, size, options
* Smart row-width validation
* Auto-creates new rows if width exceeds allowed limit

### **FormPreview**

* Shows form in preview mode
* Uses Zod schema + React Hook Form validation

### **FormFillView**

* Used for:

  * Create new response (`mode=create`)
  * Edit existing response (`mode=edit`)
  * View submitted response (`mode=view`)
* Maps stored field IDs to UI controls

### **FormLibraryPage**

* Displays all saved templates
* Actions: Edit Layout/ Delete Layout / Fill / View Responses

### **FormResponsesPage**

* Shows all responses belonging to a template
* Supports edit, delete, view mode
* Pretty mapping label → value

### **Layout**

* Shared navigation bar
* Ensures consistent UI across all pages

---

# 🧾 TypeScript Type Definitions

### `FormConfig`

```ts
export interface FormConfig {
  formLabel: string;
  sections: FormSection[];
}
```

### `FormSection`

```ts
export interface FormSection {
  id: string;
  label: string;
  rows: FieldConfig[][];
}
```

### `FieldConfig`

```ts
export interface FieldConfig {
  id: string;
  label: string;
  type: 'text' | 'number' | 'email' | 'date' | 'select';
  size: 'sm' | 'md' | 'lg' | 'xl';
  required: boolean;
  options?: string[];
}
```

### Storage Types

```ts
export type FormTemplate = {
  id: string;
  title: string;
  config: FormConfig;
  createdAt: string;
  updatedAt: string;
};

export type FormResponse = {
  responseId: string;
  data: Record<string, any>;
  createdAt: string;
  updatedAt: string;
  pretty: Record<string, any>;
};
```

---

# 🧠 2. TECHNICAL DOCUMENTATION

## 🏛 Architecture Overview

This application follows a **component-driven architecture** inside an **Nx monorepo**:

* **Nx Workspace** organizes code into modular folders
* **React Context** manages form builder state
* **LocalStorage utilities** store templates & responses
* **React Hook Form + Zod** handle validation and form interaction
* **Material UI** provides consistent UI components

---

## 🗂 Component Hierarchy Diagram

```
Layout
 └── Router
      ├── BuilderPage
      │     ├── FormBuilder
      │     │      └── SectionEditor
      │     │             └── FieldEditor
      │     └── FormPreview
      ├── FormLibraryPage
      ├── FormFillPage
      │      └── FormFillView
      └── FormResponsesPage
```

---

## 🧭 State Management Approach

### 🔹 Global State (Form Builder Only)

* Stored in `FormBuilderContext`
* Manages current form layout while building/editing
* Allows deep updates for sections, rows, fields

### 🔹 Response State

* Managed locally inside `FormFillPage`
* Uses React Hook Form’s state management
* Fills form automatically for **edit** mode

### 🔹 Persistence

* Templates stored in `localStorage['published-forms']`
* Responses stored in `localStorage['form-responses']`

---

## 🚀 Performance Strategies

* **Pure functions** for layout updates (clone → mutate → update)
* **Minimal rerenders** using context only where needed
* **Lazy components** where possible (collapse fields/options)
* **UUIDs** prevent key mismatch issues
* **Schema validation** offloaded to Zod for speed

---

# 📘 3. DEVELOPMENT REPORT

## ✔ Implementation Approach

The project was built using a **bottom-up approach**:

1. Created base Nx workspace and React app
2. Implemented FormBuilder with section → row → field structure
3. Added validation for:

   * width overflow
   * required fields
   * at least one row per section
4. Integrated React Hook Form + Zod
5. Implemented save-to-localStorage for templates
6. Built Form Fill workflow
7. Added Response Management + pretty label view
8. Added global layout + improved UI/UX + responsiveness

---

## ⚠ Technical Challenges & Solutions

### **1. Row width calculation**

* Problem: multiple fields could exceed 100%
* Solution: custom utility `getRowWidth()` + revert mechanism

### **2. Dynamic select options**

* Problem: options UI expanded too much
* Solution: collapsible + compact mode

### **3. Editing existing response**

* Problem: ensuring values map back correctly
* Solution: RHF `defaultValues` + consistent field IDs

### **4. Displaying readable response data**

* Problem: stored keys were field IDs
* Solution: introduced `pretty` mapping `{ label: value }`

### **5. Navigation structure**

* Problem: multiple AppBars and repeated states
* Solution: Introduced a shared `Layout` wrapper

---

## 📌 Assumptions

* No backend is required (localStorage is sufficient)
* No authentication layer
* UUID-based IDs are acceptable for template and response tracking
* User is expected to use the builder before filling forms

---

## 🔮 Future Enhancements

* Form drag-and-drop builder
* Template sharing (export/import JSON)
* Versioning of form templates
* Multi-step wizard support
* Backend integration (database/API)
* User authentication for multi-user environments

---

# ▶️ Running the Project

### Install Dependencies

```sh
npm install
```

### Start the FormBuilder App

```sh
nx serve FormBuilder
```

or

```sh
npx nx serve FormBuilder
```

---


