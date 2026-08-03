window.PCB_ACADEMY_FUNDAMENTALS_EXPANSION = {
  electricity: {
    id: "electricity",
    chapter: "Grundlagen",
    title: "U, I, R und P: Spannung, Strom, Widerstand und Leistung von null erklärt",
    objective: "Du kannst die vier Grundgrößen mit ihren Formelzeichen und Einheiten erklären, an einer realen Schaltung zeigen und mit einem Multimeter grundsätzlich richtig messen.",
    duration: "45–60 min",
    keywords: ["U", "I", "R", "P", "Spannung", "Strom", "Widerstand", "Leistung", "Volt", "Ampere", "Ohm", "Watt", "Multimeter", "GND"],
    tags: ["U = Spannung", "I = Strom", "R = Widerstand", "P = Leistung"],
    intro: `Bevor eine Formel verwendet wird, musst du wissen, wofür jedes Zeichen steht. <b>U, I, R und P sind Formelzeichen</b>. Sie sind kurze Namen für elektrische Größen. Die dazugehörigen Einheiten heißen <b>Volt, Ampere, Ohm und Watt</b>. Ein Formelzeichen und eine Einheit sind nicht dasselbe: U bezeichnet die Größe Spannung; V ist die Einheit Volt, in der diese Spannung angegeben wird.`,
    concept: `<b>U bedeutet Spannung.</b> Spannung beschreibt einen elektrischen Unterschied zwischen zwei Punkten. Sie wird in Volt, abgekürzt V, angegeben. <b>I bedeutet Strom.</b> Strom beschreibt, wie viel elektrische Ladung pro Zeit durch einen Leiter fließt. Er wird in Ampere, abgekürzt A, angegeben. <b>R bedeutet Widerstand.</b> Widerstand beschreibt, wie stark ein Bauteil den Stromfluss hemmt. Er wird in Ohm, Zeichen Ω, angegeben. <b>P bedeutet Leistung.</b> Leistung beschreibt, wie schnell elektrische Energie umgesetzt wird, beispielsweise in Licht, Bewegung oder Wärme. Sie wird in Watt, abgekürzt W, angegeben.`,
    why: `Diese vier Größen bestimmen fast jede Entscheidung auf einer Platine. Die Spannung entscheidet, ob ein Bauteil zulässig versorgt wird. Der Strom entscheidet, wie breit Leiterbahnen sein müssen und ob ein Regler oder Stecker belastbar genug ist. Der Widerstand stellt Ströme, Pegel und Zeitkonstanten ein. Die Leistung entscheidet, ob Widerstände, Regler, MOSFETs oder Leiterbahnen zu heiß werden. Wer nur Formeln auswendig kennt, aber diese Bedeutungen nicht versteht, kann eine rechnerisch plausible und trotzdem gefährliche Schaltung bauen.`,
    steps: [
      `<b>Formelzeichen und Einheit trennen:</b> U ist nicht Volt. U ist der Name der Größe Spannung; Volt ist ihre Einheit. Entsprechend gilt I → Strom → Ampere, R → Widerstand → Ohm und P → Leistung → Watt.`,
      `<b>Spannung immer zwischen zwei Punkten denken:</b> Eine Aussage wie „dieser Pin hat 3,3 V“ bedeutet normalerweise 3,3 V gegenüber GND. Ohne zweiten Bezugspunkt ist eine Spannung unvollständig beschrieben.`,
      `<b>Strom als geschlossenen Weg denken:</b> Strom verlässt eine Quelle, fließt durch Verbraucher und muss zur Quelle zurückkehren. Ist der Kreis offen, fließt im idealisierten Gleichstromfall kein dauerhafter Strom.`,
      `<b>Widerstand als Verhältnis verstehen:</b> Bei gleicher Spannung führt ein größerer Widerstand zu weniger Strom. Ein Widerstand „verbraucht“ den Strom nicht; durch alle Bauteile einer einfachen Reihenschaltung fließt derselbe Strom.`,
      `<b>Leistung als Wärme- und Belastungsfrage verstehen:</b> Leistung ist Energie pro Zeit. Ein Bauteil mit hoher Verlustleistung erwärmt sich. Deshalb haben Widerstände Watt-Angaben und Regler thermische Grenzen.`,
      `<b>Größenordnungen lesen:</b> 1 A = 1000 mA. 1 mA = 1000 µA. 1 kΩ = 1000 Ω. 1 MΩ = 1.000.000 Ω. Das kleine m bedeutet Milli, k bedeutet Kilo und M bedeutet Mega.`,
      `<b>Spannung richtig messen:</b> Ein Voltmeter wird parallel zwischen zwei Messpunkte gehalten. Es vergleicht die beiden Potentiale und soll den Stromkreis möglichst wenig beeinflussen.`,
      `<b>Strom richtig messen:</b> Ein Amperemeter muss in Reihe in den Stromweg eingefügt werden. Wird es im Strommodus direkt parallel an eine Spannungsquelle gehalten, kann praktisch ein Kurzschluss entstehen.`,
      `<b>Widerstand nur spannungsfrei messen:</b> Ein Ohmmeter speist selbst einen kleinen Messstrom ein. Widerstandsmessungen erfolgen grundsätzlich an einer spannungsfreien Schaltung; parallele Bauteile können das Ergebnis verfälschen.`,
      `<b>Erst danach Formeln verwenden:</b> U = R × I bedeutet ausgeschrieben: Spannung = Widerstand × Strom. P = U × I bedeutet: Leistung = Spannung × Strom. Die Buchstaben sind nur Kurzformen der bereits verstandenen Begriffe.`
    ],
    diagram: `<div class="diagram">
      <table class="matrix">
        <thead><tr><th>Formelzeichen</th><th>Elektrische Größe</th><th>Einheit</th><th>Einheitenzeichen</th><th>Frage in der Praxis</th></tr></thead>
        <tbody>
          <tr><td><b>U</b></td><td>Spannung</td><td>Volt</td><td>V</td><td>Welcher elektrische Unterschied liegt zwischen zwei Punkten an?</td></tr>
          <tr><td><b>I</b></td><td>Strom</td><td>Ampere</td><td>A</td><td>Wie viel Ladung fließt pro Zeit durch diesen Stromweg?</td></tr>
          <tr><td><b>R</b></td><td>Widerstand</td><td>Ohm</td><td>Ω</td><td>Wie stark hemmt dieses Bauteil den Stromfluss?</td></tr>
          <tr><td><b>P</b></td><td>Leistung</td><td>Watt</td><td>W</td><td>Wie viel Energie wird pro Zeit umgesetzt und wie viel Wärme entsteht?</td></tr>
        </tbody>
      </table>
      <svg viewBox="0 0 900 310" width="100%" role="img" aria-label="Geschlossener Stromkreis mit Spannungsquelle, Widerstand und LED">
        <rect x="55" y="85" width="145" height="120" rx="12" fill="#18222d" stroke="#8cb1ff" stroke-width="4"/>
        <text x="128" y="132" text-anchor="middle" fill="#fff" font-size="18">Quelle</text>
        <text x="128" y="163" text-anchor="middle" fill="#abc6ff">U = 5 V</text>
        <line x1="200" y1="115" x2="325" y2="115" stroke="#dbe5ef" stroke-width="5"/>
        <polygon points="310,102 335,115 310,128" fill="#3cc987"/>
        <text x="265" y="92" text-anchor="middle" fill="#3cc987">I fließt</text>
        <rect x="325" y="88" width="175" height="54" fill="none" stroke="#ffd166" stroke-width="4"/>
        <text x="412" y="122" text-anchor="middle" fill="#fff">R = 330 Ω</text>
        <line x1="500" y1="115" x2="625" y2="115" stroke="#dbe5ef" stroke-width="5"/>
        <circle cx="675" cy="115" r="38" fill="none" stroke="#ffd166" stroke-width="4"/>
        <text x="675" y="121" text-anchor="middle" fill="#fff">LED</text>
        <line x1="713" y1="115" x2="790" y2="115" stroke="#dbe5ef" stroke-width="5"/>
        <line x1="790" y1="115" x2="790" y2="245" stroke="#dbe5ef" stroke-width="5"/>
        <line x1="790" y1="245" x2="128" y2="245" stroke="#dbe5ef" stroke-width="5"/>
        <line x1="128" y1="245" x2="128" y2="205" stroke="#dbe5ef" stroke-width="5"/>
        <text x="450" y="280" text-anchor="middle" fill="#9ba6b2">Der Stromweg ist geschlossen: Quelle → Widerstand → LED → zurück zur Quelle.</text>
      </svg>
    </div>`,
    example: `Ein USB-Netzteil stellt <b>U = 5 V</b> bereit. Das bedeutet: Zwischen seinem Plusanschluss und GND besteht eine Spannung von 5 Volt. Eine LED darf nicht beliebig viel Strom erhalten. Deshalb wird ein Widerstand mit <b>R = 330 Ω</b> in Reihe gesetzt. Durch Widerstand und LED fließt dann ein Strom <b>I</b>, dessen Höhe in der nächsten Lektion berechnet wird. Nimmt die gesamte Schaltung beispielsweise <b>I = 0,02 A</b> auf, dann erhält sie <b>P = U × I = 5 V × 0,02 A = 0,1 W</b>. Ausgeschrieben: Die Schaltung setzt 0,1 Watt elektrische Leistung um.`,
    schematic: `Im KiCad-Schaltplan siehst du nicht direkt „U, I, R und P“ als vier Bauteile. Du siehst Netze und Bauteile, an denen diese Größen auftreten. Netznamen wie +5V oder +3V3 beschreiben vorgesehene Spannungen gegenüber GND. Ein Widerstand erhält eine Referenz wie R1 und einen Wert wie 330R oder 10k. Stromwerte stehen häufig in Datenblättern, Simulationen oder Berechnungen, nicht automatisch am Draht. Leistungsanforderungen werden über Bauteilauswahl und Notizen berücksichtigt, beispielsweise ein Widerstand mit 0,25 W Belastbarkeit.`,
    pcb: `Auf dem PCB werden die vier Größen physisch relevant. Höhere Spannung verlangt ausreichende Abstände und passende Spannungsfestigkeit. Höherer Strom verlangt breitere Kupferbahnen, geeignete Vias und belastbare Stecker. Widerstände müssen den richtigen Wert und eine passende Baugröße besitzen. Verlustleistung erzeugt Wärme; deshalb benötigen Regler, MOSFETs und Leistungswiderstände eventuell größere Kupferflächen, Thermal Vias oder Abstand zu temperaturempfindlichen Bauteilen. GND ist dabei kein magisches „Loch“, sondern Teil des geschlossenen Rückstromwegs.`,
    errors: [
      `U, V, I und A als austauschbare Begriffe behandeln. U und I sind Formelzeichen; V und A sind Einheitenzeichen.`,
      `Spannung an nur einem Punkt denken, ohne den Bezugspunkt wie GND zu nennen.`,
      `Annehmen, Strom werde von einem Widerstand aufgebraucht. In einer einfachen Reihenschaltung fließt durch alle Elemente derselbe Strom.`,
      `Ein Multimeter im Strommessbereich parallel an eine Spannungsquelle halten und dadurch einen Kurzschluss erzeugen.`,
      `Milliampere und Ampere verwechseln: 500 mA sind 0,5 A, nicht 500 A.`,
      `Nur den elektrischen Wert eines Widerstands prüfen und seine zulässige Leistung ignorieren.`,
      `GND als überall identischen perfekten Nullpunkt behandeln und reale Rückstrompfade auf dem PCB ignorieren.`
    ],
    remember: `U ist Spannung in Volt. I ist Strom in Ampere. R ist Widerstand in Ohm. P ist Leistung in Watt. Erst die Begriffe verstehen, dann die Formel benutzen.`,
    tasks: [
      { id: "fund-u1", label: "Ich kann erklären: U ist das Formelzeichen der Spannung und V ist das Einheitenzeichen für Volt." },
      { id: "fund-i1", label: "Ich kann einen geschlossenen Stromweg zeigen und erklären, warum Strom einen Rückweg benötigt." },
      { id: "fund-r1", label: "Ich kann erklären, was ein Widerstand bewirkt, ohne zu sagen, er verbrauche Strom." },
      { id: "fund-p1", label: "Ich kann Leistung als Energie pro Zeit und als Ursache elektrischer Erwärmung erklären." },
      { id: "fund-m1", label: "Ich weiß, dass Spannung parallel und Strom in Reihe gemessen wird." },
      { id: "fund-prefix1", label: "Ich kann 1000 mA in 1 A und 10 kΩ in 10.000 Ω umrechnen." }
    ],
    quiz: {
      question: "Welche Zuordnung ist vollständig richtig?",
      answers: [
        "U = Spannung in Volt, I = Strom in Ampere, R = Widerstand in Ohm, P = Leistung in Watt",
        "U = Strom in Watt, I = Spannung in Ohm, R = Leistung in Ampere, P = Widerstand in Volt",
        "U, I, R und P sind vier verschiedene Einheiten"
      ],
      correct: 0
    }
  },

  "ohms-law": {
    id: "ohms-law",
    chapter: "Grundlagen",
    title: "Ohmsches Gesetz: Formeln lesen, umstellen und Einheiten kontrollieren",
    objective: "Du kannst U = R × I in Worten lesen, nach jeder Größe umstellen und einfache Rechnungen mit Volt, Ampere und Ohm nachvollziehbar durchführen.",
    duration: "40–55 min",
    keywords: ["Ohmsches Gesetz", "U=R*I", "I=U/R", "R=U/I", "Einheiten", "LED Widerstand"],
    tags: ["U = R × I", "I = U ÷ R", "R = U ÷ I"],
    intro: `Das Ohmsche Gesetz ist keine Buchstabenfolge zum Auswendiglernen. Es beschreibt den Zusammenhang zwischen der Spannung U, dem Strom I und dem Widerstand R. Du kennst jetzt alle drei Begriffe. Erst deshalb ist die Formel sinnvoll lesbar.`,
    concept: `<b>U = R × I</b> wird ausgesprochen als: Spannung ist gleich Widerstand mal Strom. Daraus folgen durch Umstellen <b>I = U ÷ R</b> und <b>R = U ÷ I</b>. Welche Form du nutzt, hängt davon ab, welche zwei Größen bekannt sind und welche dritte gesucht wird. Das Gesetz beschreibt ideale ohmsche Widerstände; viele reale Bauteile wie LEDs sind nicht über ihren gesamten Bereich ohmsch.`,
    why: `Mit dem Ohmschen Gesetz bestimmst du Vorwiderstände, Pull-ups, Messwiderstände und erwartete Ströme. Gleichzeitig ist die Einheitenkontrolle eine Fehlerbremse: Volt geteilt durch Ohm ergibt Ampere. Werden mA, A, kΩ und Ω unsauber gemischt, entstehen Fehler um Faktoren von tausend.`,
    steps: [
      `<b>Gesuchte Größe benennen:</b> Schreibe zuerst in Worten auf, ob Spannung U, Strom I oder Widerstand R gesucht wird.`,
      `<b>Bekannte Werte mit Einheiten notieren:</b> Beispiel: U = 5 V und R = 1000 Ω.`,
      `<b>Passende Formel auswählen:</b> Gesucht ist I, daher I = U ÷ R.`,
      `<b>Präfixe vereinheitlichen:</b> 1 kΩ wird zu 1000 Ω oder die Rechnung wird bewusst in V und kΩ durchgeführt, wobei das Ergebnis mA ist.`,
      `<b>Werte einsetzen:</b> I = 5 V ÷ 1000 Ω.`,
      `<b>Rechnen:</b> I = 0,005 A.`,
      `<b>Ergebnis lesbar umrechnen:</b> 0,005 A = 5 mA.`,
      `<b>Plausibilität prüfen:</b> Ein größerer Widerstand müsste bei gleicher Spannung weniger Strom ergeben.`,
      `<b>Leistung kontrollieren:</b> Bei Widerständen zusätzlich P = U × I oder P = I² × R berechnen und Sicherheitsreserve vorsehen.`
    ],
    diagram: `<div class="diagram"><table class="matrix"><thead><tr><th>Gesucht</th><th>Formel</th><th>In Worten</th><th>Einheitenkontrolle</th></tr></thead><tbody><tr><td>Spannung U</td><td>U = R × I</td><td>Widerstand mal Strom</td><td>Ω × A = V</td></tr><tr><td>Strom I</td><td>I = U ÷ R</td><td>Spannung geteilt durch Widerstand</td><td>V ÷ Ω = A</td></tr><tr><td>Widerstand R</td><td>R = U ÷ I</td><td>Spannung geteilt durch Strom</td><td>V ÷ A = Ω</td></tr></tbody></table></div>`,
    example: `Eine rote LED hat bei dem gewünschten Strom ungefähr 2 V Flussspannung. Die Versorgung beträgt 5 V. Am Widerstand sollen daher 5 V − 2 V = 3 V abfallen. Gewünscht sind 10 mA, also 0,01 A. Gesucht ist R: <b>R = U ÷ I = 3 V ÷ 0,01 A = 300 Ω</b>. In der Praxis wird ein verfügbarer Normwert gewählt, beispielsweise 330 Ω. Danach folgt die Leistungsprüfung: P = 3 V × ungefähr 0,009 A ≈ 0,027 W. Ein üblicher 0,1-W- oder 0,125-W-Widerstand hätte hier ausreichend Reserve, sofern weitere Bedingungen passen.`,
    schematic: `Im Schaltplan dokumentierst du die verwendeten Werte, beispielsweise R1 = 330R. Die Rechnung selbst kann in einer Designnotiz, im Projektordner oder in einer Tabellenkalkulation liegen. Bei LEDs wird die Flussspannung nicht als fester universeller Wert angenommen, sondern aus dem Datenblatt für Farbe, Typ, Strom und Temperatur abgelesen.`,
    pcb: `Die berechnete elektrische Leistung beeinflusst die Footprint-Größe. Ein 0402-Widerstand kann weniger Verlustleistung und Wärme abführen als ein größerer Widerstand, abhängig von Herstellerangaben und Layout. Bei höheren Strömen werden auch Leiterbahnbreite, Kupferfläche und Via-Anzahl relevant.`,
    errors: [
      `10 mA als Zahl 10 in eine Formel einsetzen, obwohl Ampere benötigt werden; korrekt sind 0,01 A.`,
      `Die gesamte Versorgungsspannung für den LED-Widerstand verwenden, ohne die LED-Flussspannung abzuziehen.`,
      `Einen rechnerischen Widerstand wählen, ohne einen real verfügbaren Normwert und Toleranzen zu berücksichtigen.`,
      `Nur den Widerstandswert berechnen und die Verlustleistung des Widerstands nicht prüfen.`,
      `Das Ohmsche Gesetz ungeprüft auf nichtlineare Bauteile wie eine LED selbst anwenden.`,
      `Ein Ergebnis ohne Einheit notieren und dadurch Größenordnungen verwechseln.`
    ],
    remember: `Schreibe zuerst die Wörter und Einheiten auf. Dann wähle die Formel. Ein Ergebnis ohne Einheit und Plausibilitätsprüfung ist keine fertige Rechnung.`,
    tasks: [
      { id: "ohm-read1", label: "Ich kann U = R × I vollständig in Worten aussprechen." },
      { id: "ohm-convert1", label: "Ich kann mA in A und kΩ in Ω umrechnen." },
      { id: "ohm-calc1", label: "Ich kann aus U und R den Strom I berechnen und mit Einheit angeben." },
      { id: "ohm-led1", label: "Ich kann erklären, warum beim LED-Vorwiderstand die LED-Flussspannung abgezogen wird." },
      { id: "ohm-power1", label: "Ich prüfe nach einer Widerstandsrechnung auch die Verlustleistung." }
    ],
    quiz: {
      question: "5 V liegen an einem Widerstand von 1 kΩ. Welcher Strom fließt?",
      answers: ["5 mA", "5 A", "5000 A"],
      correct: 0
    }
  }
};

(() => {
  const apply = content => {
    Object.assign(content, window.PCB_ACADEMY_FUNDAMENTALS_EXPANSION);
    window.PCB_ACADEMY_CONTENT = content;
    return content;
  };

  if (window.PCB_ACADEMY_CONTENT_PROMISE) {
    window.PCB_ACADEMY_CONTENT_PROMISE = window.PCB_ACADEMY_CONTENT_PROMISE.then(apply);
  } else if (window.PCB_ACADEMY_CONTENT) {
    apply(window.PCB_ACADEMY_CONTENT);
  }
})();
