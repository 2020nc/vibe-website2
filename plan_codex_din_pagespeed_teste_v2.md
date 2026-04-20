# Plan CODEX din `PageSpeed- teste-v2.zip`

**Data:** 2026-04-19  
**Site analizat:** `https://vibe-website2.vercel.app/`  
**Bază de analiză:** **doar** testele din arhiva `PageSpeed- teste-v2.zip`

## 1. Ce am folosit

Am folosit exclusiv exporturile PageSpeed din arhivă:

- `PageSpeed Insights Mobil 1 v2.mhtml`
- `PageSpeed Insights Mobil 2p v2.mhtml`
- `PageSpeed Insights Mobil 3d v2.mhtml`
- `PageSpeed Insights Mobil 4h v2.mhtml`
- `PageSpeed Insights Mobil 5m v2.mhtml`
- `PageSpeed Insights Mobil 6r v2.mhtml`
- `PageSpeed Insights Mobil 7s v2.mhtml`
- perechile lor `PC ... v2.mhtml`

## 2. Observație metodologică importantă

În această arhivă, exporturile **Mobil** și **PC** sunt practic identice ca scoruri și audituri pentru fiecare cod de test. Din acest motiv, planul de lucru este organizat **pe cod de test / rută / buton**, nu separat pe dispozitive.

În plus, în exporturile `2p` și `4h`, valoarea de **Performanță** nu s-a materializat textual complet în HTML-ul exportat. Totuși, auditurile, subscorurile și metricele disponibile sunt suficiente pentru prioritizare.

## 3. Hartă de lucru pe coduri din arhivă

| Cod test | Interpretare practică | Scoruri observabile | Concluzie rapidă |
|---|---|---|---|
| `1` | homepage (`/`) | Perf 91 / A11y 100 / BP 100 / SEO 100 | bază bună, dar încă trasă în jos de imagini, JS și calea critică |
| `2p` | rută/buton „p” din arhivă, identificare finală de făcut în repo | Perf neclar în export / A11y 94 / BP 96 / SEO 100 | una dintre cele mai problematice: heading order, console errors, contrast, CSS/JS inutil |
| `3d` | buton / zonă „De ce Vibe?” sau echivalent din homepage | Perf 90 / A11y 100 / BP 100 / SEO 100 | foarte similar cu homepage-ul, cu forced reflow și CSS/JS suplimentar |
| `4h` | pagină de locație / hartă (`/locatie`) | Perf neclar în export / A11y 96 / BP 100 / SEO 100 | principalul risc este LCP-ul vizual și livrarea imaginii / hărții |
| `5m` | meniu (`/meniu`) | Perf 90 / A11y 94 / BP 96 / SEO 100 | a doua rută critică: heading order, console errors, imagini și forced reflow |
| `6r` | rezervări (`/rezervari`) | Perf 91 / A11y 96 / BP 100 / SEO 100 | bună, dar mai are contrast, JS vechi și cost de randare inițială |
| `7s` | sărbători / oferte sezoniere (`/sarbatori`) | Perf 98 / A11y 96 / BP 100 / SEO 100 | cea mai bună rută; doar rafinări de imagine, contrast și JS comun |

## 4. Probleme repetate în aproape toată arhiva

Acestea sunt semnalele care apar recurent și justifică optimizări comune:

1. **Solicitări de blocare a redării** — apare în toate cele 7 seturi.
2. **JavaScript vechi** — apare în toate cele 7 seturi.
3. **Reducerea JavaScript-ului nefolosit** — apare în toate cele 7 seturi.
4. **Arborele de dependențe al rețelei** — apare în 6 din 7 seturi.
5. **Contrast insuficient** — apare în 6 din 7 seturi.
6. **Îmbunătățirea livrării imaginilor** — apare în 6 din 7 seturi.
7. **Forced reflow / rearanjare forțată** — apare în 3 seturi (`2p`, `3d`, `5m`).
8. **Heading order greșit** — apare în `2p` și `5m`.
9. **Erori în consolă** — apar în `2p` și `5m`.

## 5. Prioritatea reală pentru CODEX

### Valul 1 — comune, cu efect pe multe rute

1. eliminarea / amânarea JS-ului necritic și a codului încărcat inutil global;
2. reducerea resurselor blocante din calea critică;
3. repararea contrastului comun;
4. optimizarea imaginilor comune și a imaginilor LCP.

### Valul 2 — rute problematice

5. repararea rutelor `2p` și `5m` (heading order + console errors);
6. forced reflow pe `2p`, `3d`, `5m`;
7. finisare specifică pentru `/locatie`, `/rezervari`, `/sarbatori`.

