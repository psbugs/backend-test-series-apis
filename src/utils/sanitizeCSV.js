// // utils/sanitizeCSV.js
// const csv = require('csv-parser');
// const { JSDOM } = require('jsdom');
// const createDOMPurify = require('dompurify');
// const stream = require('stream');

// const sanitizeString = (str) => {
//   const window = new JSDOM('').window;
//   const DOMPurify = createDOMPurify(window);
//   return DOMPurify.sanitize(str, { ALLOWED_TAGS: [], ALLOWED_ATTR: [] }).trim();
// };

// const sanitizeCSV = (buffer) => {
//   return new Promise((resolve, reject) => {
//     const results = [];
//     const readable = new stream.Readable();
//     readable.push(buffer);
//     readable.push(null);

//     readable
//       .pipe(csv())
//       .on('data', (row) => {
//         const sanitizedRow = {};
//         for (let key in row) {
//           sanitizedRow[sanitizeString(key)] = sanitizeString(row[key]);
//         }
//         results.push(sanitizedRow);
//       })
//       .on('end', () => resolve(results))
//       .on('error', reject);
//   });
// };

// module.exports = sanitizeCSV;

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
