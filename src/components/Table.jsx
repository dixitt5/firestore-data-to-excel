"use client";

import { db } from "../utils/firebase";
import { useState, useEffect } from "react";
import { collection, query, orderBy, getDocs } from "firebase/firestore";
import Button from "./Button";

export default function Table() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchLogs = async () => {
      setLoading(true);
      const logsRef = collection(db, "bills");
      const logsQuery = query(logsRef, orderBy("time", "desc"));
      const logsSnapshot = await getDocs(logsQuery);
      const logsData = logsSnapshot.docs.map((doc) => doc.data());
      setLogs(logsData);
      setLoading(false);
    };
    fetchLogs();
  }, []);

  return (
    <div className=" dark:bg-slate-900 bg-gray-100 flex h-full items-left pb-96 text-black">
      <div className="max-w-auto mx-auto p-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800 sm:text-4xl dark:text-white">
            User Bills
          </h1>
        </div>

        <div className="flex flex-col bg-white rounded-md mt-4 p-6">
          <div className="flex flex-col">
            <div className="-m-1.5 overflow-x-auto">
              <div className="p-1.5 min-w-full inline-block align-middle">
                <div className="overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead>
                      <tr>
                        <th
                          scope="col"
                          className="px-2 py-3 text-center text-xs font-medium text-gray-500 uppercase"
                        >
                          Index
                        </th>

                        <th
                          scope="col"
                          className="px-2 py-3 text-center text-xs font-medium text-gray-500 uppercase"
                        >
                          Name
                        </th>
                        <th
                          scope="col"
                          className="px-2 py-3 text-center text-xs font-medium text-gray-500 uppercase"
                        >
                          Bills
                        </th>
                        <th
                          scope="col"
                          className="px-2 py-3 text-center text-xs font-medium text-gray-500 uppercase"
                        >
                          Time
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      {logs.map((item, index) => (
                        <tr key={index}>
                          <td className="px-2 py-4 whitespace-nowrap text-sm font-medium text-black place-self-center">
                            {index + 1}
                          </td>
                          <td className="px-2 py-4 whitespace-nowrap text-center font-bold text-sm text-black">
                            <div className="flex flex-row gap-2 justify-center items-center">
                              <span>{item.name}</span>
                            </div>
                          </td>
                          <td className="px-2 py-4 whitespace-nowrap text-center font-bold text-sm text-black">
                            <div className="flex flex-row gap-2 justify-center items-center">
                              <span>{item.bills}</span>
                            </div>
                          </td>
                          <td className="px-2 py-4 whitespace-nowrap text-center text-sm font-bold">
                            <div className="text-black">
                              {item?.time
                                ? item?.time.toDate().toLocaleTimeString() +
                                  " " +
                                  item?.time.toDate().toDateString()
                                : "Not Set"}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="flex justify-center">
                    {loading && <p>Loading..</p>}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Button />
      </div>
    </div>
  );
}