## 6. Prompt master pentru CODEX

```text
Folosește acest fișier Markdown ca runbook oficial pentru proiectul curent.

Lucrează numai pe baza taskurilor și priorităților din acest document.
Execută taskurile în ordine, unul câte unul.

Reguli:
- verifică fiecare task în raport cu codul real din repo înainte să modifici ceva
- nu presupune paths dacă le poți confirma în proiect
- fă modificări mici, clare și reversibile
- după fiecare task rulează verificarea imediată cerută mai jos
- dacă verificarea nu trece, nu continua la taskul următor
- dacă un cod de test din document nu se poate mapa clar la o rută din repo, oprește-te și raportează exact unde apare ambiguitatea

După fiecare task raportează în formatul:
- Task
- Fișiere modificate
- Modificare aplicată
- Verificare rulată
- Rezultat
- Blocaje / riscuri
- Următorul task
```

## 7. Task 1 — JS comun: cod vechi + JS nefolosit

### De ce e primul

Toate cele 7 seturi de teste semnalează `JavaScript vechi` și `Redu codul JavaScript nefolosit`. Asta indică o problemă transversală, nu una locală.

### Prompt pentru CODEX

```text
Task 1: optimizează JavaScript-ul comun încărcat pe mai multe rute.

Scop:
- redu codul JavaScript nefolosit încărcat global
- redu sau izolează codul care produce auditul „JavaScript vechi”
- nu folosi bundle analyzer și nu porni build-uri grele decât dacă sunt absolut necesare

Ce vreau să faci:
1. Inspectează layout-ul global, componentele montate global și widgeturile încărcate pe toate paginile.
2. Identifică orice componentă client-side care nu este critică pentru first paint.
3. Mută în dynamic import tot ce este non-critic și apare încărcat global fără motiv.
4. Dacă există cod care poate rămâne server-side, oprește hidratarea inutilă.
5. Dacă există librării sau helper-e importate, dar nefolosite pe rutele publice, elimină-le din calea critică.
6. Nu introduce dependențe noi.
7. Nu face cleanup mare în afara acestui task.

Verificare imediată:
- arată ce importuri au fost mutate în dynamic import
- arată ce componente au ieșit din încărcarea inițială
- rulează verificări rapide (grep, lint, eventual build doar dacă e scurt și necesar)
- raportează clar dacă auditul „JavaScript vechi” pare cauzat și de target-ul de build, nu doar de imports
```

### Verificare imediată

- `grep` pentru componentele mutate din import static în dynamic import;
- `npm run lint`;
- raport clar despre ce a rămas neconfirmat fără analiză de bundle.

## 8. Task 2 — contrast comun pe rutele cu A11y 94–96

### Diagnostic

Contrastul insuficient apare în `2p`, `3d`, `4h`, `5m`, `6r`, `7s`. Este aproape sigur o problemă de token / clasă reutilizată, nu una izolată.

### Prompt pentru CODEX

```text
Task 2: repară contrastul comun, fără redesign.

Scop:
- elimină auditul de contrast insuficient de pe rutele 2p, 3d, 4h, 5m, 6r, 7s
- păstrează stilul general al site-ului

Ce vreau să faci:
1. Caută toate folosirile tokenului sau clasei vizuale pentru text accent (ex: text-primary, teal pe fundal deschis, linkuri din footer, etichete, subtitluri, CTA secondary).
2. Identifică componentele comune care se repetă pe rutele cu scor 94–96 la accesibilitate.
3. Închide doar cât este necesar culorile de text sau deschide discret background-ul, fără să schimbi identitatea vizuală.
4. Verifică și footer-ul, badge-urile, subtitlurile, linkurile și orice text accent pe fundal deschis.
5. Nu schimba culorile care deja trec auditul.

Verificare imediată:
- raportează exact ce token / clasă / componentă a fost modificată
- arată toate aparițiile rămase ale stilului problematic
- confirmă dacă fixul este comun sau dacă mai rămân excepții locale
```

### Verificare imediată

- `grep` pe clase / tokeni modificați;
- listă scurtă de componente atinse;
- confirmare că nu a rămas stilul vechi în zonele cunoscute.

## 9. Task 3 — resurse blocante și lanț critic

### Diagnostic

`Solicitări de blocare a redării` apare în toate cele 7 seturi, iar `Arborele de dependențe al rețelei` apare în 6 din 7. Asta indică o problemă comună în calea critică: fonturi, CSS, preloading, head setup sau componente above-the-fold.

