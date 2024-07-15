import { useCallback, useEffect, useRef, useState } from "react";

function PasswordForm() {
  const [Password, setPassword] = useState("");
  const [Length, setLength] = useState(8);
  const [NumAllowed, setNumAllowed] = useState(false);
  const [CharAllowed, setCharAllowed] = useState(false);

  const generatingPassword = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (NumAllowed) str += "0123456789";
    if (CharAllowed) str += "!#$%&*+-/?@_";

    for (let i = 0; i < Length; i++) {
      const char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [Length, CharAllowed, NumAllowed]);

  const copyPasswordToClipboard = () => {
    navigator.clipboard.writeText(Password);
    passwordRef.current.select();
    const btn = document.querySelector(".btn");
    btn.textContent = "Copied!";
    btn.style.backgroundColor = "green";

    setTimeout(() => {
      btn.textContent = "Copy";
      btn.style.backgroundColor = "";
    }, 2000);
  };

  const passwordRef = useRef(null);

  useEffect(() => {
    generatingPassword();
  }, [Length, NumAllowed, CharAllowed]);

  return (
    <div className="w-full h-full rounded-lg">
      <form
        className="w-[80%] mx-auto rounded-lg h-[2.5rem] overflow-hidden mb-7"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <input
          type="text"
          className="w-[85%] h-full outline-none text-orange-500 font-medium px-2 text-xl"
          value={Password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          readOnly
          ref={passwordRef}
        />
        <button
          type="button"
          className="bg-blue-500 w-[15%] h-full text-xl btn"
          onClick={copyPasswordToClipboard}
        >
          Copy
        </button>
      </form>

      <div className="w-[80%] flex justify-center ml-4">
        <div className="password-range">
          <input
            type="range"
            min={6}
            max={50}
            value={Length}
            onChange={(e) => setLength(Number(e.target.value))}
          />
          <label className="text-orange-400 font-semibold">
            Length: {Length}
          </label>
        </div>
        <div className="mx-5">
          <input
            type="checkbox"
            id="num"
            className="w-4 h-4"
            checked={NumAllowed}
            onChange={() => setNumAllowed((prev) => !prev)}
          />
          <label htmlFor="num" className="text-[1.1rem] text-orange-400">
            Numbers
          </label>
        </div>
        <div>
          <input
            type="checkbox"
            id="char"
            className="w-4 h-4"
            checked={CharAllowed}
            onChange={() => setCharAllowed((prev) => !prev)}
          />
          <label htmlFor="char" className="text-[1.1rem] text-orange-400">
            Characters
          </label>
        </div>
      </div>
    </div>
  );
}

export default PasswordForm;
