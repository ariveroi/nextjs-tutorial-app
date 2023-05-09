import Navigation from "@/components/Navigation";
import "@/styles/globals.css";

export const metadata = {
  title: "Next App and Amplify",
  description: "Amplify and Next joined together",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navigation />
        {children}
      </body>
    </html>
  );
}
