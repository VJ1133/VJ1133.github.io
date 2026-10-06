# Portfolio website

A static portfolio site: plain HTML, CSS and JavaScript, with no build step.

## Project structure

```
index.html       Page content (search for "EDIT:" to find every placeholder)
css/styles.css   Colors, fonts, layout (theme colors are at the top in :root)
js/main.js       Theme toggle, mobile menu, rotating role text, hero animation
assets/          Images such as the preview card (no resume PDF, the repo is public)
```

## Edit locally in Cursor

1. Unzip this folder and open it in Cursor (File > Open Folder).
2. Install the "Live Server" extension, right-click `index.html` and choose
   "Open with Live Server" to see changes as you save.
3. Search the project for `EDIT:` and replace the placeholders: your name, links,
   email, projects, companies, dates.
4. Keep your resume PDF out of this repo (it is public). The experience section
   shows the job responsibilities instead.

## Host for free on GitHub Pages

1. Create a new public repo on GitHub named `<your-username>.github.io`.
2. In Cursor's terminal, from this folder:

   ```bash
   git init
   git add .
   git commit -m "Initial portfolio"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<your-username>.github.io.git
   git push -u origin main
   ```

3. On GitHub, go to the repo's Settings > Pages. Set Source to "Deploy from a branch",
   branch `main`, folder `/ (root)`, and save.
4. After a minute or two, the site is live at `https://<your-username>.github.io`.

Each time you `git push`, the site updates automatically.

## Optional: custom domain

1. Buy a domain (for example `yourname.dev`) from Namecheap, Cloudflare or Porkbun.
2. In the repo's Settings > Pages, enter the domain under "Custom domain".
3. At your domain registrar, add the DNS records GitHub shows you
   (A records for the root domain, or a CNAME for `www`).
4. Tick "Enforce HTTPS" once it becomes available.
