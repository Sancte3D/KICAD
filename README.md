# PCB Academy

Modulare, statische Lernplattform für Elektrotechnik, KiCad-Schaltpläne und PCB-Layout.

## Lokal starten

`index.html` direkt im Browser öffnen. Kein Build-Prozess und keine Installation nötig. Der Fortschritt wird in `localStorage` gespeichert.

## Struktur

- `index.html` – Oberfläche
- `styles.css` – Design
- `app.js` – Loader, Navigation und Fortschritt
- `manifest.js` – Reihenfolge der Lektionen
- `snippets/*.js` – einzelne Lernmodule

Jedes Snippet registriert sich über `PCB_ACADEMY.register({...})`. Über `requires` bauen Lektionen aufeinander auf.

## Inhalte der ersten Ausbaustufe

Elektrische Grundgrößen, Widerstände, Kondensatoren, Schutzdioden, MOSFETs, LDOs, Schaltregler, Power Entry, MCU-Minimalschaltung, Quarz, USB-C, KiCad-Schaltplan, Footprints, Layer, Placement, Routing, Ground, DRC und Fertigungsdaten.

## Grundsatz

Herstellerdatenblatt und Referenzlayout haben Vorrang vor pauschalen Regeln. ERC und DRC ersetzen kein fachliches Review.
