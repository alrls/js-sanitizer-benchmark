import { sanitize as bleach } from 'bleach';
import bluemonday from './bluemonday';
import insane from 'insane';
import { sanitize as sanitizer } from 'sanitizer';
import sanitizeHtml from 'sanitize-html';
import xss from 'xss';
import { inHTMLData as xssFilters } from 'xss-filters';

const sanitizeFunctions = [
  bleach, bluemonday, insane, sanitizer, sanitizeHtml, xss, xssFilters
];

export default sanitizeFunctions;
