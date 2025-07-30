'use client';

import { useFormState } from 'react-dom';
import { handleFormAction } from './actions';

const initialState = { message: '' };

export default function ContactPage() {
  const [state, formAction] = useFormState(handleFormAction, initialState);

  return (
    <div className="max-w-lg mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Contact Us</h1>
      <form action={formAction} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          className="w-full border p-2 rounded"
          required
        />
        <textarea
          name="message"
          placeholder="Your Message"
          rows="4"
          className="w-full border p-2 rounded"
          required
        ></textarea>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Send Message
        </button>
        {state.message && (
          <p className="mt-2 text-sm text-green-700">{state.message}</p>
        )}
      </form>
    </div>
  );
}
