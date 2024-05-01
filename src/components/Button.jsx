import { addDoc, collection, doc, onSnapshot } from "firebase/firestore";
import { db } from "../utils/firebase";
import { useState } from "react";

const Button = () => {
  const [report, setReport] = useState("");
  const [reportLoaded, setReportLoaded] = useState(false);

  const handleDownload = async () => {
    try {
      const reportsRef = collection(db, "reports");
      const report = await addDoc(reportsRef, {
        status: "pending",
        type: "queries",
        downloadLink: "",
      });
      const reportDocRef = doc(db, "reports", report.id);
      onSnapshot(reportDocRef, (doc) => {
        setReport(doc.data().downloadLink);
      });
      setReportLoaded(true);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center my-4">
      <button
        onClick={handleDownload}
        className="p-2 rounded-md text-sm bg-white text-black font-bold"
      >
        Get Report
      </button>
      {report === "" && reportLoaded ? (
        <div className="flex flex-row justify-center my-4">
          <div
            className="animate-spin inline-block w-6 h-6 border-[3px] border-current border-t-transparent text-gray-800 rounded-full dark:text-white"
            role="status"
            aria-label="loading"
          >
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ) : report !== "" && reportLoaded ? (
        <div className="bg-white mt-2 rounded-md p-2 text-sm font-extrabold text-purple-800">
          <a target="_blank" rel="noopener noreferrer" href={report}>
            Download Report
          </a>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Button;
