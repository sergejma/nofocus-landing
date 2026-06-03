# Landing Page deployen — nofoc.us

Die fertige Seite liegt in `docs/` (`index.html`, `CNAME`, `icon128.png`, `.nojekyll`).
GitHub Pages serviert diesen Ordner direkt.

## 1. Repo zu GitHub pushen

Das Projekt ist noch kein Git-Repo. Einmalig:

```bash
cd /Users/sergejmarkwart/nofocus
git init
git add docs        # nur die Landing Page – Extension-Code bleibt erstmal außen vor
git commit -m "Add nofoc.us landing page"
gh repo create nofocus --public --source=. --push   # oder Repo manuell auf github.com anlegen
```

> Tipp: Wenn du den Extension-Code (noch) nicht öffentlich machen willst, lege ein
> **eigenes** Repo nur für die Landing Page an und kopiere `docs/` dort als Root hinein.

## 2. GitHub Pages aktivieren

Repo → **Settings → Pages**:

- **Source:** „Deploy from a branch"
- **Branch:** `main` · Ordner **`/docs`**
- Speichern.

Nach ~1 Min ist die Seite unter `https://<user>.github.io/nofocus/` live.

## 3. Custom Domain nofoc.us einrichten

Die Datei `docs/CNAME` enthält bereits `nofoc.us`. In **Settings → Pages → Custom domain**
ebenfalls `nofoc.us` eintragen und „Enforce HTTPS" anhaken (sobald wählbar).

### DNS bei GoDaddy

GoDaddy → **My Products → Domain nofoc.us → DNS → Manage Zones**.

`nofoc.us` ist eine **Apex-Domain** (ohne Subdomain), darum **A-Records** auf die
GitHub-Pages-IPs zeigen lassen:

| Type | Name | Value           | TTL  |
|------|------|-----------------|------|
| A    | @    | 185.199.108.153 | 1h   |
| A    | @    | 185.199.109.153 | 1h   |
| A    | @    | 185.199.110.153 | 1h   |
| A    | @    | 185.199.111.153 | 1h   |

Optional zusätzlich IPv6 (AAAA):

| Type | Name | Value                  |
|------|------|------------------------|
| AAAA | @    | 2606:50c0:8000::153    |
| AAAA | @    | 2606:50c0:8001::153    |
| AAAA | @    | 2606:50c0:8002::153    |
| AAAA | @    | 2606:50c0:8003::153    |

Optional `www` → Apex weiterleiten:

| Type  | Name | Value                   |
|-------|------|-------------------------|
| CNAME | www  | `<user>.github.io.`     |

> Vorhandene GoDaddy-Parking-/Forwarding-Records auf `@` vorher löschen, sonst
> kollidieren sie mit den A-Records.

DNS-Propagation dauert i.d.R. wenige Minuten bis zu 1 h. Danach in GitHub Pages
auf grünes „DNS check successful" warten, dann HTTPS erzwingen.

## 4. Noch zu erledigen

- In `index.html` die zwei mit `<!-- TODO ... -->` markierten Buttons
  (`class="store-link"`) auf den echten **Chrome-Web-Store-Link** setzen, sobald die
  Extension veröffentlicht ist. Aktuell zeigen sie auf die Store-Startseite.
