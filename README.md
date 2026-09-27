# Delhi Secondary School website

Static website for Delhi Secondary School, Sangareddy. It includes school information, 2026–27 admissions, a gallery, a school inspection video, contact links, and CBSE public disclosure documents.

The site uses plain HTML, CSS, and JavaScript with bundled Bootstrap, jQuery, and UI plugins. Jekyll builds the gallery from one Markdown file per item. The other HTML pages are copied unchanged. There is no application backend.

## Local preview

With Ruby (3.4 recommended) and Bundler installed, run this from the repository root:

```sh
bundle install
bundle exec jekyll serve --host 127.0.0.1 --port 5502
```

Open [the local site](http://127.0.0.1:5502/) or [the gallery](http://127.0.0.1:5502/gallery.html). Stop the server with `Ctrl+C`. Jekyll rebuilds when content changes. A plain file server or Live Server pointed at the source will not render the gallery template; serve the generated `_site/` directory instead.

Internet access is needed for external resources such as the Font Awesome CDN and the embedded YouTube video.

## Project layout

| Path | Purpose |
| --- | --- |
| `index.html` | Homepage, admissions highlights, facilities, and inspection video |
| `about-us.html`, `gallery.html` | School information and Jekyll gallery template |
| `_gallery/*.md` | One Markdown file per gallery photo or video |
| `.pages.yml` | Pages CMS media storage and gallery editor fields |
| `_config.yml`, `Gemfile` | Jekyll collection and local build dependencies |
| `contact-us.html` | Admissions section (`#admissions`), phone, email, and WhatsApp links |
| `mandatory-public-disclosure.html` | Embedded mandatory disclosure PDF and download link |
| `mandatory-public-disclosure-copy.html` | Additional disclosure page with inline information |
| `academic-calendar.html`, `fee-structure.html`, certificate and committee pages | Individual school documents and information |
| `header.html`, `footer.html` | Shared markup reference files; pages also contain their own copies |
| `style.css` | Base template styles |
| `assets/css/dss-modern.css` | School-specific design and responsive overrides |
| `assets/css/`, `assets/fonts/`, `assets/js/` | Supporting styles, fonts, and JavaScript plugins |
| `assets/images/` | Logos, admissions poster, campus photographs, and other images |
| `assets/images/documents/` | Disclosure PDFs and calendar files |
| `CNAME` | Custom-domain value: `dsssangareddy.com` |

## Updating the gallery in Pages CMS

1. Open [Pages CMS](https://app.pagescms.org/), sign in with GitHub, and grant its GitHub App access to `Pragament/html_dss_website` if needed. Follow the [official quick start](https://pagescms.org/docs/quick-start/) for initial account setup.
2. Select this repository and the `main` branch, then open **Gallery**. The repository's `.pages.yml` configures the editor automatically.
3. Create an item or open an existing one. Give it a unique **Item name**, choose **Photo** or **Video**, and upload or select the matching media file. MP4 is recommended for videos.
4. Write an **Accessible description** describing the media. Add a **Caption** if you want visible text below it.
5. Set **Display order**: smaller numbers appear first. Existing items use 10 through 190 in steps of 10, leaving room to insert items between them. Use distinct numbers for a predictable order.
6. Leave **Show in gallery** enabled to display the item, or turn it off to hide it. Save the entry. Once the commit on `main` has deployed through GitHub Pages, check `/gallery.html`.

Each entry is saved as a separate Markdown file in `_gallery/`. Uploads go to `assets/images/gallery/`, alongside the existing media. No HTML edits or manual index updates are needed when adding, editing, hiding, or deleting entries. Hiding an entry only removes it from the gallery; its media URL remains public. Deleting an entry does not delete the uploaded media, which may be used elsewhere.

The migration preserves all 18 existing photos and the video in their original order. Existing entries have neutral item names and descriptions; editors can replace these with specific descriptions of the pictured activities. The formerly commented-out `image9.jpg` stays outside the gallery.

For direct repository edits, create a file such as `_gallery/sports-day.md`:

```markdown
---
title: Sports day
kind: image
media: /assets/images/gallery/sports-day.jpg
alt: Students taking part in a relay race on the school grounds
order: 200
visible: true
---
An optional **caption** about the event.
```

Upload the referenced media file too. Use `kind: video` for a video file. Keep the front matter fields and types shown above; `order` is a number and `visible` is a boolean. The Markdown body becomes the caption. `gallery.html` handles the layout, image lightbox, video controls, and empty-gallery message.

## Updating other content

- Edit the relevant root-level HTML page directly. Navigation, footer, contact details, and admissions copy are duplicated across pages. Keep all affected copies, including `header.html` and `footer.html`, consistent; there is no automatic include or generation step.
- Use `assets/css/dss-modern.css` for school-specific styling. It loads after the base and responsive styles.
- Put replacement images in `assets/images/` and update their references and alternative text. The current admissions poster is `assets/images/admissions/2026.jpeg`.
- Put school documents in `assets/images/documents/`. When changing a filename, update both the embedded document and download link on the corresponding page. The current calendar page uses `Academic_Calendar 2026-2027.pdf`; the older `Academic-Calender-24-25.xlsx` is also retained in the repository.
- When changing admissions years or page content, also review titles, descriptions, Open Graph/Twitter metadata, and structured data where present.
- Contact actions currently use phone, email, and WhatsApp links. The bundled `assets/js/contact.form.js` expects a form submission endpoint, but this repository provides no mail-processing backend.

## Deployment and checks

The workflow in `.github/workflows/pages.yml` tests the gallery and builds the site on pull requests to `main`. Pushes to `main`, including Pages CMS commits, also deploy the generated `_site/` artifact to GitHub Pages after the checks pass. You can run it manually from the Actions tab; only runs on `main` deploy.

One-time setup: in the repository's **Settings → Pages → Build and deployment**, change **Source** from **Deploy from a branch** to **GitHub Actions**. Keep the existing custom domain configured. Commit and push the workflow together with the gallery migration, Jekyll configuration, Gemfile, and lockfile. The workflow uses the built-in GitHub token; no additional deployment secret is required. See [GitHub's custom workflow guide](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).

For another static host, run `bundle exec jekyll build` and publish `_site/`, preserving all generated HTML filenames and asset directories. Do not publish the unprocessed source as the site. Hosting settings and DNS configuration remain outside this repository.

The domain configuration currently differs: `CNAME` contains `dsssangareddy.com`, while page canonical URLs, social metadata, and structured data use `dpsssangareddy.com`. Confirm the intended public domain before aligning those values.

Run `bundle exec ruby tests/gallery_test.rb` to check the gallery build, migration, ordering, visibility, captions, and empty state. Before publishing, preview the changed pages at desktop and mobile widths and check:

- Navigation, mobile menu, admissions anchors, and contact links.
- Images, gallery interactions, and the homepage inspection video.
- Embedded PDFs and their download links, especially after replacing documents.
- Browser console errors and failed asset requests.

A known legacy issue is in `assets/js/script.js`: it reads the `href` of an element with ID `aaa`, which the current homepage does not contain. This can raise a console error; the script also contains a credit-link redirect to `access-denied.html`, a file absent from this repository.
