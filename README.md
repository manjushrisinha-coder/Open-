# OpenShelf

OpenShelf is a lightweight, open-source directory for discovering community-built apps. It is a static website: no account, tracking, server, or build step is required.

## Run locally

Open `index.html` in a browser, or serve this directory with any static file server:

```sh
python3 -m http.server 8000
```

Then visit <http://localhost:8000>.

## Add or update an app

Edit the `apps` array near the top of `app.js`. Include the app name, maintainers, category, a short description, license, supported platforms, icon, color, official source URL, and search tags. Link to the project's authoritative source repository; OpenShelf does not host app downloads.

Categories are generated from the app data. Available icon color classes are `peach`, `gold`, `blue`, `violet`, and `mint`.

## Deploy

This site can be hosted on GitHub Pages or any static web host. For GitHub Pages, select the branch and root directory in the repository's Pages settings.

## Contributing

Issues and pull requests are welcome. Please verify project links, license names, and platform information before submitting a listing. Keep descriptions neutral and clearly identify projects that are no longer maintained.

## License

The OpenShelf website source is licensed under the MIT License. App names, logos, and trademarks belong to their respective owners; each listed project has its own license and terms.
