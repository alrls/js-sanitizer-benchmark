import { sanitize as bleach } from 'bleach';
import bluemonday from './bluemonday';
import insane from 'insane';
import { sanitize as sanitizer } from 'sanitizer';
import sanitizeHtml from 'sanitize-html';
import { inHTMLData as xssFilters } from 'xss-filters';

const sanitizeFunctions = [
  bleach, bluemonday, insane, sanitizer, sanitizeHtml, xssFilters
];

export default sanitizeFunctions;
