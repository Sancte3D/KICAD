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
- `scripts/validate-lessons.mjs` – Strukturprüfung der Lektionen

Jedes Snippet registriert sich über `PCB_ACADEMY.register({...})`. Über `requires` bauen Lektionen aufeinander auf.

## Lernpfad

Die erste Ausbaustufe enthält 30 aufeinander aufbauende Lektionen:

1. Elektrische Grundgrößen und Ohmsches Gesetz
2. LED, Widerstand, Kondensator, Schutzdiode und MOSFET
3. LDO, Buck-Converter und Power Entry
4. MCU-Minimalsystem, Quarz und USB-C
5. KiCad-Workflow, Netze, Labels und Junctions
6. Packages, Footprints, Pin 1 und Polarität
7. PCB-Layer, Mechanik, Net Classes und Design Rules
8. Taster, Encoder und Entprellung
9. OpAmp-, ADC-, Sensor-, DAC- und Audio-Placement
10. Ferritperlen, Versorgungsbereiche und Displays
11. ESD-Schutz an externen Anschlüssen
12. Datenblätter lesen und Placement-Matrix erstellen
13. vollständiges erstes PCB-Projekt

Die Lektionen erklären nicht nur Bauteilfunktionen, sondern insbesondere:

- welche Komponenten direkte Nachbarn sein sollen
- welche Platzierung mechanisch vorgegeben ist
- welche Schleifen klein bleiben müssen
- von welchen Störquellen Abstand nötig ist
- in welcher Reihenfolge Funktionsblöcke angeordnet werden
- welche Prüfungen vor Routing und Fertigung erforderlich sind

## Neue Lektion hinzufügen

1. Neue Datei unter `snippets/` anlegen.
2. Lektion mit eindeutiger `id` über `PCB_ACADEMY.register({...})` registrieren.
3. Voraussetzungen in `requires` eintragen.
4. Eindeutige Checklisten-IDs unter `tasks` verwenden.
5. Dateipfad am Ende von `manifest.js` ergänzen.
6. `node scripts/validate-lessons.mjs` ausführen.

## Grundsatz

Herstellerdatenblatt und Referenzlayout haben Vorrang vor pauschalen Regeln. ERC und DRC ersetzen kein fachliches Review.
