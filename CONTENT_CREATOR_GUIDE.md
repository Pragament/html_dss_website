# Content creator guide: school gallery

Use this guide to add and manage photos and videos on the Delhi Secondary School gallery page, `/gallery.html`, and the featured photo carousel in the homepage top banner. Routine updates can be made in Pages CMS without editing HTML or installing software.

The current CMS editor manages **Gallery** only. For changes to admissions, school contact details, the homepage, or disclosure documents, send the website maintainer the page name, replacement text, and any files to update.

## 1. Fork the repository and open your copy in Pages CMS

Anyone with a GitHub account can propose a change to this public repository. You edit your own fork (a copy under your account), then ask the school maintainer to accept the changes through a pull request. You do not need write access to the school's repository.

The flow is: **Fork → create a branch → edit in Pages CMS → open a pull request → review → merge → publish.**

### First-time setup

1. Sign in to GitHub and open [Pragament/html_dss_website](https://github.com/Pragament/html_dss_website).
2. Select **Fork**, choose your personal account as the owner, and create the fork. Your copy will be named `YOUR-USERNAME/html_dss_website`.
3. In your fork on GitHub, use the branch selector to create a branch from `main`. Give it a short descriptive name, such as `gallery-sports-day-2026`.
4. Go to [Pages CMS](https://app.pagescms.org/) and sign in with the same GitHub account.
5. Install or configure the Pages CMS GitHub App for your personal account and grant it access to **your fork**. The [Pages CMS quick start](https://pagescms.org/docs/quick-start/) explains the connection process.
6. Open `YOUR-USERNAME/html_dss_website` in Pages CMS and select your new branch.
7. Open **Gallery**. The fork already contains `.pages.yml`, so you do not need to create a new CMS configuration.

Before every editing session, check both the repository owner and branch. Upload media and save entries in the same fork and branch. Saving there changes your proposed contribution; it does not update the school website or automatically open a pull request.

You do not need to enable GitHub Pages, connect Netlify, configure a custom domain, or run deployment workflows in your fork. Review checks and any configured PR preview run through the original repository's integrations.

### Before starting another contribution

Open your fork's `main` branch on GitHub and use **Sync fork → Update branch** if it is behind the original repository. Then create a fresh branch from the updated `main`, and select it in Pages CMS. Keep each unrelated update in a separate branch and pull request. If GitHub reports a conflict while syncing, ask the maintainer for help before discarding any changes.

### Editors with direct repository access

School editors who already have write access may use a review branch in `Pragament/html_dss_website` instead of a fork. Saving directly to the original repository's `main` starts live publishing; use a review branch when approval is needed.

## 2. Understand a gallery entry

Each entry contains one photo or one video. An event with five photos needs five entries. Uploading a file to the media library alone does not add it to the gallery: it must be selected in an entry.

| Editor field | What to enter | Example |
| --- | --- | --- |
| **Item name** | A unique, descriptive name that helps you find the entry later. This is not the visible caption. | `Sports day 2026 — relay race` |
| **Media type** | Choose **Photo** for an image or **Video** for a video file. | `Photo` |
| **Photo or video** | Upload a new file or select an existing one. Select a single file matching the media type. | `sports-day-relay-2026.jpg` |
| **Accessible description** | Briefly describe what the media shows for visitors using screen readers. Required for both photos and videos. | `Students passing a baton during a relay race on the school grounds.` |
| **Display order** | A number of zero or greater. Smaller numbers appear first. | `200` |
| **Show in gallery** | Controls whether the entry appears on the gallery page. Independent of homepage featuring. | On |
| **Featured on homepage** | Turn on to show a photo in the homepage banner carousel. Videos are excluded. | Off |
| **Caption (optional)** | Text displayed below the photo or video. Leave it blank for media only. | `Students take part in the annual sports day relay.` |

The original entries use display numbers **10 through 190**, in steps of 10. New entries default to **200**; choose a different number when needed. The existing names such as “School gallery photo 02” are placeholders that you can make more descriptive.

### Feature a photo in the homepage banner

Open a photo entry, turn on **Featured on homepage**, and save on your editing branch. Submit the update through the same pull request process described below. The homepage reads these entries automatically; no HTML change is needed.

| Show in gallery | Featured on homepage | Where a photo appears |
| --- | --- | --- |
| On | Off | Gallery only |
| Off | On | Homepage banner only |
| On | On | Both |
| Off | Off | Neither |

**Display order** also controls the banner slide order, with smaller numbers first. Feature multiple photos to create a rotating carousel. A single featured photo displays without navigation buttons. The existing **Admissions 2026–27 banner** entry starts with homepage featuring on and gallery visibility off.

Banner photos fit inside a fixed 4:5 frame without cropping or stretching. Landscape photos may have empty space above and below; this keeps the banner height stable. The school heading and introductory paragraph stay in place while images change. Captions belong to the gallery cards and are not shown in the banner. Videos cannot be featured in the banner.

To remove a photo from the homepage, turn off **Featured on homepage**. Turning off **Show in gallery** alone does not remove a featured photo from the homepage. If all featured photos are removed, the homepage keeps its text introduction without a carousel.

## 3. Add a photo

1. In **Gallery**, create a new entry.
2. Enter a unique **Item name**, such as `Science exhibition 2026 — working model`.
3. Set **Media type** to **Photo**.
4. In **Photo or video**, upload your image or select one already in the media library. Existing photos may be inside the `new` folder.
5. Fill in **Accessible description** with what is actually visible.
6. Set **Display order** to control its position.
7. Add an optional caption with relevant context, such as the event name or date.
8. Check **Show in gallery**, then save.
9. Follow section 8 to submit your pull request, then section 9 to check the result after it is merged.

The configured picker accepts JPG, JPEG, PNG, GIF, WebP, and AVIF images. Use clear filenames such as `science-exhibition-model-2026.jpg`. Uploads are configured to use safe filenames; let the picker record the final file path.

The gallery displays images in fixed-height cards, so the edges may be cropped in the grid. Visitors can click a photo to open the full image. Choose a photo whose main subject stays clear in the smaller card, and check the result on a phone. Prepare reasonably sized images before uploading so the gallery loads promptly; the CMS configuration does not add automatic image resizing.

## 4. Add a video

Follow the same steps as for a photo, but select **Video** and upload an MP4 or WebM file. MP4 is the suggested starting format; check that the uploaded video plays in your browser.

The entry needs an uploaded video file. A YouTube page URL cannot be used as the media file in this editor. Ask the maintainer if you want an embedded YouTube video instead.

Give the video an accessible description and, if helpful, a short caption explaining the activity. Published videos have playback controls. After publishing, check that the video starts, can be paused, and has the expected sound. An accessible description labels the video; it does not provide subtitles or a transcript. Ask the maintainer if those are needed.

## 5. Write useful descriptions and captions

**Accessible descriptions describe the media itself.** Aim for a short, specific sentence. Avoid filenames or text such as “image1” that does not explain what visitors are looking at.

- Too vague: `School photo`.
- More useful: `Students presenting a model of the solar system in a classroom.`
- Video example: `Students performing a group dance on the school stage.`

**Captions add context below the media.** A caption can name the event, explain the activity, or include a verified date. It need not repeat the accessible description word for word.

Example caption: `Science exhibition: students explain their solar system model to visitors.`

The caption editor supports formatted text. Keep captions short and readable. You can use emphasis or a relevant link, but there is no need to insert the same image again into the caption: the media field already displays it.

## 6. Edit, replace, or reorder an entry

### Edit text

Open the existing entry, update its name, description, or caption, and save. Changing **Item name** does not create a visible heading in the gallery; use **Caption** for text visitors should see.

### Replace a photo or video

1. Open the entry you want to change.
2. Upload the replacement under a new, descriptive filename.
3. Select it in **Photo or video**.
4. Change **Media type** if switching between a photo and video.
5. Update the accessible description and caption to match.
6. Save and check the result in your pull request preview when available; verify the live page after merge.

Using a new filename makes it easier to tell the old and new files apart. Keep the previous file until you have confirmed it is no longer referenced by another entry or page.

### Change the order

Edit **Display order** and save. The gallery sorts from smallest to largest; the item name and filename do not control this order.

| Desired position | Example number |
| --- | --- |
| Before an item numbered 10 | `5` |
| Between items numbered 20 and 30 | `25` |
| After the original last item, numbered 190 | `200` |
| After an item numbered 200 | `210` |

Check the current list before choosing a number. Avoid equal numbers when the order matters. To keep event photos together, assign a sequence such as 200, 210, and 220. There is no need to renumber the entire gallery.

## 7. Hide or delete an entry

**To temporarily hide an entry from the gallery:** turn off **Show in gallery** and save. To also hide a featured photo from the homepage, turn off **Featured on homepage**. To bring it back, turn the setting on and save again.

**To permanently remove an entry:** delete the entry from the Gallery collection. After your pull request is merged and deployed, its card disappears. This does not automatically delete the uploaded photo or video.

Hiding or deleting an entry is not a way to make its uploaded file private. The file can remain accessible at its existing URL. If a file needs to be removed from the website entirely, ask the maintainer to check its other uses and remove it appropriately.

If you delete something accidentally, ask the maintainer to restore the entry from Git history. Include the item name, approximate time of the change, and the relevant filename if known.

## 8. Submit a pull request from your fork

A pull request (PR) asks the maintainer to review your branch and merge it into the original repository. Create it on GitHub after saving your entries and uploads in Pages CMS.

1. Open your fork on GitHub and select the branch you edited.
2. Choose **Contribute → Open pull request** if offered. Alternatively, open the original repository's **Pull requests** tab, select **New pull request**, and choose **compare across forks**.
3. Check the comparison carefully:

   | GitHub comparison setting | Select |
   | --- | --- |
   | **Base repository** — where the update should go | `Pragament/html_dss_website` |
   | **Base branch** | `main` |
   | **Head repository / head fork** — where your edits are saved | `YOUR-USERNAME/html_dss_website` |
   | **Compare branch** | Your editing branch, for example `gallery-sports-day-2026` |

4. Review **Files changed**. Your new or changed `_gallery/*.md` entries and any new files in `assets/images/gallery/` should be included. A new entry referencing a file that exists only on your computer will not work.
5. Enter a descriptive PR title, such as `Add sports day 2026 photos`.
6. In the description, explain which items you added, replaced, hid, or removed and the intended display order. Mention anything the reviewer should confirm.
7. Select **Create pull request**. Share its link with the school maintainer if needed.

Example PR description:

```text
Adds three photos from sports day 2026.

- Places them after the existing gallery entries, in positions 200, 210, and 220.
- Adds accessible descriptions and short captions.
- Includes the three uploaded image files.

Please review the captions and display order before merging.
```

### Review, checks, and preview

The original repository's **Build and deploy website** workflow tests and builds pull requests. GitHub may require a maintainer to approve workflow runs from an external or first-time contributor. If checks are waiting for approval, ask the maintainer to review the request.

If Netlify Deploy Previews are connected and enabled for the original repository, open the preview link on the pull request and visit `/gallery.html`. External contributions may also need approval before Netlify builds them. The GitHub Actions workflow alone does not create a preview website. If no preview appears, ask the maintainer to check the preview integration or provide a local preview.

Check photos, video playback, captions, and ordering. To make a correction, return to Pages CMS, select **the same fork and branch**, edit, and save. The commits update the existing PR; you do not need another PR for each correction. Wait for the latest checks and preview to finish before reviewing again.

The maintainer reviews and merges the PR into `Pragament/html_dss_website:main`. That merge starts the live-site deployment. A successful PR check or preview does not mean the school website has been updated yet.

For GitHub's detailed interface instructions, see [Creating a pull request from a fork](https://docs.github.com/en/pull-requests/how-tos/create-pull-requests/creating-a-pull-request-from-a-fork).

## 9. Confirm an update is live

Saving in Pages CMS records a change in your selected fork and branch. For the contribution flow, first confirm that the PR is merged into the original repository. The live website then updates after its build and deployment finish.

1. Open the repository's [Actions page](https://github.com/Pragament/html_dss_website/actions).
2. Find the **Build and deploy website** run for the merged change on the original repository's `main` branch.
3. Wait for the build and deployment to succeed. A failed or still-running deployment does not confirm that your update is live.
4. Open the school's live gallery at `/gallery.html`, refresh the page, and check your changes.
5. Check the page on a phone as well as a desktop where possible.

Before considering the update complete, check:

- The intended photo or video is present and in the right position.
- The image opens when clicked, or the video plays with its controls.
- The caption reads correctly and any links work.
- Replaced or hidden entries have the expected appearance.

The maintainer must configure GitHub Pages to use **GitHub Actions** as its publishing source. If all edits are saved but no successful deployment appears, ask the maintainer to check this setting and the workflow logs.

## 10. Troubleshooting

| Problem | What to check or do |
| --- | --- |
| The repository does not appear in Pages CMS | Confirm the GitHub account you used and grant the Pages CMS GitHub App access to your fork under that account. |
| There is no Gallery editor | Confirm the repository and branch. That branch must contain the gallery `.pages.yml` configuration. |
| The new upload is in the media library but not on the page | Create or edit a Gallery entry, select the file, enable **Show in gallery**, and save. |
| The item still does not appear | Confirm the PR is merged into the original repository, the entry is visible, and its live deployment succeeded. Changes saved only in your fork are not live. |
| GitHub says there is nothing to compare | Check the base is the original repository, the head is your fork, and the compare branch contains the changes saved in Pages CMS. |
| The PR cannot be merged because of conflicts | Ask the maintainer for help updating the branch; keep your saved work until the conflict is resolved. |
| PR checks or previews await approval | Ask the maintainer to review and approve the external contribution build where appropriate. |
| The order is wrong | Check **Display order**, including entries with the same number. Lower numbers appear first. |
| An image looks cropped | The grid uses fixed-height cards. Open the image to inspect it, and consider a different crop or replacement for the card. |
| A video does not play | Confirm **Media type** is Video, the selected file is MP4 or WebM, and the original file plays locally. Ask the maintainer if it needs conversion. |
| The caption is missing | Confirm you entered text in **Caption**, not only in **Item name** or **Accessible description**. |
| A deleted or replaced file still appears elsewhere | Other entries or pages may use that file. Ask the maintainer to inspect those references. |
| The build fails | Share the Actions run link, entry name, and what changed with the maintainer. A missing media file or invalid entry data may need correction. |
| A PR preview is missing or outdated | Confirm a Netlify preview is configured and that its build completed for the latest pull request commit. |
| A filename already exists when creating an entry | Use a unique item name that distinguishes the event, date, or photo. |

## 11. Optional: edit a Markdown file directly

Use Pages CMS for everyday work. If you are comfortable editing files in GitHub, each gallery entry is stored as an individual `.md` file in [`_gallery/`](_gallery/). The uploaded media lives in [`assets/images/gallery/`](assets/images/gallery/).

Example photo entry, `_gallery/science-exhibition-2026.md`:

```markdown
---
title: "Science exhibition 2026 — solar system"
kind: image
media: /assets/images/gallery/science-exhibition-2026.jpg
alt: "Students presenting a model of the solar system in a classroom."
order: 200
visible: true
featured: false
---
**Science exhibition:** students explain their solar system model to visitors.
```

Example video entry, `_gallery/annual-day-dance-2026.md`:

```markdown
---
title: "Annual day 2026 — group dance"
kind: video
media: /assets/images/gallery/annual-day-dance-2026.mp4
alt: "Students performing a group dance on the school stage."
order: 210
visible: true
featured: false
---
A group performance during the annual day programme.
```

These filenames are examples; upload the matching media files before using them. Preserve the two `---` lines around the entry fields. Text after the second line becomes the caption.

- Keep field names exactly as shown: `title`, `kind`, `media`, `alt`, `order`, `visible`, and the optional `featured` flag.
- Use `image` or `video` for `kind`.
- Use the exact media path, including spelling, capitalization, and extension.
- Write `order` as a number and `visible` and `featured` as `true` or `false`, without quotes. When `featured` is absent, the entry is not featured.
- Quote text containing a colon or other punctuation, as shown in the examples.
- Keep one entry per file directly inside `_gallery/`.

You do not need to change `gallery.html`, maintain an index of entries, or run a build on your computer to contribute through Pages CMS and a pull request. For developer setup and deployment details, see the [README](README.md).
