const fs = require('fs');
const csv = require('csv-parser');

function sanitizeCSV(filePath) {
  return new Promise((resolve, reject) => {
    const sanitized = [];

    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (row) => {
        // Skip empty rows
        if (row.Question && row.CorrectOption) {
          sanitized.push(row);
        }
      })
      .on('end', () => {
        resolve(sanitized);
      })
      .on('error', reject);
  });
}

module.exports = sanitizeCSV;
