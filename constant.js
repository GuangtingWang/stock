const apiKey = 'pk_1d3af044b1c644c3a0cf27c21168eb79';

const stockUrl = (name, apiKey) => `https://cloud-sse.iexapis.com/stable/stock/${name}/quote?token=${apiKey}`;
const companyLogoUrl = (name, apiKey) => `https://cloud-sse.iexapis.com/stable/stock/${name}/logo?token=${apiKey}`;

module.exports = {apiKey, stockUrl, companyLogoUrl}