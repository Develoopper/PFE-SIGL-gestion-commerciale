import React from 'react';

export default function CaisseItem({ montant, item, indexItem }) {
  return (
    <div className="caisseItem" style={{ marginRight: (indexItem === 0 || indexItem === 2) && 170 }} key={item.title}>
      <div style={{ display: "flex", alignItems: "flex-end", minWidth: 250 }}>
        <img className="iconShadow" src={item.icon} style={{ height: 100, width: 100, marginRight: 20 }} alt=""/>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 35, fontWeight: 500 }}>{item.title}</div>
          <div style={{ fontSize: 25, display: "flex", alignItems: "center", color: "#62a83d" }}>
            {/* {ventesState.reduce((total, item) => total + item[7 + i.val], 0)} */}
            {montant}
            <div style={{ width: 7 }}/>
            DH
          </div>
        </div>
      </div>
    </div>
  );
}