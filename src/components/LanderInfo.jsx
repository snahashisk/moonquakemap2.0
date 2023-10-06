import React from "react";

const LanderInfo = (props) => {
  const allInfo = [
    {
      name: "Apollo 11",
      mission_number: 11,
      launch_date: "July 16, 1969",
      launch_time: "13:32:00 UTC",
      landing_date: "July 20, 1969",
      landing_time: "20:17:40 UTC",
      mission_duration: "4 days, 6 hours, 45 minutes",
      latitude: 0.67416,
      longitude: 23.47314,
    },
    {
      name: "Apollo 12",
      mission_number: 12,
      launch_date: "November 14, 1969",
      launch_time: "16:22:00 UTC",
      landing_date: "November 19, 1969",
      landing_time: "06:54:35 UTC",
      mission_duration: "4 days, 19 hours, 32 minutes",
      latitude: -3.0128,
      longitude: -23.4219,
    },
    {
      name: "Apollo 14",
      mission_number: 14,
      launch_date: "January 31, 1971",
      launch_time: "21:03:02 UTC",
      landing_date: "February 5, 1971",
      landing_time: "09:18:11 UTC",
      mission_duration: "4 days, 12 hours, 15 minutes",
      latitude: -3.64589,
      longitude: -17.47194,
    },
    {
      name: "Apollo 15",
      mission_number: 15,
      launch_date: "July 26, 1971",
      launch_time: "13:34:00 UTC",
      landing_date: "July 30, 1971",
      landing_time: "22:16:29 UTC",
      mission_duration: "4 days, 8 hours, 42 minutes",
      latitude: 26.13239,
      longitude: 3.6333,
    },
    {
      name: "Apollo 16",
      mission_number: 16,
      launch_date: "April 16, 1972",
      launch_time: "17:54:00 UTC",
      landing_date: "April 20, 1972",
      landing_time: "02:23:35 UTC",
      mission_duration: "4 days, 8 hours, 29 minutes",
      latitude: -8.9734,
      longitude: 15.5011,
    },
    {
      name: "Apollo 17",
      mission_number: 17,
      launch_date: "December 7, 1972",
      launch_time: "05:55:42 UTC",
      landing_date: "December 11, 1972",
      landing_time: "19:55:35 UTC",
      mission_duration: "4 days, 13 hours, 59 minutes",
      latitude: 20.1911,
      longitude: 30.7723,
    },
  ];

  const matchedInfo = allInfo.find((info) => info.name === props.name);

  return (
    <div className="text-white absolute mt-10 ml-10 w-1/4 z-10">
      <div className="flex flex-col gap-8">
        <h2 className="text-5xl font-semibold text-yellow-400 leading-sung">
          Lunar Module Information
        </h2>
        <p className="leading-sung text-gray-200">
          NASA's Apollo missions, beyond lunar landings, pioneered in deploying
          seismometers, unraveling mysteries of moonquakes. The Apollo Passive
          Seismic Experiment detected seismic activities, revealing crucial data
          about the Moon's internal structure, thereby advancing our
          understanding of its geological mechanisms and formation.
        </p>
      </div>
      <div className="mt-10 text-md flex flex-col gap-2 text-lg text-gray-200">
        <p>
          <span className="text-orange-400">Name:</span> {matchedInfo?.name}
        </p>
        <p>
          <span className="text-lime-400">Launch Date: </span>
          {matchedInfo?.launch_date}
        </p>
        <p>
          <span className="text-lime-400">Launch Time:</span>{" "}
          {matchedInfo?.launch_time}
        </p>
        <p>
          <span className="text-red-400">Landing date:</span>{" "}
          {matchedInfo?.landing_date}
        </p>
        <p>
          <span className="text-red-400">Landing Time:</span>{" "}
          {matchedInfo?.landing_time}
        </p>
        <p>
          <span className="text-teal-400">Mission Duration:</span>{" "}
          {matchedInfo?.mission_duration}
        </p>
        <p>
          <span className="text-purple-500">Latitude:</span>{" "}
          {matchedInfo?.latitude}
        </p>
        <p>
          <span className="text-purple-500">Longitude:</span>{" "}
          {matchedInfo?.longitude}
        </p>
      </div>
    </div>
  );
};

export default LanderInfo;
