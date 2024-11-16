//component for scrolling in the main vieww

import React from "react";
import { Link, Element } from "react-scroll";

const SmoothScrollView = () => {
  return (
    <div>
      {/* Navigation Links */}
      <nav className="fixed top-0 w-full bg-[#080a16] z-50 p-2">
        <ul className="flex justify-around list-none p-0">
          <li>
            <Link
              to="section1"
              smooth={true}
              duration={500}
              className="text-white"
            >
              Section 1
            </Link>
          </li>
          <li>
            <Link
              to="section2"
              smooth={true}
              duration={500}
              className="text-white"
            >
              Section 2
            </Link>
          </li>
          <li>
            <Link
              to="section3"
              smooth={true}
              duration={500}
              className="text-white"
            >
              Section 3
            </Link>
          </li>
        </ul>
      </nav>

      {/* Scrollable Sections */}
      <div style={{ marginTop: "50px" }}>
        <Element
          name="section1"
          className="section"
          style={{ height: "100vh", backgroundColor: "lightblue" }}
        >
          <h1>Section 1</h1>
          <p>This is the first section.</p>
        </Element>

        <Element
          name="section2"
          className="section"
          style={{ height: "100vh", backgroundColor: "lightgreen" }}
        >
          <h1>Section 2</h1>
          <p>This is the second section.</p>
        </Element>

        <Element
          name="section3"
          className="section"
          style={{ height: "100vh", backgroundColor: "lightcoral" }}
        >
          <h1>Section 3</h1>
          <p>This is the third section.</p>
        </Element>
      </div>
    </div>
  );
};

export default SmoothScrollView;
