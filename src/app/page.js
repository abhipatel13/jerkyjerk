"use client";

import { useMemo, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SectionHeading from "../components/SectionHeading";
import Block1 from "../contents/Block1";
import Block2 from "../contents/Block2";
import Block3 from "../contents/Block3";
import Block4 from "../contents/Block4";
import Block5 from "../contents/Block5";
import Block6 from "../contents/Block6";
import Block7 from "../contents/Block7";
import Block8 from "../contents/Block8";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sectionVisibility, setSectionVisibility] = useState({
    meats: true,
    veggies: true,
    frozen: true,
    refrigerated: true,
    spices: true,
    nonPerishables: true,
    nonFood: true,
    bar: true,
  });

  const handleSearchChange = (value) => {
    setSearchTerm(value);
  };

  const handleSectionVisibilityChange = (section, isVisible) => {
    setSectionVisibility((prev) =>
      prev[section] === isVisible ? prev : { ...prev, [section]: isVisible }
    );
  };

  const hasVisibleSections = useMemo(
    () => Object.values(sectionVisibility).some(Boolean),
    [sectionVisibility]
  );

  return (
    <div className="flex min-h-screen flex-col bg-[#f5f5f5]">
      <Header searchTerm={searchTerm} onSearchChange={handleSearchChange} />
      <main className="flex-1 overflow-y-auto bg-white pb-32 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] sm:pb-20 lg:pb-8">
        {!hasVisibleSections && (
          <p className="px-4 py-12 text-center text-base text-[#6b7280]">
            No items match your search.
          </p>
        )}
        <div className={sectionVisibility.meats ? "block" : "hidden"}>
          <SectionHeading left="Meat" right="Quantity" />
          <Block1
            searchTerm={searchTerm}
            onVisibilityChange={(visible) =>
              handleSectionVisibilityChange("meats", visible)
            }
          />
        </div>
        <div className={sectionVisibility.veggies ? "block" : "hidden"}>
          <SectionHeading left="Veggies" />
          <Block2
            searchTerm={searchTerm}
            onVisibilityChange={(visible) =>
              handleSectionVisibilityChange("veggies", visible)
            }
          />
        </div>
        <div className={sectionVisibility.frozen ? "block" : "hidden"}>
          <SectionHeading left="Frozen-Food" />
          <Block3
            searchTerm={searchTerm}
            onVisibilityChange={(visible) =>
              handleSectionVisibilityChange("frozen", visible)
            }
          />
        </div>
        <div className={sectionVisibility.refrigerated ? "block" : "hidden"}>
          <SectionHeading left="Refrigerated" />
          <Block4
            searchTerm={searchTerm}
            onVisibilityChange={(visible) =>
              handleSectionVisibilityChange("refrigerated", visible)
            }
          />
        </div>
        <div className={sectionVisibility.spices ? "block" : "hidden"}>
          <SectionHeading left="Spices" />
          <Block5
            searchTerm={searchTerm}
            onVisibilityChange={(visible) =>
              handleSectionVisibilityChange("spices", visible)
            }
          />
        </div>
        <div
          className={sectionVisibility.nonPerishables ? "block" : "hidden"}
        >
          <SectionHeading left="Non-perishable" />
          <Block6
            searchTerm={searchTerm}
            onVisibilityChange={(visible) =>
              handleSectionVisibilityChange("nonPerishables", visible)
            }
          />
        </div>
        <div className={sectionVisibility.nonFood ? "block" : "hidden"}>
          <SectionHeading left="Non-Food" />
          <Block7
            searchTerm={searchTerm}
            onVisibilityChange={(visible) =>
              handleSectionVisibilityChange("nonFood", visible)
            }
          />
        </div>
        <div className={sectionVisibility.bar ? "block" : "hidden"}>
          <SectionHeading left="Bar" />
          <Block8
            searchTerm={searchTerm}
            onVisibilityChange={(visible) =>
              handleSectionVisibilityChange("bar", visible)
            }
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}
