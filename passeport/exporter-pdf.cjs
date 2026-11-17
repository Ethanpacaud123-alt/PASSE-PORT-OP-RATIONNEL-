// Exporte passeport.html en PDF (12 pages de 1440 × 810 px, polices incluses).
// Usage : node exporter-pdf.cjs [chemin-du-pdf]
// Prérequis : Playwright avec Chromium (npm i -D playwright && npx playwright install chromium).

const path = require('path');
const { pathToFileURL } = require('url');

let chromium;
try {
  ({ chromium } = require('playwright'));
} catch (e) {
  console.error('Playwright est introuvable. Installez-le : npm i -D playwright && npx playwright install chromium');
  console.error('Autre solution : ouvrir passeport.html dans Chrome, Imprimer > Enregistrer au format PDF,');
  console.error('marges « Aucune », « Graphiques d\'arrière-plan » coché.');
  process.exit(1);
}

const source = path.join(__dirname, 'passeport.html');
const sortie = path.resolve(process.argv[2] || path.join(__dirname, 'passeport-les-voyageurs-sans-frontieres.pdf'));

(async () => {
  const navigateur = await chromium.launch();
  const page = await navigateur.newPage({ viewport: { width: 1440, height: 810 } });
  await page.goto(pathToFileURL(source).href, { waitUntil: 'load' });
  await page.evaluate(() => document.fonts.ready);

  const nbPages = await page.locator('.page').count();
  const policesManquantes = await page.evaluate(() =>
    ['600 40px Fraunces', '400 22px "Work Sans"'].filter((f) => !document.fonts.check(f)));
  if (policesManquantes.length) {
    console.error('Polices non chargées : ' + policesManquantes.join(', '));
    process.exit(1);
  }

  await page.pdf({
    path: sortie,
    printBackground: true,      // taille de page : règle @page de styles.css
    preferCSSPageSize: true,
  });
  await navigateur.close();
  console.log(`PDF créé (${nbPages} pages) : ${sortie}`);
})();
