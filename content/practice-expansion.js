window.PCB_ACADEMY_PRACTICE_EXPANSION = {
  "footprints-pin1": {
    id: "footprints-pin1",
    chapter: "Bauteilprüfung",
    title: "Package, Footprint, Pin 1 und reale Orientierung sicher prüfen",
    objective: "Du kannst eine exakte Herstellerteilenummer vom Datenblatt bis zum KiCad-Footprint verfolgen und erkennst Spiegelungen, falsche Ansichten, Pin-1-Fehler und ungeeignete Land Patterns vor der Bestellung.",
    duration: "45–60 min",
    keywords: ["package", "footprint", "pin 1", "orientation", "top view", "bottom view", "land pattern", "courtyard"],
    tags: ["MPN", "Pin 1", "Package", "Footprint", "Orientierung"],
    intro: `Ein Footprint wird niemals nur nach einem ähnlich klingenden Gehäusenamen ausgewählt. Ausgangspunkt ist immer die exakte Manufacturer Part Number, kurz MPN. Von dieser Nummer aus verfolgst du eine geschlossene Beweiskette: Bestellteil → Datenblatt → Package-Code → mechanische Zeichnung → Pin-Nummern → empfohlene Leiterplattenpads → KiCad-Footprint.`,
    concept: `Das <b>Package</b> ist das reale Gehäuse des Bauteils, beispielsweise QFN-32 mit 5 × 5 mm Körper und 0,5 mm Pinabstand. Der <b>Footprint</b> ist die Leiterplattengeometrie aus Pads, Pastenöffnungen, Lötstopplack, Courtyard, Fab-Umriss und Pin-1-Markierung. Die <b>Pin-Nummer</b> verbindet Symbol, Footprint und Datenblatt. Der <b>Pin-Name</b> beschreibt die Funktion. Beides darf nicht verwechselt werden. Zusätzlich musst du erkennen, ob eine Zeichnung das Bauteil von oben, von unten oder als Schnittansicht zeigt.`,
    why: `Ein falsches Package kann mechanisch nicht bestückt werden. Eine falsche Pin-Zuordnung kann Versorgung auf Signale legen. Eine gespiegelte Bottom-View-Zeichnung kann komplette Steckverbinder oder ICs verdrehen. DRC und ERC erkennen diese Fehler häufig nicht, weil die Datei intern konsistent sein kann, obwohl sie nicht zum realen Bauteil passt.`,
    steps: [
      `<b>Exakte MPN sperren:</b> Notiere die vollständige Herstellerteilenummer einschließlich Package-, Temperatur- und Varianten-Suffix. Ähnliche Varianten können andere Pinouts oder Gehäuse besitzen.`,
      `<b>Package-Zeile finden:</b> Suche im Ordering Information, Device Information oder Package Options Abschnitt nach dem Package-Code der exakten MPN.`,
      `<b>Mechanische Zeichnung lesen:</b> Prüfe Körpermaß, Pinzahl, Pitch, Padbreite, Pinlänge, Exposed Pad und Toleranzen. Achte ausdrücklich auf Hinweise wie TOP VIEW oder BOTTOM VIEW.`,
      `<b>Pin 1 identifizieren:</b> Suche nach Punkt, Kerbe, abgeschrägter Ecke, breiterem Pad oder Laser-Markierung. Prüfe, ob die Nummerierung gegen oder im Uhrzeigersinn läuft.`,
      `<b>Symbol gegen Pin-Tabelle prüfen:</b> Vergleiche jede relevante Pin-Nummer mit Pin-Name und Funktion. Bei Versorgung, Reset, Boot, Clock und Debug gibt es keine Annahmen.`,
      `<b>Empfohlenes Land Pattern prüfen:</b> Verwende nach Möglichkeit das Hersteller-Land-Pattern. Kontrolliere besonders Exposed-Pad-Aufteilung, Paste Reduction und Thermal Vias.`,
      `<b>KiCad-Footprint prüfen:</b> Vergleiche Padnummern, Pitch, Gesamtmaße, Courtyard, Fab-Pin-1 und Silkscreen-Markierung. Öffne den Footprint Editor und miss nach.`,
      `<b>Physische Plausibilitätsprüfung:</b> Nutze 3D Viewer, Ausdruck im Maßstab 1:1 oder ein reales Muster. Bei Steckern muss zusätzlich die Einsteckrichtung stimmen.`
    ],
    diagram: `<div class="diagram"><table class="matrix"><thead><tr><th>Prüfstufe</th><th>Was du liest</th><th>Was du in KiCad bestätigst</th></tr></thead><tbody><tr><td>Bestellnummer</td><td>vollständige MPN und Package-Suffix</td><td>genau dieses Bauteil in BOM und Notizen</td></tr><tr><td>Pinout</td><td>Pin-Nummer, Pin-Name, Funktion, NC/EP</td><td>Symbol-Pinnummern und No-Connects</td></tr><tr><td>Mechanical Drawing</td><td>Top/Bottom View, Pitch, Körpermaß, Toleranz</td><td>Padabstand, Umriss und Orientierung</td></tr><tr><td>Land Pattern</td><td>Padgrößen, Paste, Mask, Thermal Vias</td><td>Footprint-Pads und Zonenanbindung</td></tr><tr><td>Markierung</td><td>Punkt, Kerbe oder Fase für Pin 1</td><td>Fab- und Silkscreen-Pin-1-Markierung</td></tr></tbody></table></div>`,
    example: `Ein QFN-32-Datenblatt zeigt die Pinbelegung als <b>Top View</b>. Pin 1 liegt an der abgeschrägten Ecke; die Nummerierung läuft gegen den Uhrzeigersinn. Das zentrale Exposed Pad ist als Pin 33 aufgeführt und muss an GND. Der KiCad-Footprint muss deshalb 32 Außenpads plus Pad 33 besitzen. Wird das Exposed Pad im Symbol vergessen oder der Footprint ohne Pad 33 gewählt, kann die Masse- und Wärmeverbindung fehlen, obwohl das Board optisch korrekt wirkt.`,
    schematic: `Im Schaltplan kontrollierst du Pin-Nummer und Pin-Funktion. Bei ICs mit mehreren Versorgungspins müssen alle vorgesehenen VDD-, VSS-, AVDD- und Referenzpins sichtbar oder bewusst in Power Units organisiert sein. NC bedeutet nicht automatisch GND. Reserved Pins werden genau nach Datenblatt behandelt. Bei Steckverbindern wird zusätzlich geprüft, ob die Nummerierung aus Sicht der Platine, der Steckseite oder der Kabelseite angegeben ist.`,
    pcb: `Auf dem PCB orientierst du Bauteile zuerst elektrisch und mechanisch, nicht nur optisch. Pin 1 sollte im Fab-Layer eindeutig sein. Auf Silkscreen genügt eine klare, nicht von einem Bauteil verdeckte Markierung. Ähnliche ICs werden möglichst konsistent ausgerichtet, solange dadurch keine kritischen Leitungen länger werden. Steckverbinder werden nach realer Einsteckrichtung, Gehäuseöffnung und Kabelabgang ausgerichtet.`,
    errors: [
      `Nur nach QFN-32 suchen, obwohl mehrere Körpergrößen und Pitch-Varianten existieren.`,
      `Eine Bottom-View-Zeichnung wie eine Top View behandeln und dadurch das Pinout spiegeln.`,
      `Pin-Namen vergleichen, aber die tatsächlichen Pin-Nummern zwischen Symbol und Footprint nicht prüfen.`,
      `Exposed Pad, Thermal-Via-Anforderungen oder Paste-Reduktion ignorieren.`,
      `Silkscreen-Punkt als alleinige Pin-1-Quelle verwenden, obwohl der Fab-Layer oder das Datenblatt widerspricht.`,
      `Stecker nach schöner Optik drehen, ohne Einsteckrichtung, Gehäusewand und Kabelraum zu prüfen.`
    ],
    remember: `Kein Footprint ohne Beweiskette: exakte MPN → Package-Zeichnung → Pinout → empfohlenes Land Pattern → KiCad-Messung → reale Orientierung.`,
    tasks: [
      { id: "fppr1", label: "Ich kann für eine exakte MPN den Package-Code und die mechanische Zeichnung finden." },
      { id: "fppr2", label: "Ich kann Top View und Bottom View unterscheiden und Pin 1 physisch identifizieren." },
      { id: "fppr3", label: "Ich habe Pin-Nummern, Exposed Pad und Footprint-Padnummern gegeneinander geprüft." },
      { id: "fppr4", label: "Ich kann die reale Einsteck- oder Bestückungsrichtung im PCB und 3D Viewer erklären." }
    ],
    quiz: {
      question: "Welche Prüfung verhindert am zuverlässigsten einen gespiegelten IC- oder Stecker-Footprint?",
      answers: ["Nur die 3D-Ansicht ansehen", "Ansichtsrichtung der Datenblattzeichnung, Pin-1-Markierung und Padnummern gemeinsam prüfen", "Den Footprint nach Gehäusenamen auswählen"],
      correct: 1
    }
  },

  "mechanical-placement": {
    id: "mechanical-placement",
    chapter: "Placement-Praxis",
    title: "Mechanische Platzierung: Boardkontur, Anschlüsse, Bedienung und Höhenzonen",
    objective: "Du kannst alle mechanisch erzwungenen Elemente vor der elektrischen Optimierung festlegen und verhinderst Kollisionen mit Gehäuse, Frontplatte, Schrauben, Kabeln und Werkzeugen.",
    duration: "40–55 min",
    keywords: ["mechanik", "board outline", "mounting holes", "connector", "height", "keepout", "front panel"],
    tags: ["Mechanik", "Keepout", "Stecker", "Mounting Holes"],
    intro: `Placement beginnt nicht beim Mikrocontroller. Es beginnt bei allem, was durch das reale Produkt vorgegeben ist: Platinenkontur, Schrauben, Frontplatte, Stecker, Displayfenster, Taster, Encoder, LEDs, Lautsprecher, Kühlkörper und Kabel. Diese Elemente bilden die unverrückbare Geometrie, um die die Elektronik herum geplant wird.`,
    concept: `Mechanisches Placement beschreibt Position, Rotation, Höhe, Zugänglichkeit und Bewegungsraum eines Bauteils. Ein Bauteil besitzt nicht nur einen Footprint, sondern einen Körper, einen Einbauweg, einen Bedienweg und häufig einen Kabel- oder Werkzeugraum. Keepouts markieren Flächen, in denen kein Kupfer, kein Bauteil oder keine Leiterbahn liegen darf.`,
    why: `Eine elektrisch perfekte Platine ist unbrauchbar, wenn USB-C nicht durch die Gehäuseöffnung passt, ein Encoder an der Frontplatte versetzt sitzt, eine Schraube eine Leiterbahn berührt oder ein Kabel nicht eingesteckt werden kann. Mechanische Fehler werden oft erst nach Fertigung sichtbar und verursachen komplette Neudesigns.`,
    steps: [
      `<b>Koordinatensystem festlegen:</b> Definiere Ursprung, Platinenaußenmaße, Front-/Rückseite und Bezugskanten zum Gehäuse.`,
      `<b>Edge.Cuts erstellen:</b> Zeichne eine geschlossene Kontur einschließlich Innenausschnitten und Slots.`,
      `<b>Mounting Holes platzieren:</b> Prüfe Schraubenkopf, Mutter, Abstandshalter, Werkzeugzugang und metallfreie Bereiche.`,
      `<b>Stecker und Bedienbauteile sperren:</b> Positioniere USB, Audio, MIDI, Display, Encoder, Taster und LEDs anhand der Gehäuse- oder Frontplattenzeichnung.`,
      `<b>Höhenzonen definieren:</b> Markiere Bereiche unter Display, Akku, Lautsprecher, Abschirmblech oder Gehäusestegen, in denen nur flache oder keine Bauteile erlaubt sind.`,
      `<b>Einsteck- und Bewegungsraum prüfen:</b> Berücksichtige Steckergehäuse, Kabelbiegeradius, Tasterhub, Encoderknopf und Schalterbewegung.`,
      `<b>Fertigungszugang prüfen:</b> Halte Testpunkte, Schrauben und Handlötstellen erreichbar.`,
      `<b>3D- und 1:1-Prüfung:</b> Kontrolliere das Board im 3D Viewer und exportiere bei kritischen Frontplatten einen maßstäblichen Ausdruck oder STEP-Abgleich.`
    ],
    diagram: `<div class="diagram"><svg viewBox="0 0 900 420" width="100%"><rect x="80" y="55" width="740" height="300" rx="18" fill="#182028" stroke="#dbe5ef" stroke-width="4"/><rect x="80" y="145" width="95" height="110" fill="#294665" stroke="#8cb1ff" stroke-width="3"/><text x="128" y="200" text-anchor="middle" fill="#fff">USB-C</text><rect x="270" y="95" width="360" height="150" fill="#252d37" stroke="#ffd166" stroke-width="3" stroke-dasharray="10 7"/><text x="450" y="175" text-anchor="middle" fill="#ffd166">Display-Keepout / Höhenzone</text><circle cx="715" cy="120" r="28" fill="#252d37" stroke="#8cb1ff" stroke-width="3"/><circle cx="715" cy="285" r="28" fill="#252d37" stroke="#8cb1ff" stroke-width="3"/><text x="715" y="125" text-anchor="middle" fill="#fff">H</text><text x="715" y="290" text-anchor="middle" fill="#fff">H</text><path d="M175 200 C220 200 225 200 270 200" stroke="#3cc987" stroke-width="4" fill="none"/><text x="450" y="390" text-anchor="middle" fill="#9ba6b2">Mechanische Bauteile und Keepouts werden vor MCU, Regler und Routing festgelegt.</text></svg></div>`,
    example: `Bei einem Handgerät sitzt USB-C an der oberen Gehäusekante, das Display mittig unter einer Frontscheibe und vier Encoder müssen exakt zu vier Bohrungen passen. Unter dem Display sind nur 2 mm Bauhöhe verfügbar. Deshalb werden zuerst USB-C, Display, Encoder und Mounting Holes platziert und gesperrt. Erst danach wird der MCU so gedreht, dass Display- und Encoder-Leitungen kurz bleiben.`,
    schematic: `Mechanische Bedingungen erscheinen im Schaltplan nur indirekt. Verwende klare Referenzbezeichnungen, Connector-Namen und Notizen. Mounting Holes können als mechanische Symbole geführt werden. Bei geschirmten Steckern wird bewusst entschieden, ob Shield-Pins mit Chassis, GND oder über ein Netzwerk verbunden werden.`,
    pcb: `Im PCB Editor nutzt du Edge.Cuts, Courtyard, Rule Areas und Keepouts. Sperre bestätigte mechanische Bauteile gegen versehentliches Verschieben. Prüfe Abstand von Kupfer zu Boardkante und Schrauben nach Fertigervorgaben. Bei seitlichen Steckern muss der Bauteilkörper eventuell über Edge.Cuts hinausragen; entscheidend ist die Herstellerzeichnung.`,
    errors: [
      `MCU und Regler zuerst platzieren und danach feststellen, dass Stecker oder Display keinen Platz mehr haben.`,
      `Nur den Pad-Footprint betrachten und den realen Stecker- oder Kabelkörper ignorieren.`,
      `Mounting-Hole-Courtyard ohne Schraubenkopf, Unterlegscheibe oder Werkzeugraum definieren.`,
      `Bauteilhöhen unter Display, Akku oder Gehäusestegen nicht prüfen.`,
      `Frontplattenpositionen optisch schätzen statt mit gemeinsamen Koordinaten zu übertragen.`,
      `Steckverbinder drehen, ohne die tatsächliche Steckrichtung aus der Datenblattzeichnung zu prüfen.`
    ],
    remember: `Was das Gehäuse berührt, bedient, verschraubt oder durchdringt, wird zuerst platziert und gesperrt. Elektronik passt sich der Mechanik an.`,
    tasks: [
      { id: "mppr1", label: "Boardkontur, Bezugskanten und mechanischer Ursprung sind festgelegt." },
      { id: "mppr2", label: "Stecker, Display, Bedienbauteile und Mounting Holes sind aus realen Maßen positioniert." },
      { id: "mppr3", label: "Höhenzonen, Kabelraum, Schraubenraum und Bewegungswege sind als Keepouts berücksichtigt." },
      { id: "mppr4", label: "Ich habe das mechanische Placement im 3D Viewer oder gegen ein Gehäusemodell geprüft." }
    ],
    quiz: {
      question: "Welche Bauteile werden bei einem Frontpanel-Gerät zuerst platziert?",
      answers: ["MCU und RAM", "Mechanisch festgelegte Stecker, Display, Bedienelemente und Schrauben", "Alle Widerstände"],
      correct: 1
    }
  },

  "placement-flow": {
    id: "placement-flow",
    chapter: "Placement-Praxis",
    title: "Elektrische Placement-Reihenfolge und direkte Bauteilnachbarschaften",
    objective: "Du kannst eine Schaltung als Energie- und Signalfluss in Funktionsblöcke zerlegen und leitest daraus ab, welche Komponenten direkt nebeneinander liegen und welche Bereiche Abstand benötigen.",
    duration: "50–70 min",
    keywords: ["placement flow", "functional blocks", "neighbors", "power", "signal flow", "decoupling"],
    tags: ["Funktionsblöcke", "Nachbarschaft", "Signalfluss", "Power"],
    intro: `Nach der Mechanik folgt die elektrische Platzierung. Gute Platzierung minimiert kritische Schleifen, ordnet Bauteile nach Funktion und macht das Routing beinahe selbstverständlich. Schlechte Platzierung erzeugt Kreuzungen, lange Rückwege, unnötige Vias und Störkopplung, die später kaum durch Routing repariert werden kann.`,
    concept: `Eine Schaltung wird als Graph aus Funktionsblöcken betrachtet. Externe Energie und Signale betreten das Board an Anschlüssen, durchlaufen Schutz- und Aufbereitungsstufen, erreichen Verarbeitungseinheiten und verlassen das Board über Ausgänge. Bauteile, die gemeinsam eine schnelle, stromstarke oder empfindliche Schleife bilden, sind direkte Nachbarn.`,
    why: `Leiterbahnlänge allein ist nicht das einzige Ziel. Entscheidend sind Schleifenfläche, Rückstrompfad, Stromspitzen, Wärme, Störquelle und Empfindlichkeit. Ein 100-nF-Kondensator gehört direkt zum VDD-Pin, ein TVS direkt zum Stecker, die Feedback-Widerstände direkt zum Regler oder OpAmp und ein Quarz direkt zu den Oscillator-Pins.`,
    steps: [
      `<b>Mechanik einfrieren:</b> Stecker, Display, Taster, Encoder, LEDs und Mounting Holes bleiben an ihren vorgegebenen Positionen.`,
      `<b>Power Entry aufbauen:</b> Platziere Eingangsschutz, Sicherung, Verpolschutz und Bulk-Kondensator direkt hinter dem Energieanschluss.`,
      `<b>Reglerblock schließen:</b> Bei LDO oder Buck gehören Ein-/Ausgangskondensatoren, Induktivität, Diode und Feedback-Netz in den vom Datenblatt vorgegebenen lokalen Block.`,
      `<b>Haupt-IC positionieren:</b> Drehe MCU, FPGA oder Hauptcontroller so, dass wichtige Pin-Gruppen zu ihren Funktionsblöcken zeigen.`,
      `<b>Unmittelbare Support-Bauteile setzen:</b> Decoupling, Quarz, Boot-, Reset- und Referenzkomponenten werden pinbezogen platziert.`,
      `<b>Schnittstellenblöcke bilden:</b> USB, Display, Encoder, Debug und Speicher werden nach physischem Anschluss und Signalfluss angeordnet.`,
      `<b>Analog und Audio schützen:</b> Platziere Eingangsfilter, OpAmps, ADC/DAC und Ausgangsfilter als ruhige Kette fern von Schaltknoten und schnellen Clocks.`,
      `<b>Routing-Probe durchführen:</b> Zeige Ratsnest an und prüfe, ob kritische Netze direkt und ohne Kreuzungen verbunden werden können. Erst danach beginnt das eigentliche Routing.`
    ],
    diagram: `<div class="diagram"><div class="flow"><span class="flow-step">Stecker</span><span class="flow-arrow">→</span><span class="flow-step">ESD / Schutz</span><span class="flow-arrow">→</span><span class="flow-step">Regler + lokale Bauteile</span><span class="flow-arrow">→</span><span class="flow-step">MCU + Decoupling + Quarz</span><span class="flow-arrow">→</span><span class="flow-step">Display / DAC / I/O</span></div><table class="matrix"><thead><tr><th>Bauteil</th><th>Direkt daneben</th><th>Abstand halten von</th><th>Grund</th></tr></thead><tbody><tr><td>TVS</td><td>externer Stecker und kurze GND-Ableitung</td><td>geschützter IC vor dem TVS</td><td>Störung zuerst abfangen</td></tr><tr><td>100 nF</td><td>zugehöriger VDD-Pin und GND-Via</td><td>lange gemeinsame Versorgungsleitung</td><td>kleine Hochfrequenzschleife</td></tr><tr><td>Quarz</td><td>OSC-Pins und Lastkondensatoren</td><td>Buck-Switch-Node, PWM, lange Busse</td><td>geringe Störung und parasitäre Kapazität</td></tr><tr><td>Buck-Induktivität</td><td>Regler, Schaltknoten, Ausgangskondensator</td><td>ADC, Audio, Quarz, Antenne</td><td>starke magnetische und elektrische Störquelle</td></tr><tr><td>OpAmp-Feedback</td><td>Ausgang und invertierender Eingang</td><td>digitale Leitungen innerhalb der Schleife</td><td>Stabilität und Rauscharmut</td></tr></tbody></table></div>`,
    example: `Ein Board enthält USB-C, Buck-Regler, STM32, Display und Audio-DAC. USB-C sitzt am Rand. TVS und CC-Widerstände folgen unmittelbar. Der Buck liegt nahe am Eingang, aber räumlich weg vom DAC. Der STM32 wird so gedreht, dass USB-Pins zum Stecker, SPI-Pins zum Display und Audio/I²S-Pins zum DAC zeigen. Quarz und Decoupling schließen sich direkt an die jeweiligen Pins an.`,
    schematic: `Im Schaltplan strukturierst du Funktionsblöcke sichtbar: Power Entry, Regler, MCU Core, Display, Audio und externe I/O. Net Labels ersetzen lange Drähte, aber die logische Flussrichtung bleibt lesbar. Ergänze Datenblattwerte, Testpunkte und Hinweise zu optionalen Bauteilen.`,
    pcb: `Auf dem PCB werden Funktionsblöcke räumlich zusammengehalten. Kritische Support-Bauteile werden nicht nach Referenzbezeichnung sortiert, sondern nach dem Pin, zu dem sie gehören. Drehe ICs, bevor du umliegende Bauteile fein ausrichtest. Nutze Ratsnest und lokale Platzierungsgruppen, um Kreuzungen zu reduzieren.`,
    errors: [
      `Bauteile gleichmäßig verteilen, statt Funktionsblöcke und Schleifen zu bilden.`,
      `Alle Kondensatoren in einer optisch sauberen Reihe platzieren, weit weg von ihren Pins.`,
      `MCU nur nach Schriftorientierung drehen, obwohl dadurch USB-, Clock- oder Display-Leitungen das Board kreuzen.`,
      `Buck-Regler und Audio-/ADC-Bereich direkt nebeneinander platzieren.`,
      `Schutzbauteile hinter langen Leiterbahnen statt unmittelbar am Anschluss platzieren.`,
      `Routing beginnen, bevor die kritischen Nachbarschaften und Pin-Gruppen stimmen.`
    ],
    remember: `Platzierung ist Routing im Voraus. Direkte Nachbarn werden durch gemeinsame Strom-, Timing- oder Feedbackschleifen bestimmt.`,
    tasks: [
      { id: "pfpr1", label: "Ich habe die Schaltung in Power-, Controller-, Interface-, Analog- und Ausgangsblöcke zerlegt." },
      { id: "pfpr2", label: "Für Schutz, Decoupling, Clock, Regler und Feedback sind die direkten Nachbarn festgelegt." },
      { id: "pfpr3", label: "Störquellen und empfindliche Bereiche sind räumlich getrennt und begründet." },
      { id: "pfpr4", label: "Die Ratsnest-Probe zeigt für kritische Netze kurze, direkte und weitgehend kreuzungsfreie Wege." }
    ],
    quiz: {
      question: "Welches Kriterium bestimmt die wichtigsten direkten Nachbarschaften?",
      answers: ["Gleiche Bauteilfarbe", "Gemeinsame kritische Strom-, Timing- oder Feedbackschleifen", "Alphabetische Referenzbezeichnungen"],
      correct: 1
    }
  },

  "placement-matrix": {
    id: "placement-matrix",
    chapter: "Placement-Praxis",
    title: "Placement-Matrix: wo, wie, weshalb und in welcher Orientierung",
    objective: "Du kannst für jede häufige Bauteilklasse eine begründete Placement-Regel formulieren und weißt, wann eine allgemeine Regel durch Datenblatt, Mechanik oder Referenzlayout ersetzt wird.",
    duration: "60–80 min",
    keywords: ["placement matrix", "orientation", "common practice", "component placement", "neighbors"],
    tags: ["Praxisregeln", "Orientierung", "Abstände", "Matrix"],
    intro: `Die Placement-Matrix ist dein Arbeitsblatt zwischen Schaltplan und PCB. Für jeden Funktionsblock notierst du: Was muss direkt daneben liegen? Was darf weiter weg? Welche Orientierung reduziert kritische Wege? Welche mechanische Position ist fest? Welche Datenblattregel hat Vorrang?`,
    concept: `Allgemeine Praxisregeln sind Ausgangspunkte, keine Naturgesetze. Ein Bauteil wird nach vier Prioritäten platziert: 1. Mechanik und Sicherheit, 2. Hersteller-Layoutvorgaben, 3. kritische Strom- und Signalwege, 4. Fertigung und Lesbarkeit. Optische Gleichrichtung kommt erst danach.`,
    why: `Ohne explizite Matrix werden Entscheidungen unbewusst getroffen. Dann stehen Kondensatoren schön, aber falsch; Pin 1 ist uneinheitlich markiert; Schaltregler stören den ADC; Stecker kollidieren mit dem Gehäuse. Die Matrix zwingt dich, jede Position zu begründen.`,
    steps: [
      `<b>Jede Komponente einem Block zuordnen:</b> Power, MCU, Clock, Speicher, Interface, Analog, Audio, Bedienung oder Mechanik.`,
      `<b>Direkte Nachbarn eintragen:</b> Erfasse Bauteile, die dieselbe kleine Schleife, ein Feedback-Netz oder einen Schutzpfad bilden.`,
      `<b>Störbeziehungen markieren:</b> Notiere Schaltknoten, Clocks, PWM, Motorleitungen und empfindliche ADC-, Audio- oder Referenznetze.`,
      `<b>Orientierungsziel definieren:</b> Richte Pin-Gruppen zu ihrem Zielblock aus; einheitliche Schrift ist nur sekundär.`,
      `<b>Mechanik und Höhe ergänzen:</b> Randposition, Frontplattenbezug, Kabelrichtung, Schrauben und Keepouts.`,
      `<b>Fertigungsregeln ergänzen:</b> Courtyard, Bestückungszugang, Inspektionssicht, Rework-Raum und konsistente Polaritätsmarken.`,
      `<b>Datenblattquelle notieren:</b> Für Quarz, Regler, RF, USB oder Analogteile wird die konkrete Layout-Abbildung oder Seitenzahl festgehalten.`,
      `<b>Nach dem ersten Placement erneut bewerten:</b> Miss kritische Wege und prüfe, ob jede Regel noch eingehalten wird.`
    ],
    diagram: `<div class="diagram"><table class="matrix"><thead><tr><th>Klasse</th><th>Wo platzieren?</th><th>Orientierung / direkte Nachbarn</th><th>Wovon fernhalten?</th></tr></thead><tbody><tr><td>USB-/Audio-Stecker</td><td>mechanisch am Boardrand</td><td>Steckrichtung zum Gehäuse; TVS direkt dahinter</td><td>lange ungeschützte Leitung ins Board</td></tr><tr><td>Decoupling-C</td><td>am jeweiligen Versorgungspin</td><td>VDD → C → GND als kleinste Schleife</td><td>gemeinsame lange Zuleitung mehrerer ICs</td></tr><tr><td>Bulk-C</td><td>am Eingang oder Reglerausgang</td><td>nahe Stromsprung und Versorgungsblock</td><td>empfindlicher Kleinsignal-Eingang</td></tr><tr><td>Quarz</td><td>unmittelbar am MCU</td><td>kurze, möglichst symmetrische Leitungen; gleiche Seite</td><td>Switch Node, PWM, schnelle Busse</td></tr><tr><td>LDO</td><td>zwischen Quelle und Lastblock</td><td>CIN und COUT direkt nach Datenblatt</td><td>Wärmeempfindliche Sensoren</td></tr><tr><td>Buck</td><td>nahe Power Entry</td><td>Hot Loop, Induktivität, Diode und Caps kompakt</td><td>ADC, Audio, RF, Quarz</td></tr><tr><td>OpAmp</td><td>nahe Signalquelle oder ADC/DAC</td><td>Feedback direkt zwischen Ausgang und Eingang</td><td>digitale Clocks innerhalb der Feedbackschleife</td></tr><tr><td>ADC-Filter</td><td>direkt vor ADC-Pin</td><td>Filter-C mit kurzem GND-Rückweg</td><td>Schaltregler und laute Ground-Ströme</td></tr><tr><td>LED + R</td><td>LED nach Sichtposition</td><td>R nahe LED oder Treiber; Polarität sichtbar</td><td>empfindliche Analogeingänge bei PWM</td></tr><tr><td>Encoder/Taster</td><td>nach Frontplatte</td><td>Pull-up/Filter nahe Eingang oder Stecker je Schutzkonzept</td><td>unnötig lange ungeschützte Leitungen</td></tr><tr><td>Testpunkte</td><td>zugänglich und beschriftet</td><td>GND-Testpunkt in der Nähe</td><td>unter hohen Bauteilen oder Gehäusestegen</td></tr></tbody></table></div>`,
    example: `Für ein Ambient-Audiogerät wird eine Matrix erstellt: USB-C und Audio-Jacks sind mechanisch fest. Der Power-Block liegt oben nahe USB-C. Der Buck bleibt weit vom DAC. Der MCU liegt zentral, mit Display-SPI nach oben und I²S zum DAC. Decoupling und Quarz bleiben unmittelbar am MCU. Encoder und Taster folgen der Frontplatte. Lautsprecherausgänge liegen nahe den Steckern und fern vom analogen Eingang.`,
    schematic: `Ergänze pro Block eindeutige Netznamen und Hinweise wie PLACE NEAR U1 PIN 12, FOLLOW DATASHEET FIGURE oder KEEP AWAY FROM SW_NODE. Solche Notizen ersetzen kein Review, verhindern aber, dass die Placement-Absicht beim Wechsel vom Schaltplan zum PCB verloren geht.`,
    pcb: `Nutze konsistente, aber nicht dogmatische Orientierung. Widerstände und Kondensatoren dürfen gruppenweise gleich ausgerichtet werden, wenn die elektrische Nähe erhalten bleibt. IC-Pin-1-Markierungen müssen sichtbar und eindeutig sein. Dioden, LEDs, Elektrolytkondensatoren und Steckverbinder erhalten klare Polaritäts- oder Pin-1-Hinweise.`,
    errors: [
      `Alle Bauteile streng horizontal ausrichten und dadurch kritische Wege verlängern.`,
      `Allgemeine Internetregeln über das konkrete Hersteller-Referenzlayout stellen.`,
      `GND pauschal in Analog und Digital auftrennen, ohne Rückstrompfade zu verstehen.`,
      `Bauteilabstand nur nach Courtyard beurteilen und elektrische Störkopplung ignorieren.`,
      `Steckverbinder, Dioden oder ICs ohne sichtbare Orientierungsmarken lassen.`,
      `Placement als abgeschlossen betrachten, bevor eine Routing-Probe durchgeführt wurde.`
    ],
    remember: `Die beste Orientierung ist die, die Mechanik, Herstellerlayout, kritische Schleifen und Fertigung gemeinsam erfüllt — nicht die mit der schönsten Schriftlinie.`,
    tasks: [
      { id: "pmpr1", label: "Für jeden Funktionsblock sind direkte Nachbarn, Störquellen und mechanische Vorgaben dokumentiert." },
      { id: "pmpr2", label: "Jede kritische Orientierung ist durch Pin-Gruppen, Stromfluss oder Datenblatt begründet." },
      { id: "pmpr3", label: "Polarität, Pin 1 und Steckrichtung sind auf Fab oder Silkscreen eindeutig kontrollierbar." },
      { id: "pmpr4", label: "Ich kann für mindestens zehn Bauteilklassen erklären, wo sie liegen und weshalb." }
    ],
    quiz: {
      question: "Welche Priorität hat bei der Bauteilorientierung Vorrang?",
      answers: ["Einheitlich lesbare Beschriftung", "Mechanik, Herstellerlayout und kritische elektrische Wege", "Möglichst wenige verschiedene Rotationswerte"],
      correct: 1
    }
  },

  "datasheet-reading": {
    id: "datasheet-reading",
    chapter: "Engineering-Praxis",
    title: "Datenblätter systematisch lesen und in Schaltplan, Placement und Regeln übersetzen",
    objective: "Du kannst ein unbekanntes Datenblatt in einer festen Reihenfolge auswerten, trennst Grenzwerte von Betriebswerten und erzeugst daraus eine prüfbare Design- und Placement-Checkliste.",
    duration: "75–100 min",
    keywords: ["datasheet", "absolute maximum", "recommended operating", "electrical characteristics", "layout guidelines", "application circuit", "errata"],
    tags: ["Datasheet", "Grenzwerte", "Pinout", "Layout", "Reference Design"],
    intro: `Datenblatt-Lesen ist keine lineare Leseaufgabe von Seite 1 bis Seite 80. Es ist eine gezielte technische Recherche. Du stellst zuerst konkrete Fragen und springst dann zwischen Ordering Information, Pinout, Grenzwerten, Betriebsbedingungen, Kennlinien, Anwendungsschaltung, Layout Guidelines und Package-Zeichnung. Das Ergebnis ist nicht nur Wissen, sondern eine dokumentierte Entscheidung für Schaltplan, Bauteilwerte, Footprint, Placement und Tests.`,
    concept: `Ein Datenblatt beschreibt, was ein Bauteil unter definierten Bedingungen kann und wie es verwendet werden muss. <b>Absolute Maximum Ratings</b> sind Schadensgrenzen, keine normalen Betriebswerte. <b>Recommended Operating Conditions</b> beschreiben den zulässigen Betrieb. <b>Electrical Characteristics</b> enthalten garantierte, typische und maximale Werte unter genannten Testbedingungen. Typical Application und Layout Guidelines zeigen die vorgesehene Schaltungs- und Platzierungslogik.`,
    why: `Viele Fehler entstehen nicht durch fehlende Formeln, sondern durch falsch gelesene Bedingungen: ein typischer statt garantierter Wert, eine falsche Package-Variante, ein übersehener Power-Pin, ein nicht beschalteter Enable-Pin, ein instabiler LDO-Kondensator oder eine ignorierte Layoutschleife. Datenblatt-Lesen verbindet deshalb elektrische, mechanische und PCB-Entscheidungen.`,
    steps: [
      `<b>1. Identität klären:</b> Hersteller, exakte MPN, Revision und Datum notieren. Prüfe Ordering Information und Variantenunterschiede.`,
      `<b>2. Aufgabe verstehen:</b> Lies erste Seite, Features und Block Diagram. Formuliere in einem Satz, was das Bauteil tut und welche Ein-/Ausgänge entscheidend sind.`,
      `<b>3. Pinout extrahieren:</b> Erstelle eine Tabelle aus Pin-Nummer, Pin-Name, Richtung, Versorgung, Pflichtbeschaltung, internen Pulls und besonderen Zuständen.`,
      `<b>4. Grenzwerte trennen:</b> Markiere Absolute Maximum, Recommended Operating Conditions und Thermal Limits in verschiedenen Kategorien. Plane Abstand zu den Grenzwerten.`,
      `<b>5. Elektrische Kennwerte lesen:</b> Beachte Min/Typ/Max, Testspannung, Temperatur, Last, Frequenz und Messbedingungen. Ein typischer Wert ist nicht automatisch garantiert.`,
      `<b>6. Start-up und Sequencing prüfen:</b> Suche nach Reset, Boot, Enable, Power-on-Reset, Ramp Rate, Timing, Clock und erforderlicher Reihenfolge der Versorgungen.`,
      `<b>7. Typical Application nachbauen:</b> Übertrage die empfohlene Grundschaltung zunächst vollständig. Abweichungen werden einzeln begründet.`,
      `<b>8. Layout Guidelines lesen:</b> Suche ausdrücklich nach Layout, PCB, Placement, Decoupling, Ground, Thermal und Reference Design. Übernimm Nachbarschaften und Schleifen in eine Placement-Liste.`,
      `<b>9. Package und Land Pattern prüfen:</b> Bestätige Ansicht, Pin 1, Maße, Pitch, Exposed Pad, Paste und Thermal Vias.`,
      `<b>10. Ergänzende Quellen prüfen:</b> Application Notes, Reference Designs, Evaluation Boards und Errata können wichtige Informationen enthalten, die im Hauptdatenblatt nur kurz erwähnt werden.`,
      `<b>11. Design Extraction Sheet erstellen:</b> Dokumentiere Versorgung, Strom, Pflichtbauteile, Pinzustände, Layoutregeln, Footprint, thermische Anforderungen und offene Fragen.`,
      `<b>12. Review mit Quellenangabe:</b> Jede kritische Entscheidung erhält Datenblattseite, Tabelle oder Abbildungsnummer, damit sie später überprüfbar bleibt.`
    ],
    diagram: `<div class="diagram"><table class="matrix"><thead><tr><th>Frage</th><th>Wo suchen?</th><th>Designentscheidung</th></tr></thead><tbody><tr><td>Welche Spannung ist normal?</td><td>Recommended Operating Conditions</td><td>Versorgungsnetz und Reglerwert</td></tr><tr><td>Was zerstört das Teil?</td><td>Absolute Maximum Ratings</td><td>Schutz und Sicherheitsmarge</td></tr><tr><td>Wie viel Strom / Genauigkeit?</td><td>Electrical Characteristics mit Testbedingungen</td><td>Dimensionierung und Toleranzbudget</td></tr><tr><td>Welche Pins müssen wie beschaltet werden?</td><td>Pin Description, Functional Description</td><td>Schaltplan und Boot-/Reset-Netz</td></tr><tr><td>Welche Bauteile gehören direkt daneben?</td><td>Typical Application und Layout Guidelines</td><td>Placement-Matrix</td></tr><tr><td>Wie sieht das reale Gehäuse aus?</td><td>Package Drawing und Land Pattern</td><td>Footprint, Pin 1, Paste und Courtyard</td></tr><tr><td>Gibt es bekannte Fehler?</td><td>Errata und Product Notices</td><td>Workaround oder andere Revision</td></tr></tbody></table><div class="flow"><span class="flow-step">MPN</span><span class="flow-arrow">→</span><span class="flow-step">Pinout</span><span class="flow-arrow">→</span><span class="flow-step">Betriebswerte</span><span class="flow-arrow">→</span><span class="flow-step">Typical Application</span><span class="flow-arrow">→</span><span class="flow-step">Layout Guidelines</span><span class="flow-arrow">→</span><span class="flow-step">Package</span><span class="flow-arrow">→</span><span class="flow-step">Review Sheet</span></div></div>`,
    example: `Du untersuchst einen 3,3-V-LDO. Im Datenblatt steht 6 V unter Absolute Maximum, aber 2,5 bis 5,5 V unter Recommended Input Voltage. Der Ausgangskondensator muss mindestens 1 µF besitzen; zusätzlich ist ein ESR-Bereich oder bestimmter Keramiktyp genannt. Die Typical Application zeigt CIN direkt an VIN und COUT direkt an VOUT. Die Layout Guidelines verlangen kurze Verbindungen und eine thermische Kupferfläche am GND-/Thermal-Pad. Daraus entstehen konkrete Entscheidungen: 5-V-Eingang, 1-µF-X7R mit DC-Bias-Reserve, CIN/COUT unmittelbar am IC und Kupferfläche nach Package-Hinweis.`,
    schematic: `Erstelle neben dem Schaltplan eine Engineering-Notiz: MPN und Revision, Versorgungsspannungen, maximale Ströme, Pflichtbeschaltung, unbenutzte Pinzustände, Boot-/Reset-Verhalten und Datenblattquellen. Werte aus Typical Application werden nicht blind kopiert; ihre Bedingungen werden mit deinem Anwendungsfall verglichen.`,
    pcb: `Übersetze Layout-Hinweise wörtlich in Placement-Regeln: PLACE C1 AT VDD PIN, KEEP SW NODE SMALL, ROUTE FB AWAY FROM INDUCTOR, NO VIA IN CRYSTAL LOOP oder EXPOSED PAD TO GND WITH THERMAL VIAS. Kontrolliere anschließend, ob der Footprint zur exakten Package-Zeichnung gehört und ob die thermischen Anforderungen im Stackup realistisch sind.`,
    errors: [
      `Absolute Maximum als empfohlenen Dauerbetrieb verwenden.`,
      `Typische Werte ohne Min-/Max-Garantie für kritische Toleranzen verwenden.`,
      `Testbedingungen, Temperatur oder Last der Kennwerttabelle ignorieren.`,
      `Nur Typical Application ansehen und Pin Description, Sequencing oder Layout Guidelines überspringen.`,
      `Package-Name aus einem Händlerangebot übernehmen, ohne Herstellerzeichnung und MPN zu prüfen.`,
      `Application Notes, Errata und Referenzdesigns nicht suchen.`,
      `Datenblattwissen nicht in konkrete Schaltplan-, Placement- und Prüfnotizen übersetzen.`
    ],
    remember: `Ein Datenblatt ist erst gelesen, wenn du daraus überprüfbare Entscheidungen für Pinout, Betriebswerte, Pflichtbeschaltung, Footprint, Placement, Routing, Thermik und Tests abgeleitet hast.`,
    tasks: [
      { id: "dsr1", label: "Ich kann Absolute Maximum, Recommended Operating Conditions und garantierte Kennwerte klar unterscheiden." },
      { id: "dsr2", label: "Ich habe für ein reales Bauteil eine Pin- und Pflichtbeschaltungstabelle erstellt." },
      { id: "dsr3", label: "Ich kann aus Typical Application und Layout Guidelines direkte Placement- und Routingregeln ableiten." },
      { id: "dsr4", label: "Ich habe Package, Pin 1, Land Pattern, Application Notes und Errata für die exakte MPN geprüft." }
    ],
    quiz: {
      question: "Wo findest du normalerweise den zulässigen normalen Betriebsspannungsbereich?",
      answers: ["Absolute Maximum Ratings", "Recommended Operating Conditions", "Nur in der Package-Zeichnung"],
      correct: 1
    }
  }
};

(function applyPracticeExpansion() {
  const expansion = window.PCB_ACADEMY_PRACTICE_EXPANSION;
  const apply = content => {
    Object.assign(content, expansion);
    window.PCB_ACADEMY_CONTENT = content;
    return content;
  };

  if (window.PCB_ACADEMY_CONTENT) apply(window.PCB_ACADEMY_CONTENT);
  if (window.PCB_ACADEMY_CONTENT_PROMISE) {
    window.PCB_ACADEMY_CONTENT_PROMISE = window.PCB_ACADEMY_CONTENT_PROMISE.then(apply);
  }
})();
