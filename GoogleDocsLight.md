# Google Docs Light
Im Modul *Workshop Distributed Software Systems (DSS)* und *Workshop Web* werden die Themen 
der Vertiefungsrichtung *Verteilte Software Systeme* und der Vertiefungsrichtung *Web* 
in einem durchgehenden Beispiel angewendet und umgesetzt. 
Dieses Dokument beschreibt die Aufgabenstellung für die Durchführung im Frühlingssemester 2022.

## Problembeschreibung
Verteiltes Arbeiten am gleichen Dokument wird in der heutigen Zeit immer wichtiger. Google ist ein prominenter
Anbieter von kollaborativen Team Applikationen. Google stellt über [Google Workspace](https://workspace.google.com/) 
verschiedene Applikationen für das gemeinsame Arbeiten bereit. Diese Online-Tools ermöglichen, dass mehrere Personen gleichzeitig 
an einem Dokument arbeiten können. Sämtliche Änderungen werden sofort gespeichert. Diese Tools 
funktionieren direkt im Browser, ganz ohne spezielle Software. Beispiele sind:

- [Docs](https://workspace.google.com/intl/de/products/docs/): Erstellen und bearbeiten von Textdokumenten.
- [Sheets](https://workspace.google.com/intl/de/products/sheets/): Erstellen und bearbeiten von Tabellen.
- [Slides](https://workspace.google.com/intl/de/products/slides/): Erstellen und bearbeiten von Präsentationen.

Diese Applikationen sind schöne und interessante Beispiele eines verteilten Systems. Das gleichzeitige Arbeiten
an einem gemeinsamen Dokument stellt die Entwickler aber vor neue Herausforderungen, die über 
die Anforderungen an ein klassisches Client-Server System hinausgehen. Es gilt verschiedene Punkte zu beachten, wie
z.B.:

- Wer arbeitet aktuell am Dokument?
- Was machen die anderen Teammitglieder aktuell am Dokument?
- Sehen alle Teilnehmer den gleichen Inhalt (Konsistenz)?
- Wie kann die Konsistenz gewährleisten oder wiederherstellen, wenn die Änderungen der Teilnehmer im Konflikt stehen?
- Wie erhält jemand der später in die Dokumentbearbeitung einsteigt, das aktuelle Dokument?
- Was ist momentan das gültige Dokument?

Im Rahmen des Moduls *Workshop DSS* bzw. des Modules *Workshop Web* soll nun eine einfache aber funktionale Version 
einer solchen kollaborativen Team Applikation entwickelt werden.

## Zielsetzung
Das Ziel dieser Arbeit liegt darin, ein einfaches verteiltes System für kollaboratives Arbeiten
an einem gemeinsamen Dokument über das Internet zu ermöglichen. Es geht also darum, das Wissen aus den Modulen zu den 
Themen Verteilte Systeme, Web Technologien und Architektur in einem übergreifenden Projekt 
anzuwenden. Auf diese Art soll das Wissen vertieft und durch praktische Erfahrungen verankert 
werden. Wir wollen uns dabei nicht nur auf die im Unterricht vorgestellten Plattformen 
konzentrieren, sondern Ihnen die Möglichkeit bieten, auch neue Technologien kennenzulernen.

Bei der Umsetzung dieses Projektes ist es wichtig, dass Sie auch auf folgende funktionsübergreifende 
Fragen Antworten finden:

- Wie gestaltet man das Remote API und welche Protokolle kommen zum Einsatz?
- Welche Technologien wählt man für Client und Server?
- Wie aufwändig sind Einarbeitung, Implementierung und Test?
- Welche Funktionalität wird auf dem Server oder auf dem Client implementiert?
- Wie geht man mit der Situation um, dass Komponenten zeitweise nicht verfügbar sind?
- Wie wird sichergestellt, dass die Antwortzeit des Systems in einem zumutbaren Bereich liegt?
- Wie gestaltet man eine funktionsgerechte Benutzeroberfläche?

Für die Beantwortung der obigen Fragen arbeiten Sie in Gruppen zu je 3 oder 4 Studierenden. 
Jede Gruppe erstellt ein eigenes verteiltes System, das kollaboratives Arbeiten erlaubt. 
Das System und die entsprechende Dokumentation wird benotet und ergibt die Modulnote.

## Anforderungsbeschreibung

### Funktionale Anforderungen
Das verteilte System soll kollaboratives Arbeiten an einem gemeinsamen Dokument ermöglichen.
Das umfasst unter anderem, dass :
- das kollaborative Arbeiten möglicherweise gleichzeitig, also innerhalb einer Arbeitssitzung abläuft.
- ein Benutzer jederzeit einer Arbeitssitzung beitreten oder sie verlassen kann.
- jeder Benutzer sieht, welche anderen Benutzer aktuell an der Arbeitssitzung teilnehmen.
- ein Benutzer nicht unabsichtlich die Arbeit eines anderen Benutzers aufhält, stört, verfälscht oder löscht.
- das Dokument in nützlicher Frist in einen konsistenten, für alle Benutzer gemeinsamen Zustand überführt wird.
- ein Dokument zu einem späteren Zeitpunkt wieder geöffnet werden kann und der erarbeitete 
Zustand nicht verloren geht.

Dieses [Video](https://tube.switch.ch/videos/jF3ZO90JUl) erläutert die prinzipielle Funktionalität:
- Ausbaustufe 1
  - [Einführung ins Thema, Setup](https://tube.switch.ch/videos/jF3ZO90JUl#0:0)
  - [Instant-Update](https://tube.switch.ch/videos/jF3ZO90JUl#1:24)
  - [Paragraphen hinzufügen](https://tube.switch.ch/videos/jF3ZO90JUl#3:0)
  - [Autorennamen ändern](https://tube.switch.ch/videos/jF3ZO90JUl#4:30)
- Ausbaustufe 2
  - [Neu dazukommen, Dokument wird persistiert](https://tube.switch.ch/videos/jF3ZO90JUl#7:05)
- Ausbaustufe 3
  - [Verschieben von Paragraphen](https://tube.switch.ch/videos/jF3ZO90JUl#10:04)
  - [Konflikte](https://tube.switch.ch/videos/jF3ZO90JUl#12:35)
  - [Tests](https://tube.switch.ch/videos/jF3ZO90JUl#13:35)
  - [Stresstest](https://tube.switch.ch/videos/jF3ZO90JUl#14:37)
  - [Daten, Systemaufbau](https://tube.switch.ch/videos/jF3ZO90JUl#17:0)
  - [Paragraphen wieder einfügen und löschen - Hidden feature](https://tube.switch.ch/videos/jF3ZO90JUl#18:02)

### Nichtfunktionale Anforderungen (NFA)
Technologie:
- Die Server-Applikation muss auf einem Unix-basierten Server eingesetzt werden.
- Der Server muss öffentlich erreichbar sein.
- Die Client-Applikation muss eine Webapplikation sein.
- Es müssen die modernen und aktuellen Browser-Versionen unterstützt werden.
- Die Persistenzschicht muss auf dem Server implementiert werden und gewährleisten, dass
bei einem Reboot des Servers keine Applikationsdaten verloren gehen.

Antwortzeit:
- Das System antwortet schnell genug, um kollaboratives Arbeiten zu ermöglichen.
  Das bedingt üblicherweise eine Antwortzeit von unter einer Sekunde bei mehreren gleichzeitigen Teilnehmern.
- Lokale Änderungen in der Benutzeroberfläche sollen sofort sichtbar sein.

Softwarequalität:
Der Codes muss folgende Kriterien erfüllen:
- Der Code ist anforderungsgerecht organisiert, kommentiert und getestet.
- Das Single Responsibility Principle wird im System erfüllt.
- Funktionen und Methoden sind übersichtlich (bevorzugt kurz, üblicherweise maximal 50 Zeilen).
- Es werden verständliche Namen verwendet.
- Die Idiome der Programmiersprache werden passend eingesetzt - besonders wo sie zur Fehlervermeidung beitragen.
- Der Code ist sinnvoll formatiert.
- Es gibt keinen auskommentierten oder toten Code.
- Es gibt keinen unangemessen duplizierten Code.
- Im git log ist der Entwicklungsfortschritt nachvollziehbar.

Kommunikationsprotokoll:
- Es müssen Internet-Protokolle eingesetzt werden.
- Das Applikationsprotokoll soll keine überflüssigen Bestandteile enthalten.

Benutzerinterface:
- Die Applikation soll ohne Benutzerhandbuch bedienbar sein.
- Die Sprache der Applikation ist Deutsch. Eine spätere Unterstützung für die Internationalisierung soll möglich sein.
- HTML und CSS sind valide.

Architektur:
- Eine saubere Schichtenarchitektur ist notwendig, d.h. Backend oder Frontend kommunizieren 
miteinander über eine klar definierte Schnittstelle.
- Die Abhängigkeit zwischen Komponenten, Bausteinen soll minimal sein.
- Alle relevanten Konfigurationseinstellungen (wie z.B. URLs der Server) für die Client- wie auch für die Serverapplikation 
müssen ohne Kompilation der Applikation möglich sein und bei einem Neustart der jeweiligen Applikation aktiv werden.

Sicherheit:
- Die Applikation hat insgesamt ein dem Anwendungsszenario angemessenes Sicherheitsniveau.
- Externe Ressourcen, Komponenten, Frameworks und Bibliotheken sind vertrauenswürdig.
- Die Kommunikation erfolgt immer über HTTPS (Authentisierung des Servers).
- Sämtliche Aktivitäten (abgeschlossene Use Cases, Zugriffe auf Server-Services) werden in einer Log-Datei protokolliert.

Tests / Betrieb:
- Für den Server und den Client existiert jeweils eine Testsuite mit einigen, repräsentativen Tests.
- Die Inbetriebnahme und der Betrieb von Client und Server sind klar beschrieben, d.h. Ihr Projekt 
soll am Ende so bereitgestellt sein, dass wir ihr Projekt selber lokal installieren und mindestens die Testfälle ausführen können.


## Architektur
Grundsätzlich soll diese Applikation in mehreren Schichten, resp. Bausteinen aufgebaut werden:

- Frontend (Web)
  - MVC Bausteine oder Alternativen
  - Remoting Service
- Backend, bestehend z.B. aus:
  - Collaboration Service
  - Session Service
  - Persistence Service

Jede Gruppe muss sich überlegen, welche Funktionalität im Client oder im Server implementiert werden soll. 

## Organisation
Da die Aufgabe ziemlich umfangreich ist, soll sie in **Gruppen zu 
3 oder 4 Studierenden** bearbeitet werden. Insgesamt sollen **6 Gruppen** gebildet werden.

Die Applikation und die Dokumentation werden benotet und ergeben die Modulnote.

Vorgehen:

- **Phase 1: Technologieauswahl**<br/>
  Jede Gruppe wählt einen Technologie-Stack sowohl für Client wie auch für Server. 
  Ziel des Workshops ist es für die Studierenden, sich auch in neue Technologien einarbeiten zu können. 
  Wir würden uns deshalb freuen eine grosse Vielfalt an unterschiedlichen Technologien anzutreffen.
  <br/>Zusätzlich legt jede Gruppe die Anforderungen an ein Proof of Concept (PoC) fest.

- **Phase 2: Proof of Concept (PoC)**<br/>
  Die Gruppen analysieren die Anforderungen an eine (REST) Schnittstelle zwischen 
  Frontend und Backend. Ebenfalls wird das Applikationsprotokoll festgelegt. Jede Gruppe zeigt anhand eines 
  PoC, dass die Kommunikation zwischen Frontend und Backend funktioniert und dass kollaboratives Arbeiten möglich ist.
  Diese Phase wird mit der Zwischenpräsentation abgeschlossen.

- **Phase 3: Implementierung**<br/>
  Jede Gruppe implementiert ein kollaboratives System.
  Diese Phase wird mit einer Präsentation der Implementierungen abgeschlossen.

- **Phase 4: Verteidigung**<br/>
     Die Dozierenden stellen jedem Team Fragen zu ihrer Lösung.

## Zeitplan / Termine

| KW  | WO  | Datum  | Bemerkung | Präsenz (h) | Projekt (h) |
| --- | --- | --- | --- | --- | --- |
| 8   | 1   | 21.02.22 | Kick-off | 1 | 4 |
| 9   | 2   | 28.02.22 |  |  | 4 |
| 10  | 3   | 07.03.22 | Vorschlag Technologien, Konzept PoC | 2 | 5 |
| 11  | 4   | 14.03.22 |  |  | 7 |
| 12  | 5   | 21.03.22 |  |  | 7 |
| 13  | 6   | 28.03.22 |  |  | 7 |
| 14  | 7   | 04.04.22 |  |  | 7 |
| 15  | 8   | 11.04.22 |  Zwischenpräsentation PoC | 3 | 4 |
| 16  |     | 18.04.22 |  Ostermontag |  |  |
| 17  | 9   | 25.04.22 |   |  | 7 |
| 18  | 10  | 02.05.22 |    |  | 7 |
| 19  | 11  | 09.05.22 |  Projektwoche |  | 7 |
| 20  | 12  | 16.05.22 |   |  | 7 |
| 21  | 13  | 23.05.22 | Abgabe Lösung & Projektbericht  |  | 3 |
| 22  | 14  | 30.05.22 | Präsentation Lösung | 3 | 4 |
| 23  |     | 06.06.22 | Pfingstmontag |  |  |
| 24  | 15  | 13.06.22 | Prüfung/Verteidigung | 1 |  |
|   |   |  | Aufwand Total | 10 | 80 |


## Fixe Termine

- Mo 21.02.22, alle<br/>
  Die 22 Studierende bilden total 6 Gruppen: 2 x 3er und 4 x 4er-Gruppen<br>
  Angabe per E-Mail

- Mo 07.03.22, alle<br/>
  Präsentation des Technologie-Stack und des Konzepts des PoC

- Mo 11.04.22, alle<br/>
  Zwischenpräsentation des PoC

- Mo 23.05.22<br/>
  Abgabe der Lösung mit
  - Dokumentation (Hintergrundinformation und Beschreibung der Lösung)
  - Source-Code als Tag auf ein Git-Repo
  - URL auf lauffähige Version der Lösung für kollaboratives Arbeiten


- Mo 30.05.22, alle<br/>
  Präsentation der eigenen Lösung den anderen Gruppen

- Mo 13.06.22, Gruppe 1 bis Gruppe 6<br/>
  Verteidigungen / Projektklärungen

### Präsentation
In der Präsentation soll auf jene Aspekte hingewiesen werden, welche die anderen Gruppen 
interessieren könnten, z.B. spezielle Probleme, elegante Lösungen, 
verwendete Technologien, Erfahrungen, etc.

Die Präsentation am 30.05.22 soll auch eine Live-Demo des Systems enthalten.

Mögliche Themen der Abschlusspräsentation sind also:
- Architektur Ihrer Lösung, Entwurfsentscheidungen
- Spezielle Algorithmen, Formate und Vorgehensweisen die Sie in Ihrer Applikation entwickelt bzw. verwendet haben
- Erfahrungen mit dem kollaborativen Problemfeld
- Erfahrungen mit Technologien

Sie haben für diese Präsentation 10 Min Zeit (inkl. Diskussion)

### Dokumentation
Als Dokumentation erwarten wir eine Beschreibung Ihrer Lösung. Es sollten alle wichtigen 
Entwurfsentscheidungen beschrieben sein. In der Dokumentation sollen 
auch interessante Aspekte und Lösungen dargestellt werden und die Dokumentation soll helfen, 
dass wir uns im Code zurechtzufinden. UML-Diagramme (Sequenzdiagramme zur Visualisierung 
von Abläufen, Klassendiagramme für die Objektmodellierung und Verteilungsdiagramme) sind dabei 
hilfreich.

Den Code geben Sie bitte als Tag auf ihrem Git Repository ab. Das Projekt soll von uns 
einfach installiert und getestet werden können (durch Ausführung der Testfälle).

Ihre Lösung soll auch auf einem Rechner zugreifbar sein, damit wir ihre Lösung 
(mind. im FHNW Intranet) anschauen können. Geben Sie im Bericht die URL der Startseite an.

Geben Sie im Bericht auch an, wer in ihrem Team welche Teile realisiert hat.

## Bewertung
Ihre Arbeit (Dokumentation + Code) wird mit einer Projektnote bewertet. In diese Note fliessen folgende Aspekte ein:
-	Fachliche Umsetzung
-	Dokumentation
-	Präsentation

Pro Gruppe gibt es im Normalfall eine Projektnote.

Nach der Abgabe der Dokumentation findet eine Klärung (Verteidigung) statt. 
In dieser Klärung werden die Dozierenden dem Team spezifische Fragen zur Lösung stellen. 
Fragen zu allen Themengebieten können an alle gerichtet werden. 
Diese Klärung dauert 30 Min. Anwesend sind alle am Modul beteiligten Dozierenden und die Mitglieder jedes Teams.

Die Projektnote kann aufgrund dieser Klärung individuell korrigiert werden.

Der Studierende hat das Modul bestanden, falls
- die individuelle Projektnote genügend ist (>= 3.8)
- die Testat-Bedingung erfüllt ist, d.h. Anwesenheit bei Zwischenpräsentationen (07.03.22 und 11.04.22), 
  Schlusspräsentation (30.05.22) und Verteidigung.

Bewertungsraster

Als Bewertungsraster schlagen wir folgende Kriterien vor: 
Bei jedem Kriterium gibt es eine Bewertung von schlecht (0) bis gut (3). 
Die einzelnen Kriterien gehen mit dem angegebenen Gewicht in die Rechnung ein.

1)	**Dokumentation** (2)<br/>
      Bewertungskriterium: Beschreibt die Dokumentation die Architektur & Implementierung sowie alle Entscheidungen, die getroffen wurden?

2)	**Präsentation** (1)<br/>
      Bewertungskriterium: Gibt die Präsentation einen guten Überblick über die Lösung?

3)	**Feature Completeness** (1)<br/>
      Bewertungskriterium: Funktioniert die Applikation gemäss den funktionalen Anforderungen?

4)	**Fachliche Umsetzung Frontend** (2)<br/>
      Bewertungskriterium: Ist die Architektur sinnvoll, bzw. nachvollziehbar und entspricht die Implementierung dieser Architektur? Sind die NFA erfüllt?

5)	**Testabdeckung Frontend** (1)<br/>
      Bewertungskriterium: Gibt es Tests? (keine Tests: 0; vollständige Test-Suite: 3)

6)	**Fachliche Umsetzung Backend** (2)<br/>
      Bewertungskriterium: Ist die Architektur sinnvoll, bzw. nachvollziehbar und entspricht die Implementierung dieser Architektur? Sind die NFA erfüllt?

7)	**Testabdeckung Backend** (1)<br/>
      Bewertungskriterium: Gibt es Tests? (keine Tests: 0; vollständige Test-Suite: 3)

8)	**Robustheit der Applikation** (1)<br/>
      Bewertungskriterium: Ist ein Error-Handling im Backend und Frontend vorhanden? Kann ein Request-Response Ablauf innerhalb der Applikation über Log-Files nachvollzogen werden?


Bonus – Bewertung von Spezialitäten (max. 3 Punkte)
- Mut neue Technologien zu wählen
- Design / Ästhetik
- Erweiterbarkeit der Lösung
- Interessante Schlussfolgerungen / Hinweise

## Betreuung
Die Dozierenden stehen bei Fragen gerne zur Verfügung:

- Web / Testing					Dierk König
- Web / Architektur				Stefan Meichtry
- Services / ORM				Jürg Luthiger

Wir empfehlen bei Problemen einen Termin zu vereinbaren und vorab das Problem per E-Mail zu schildern.
