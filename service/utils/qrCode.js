// const qrCode = require('qrcode');
// const Visitor_new_visitentry = require('../models/Visitor_new_visitentry.js');

// /**
//  * Generate a QR Code buffer for the given data.
//  * @param {string} data - Data to encode in the QR code.
//  * @returns {Buffer} - Buffer containing QR code image data.
//  */
// async function generateQRCodeImage(data) {
//   try {
//     return await qrCode.toBuffer(data);
//   } catch (error) {
//     console.error('Error generating QR code:', error);
//     throw new Error('Failed to generate QR code');
//   }
// }

// /**
//  * Save the QR Code image buffer to the database.
//  * @param {Buffer} qrCodeImageBuffer - Buffer containing the QR code image data.
//  * @param {number} visit_entry_Id - The ID of the visitor entry to associate with the QR code.
//  * @returns {Object} - Updated visitor entry instance with QR code.
//  */
// async function saveQRCodeImage(qrCodeImageBuffer, visit_entry_Id) {
//   try {
//     const visitorEntry = await Visitor_new_visitentry.findByPk(visit_entry_Id);

//     if (!visitorEntry) {
//       throw new Error('Visitor entry not found');
//     }

//     // Update the visitor entry with the QR code image
//     visitorEntry.qrCodeImage = qrCodeImageBuffer;
//     await visitorEntry.save();

//     return visitorEntry;
//   } catch (error) {
//     console.error('Error saving QR code image:', error);
//     throw new Error('Unable to save QR code image');
//   }
// }

// /**
//  * Update an existing QR Code in the database.
//  * @param {number} visit_entry_Id - ID of the visitor entry to update.
//  * @param {Buffer} qrCodeImageBuffer - Buffer containing the new QR code image data.
//  * @returns {Object} - Updated visitor entry instance.
//  */
// async function updateQRCodeInDB(visit_entry_Id, qrCodeImageBuffer) {
//   try {
//     const visitorEntry = await Visitor_new_visitentry.findByPk(visit_entry_Id);

//     if (!visitorEntry) {
//       throw new Error('Visitor entry not found');
//     }

//     visitorEntry.qrCodeImage = qrCodeImageBuffer;
//     await visitorEntry.save();

//     return visitorEntry;
//   } catch (error) {
//     console.error('Error updating QR code in DB:', error);
//     throw new Error('Unable to update QR code in DB');
//   }
// }

// /**
//  * Delete a QR Code from the database.
//  * @param {number} visit_entry_Id - ID of the visitor entry to delete the QR code from.
//  * @returns {string} - Confirmation message.
//  */
// async function deleteQRCodeFromDB(visit_entry_Id) {
//   try {
//     const visitorEntry = await Visitor_new_visitentry.findByPk(visit_entry_Id);

//     if (!visitorEntry) {
//       throw new Error('Visitor entry not found');
//     }

//     visitorEntry.qrCodeImage = null; // Clear the QR code field
//     await visitorEntry.save();

//     return 'QR code deleted successfully';
//   } catch (error) {
//     console.error('Error deleting QR code from DB:', error);
//     throw new Error('Unable to delete QR code from DB');
//   }
// }

// module.exports = {
//   generateQRCodeImage,
//   saveQRCodeImage,
//   updateQRCodeInDB,
//   deleteQRCodeFromDB,
// };

//qrCode.js .. Utils

const qrCode = require("qrcode");
const Visitor_new_visitentry = require("../models/Visitor_new_visitentry");

async function generateQRCodeImage(data) {
  try {
    // Generate the QR code buffer with a specified image type
    const qrCodeBuffer = await qrCode.toBuffer(data, { type: "png" });
    return qrCodeBuffer;
  } catch (error) {
    console.error("Error generating QR code:", error);
    throw new Error("Failed to generate QR code");
  }
}

async function saveQRCodeImage(qrCodeImageBuffer, visit_entry_Id) {
  try {
    // Find the visitor entry by visit_entry_Id and update the QR code image
    const visitorEntry = await Visitor_new_visitentry.update(
      { qrCodeImage: qrCodeImageBuffer },
      { where: { visit_entry_Id } }
    );

    if (!visitorEntry[0]) {
      throw new Error("Visitor entry not found");
    }

    return visitorEntry;
  } catch (error) {
    console.error("Error saving QR code image:", error);
    throw new Error("Unable to save QR code image");
  }
};


module.exports = {
  generateQRCodeImage,
  saveQRCodeImage,
};
