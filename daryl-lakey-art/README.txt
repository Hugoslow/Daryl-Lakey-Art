================================================
  DARYL LAKEY ART — WEBSITE FILES
================================================

HOW TO UPDATE THE SITE:

1. CHANGE PAINTING DETAILS (titles, prices, sizes, descriptions)
   → Open "paintings.js" in Notepad
   → Edit the text between quote marks
   → Save the file

2. MARK A PAINTING AS SOLD
   → Open "paintings.js" in Notepad
   → Find the painting
   → Change  sold: false  to  sold: true
   → Save the file

3. ADD A NEW PAINTING
   → Drop the painting image into the "images" folder
   → Open "paintings.js" in Notepad
   → Copy one of the existing blocks (from { to },)
   → Paste it at the end (before the final ] )
   → Fill in the new title, price, size, description
   → Set the image path to match your file e.g. "images/new-painting.png"
   → Save the file

4. REMOVE A PAINTING
   → Open "paintings.js" in Notepad
   → Delete the entire block from { to },
   → Save the file

5. UPDATE SITE TEXT (about section, headings, etc.)
   → Open "siteinfo.js" in Notepad
   → Edit the text between quote marks
   → Save the file

6. PUSH CHANGES LIVE
   → Open GitHub Desktop
   → You'll see your changes listed
   → Type a message like "Updated prices" in the commit box
   → Click "Commit to main"
   → Click "Push origin"
   → Wait 1-2 minutes — the site updates automatically


FILES IN THIS FOLDER:
   index.html      — The main website (don't edit unless you know HTML)
   paintings.js    — Painting details (EDIT THIS to manage paintings)
   siteinfo.js     — Site text and info (EDIT THIS to change text)
   server.js       — Web server for Railway (don't edit)
   package.json    — Config for Railway (don't edit)
   images/         — All painting images, logo, and artist photo
