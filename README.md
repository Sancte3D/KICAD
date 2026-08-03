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

Die aktuelle Ausbaustufe enthält 39 aufeinander aufbauende Lektionen:

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
14. physischer PCB-Stackup mit Core, Prepreg und Kupferlagen
15. Referenzflächen und Rückstrompfade
16. Through-, Blind-, Buried-, Stitching- und Thermal-Vias
17. Kupferzonen, Clearances, Thermal Reliefs und Inseln
18. Mask-, Paste-, Silkscreen-, Fab-, Courtyard- und Edge.Cuts-Layer
19. KiCad Board Setup mit Constraints, Net Classes und Custom Rules
20. konkrete Zweilagen- und Vierlagen-Designrezepte
21. Layer-Planungsübung für USB-C, MCU, Display und Audio

## Was jede technische Lektion erklärt

- was das Bauteil, Netz oder Layer technisch macht
- warum es benötigt wird
- wo es im Schaltplan und PCB erscheint
- welche Komponenten direkte Nachbarn sein sollen
- wie herum ein polarisiertes Bauteil orientiert wird
- welche Platzierung mechanisch vorgegeben ist
- welche Strom- und Signalschleifen klein bleiben müssen
- von welchen Störquellen Abstand nötig ist
- welche Layer welche physische und elektrische Aufgabe haben
- welche Referenzfläche zu schnellen Signalen gehört
- wie Layerwechsel und Vias den Rückstrom beeinflussen
- wie KiCad-Regeln und Herstellungsgrenzen zusammenwirken
- welche typischen Anfängerfehler auftreten
- welche Prüfungen vor Routing und Fertigung erforderlich sind

## Skizzen und Visualisierungen

Viele Lektionen enthalten eigene inline SVG-Skizzen. Dazu gehören:

- Stromfluss und Ohmsches Gesetz
- Komponenten-Nachbarschaften
- Decoupling-Schleifen
- Signal- und Rückstrompfade
- Zwei- und Vierlagen-Stackups
- Core, Prepreg und Kupferlagen
- Through-, Blind- und Buried-Vias
- Kupferzonen und Thermal Reliefs
- Mask, Paste, Silkscreen, Fab und Courtyard
- Platzierungsmatrizen und Funktionsblöcke

Die SVGs sind direkt in den Snippets eingebettet. Dadurch bleibt die App vollständig lokal und benötigt keine externen Bilddateien.

## Neue Lektion hinzufügen

1. Neue Datei unter `snippets/` anlegen.
2. Lektion mit eindeutiger `id` über `PCB_ACADEMY.register({...})` registrieren.
3. Voraussetzungen in `requires` eintragen.
4. Eindeutige Checklisten-IDs unter `tasks` verwenden.
5. Dateipfad am Ende von `manifest.js` ergänzen.
6. `node scripts/validate-lessons.mjs` ausführen.

## Grundsatz

Herstellerdatenblatt, Fertigervorgaben und Referenzlayout haben Vorrang vor pauschalen Regeln. ERC und DRC ersetzen kein fachliches Review.
