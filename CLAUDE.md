# Project context for Claude Code

## Who this is for
Portfolio website for a data engineer applying to **AI Engineer** roles. Audience: recruiters and hiring managers.

- Official job title is "Data Analyst", but the actual work is data engineering.
- 5 years of experience. Master's in Computer Science.
- Data engineering: ETL/ELT pipelines, Apache Beam, Airflow, Pub/Sub, BigQuery.
- Cloud: AWS, GCP, Azure. Databases: SQL, MySQL, SQL Server (SSMS).
- Analytics: Power BI (Microsoft Certified: Power BI Data Analyst Associate, PL-300), EDA, data analysis.
- ML/AI: machine learning, currently learning and building with RAG, LLMs, agentic AI.
- Tools: GitHub, Jira.
- University project (NOT a published paper), during master's: "Breast Cancer Detection in Screening Mammograms with Deep Learning". Never call it published.

Positioning: "Good AI runs on good data." Present the data engineering background as a strength for AI engineering.

## Tech and conventions
- Plain static site: `index.html`, `css/styles.css`, `js/main.js`. No framework, no build step.
- Hosted on GitHub Pages (see README.md).
- Colors and fonts are CSS variables in `:root` at the top of `styles.css`. Dark theme by default, light theme supported. Keep both working.
- Fonts: Bricolage Grotesque (headings), IBM Plex Sans (body), loaded from Google Fonts.
- Accent color: amber. Keep the look minimal. Don't add a new animation to every section.
- Respect `prefers-reduced-motion`, keep keyboard focus visible, keep it responsive down to mobile.
- Placeholders are marked with `EDIT:` comments in `index.html`.

## Status: what's done
- Hero with name, rotating role text, and an animated data-flow canvas.
- Projects section (3 projects), About, Skills, Experience timeline, Contact, footer.
- Project 01 (the university mammography project) is real content.

## To do
- [x] Replace "Your Name" and "YN" initials everywhere (now Vamshi Jaligama / VJ), including `<title>` and meta description.
- [x] Add real GitHub, LinkedIn and email links (nav, contact section). Rotating role text now uses Data Analyst instead of ML Engineer.
- [x] Projects: 01 mammography (university), 02 COVID-19 papers, 03 RAG (real repo), 04 Uber analysis. All real, all with GitHub links.
- [x] Removed the "Published" badge and paper link; project 01 is a university project.
- [ ] Add `assets/resume.pdf` and point the "Get my resume" button at it.
- [x] Experience timeline filled in (Gandara Center, CMU, ValueMomentum). Optional: add impact numbers for the Gandara Center role.
- [x] Add Python to skills (confirmed by user; in Data engineering group).
- [ ] Optional: add an Open Graph preview image and a custom domain.

## Done (credentials)
- Credential links added in About: PL-300 (Microsoft Learn), Google data courses (skills.google), HackerRank certificate.
