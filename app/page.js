"use client";
import { useState } from "react";
import { ChromePicker } from "react-color";

export default function Home() {
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [firstNameSum, setFirstNameSum] = useState(0);
  const [middleNameSum, setMiddleNameSum] = useState(0);
  const [lastNameSum, setLastNameSum] = useState(0);
  const [hasInput, setHasInput] = useState(false);

  const convertToSum = (name) => {
    let sum = 0;
    for (let i = 0; i < name.length; i++) {
      const char = name[i].toLowerCase();
      if (char >= 'a' && char <= 'z') {
        sum += char.charCodeAt(0) - 96; // 'a' -> 1, 'b' -> 2, etc.
      }
    }
    return sum % 255; // Ensure the sum is within the range 0-255
  };
  const handleCalculate = () => {
    setFirstNameSum(convertToSum(firstName));
    setMiddleNameSum(convertToSum(middleName));
    setLastNameSum(convertToSum(lastName));
    setHasInput(firstName !== "" || middleName !== "" || lastName !== "")
  };

  // RGB color based on name sums
  const rgbColor = `rgb(${firstNameSum}, ${middleNameSum}, ${lastNameSum})`;

  // Condition to check if any input is provided


  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-40">
      <div className="flex flex-col items-center justify-center gap-4">
        <div className="flex md:flex-row flex-col gap-2">
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="bg-black border-2 px-3 py-2 border-gray-400 rounded-md"
          />
          <input
            type="text"
            placeholder="Middle Name"
            value={middleName}
            onChange={(e) => setMiddleName(e.target.value)}
            className="bg-black border-2 px-3 py-2 border-gray-400 rounded-md"
          />
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="bg-black border-2 px-3 py-2 border-gray-400 rounded-md"
          />
        </div>
        <button
          onClick={handleCalculate}
          className="bg-gray-800 px-4 py-2 rounded-md"
        >
          Get your Color!
        </button>
      </div>

      {/* Conditionally render the color box and ChromePicker */}
      {hasInput ? (
        <div className="flex gap-2">
          <div
            className=" md:w-48 w-36  rounded-lg"
            style={{ backgroundColor: rgbColor }}
          ></div>
          {/* <SketchPicker color={rgbColor} width={300} colors={"#4D4D4D"}/> */}
          <ChromePicker color={rgbColor} />
        </div>
      ) : (
        <p className="text-center text-3xl font-bold text-gray-600">
          Discover the color hidden in your name
        </p>
      )}

      <p>Code: {rgbColor}</p>
    </main>
  );
}
