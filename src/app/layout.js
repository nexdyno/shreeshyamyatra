import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/componets/common/Navbar";
import Footer from "@/container/home/Footer";
import MobileFooter from "@/componets/common/MobileFooter";
import { AppProvider } from "@/context/AppContext";
import StoreProvider from "@/providers/StoreProvider";
import { Toaster } from "react-hot-toast";

// Font configurations
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

// Enhanced metadata configuration
export const metadata = {
  metadataBase: new URL("https://shreeshyamyatra.com"),
  title: {
    default: "Shree Shyam Yatra - Best Dharamshala & Hotel Booking in Khatu",
    template: "%s | Shree Shyam Yatra",
  },
  description:
    "Book the best dharamshalas and hotels in Khatu Shyam. Comfortable stays, budget-friendly rooms, and excellent facilities for pilgrims. Trusted by thousands of devotees and Find here all Hotels contact number and booking price.",
  keywords: [
    "Khatu dharamshala booking",
    "best hotels in Khatu",
    "Khatu Shyam accommodation",
    "budget rooms in Khatu",
    "Khatu pilgrimage stay",
    "best dharamshala near Khatu temple",
    "hotel booking Khatu",
    "affordable accommodation Khatu",
    "Khatu Shyam Ji rooms",
    "pilgrim accommodation Khatu",
    "online dharamshala booking",
    "hotel room booking",
    "online room booking",
    "online hotel room",
    "hotel near temple",
    "guest house booking",
    "list of hotel",
  ],
  authors: [{ name: "Shree Shyam Yatra" }],
  creator: "Shree Shyam Yatra",
  publisher: "Shree Shyam Yatra",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },

  // Open Graph metadata
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://shreeshyamyatra.com",
    siteName: "Shree Shyam Yatra",
    title: "Best Dharamshala & Hotel Booking in Khatu - Shree Shyam Yatra",
    description:
      "Find and book the best dharamshalas and hotels in Khatu. Comfortable stays near Khatu Shyam temple with modern amenities and pilgrim-friendly facilities.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Shree Shyam Yatra - Khatu Accommodation",
      },
    ],
  },

  // Twitter metadata
  twitter: {
    card: "summary_large_image",
    title: "Best Dharamshala & Hotel Booking in Khatu",
    description:
      "Book comfortable and affordable stays near Khatu Shyam temple. Perfect for pilgrims and families.",
    images: ["/twitter-image.jpg"],
  },

  // Additional metadata
  alternates: {
    canonical: "https://shreeshyamyatra.com",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google:
      "google-site-verification=hOHB1aoIJ7M0hzHze6Llfrh5eUORDTY-uWG1jRdq2HE",
  },
};

