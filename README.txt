SHAHEEN TV PROFILE: MODULAR FILE STRUCTURE

Files:
- index.html: Main page shell and section placeholders
- css/style.css: All page styling and responsive design
- js/script.js: Sidebar, theme toggle, particle effects, section loading, More About toggle
- sections/profile.html: Avatar, name, title and bio
- sections/personal-info.html: Personal information cards
- sections/social-links.html: Social media links
- sections/websites.html: Website links, used in sidebar and quick-link area
- sections/about.html: Expandable More About content

HOW TO RUN:
1. Upload the complete folder contents to the same hosting directory.
2. Keep the folder names and paths unchanged.
3. Open index.html through a web server/hosting URL. Do not double-click index.html as a local file because fetch() loads the separate section files.
4. Edit the content in the relevant sections/*.html file.
5. Edit styles only in css/style.css and behavior only in js/script.js.

IMPORTANT PRIVACY / SECURITY:
- HTML, CSS, images, and JavaScript sent to a browser are public and can be inspected or downloaded.
- Splitting files does not encrypt them or make them private.
- Do not place passwords, private API keys, database credentials, or confidential personal data in these files.
- For truly private information, use server-side code and access control (for example PHP sessions and a database), and return only the fields the visitor is allowed to see.
- Client-side source code cannot be hidden just by naming files differently or minifying them.
- The original counter animation was configured with target 0, so this version leaves the displayed stats unchanged rather than animating them to incorrect values.
