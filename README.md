# PCB Academy

Modulare, vollständig lokale Lernplattform für Elektrotechnik, KiCad-Schaltpläne und PCB-Layout.

## Lernprinzip

Die Checkliste ist nicht mehr der Lerninhalt. Jede Lektion enthält vor dem Selbsttest:

1. Definition des Begriffs
2. technische Begründung
3. schrittweisen Ablauf
4. konkrete Beispiele
5. Bezug zum KiCad-Schaltplan
6. Umsetzung auf dem PCB
7. typische Fehler
8. Merksatz
9. Selbsttest und Quiz

Der Dashboard-Punkt „Nächste Lektion“ zeigt eine Lektion und nicht mehr einen ungeklärten Checklisten-Satz.

## Lokal starten

`index.html` direkt im Browser öffnen. Es ist kein Build-System und kein lokaler Server nötig. Fortschritt wird in `localStorage` gespeichert.

## Struktur

- `index.html` – Oberfläche
- `styles.css` – Layout und Lernkomponenten
- `app.js` – Loader, Navigation, Fortschritt, Quiz und Lektionensteuerung
- `manifest.js` – didaktische Reihenfolge
- `snippets/*.js` – 39 eigenständige Lektionen
- `scripts/validate-lessons.mjs` – automatisierte Inhalts- und Strukturprüfung

## Inhalt

Der Kurs führt von Spannung, Strom, Widerstand und Leistung über Bauteile, Power, MCU, USB-C, Schaltplan, Footprints, Layer, Stackup, Placement, Routing, Analog/Audio und Datenblätter bis zu Fertigung und Bring-up.

## Grundsatz

Herstellerdatenblatt, Application Notes, Fertigervorgaben und Referenzlayout haben Vorrang vor pauschalen Layoutregeln. ERC und DRC prüfen nur definierte Regeln und ersetzen kein fachliches Review.
