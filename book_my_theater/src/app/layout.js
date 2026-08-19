import "./globals.css";

export const metadata = {
  title: "Book My Theater",
  description: "A Jatra Ticket Booking Platform.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,300,1,200" />
        <script src="https://checkout.razorpay.com/v1/checkout.js" async/>
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
