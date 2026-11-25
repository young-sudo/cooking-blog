# Cooking Blog

A minimalist recipe site built with [Jekyll](https://jekyllrb.com/) and hosted on GitHub Pages.

## Adding a recipe

1. Create a new Markdown file in `_recipes/`. The file name becomes the URL, so `_recipes/tomato-soup.md` is served at `/recipes/tomato-soup/`. Use lowercase letters and hyphens, with no spaces or diacritics.
2. Start the file with a front matter block, then write the recipe in Markdown below it:

   ```markdown
   ---
   title: Tomato Soup
   category: savory
   date: 2026-11-25
   image: /assets/img/recipes/tomato-soup.jpg
   time: 40 min
   servings: 4
   ---
   ## Ingredients
   - 1 kg ripe tomatoes
   - 1 onion

   ## Steps
   1. Chop everything.
   2. Simmer for 30 minutes and blend.
   ```

| Field      | Required | Notes |
|------------|----------|-------|
| `title`    | yes      | Shown on the card and the recipe page. Diacritics (Ż, ó, …) are fine here. |
| `category` | yes      | Must be exactly one of `savory`, `sweet` or `drinks`. |
| `date`     | no       | `YYYY-MM-DD`. Just for your records; it isn't shown or used for sorting. |
| `image`    | no       | Path to the photo. Without one, a placeholder is shown. |
| `time`     | no       | Free text, e.g. `1 h 15 min`. |
| `servings` | no       | A number. |

## Adding photos

1. Put the image in `assets/img/recipes/`, e.g. `assets/img/recipes/tomato-soup.jpg`.
2. Point the recipe's `image:` field at it, starting with `/assets/...` and leaving out `/cooking-blog`. The site adds the prefix for you.

Tips:
- Use **square** photos. The polaroid cards crop to 1:1 and the recipe page crops to 4:3, both from the centre.
- About **1200 × 1200 px** and under ~300 KB is plenty. JPG works best for food photos.
- Use the same name for the photo and the recipe file so they're easy to match.

## Testing locally

You need Ruby and Bundler installed. The first time, install the dependencies:

```bash
bundle install
```

Then start the local server:

```bash
bundle exec jekyll serve --livereload
```

Open **http://localhost:4000/cooking-blog/**. The page reloads automatically when you save a file. You'll need to restart the server after editing `_config.yml`.

## Publishing and setting the website URL

Pushing to `main` publishes the site. One-time setup on GitHub: **Settings → Pages → Build and deployment → Source: Deploy from a branch → Branch: `main`, folder `/ (root)`**.

The address is set by two lines in `_config.yml`:

```yaml
url: "https://young-sudo.github.io"   # the domain, no trailing slash
baseurl: "/cooking-blog"              # the sub-path; "" if the site lives at the domain root
```

Pick the case that matches you:

| You want the site at | Do this |
|---|---|
| `https://young-sudo.github.io/cooking-blog/` (current setup) | Nothing to change. |
| `https://young-sudo.github.io/<other-name>/` | Rename the repo to `<other-name>` on GitHub and set `baseurl: "/<other-name>"`. |
| `https://young-sudo.github.io/` (no sub-path) | Rename the repo to `young-sudo.github.io` and set `baseurl: ""`. |
| Your own domain, e.g. `https://recipes.example.com/` | See the steps below. |

**Using a custom domain:**
1. At your domain registrar, add a DNS record:
   - Subdomain (`recipes.example.com`): a `CNAME` record pointing to `young-sudo.github.io`.
   - Root domain (`example.com`): `A` records pointing to `185.199.108.153`, `185.199.109.153`, `185.199.110.153` and `185.199.111.153`.
2. On GitHub, go to **Settings → Pages → Custom domain**, enter the domain and save. This commits a `CNAME` file to the repo. Once DNS has propagated, tick **Enforce HTTPS**.
3. In `_config.yml`, set `url: "https://recipes.example.com"` and `baseurl: ""`.

Every link in the templates goes through Jekyll's `relative_url` filter, so changing `baseurl` is enough. You don't need to edit any other files.

## Project layout

```
_config.yml           site title, URL, collection settings
_data/categories.yml  category names, colours and shapes
_recipes/             one Markdown file per recipe
_layouts/             page templates (default, category, recipe)
_includes/            header and polaroid card snippets
assets/css/style.css  all styling (colours and font at the top)
assets/js/sort.js     random order on load + A–Z / shuffle toggle on category pages
assets/img/recipes/   recipe photos
```

To change the site title, edit `title:` in `_config.yml`.

## Design brief

The goal is a GitHub Pages website in a minimalistic style: everything geometric, with basic colors and shapes and a plain serif font. The home page has a header with a central title and a horizontal line that divides it from the body. In the body there are color-coded cards for the main categories: savory, sweet, drinks. The cards are white, with a simple geometric accent such as a square. On the category subpages the header stays and the dishes are shown as polaroid-style cards: a white frame, a square-ish picture and the name of the dish. The number of cards per row depends on the window width, and they can be sorted alphabetically. Each card links to its dish's detail page. All cards give a slight "pressing" impression on hover.
