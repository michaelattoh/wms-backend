const QRCode = require('qrcode');

exports.generateQRCode = async (data) => {
  try {
    return await QRCode.toDataURL(data);
  } catch (err) {
    throw new Error('QR generation failed');
  }
};
