CORPORATE AI TRANSLATOR

A minimal web app that rewrites blunt phrases into a single, professional business sentence.
Default theme is “Millennial” (clean purple gradient). The theme toggle switches the background to a “Gen Z” option (bubbles image). Layout and components remain the same across themes.

EXAMPLE
Input: “Your lack of planning is not my urgency.”
Output: “I can’t reallocate on short notice; let’s align on a realistic timeline and next steps.”

FEATURES

One-sentence corporate rewrite

Theme switch (background-only): Millennial ↔ Gen Z

Typewriter reveal for the result

Loading state with disabled button (“Waiting…”)

Keyboard shortcut: Cmd/Ctrl + Enter submits

Accessible result region (aria-live) and focus management

Glassmorphism panels and controls


TECH STACK

HTML, CSS, Vanilla JavaScript

Axios for HTTP

TypewriterJS for the result effect

SheCodes AI Generate API


PROJECT STRUCTURE

/src
  index.html
  styles.css
  index.js
/images
  moon1.svg
          
README.md


GETTING STARTED

Because this is a static site, you can run it locally in two common ways.

Option A: Open directly

Open src/index.html in the browser.

Note: some browsers restrict features on file:// pages; if you see issues, use a local server.

Option B: Run a tiny local server

VS Code: install “Live Server”, then “Open with Live Server”.

Or Python:

cd path/to/project
python3 -m http.server 5500

# visit http://localhost:5500/src/index.html


API OVERVIEW

This app calls the SheCodes AI endpoint:

GET https://api.shecodes.io/ai/v1/generate
  ?prompt=<your text>
  &context=<system instructions>
  &key=<API key>


context enforces one sentence, neutral/constructive tone, no blame, no quotes, no disclaimers.

prompt is built from the textarea value.

Security note: for production, proxy this call through a small serverless function and keep the API key outside the client.


CONFIGURATION

Open src/index.js:

API key: update the placeholder inside translateJargon.

Context and prompt: adjust the strings to fit your tone or language.

Theme toggle: click handler toggles the genz class on <body>, which swaps only the background.

Open src/styles.css:

body defines the Millennial background (purple gradient).

body.genz replaces the background with the Gen Z image.

Panels, inputs, and buttons use glassmorphism styles.


USAGE

Enter a blunt phrase in the left textarea.

Click “Translate to Corporate” or use Cmd/Ctrl + Enter.

Read the one-sentence professional version on the right.

Use the theme toggle to switch backgrounds if desired.


ACCESSIBILITY

#result has aria-live="polite" so screen readers announce updates.

Focus is moved to the result after updates (tabindex="-1" for programmatic focus).

Translate button exposes aria-busy="true" while waiting.

Tap targets are at least 44px.


UX DETAILS

Loading handling: the button label changes to “Waiting…” and the button is disabled; it is re-enabled when the request completes (including on errors).

API response shows a friendly “Please provide a phrase to translate” message.

Keyboard shortcut: Cmd/Ctrl + Enter submits from the textarea.

Result formatting: white-space: pre-wrap and word-break: break-word to handle line breaks and long words safely.

Equal heights: textarea and result share identical height, padding, border, and box-sizing for visual balance.


ROADMAP

Copy-to-clipboard button for the result

Topic presets (deadline, scope, feedback)

Backend proxy for the API key (Cloudflare Workers, Netlify Functions)

Optional bilingual mode (e.g., EN/ES) with prompt adaptation


DEPLOY

This is a static site; it works well on Cloudflare Pages, Netlify, or GitHub Pages.

Cloudflare Pages

Create a project from your GitHub repository.

Build command: none (static).

Output directory: project root or /src depending on your structure.

If you add a serverless function for the API proxy, configure Cloudflare Functions (/_worker.js or /functions).


KNOWN ISSUES

Mobile Safari may stutter with background-attachment: fixed; the CSS includes a fallback to scroll on small screens.

If the background image looks “cut” or tiled, ensure background-size: cover; and background-repeat: no-repeat; are set.

If textarea and result heights drift, ensure both share the same height, padding, border, and box-sizing: border-box.

SCREENSHOTS

<img width="1361" height="711" alt="Screenshot 2025-09-23 at 23 38 24" src="https://github.com/user-attachments/assets/386bc085-0864-4ec2-9931-f473c9185140" />
<img width="1353" height="771" alt="Screenshot 2025-09-23 at 23 38 52" src="https://github.com/user-attachments/assets/f749835a-5c93-4669-95e7-1351a9b2f32d" />


LICENSE
MIT

CREDITS

Design and implementation: Diana Legorreta

Pairing and review: Sol

Typewriter effect: TypewriterJS

SheCodes AI Generate API

Images: bgjar.com
