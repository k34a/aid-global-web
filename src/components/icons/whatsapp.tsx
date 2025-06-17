import { IconProps } from "./types";

const Whatsapp = (props: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`lucide lucide-whatsapp-icon lucide-whatsapp ${props.className ?? ""}`}
    >
      <path d="M16.7 13.4c-.3-.2-1.7-.8-1.9-.9s-.4-.1-.6.2-.7.9-.8 1-.3.2-.6.1c-.3-.2-1.2-.4-2.2-1.4-.8-.8-1.4-1.8-1.6-2.1s0-.4.1-.6c.2-.2.4-.5.5-.7.2-.2.1-.4 0-.6s-.6-1.5-.9-2c-.2-.5-.5-.5-.7-.5h-.6c-.2 0-.6.1-.8.4-.3.3-1.1 1.1-1.1 2.7s1.2 3.1 1.3 3.3c.2.2 2.3 3.5 5.6 4.7 2.3.9 3.2 1 4.4.9 1.3-.1 2.1-1 2.3-1.6.3-.6.3-1.2.2-1.3-.1 0-.3-.2-.6-.3z" />
      <path d="M20 12c0-4.4-3.6-8-8-8S4 7.6 4 12c0 1.4.4 2.7 1.1 3.9L4 20l4.2-1.1c1.2.6 2.5 1 3.8 1 4.4 0 8-3.6 8-8z" />
    </svg>
  );
};

export default Whatsapp;
