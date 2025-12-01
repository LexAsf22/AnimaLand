import { useState } from "react";

export default function Register({ onRegister, onSwitchToLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (password !== confirm) {
      alert("Passwords do not match");
      return;
    }

    if (username.trim() === "") {
      alert("Username cannot be empty");
      return;
    }

    const success = onRegister(username.trim(), password);
    if (success) {
      setUsername("");
      setPassword("");
      setConfirm("");
    }
  }

  return (
    <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-green-900">Register Account</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Username"
          className="w-full p-3 border border-green-300 rounded"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 border border-green-300 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirm Password"
          className="w-full p-3 border border-green-300 rounded"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full bg-green-700 text-white py-3 rounded hover:bg-green-800 transition"
        >
          Register
        </button>
      </form>

      <p className="mt-6 text-center">
        Already have an account?{" "}
        <button
          onClick={onSwitchToLogin}
          className="text-green-700 hover:underline font-semibold"
        >
          Login here
        </button>
      </p>
    </div>
  );
}
