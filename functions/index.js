/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();
const db = admin.firestore();

const fs = require("fs-extra");
const bucket = admin.storage().bucket();
const path = require("path");
const os = require("os");
const Papa = require("papaparse");
const { format, addHours, addMinutes } = require("date-fns");

exports.createCSV = functions.region("asia-south1")
  .firestore.document("reports/{reportId}")
  .onCreate(async (change, context) => {
    const reportId = context?.params?.reportId || "test";
    const fileName = `reports/${reportId}.csv`;
    const tempFilePath = path.join(os.tmpdir(), fileName);

    const reportRef = db.collection("reports").doc(reportId);

    try {
      const billsSnapshot = await db.collection("bills").get();

      const bills = [];

      billsSnapshot.forEach((doc) => {
        bills.push({ ...doc.data(), id: doc.id });
      });

      const preprocessedData = bills.map((item) => {
        const newItem = { ...item };
        if (newItem.time && newItem.time._seconds) {
          const dateDelist = new Date(newItem.time._seconds * 1000);
          const dateInISTDelist = addMinutes(addHours(dateDelist, 5), 30);
          newItem.time = format(dateInISTDelist, "dd-MM-yyyy hh:mm:ss aaa");
        }

        return newItem;
      });

      const csv = Papa.unparse(preprocessedData, {
        quotes: false,
        delimiter: ",",
        header: true,
        newline: "\r\n",
        dynamicTyping: true,
        skipEmptyLines: true,
      });
      await fs.outputFile(tempFilePath, csv);
      await bucket.upload(tempFilePath, { destination: fileName });

      const file = bucket.file(fileName);
      await file.makePublic();

      const publicUrl = `https://storage.googleapis.com/${bucket.name}/${fileName}`;

      return await reportRef.update({
        status: "complete",
        downloadLink: publicUrl,
        createdAt: admin.firestore.Timestamp.now(),
      });
    } catch (err) {
      return console.log(err);
    }
  });
