import bluemonday from 'bluemonday';

const bluemondayUgcPolicy = bluemonday.UGCPolicy();
const bluemondaySanitize = bluemondayUgcPolicy.Sanitize;

export default bluemondaySanitize;