### Prompt pentru CODEX

```text
Task 3: redu costul căii critice fără să faci refactor mare.

Scop:
- redu solicitările de blocare a redării
- scurtează lanțul critic pentru rutele publice

Ce vreau să faci:
1. Inspectează fonturile încărcate global, weight-urile, preload-urile și orice resursă din head care poate bloca first paint.
2. Păstrează preloaded doar ce este critic pentru above-the-fold.
3. Dacă există fonturi, greutăți sau subseturi încărcate prea generos, restrânge-le prudent.
4. Verifică dacă există CSS global sau route-level care intră inutil în calea critică.
5. Nu introduce optimizări speculative; schimbă doar ce se justifică direct din audit.

Verificare imediată:
- listează fonturile și weight-urile rămase active
- arată ce preload a fost păstrat și ce a fost eliminat
- rulează lint și raportează dacă ai modificat head/layout/font config
```

### Verificare imediată

- listă înainte/după pentru weight-uri / preload;
- `npm run lint`;
- notă clară dacă mai rămâne un blocaj structural care cere analiză ulterioară.

## 10. Task 4 — rutele 2p și 5m: heading order + console errors

### Diagnostic

În `2p` și `5m` apar simultan:
- heading order greșit;
- erori în consolă;
- scor Best Practices 96;
- scor A11y 94.

Aceste două rute sunt cele mai sensibile după optimizările comune.

### Prompt pentru CODEX

```text
Task 4: repară rutele 2p și 5m la nivel structural.

Scop:
- elimină heading order greșit
- identifică și repară erorile reale din consolă
- ridică accesibilitatea și best practices pe aceste două rute

Ce vreau să faci:
1. Mapează corect în repo ruta 2p din test și ruta 5m (/meniu).
2. Verifică ordinea heading-urilor: trebuie să existe o ierarhie logică H1 → H2 → H3, fără sărituri arbitrare.
3. Repară heading order fără să schimbi copy-ul mai mult decât este necesar.
4. Caută sursa erorilor de consolă pentru aceste două rute și repară cauza, nu doar simptomul.
5. Dacă erorile vin dintr-un widget comun, notează asta clar.
6. Nu continua la alte rute până nu închizi aceste două probleme.

Verificare imediată:
- arată componenta sau pagina exactă pentru 2p și 5m
- raportează ierarhia heading-urilor după fix
- raportează cauza probabilă a erorilor din consolă și fișierul modificat
```

### Verificare imediată

- listă de heading-uri pe fiecare rută;
- fișiere schimbate;
- confirmare că problema era locală sau comună.

## 11. Task 5 — imagini și LCP discovery pe 4h, 5m, 7s și homepage

### Diagnostic

Auditul `Îmbunătățește livrarea imaginilor` apare în `1`, `2p`, `3d`, `4h`, `5m`, `7s`, iar `Descoperirea solicitării LCP` apare în `4h`, `5m`, `7s`.

Asta indică imagini încă prea grele, prea devreme sau descoperite prea târziu.

### Prompt pentru CODEX

```text
Task 5: optimizează imaginile și descoperirea LCP pe rutele cu semnal clar în audit.

Scop:
- redu costul imaginilor pe homepage, 4h, 5m, 7s și orice rută comună afectată
- repară LCP discovery acolo unde auditul îl semnalează explicit

Ce vreau să faci:
1. Identifică imaginile principale pentru codurile 1, 4h, 5m, 7s și orice componentă comună reutilizată.
2. Verifică dacă URL-urile externe folosesc constrângeri fixe nepotrivite (de tip lățime hardcodată prea mică / prea mare).
3. Ajustează `next/image`, `sizes`, `priority`, `fetchPriority` și calitatea doar pentru imaginile care chiar influențează LCP.
4. Nu pune `priority` pe imagini care nu sunt prima resursă vizuală importantă.
5. Dacă există o imagine LCP pe `/locatie` sau `/sarbatori`, fă-i tratamentul dedicat.

Verificare imediată:
- raportează ce imagini au primit `priority` / `fetchPriority`
- raportează ce `sizes` ai schimbat
- arată unde ai scos parametri fixați prost din URL-uri
```

### Verificare imediată

- `grep` pentru `priority`, `fetchPriority`, `sizes`, `next/image`;
- listă de imagini atinse și motivul;
- confirmare că nu ai supra-optimizat imagini non-critice.

## 12. Task 6 — forced reflow pe 2p, 3d și 5m

### Diagnostic