// Structured data for better SEO
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  name: "Shree Shyam Yatra",
  description:
    "Book the best dharamshalas and hotels in Khatu Shyam. Comfortable stays, budget-friendly rooms, and excellent facilities for pilgrims.",
  url: "https://shreeshyamyatra.com",
  areaServed: {
    "@type": "City",
    name: "Khatu",
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Khatu",
    addressRegion: "Rajasthan",
    addressCountry: "IN",
  },
  priceRange: "₹₹",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    reviewCount: "250",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Favicon configuration */}
        <link rel="icon" href="/favicon.svg" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />

        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
        <meta
          name="google-site-verification"
          content="google-site-verification=hOHB1aoIJ7M0hzHze6Llfrh5eUORDTY-uWG1jRdq2HE"
        />

        {/* Structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <StoreProvider>
          <AppProvider>
            <div className="hidden lg:block">
              <Navbar />
            </div>
            <Toaster position="top-right" reverseOrder={false} />
            {children}
            <div className="hidden md:block">
              <Footer />
            </div>
          </AppProvider>
        </StoreProvider>
      </body>
    </html>
  );
}

// import localFont from "next/font/local";
// import "./globals.css";
// import Navbar from "@/componets/common/Navbar";
// import Footer from "@/container/home/Footer";
// import MobileFooter from "@/componets/common/MobileFooter";
// import { AppProvider } from "@/context/AppContext";
// import StoreProvider from "@/providers/StoreProvider";
// import { Toaster } from "react-hot-toast";

// // Font configurations
// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });

// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

// // Enhanced metadata configuration
// export const metadata = {
//   metadataBase: new URL("https://shreeshyamyatra.com"),
//   title: {
//     default: "Shree Shyam Yatra - Best Dharamshala & Hotel Booking in Khatu",
//     template: "%s | Shree Shyam Yatra",
//   },
//   description:
//     "Book the best dharamshalas and hotels in Khatu Shyam. Comfortable stays, budget-friendly rooms, and excellent facilities for pilgrims. Trusted by thousands of devotees and Find here all Hotels contact number and booking price.",
//   keywords: [
//     "Khatu dharamshala booking",
//     "best hotels in Khatu",
//     "Khatu Shyam accommodation",
//     "budget rooms in Khatu",
//     "Khatu pilgrimage stay",
//     "best dharamshala near Khatu temple",
//     "hotel booking Khatu",
//     "affordable accommodation Khatu",
//     "Khatu Shyam Ji rooms",
//     "pilgrim accommodation Khatu",
//     "online dharamshala booking",
//     "hotel room booking",
//     "online room booking",
//     "online hotel room",
//     "hotel near temple",
//     "guest house booking",
//     "list of hotel",
//   ],
//   authors: [{ name: "Shree Shyam Yatra" }],
//   creator: "Shree Shyam Yatra",
//   publisher: "Shree Shyam Yatra",
//   formatDetection: {
//     email: false,
//     address: false,
//     telephone: false,
//   },

//   // Open Graph metadata
//   openGraph: {
//     type: "website",
//     locale: "en_IN",
//     url: "https://shreeshyamyatra.com",
//     siteName: "Shree Shyam Yatra",
//     title: "Best Dharamshala & Hotel Booking in Khatu - Shree Shyam Yatra",
//     description:
//       "Find and book the best dharamshalas and hotels in Khatu. Comfortable stays near Khatu Shyam temple with modern amenities and pilgrim-friendly facilities.",
//     images: [
//       {
//         url: "/og-image.jpg",
//         width: 1200,
//         height: 630,
//         alt: "Shree Shyam Yatra - Khatu Accommodation",
//       },
//     ],
//   },

//   // Twitter metadata
//   twitter: {
//     card: "summary_large_image",
//     title: "Best Dharamshala & Hotel Booking in Khatu",
//     description:
//       "Book comfortable and affordable stays near Khatu Shyam temple. Perfect for pilgrims and families.",
//     images: ["/twitter-image.jpg"],
//   },

//   // Additional metadata
//   alternates: {
//     canonical: "https://shreeshyamyatra.com",
//   },
//   robots: {
//     index: true,
//     follow: true,
//     googleBot: {
//       index: true,
//       follow: true,
//       "max-video-preview": -1,
//       "max-image-preview": "large",
//       "max-snippet": -1,
//     },
//   },
//   verification: {
//     google:
//       "google-site-verification=hOHB1aoIJ7M0hzHze6Llfrh5eUORDTY-uWG1jRdq2HE",
//   },

//   // Favicon metadata
//   icons: {
//     icon: "/faviccon.ico",
//     apple: "/apple-touch-icon.png",
//     shortcut: "/faviccon.ico",
//   },
// };

// // Structured data for better SEO
// const jsonLd = {
//   "@context": "https://schema.org",
//   "@type": "TravelAgency",
//   name: "Shree Shyam Yatra",
//   description:
//     "Book the best dharamshalas and hotels in Khatu Shyam. Comfortable stays, budget-friendly rooms, and excellent facilities for pilgrims.",
//   url: "https://shreeshyamyatra.com",
//   areaServed: {
//     "@type": "City",
//     name: "Khatu",
//   },
//   address: {
//     "@type": "PostalAddress",
//     addressLocality: "Khatu",
//     addressRegion: "Rajasthan",
//     addressCountry: "IN",
//   },
//   priceRange: "₹₹",
//   aggregateRating: {
//     "@type": "AggregateRating",
//     ratingValue: "4.8",
//     reviewCount: "250",
//   },
// };

// export default function RootLayout({ children }) {
//   return (
//     <html lang="en">
//       <head>
//         {/* Favicon configuration */}
//         <link rel="icon" href="/faviccon.ico" />
//         <link
//           rel="apple-touch-icon"
//           sizes="180x180"
//           href="/apple-touch-icon.png"
//         />
//         <link
//           rel="icon"
//           type="image/png"
//           sizes="32x32"
//           href="/favicon-32x32.png"
//         />
//         <link
//           rel="icon"
//           type="image/png"
//           sizes="16x16"
//           href="/favicon-16x16.png"
//         />
//         <link rel="manifest" href="/site.webmanifest" />
//         <link
//           rel="alternate"
//           href="https://shreeshyamyatra.com"
//           hreflang="en-in"
//         />

//         <meta name="msapplication-TileColor" content="#da532c" />
//         <meta name="theme-color" content="#ffffff" />
//         <meta
//           name="google-site-verification"
//           content="google-site-verification=hOHB1aoIJ7M0hzHze6Llfrh5eUORDTY-uWG1jRdq2HE"
//         />

//         {/* Structured data */}
//         <script
//           type="application/ld+json"
//           dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
//         />
//       </head>
//       <body
//         className={`${geistSans.variable} ${geistMono.variable} antialiased`}
//       >
//         <StoreProvider>
//           <AppProvider>
//             <div className="hidden lg:block">
//               <Navbar />
//             </div>
//             <Toaster position="top-right" reverseOrder={false} />
//             {children}
//             <div className="hidden md:block">
//               <Footer />
//             </div>
//           </AppProvider>
//         </StoreProvider>
//       </body>
//     </html>
//   );
// }
