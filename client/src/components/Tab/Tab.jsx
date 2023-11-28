import React, { useState } from "react";
import "./Tab.css";

export const Tab = () => {
  const [activeTab, setActiveTab] = useState(1);

  const handleTabClick = (id) => {
    setActiveTab(id);
  };

  return (
    <div className="tabs-container">
      <ul className="tabs">
        <li
          className={`tab-title ${activeTab === 1 ? "active" : ""}`}
          onClick={() => handleTabClick(1)}
        >
          First Tab
        </li>
        <li
          className={`tab-title ${activeTab === 2 ? "active" : ""}`}
          onClick={() => handleTabClick(2)}
        >
          Second Tab
        </li>
        <li
          className={`tab-title ${activeTab === 3 ? "active" : ""}`}
          onClick={() => handleTabClick(3)}
        >
          Third Tab
        </li>
        <li
          className={`tab-title ${activeTab === 4 ? "active" : ""}`}
          onClick={() => handleTabClick(4)}
        >
          Forth Tab
        </li>
      </ul>

      <div className="tab-content">
        {activeTab === 1 && <div className="tab-panel">First tab content</div>}
        {activeTab === 2 && <div className="tab-panel">Second tab content</div>}
        {activeTab === 3 && <div className="tab-panel">Third tab content</div>}
        {activeTab === 4 && <div className="tab-panel">Forth tab content</div>}
      </div>
    </div>
  );
};