`Rearanjare forțată` apare pe `2p`, `3d`, `5m`. Asta indică citiri de geometrie după mutații DOM, efecte de scroll, transform sau măsurători repetate.

### Prompt pentru CODEX

```text
Task 6: redu forced reflow / layout thrashing pe 2p, 3d și 5m.

Scop:
- elimină sau reduce codul care citește geometria DOM în bucle sensibile
- stabilizează scroll/hover/measure logic pe rutele afectate

Ce vreau să faci:
1. Caută în componentele folosite de 2p, 3d și 5m apeluri precum: getBoundingClientRect, offsetWidth, offsetHeight, clientWidth, scrollY, style.transform actualizat foarte des.
2. Dacă există efecte bazate pe scroll sau parallax, mută calculele spre variante mai ieftine sau limitează frecvența.
3. Dacă ai citire după scriere în același ciclu, separă operațiile.
4. Dacă efectul este pur decorativ și costă mult, simplifică-l.
5. Nu atinge logica de business; doar stratul de randare și UX.

Verificare imediată:
- raportează exact ce apeluri costisitoare ai găsit
- spune ce componentă/rută le folosea
- arată înainte/după la nivel de implementare
```

### Verificare imediată

- listă clară cu apelurile eliminate sau mutate;
- `npm run lint`;
- notă dacă mai rămâne un caz care cere profiling ulterior.

## 13. Task 7 — rută de rezervări (`6r`)

### Diagnostic

`6r` nu este într-o stare rea, dar încă are:
- solicitări de blocare a redării;
- arbore de dependențe al rețelei;
- contrast insuficient;
- JavaScript vechi;
- JS nefolosit.

În plus, din export se vede o grilă densă de ore, deci hidratarea și randarea formularului merită controlate.

### Prompt pentru CODEX

```text
Task 7: finisează ruta /rezervari fără refactor mare.

Scop:
- păstrează UX-ul formularului, dar redu costul inițial și rezolvă contrastul rămas

Ce vreau să faci:
1. Inspectează pagina /rezervari și componentele ei directe.
2. Verifică dacă grila de ore, calendarul și elementele interactive sunt randate mai devreme decât este necesar.
3. Dacă există subcomponente care pot fi izolate sau încărcate mai târziu fără a afecta UX-ul, fă acest lucru prudent.
4. Repară contrastul rămas pe această rută, dacă încă nu a fost rezolvat prin Task 2.
5. Nu schimba fluxul funcțional de rezervare.

Verificare imediată:
- raportează componentele atinse
- explică dacă ai mutat ceva din first paint
- confirmă că nu ai afectat accesibilitatea formularului
```

### Verificare imediată

- fișiere schimbate;
- verificare rapidă a atributelor ARIA / structurii formularului dacă au fost atinse;
- `npm run lint`.

## 14. Task 8 — rerulare finală, dar abia la sfârșit

### Prompt pentru CODEX

```text
Task 8: după ce închizi taskurile 1–7, fă o singură rundă finală de verificare.

Ce vreau:
1. rulează verificările de cod necesare
2. pregătește un rezumat final pe codurile de test din arhivă
3. spune ce taskuri sunt închise complet
4. spune ce taskuri mai au nevoie de confirmare PageSpeed după deploy
5. nu porni diagnoze grele suplimentare decât dacă ele sunt strict necesare
```

## 15. Ce NU merită făcut acum

Ca să nu consumi credit inutil în CODEX, nu merită în această rundă:

- bundle analyzer greu;
- instalări temporare doar pentru diagnostic;
- refactor de arhitectură;
- curățenie generală de repo;
- restructurare de foldere fără legătură directă cu testele.

## 16. Alte propuneri practice

1. Începe cu taskurile comune înainte de taskurile pe rute.
2. Ține `2p` și `5m` sub observație, pentru că ele sunt singurele care combină accesibilitate mai slabă, best practices mai slabe și console errors.
3. Nu trata `7s` ca urgență — este deja cea mai sănătoasă rută.
4. Dacă CODEX întâmpină ambiguitate la maparea codului `2p`, cere-i mai întâi să identifice ruta reală, nu să modifice în orb.

## 17. Sunt necesare alte fișiere?

Pentru **prima rundă următoare**, nu.

Arhiva curentă este suficientă pentru a porni taskurile 1–7.

Doar dacă CODEX raportează blocaje, merită cerute ulterior:
- un export de consolă pentru ruta `2p`;
- un trace de performanță pentru ruta `5m` sau `4h`;
- un mapping explicit între codurile de test și rutele reale, dacă repo-ul nu le face evidente.
