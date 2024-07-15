import React, { useState } from "react";
import PasswordForm from "./Components/PasswordForm";

function App() {
  return (
    <div className="bg-zinc-900 w-[45%] h-[30vh] mx-auto py-[2rem] rounded-lg">
      <h1 className="text-2xl mb-5">Password generator</h1>
      <PasswordForm />
    </div>
  );
}

export default App;
