import React from "react";

function Footer() {
  return (
    <footer className="bg-red-100 text-gray-800 py-8">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
        {/* About Us */}
        <div>
          <h3 className="text-lg font-semibold mb-4">About Us</h3>
          <ul className="space-y-2">
            <li><a href="#!" className="hover:underline">Our Story</a></li>
            <li><a href="#!" className="hover:underline">Affiliate Program</a></li>
            <li><a href="#!" className="hover:underline">Wholesale Program</a></li>
            <li><a href="#!" className="hover:underline">Press Inquiries</a></li>
            <li><a href="#!" className="hover:underline">Careers</a></li>
          </ul>
        </div>

        {/* Customer Support */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Customer Support</h3>
          <ul className="space-y-2">
            <li><a href="#!" className="hover:underline">Returns & Exchanges</a></li>
            <li><a href="#!" className="hover:underline">Shipping Information</a></li>
            <li><a href="#!" className="hover:underline">Track Your Order</a></li>
            <li><a href="#!" className="hover:underline">Promo Code Lookup</a></li>
            <li><a href="#!" className="hover:underline">Gift Card Lookup</a></li>
          </ul>
        </div>

        {/* Connect With Us */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
          <div className="flex space-x-4 mb-4">
            <a href="#!" aria-label="Facebook"><img src="/facebook.png" alt="Facebook" className="h-6 w-6" /></a>
            <a href="#!" aria-label="Twitter"><img src="/twitter.png" alt="Twitter" className="h-6 w-6" /></a>
            {/*<a href="#!" aria-label="YouTube"><img src="/youtube.png" alt="YouTube" className="h-6 w-6" /></a>*/}
            <a href="#!" aria-label="Instagram"><img src="/instagram.png" alt="Instagram" className="h-6 w-6" /></a>
          </div>
          <p className="text-sm mb-4">
            Want 20% Off? Sign up for our Newsletter.
            <br /> Sign up for SMS alerts and be the first to know!
          </p>
          <button className="bg-red-500 text-white px-4 py-2 rounded-lg">Get in the loop!</button>
        </div>
      </div>
      <div className="container mx-auto mt-8 px-4 text-sm text-gray-600">
        <p className="text-center">
          © 2025 Indian Spice Market. All rights reserved. | <a href="#!" className="hover:underline">Privacy Policy</a> | <a href="#!" className="hover:underline">Terms & Conditions</a> | <a href="#!" className="hover:underline">Accessibility Statement</a>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
