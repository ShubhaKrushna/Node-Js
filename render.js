const fs = require('fs');
const ejs = require('ejs');
const path = require('path');

const ejsFiles = [
  // List the paths to your EJS files here
  'views/index.ejs',
  // Add more files if needed
];

const outputDirectory = 'dist'; // Output directory for HTML files

// Ensure the output directory exists
if (!fs.existsSync(outputDirectory)) {
  fs.mkdirSync(outputDirectory);
}

// Render EJS to HTML
ejsFiles.forEach((ejsFile) => {
  const ejsContent = fs.readFileSync(ejsFile, 'utf8');
  const htmlContent = ejs.render(ejsContent);

  const fileName = path.basename(ejsFile, '.ejs') + '.html';
  const outputPath = path.join(outputDirectory, fileName);

  fs.writeFileSync(outputPath, htmlContent, 'utf8');
  console.log(`Rendered ${ejsFile} to ${outputPath}`);
});
