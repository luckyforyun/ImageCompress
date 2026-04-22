# Image Tools: Image Compression & Format Conversion

We will build a high-quality, fully client-side web application for image compression and format conversion. It will process all images entirely within the browser for privacy and speed. 

## Proposed Architecture

Since the task focuses on a utility with distinct features, we will build a lightweight but highly polished Vanilla HTML, CSS, and JS web app. No build steps (like Vite or Webpack) will be required, minimizing unnecessary complexity while maintaining peak performance. All code will live in the `d:\BaiduNetdiskDownload\Project\Imagetools` directory.

### Core Technologies
1. **HTML5**: For structure and semantic tags.
2. **Vanilla JS**: Native `Canvas API` and `FileReader` to encode, compress, and output images (JPEG, PNG, WEBP) natively in the browser without any backend required.
3. **Vanilla CSS**: Curated animations, glassmorphism design, responsive layouts, and theming (dark mode default with vibrant highlights). We won't use Tailwind to maintain maximum customizability and follow our strict web styling guidelines.

## Implementation Details

### 1. UI & Aesthetics
- **Premium Design Layout**: A modern, vibrant, user-friendly interface. Deep dark mode with smooth gradients and glass-like UI panels. Micro-animations on buttons and drop lines to make navigation dynamic. 
- **Typography**: Utilization of premium Google Fonts like *Inter*.

### 2. Multi-language Support (i18n)
- A simple client-side localization system (`i18n.js`).
- State will be tied to `localStorage` so the user's preferred language persists.
- Languages supported:
  - English (EN)
  - Simplified Chinese (ZH)
  - Japanese (JA)
  - Korean (KO)
  - Spanish (ES)

### 3. File Processing (Client-Side)
- **Drag & Drop Area**: Users can drop files or click to open the file dialog.
- **Conversion Settings**:
  - Format selection dropdown: JPEG, PNG, WEBP.
  - Quality slider (for JPEG and WEBP, visible when applicable).
- **Preview & Download**:
  - Show original size vs estimated compressed size.
  - "Download" action.
  - Use `canvas.toBlob` and `URL.createObjectURL` to trigger downloads.

## Proposed Changes

### UI & Styling Assets
#### [NEW] `index.html` (Main Application Structure)
#### [NEW] `style.css` (Premium CSS and animations)

### Logic Details
#### [NEW] `script.js` (Image loading, Canvas manipulation, drag-and-drop mechanics)
#### [NEW] `i18n.js` (Dictionary map and translate functions for UI components)

## Verification Plan
1. **Automated / Manual Testing**:
   - We will use the built-in browser automation via the browser subagent to upload images.
   - Adjust the slider, and verify the resulting downloaded file reduces in size.
   - Switch between all 5 languages to ensure the UI updates seamlessly.
2. **Browsing Test**:
   - The user can simply double-click `index.html` to open it in Chrome / Edge / Firefox and verify all functionalities.
