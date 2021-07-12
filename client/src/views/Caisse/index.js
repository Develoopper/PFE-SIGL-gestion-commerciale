import React,  { useState } from "react";
import { useSelector } from "react-redux";
import cashIcon from "../../images/cashIcon.png"
import chequeIcon from "../../images/chequeIcon.png"
import tpeIcon from "../../images/tpeIcon.png"
import virementIcon from "../../images/virementIcon.png"
import TransfertFAB from "./TransfertFAB";
import HistoriqueFAB from "./HistoriqueFAB";
import CaisseItem from "./CaisseItem";
import { CircularProgress, Zoom } from "@material-ui/core";

const style = {
  top: "auto",
  right: "40px",
  bottom: "35px",
  left: "auto",
  position: "fixed"
}

export default function Caisse() {
	const caisseState  = useSelector(state => state.caisseState);
	const loadingState = useSelector(state => state.loadingState);
	const userState 	 = useSelector(state => state.userState);

	const [hoveredState, setHovered] = useState(false);

	const caisseValues = Object.values(caisseState);
	let j = 0;
	
  return (
		loadingState ? 
			<CircularProgress color="primary" size={150} thickness={2}/>
		:
			<>
				<div className="caisse">
					{
						caisseItemList.map((row, indexRow) => (
							<div style={{ display: "flex", paddingBottom: (indexRow === 0) && 90 }} key={indexRow}>
							{
								row.map((item, indexItem) => {
									return (
										!((indexRow + indexItem) % 2 === 0 || indexRow + indexItem === 0) ?
											<div className="caisseSpacer" key={indexRow + " " + indexItem}/>
										: 
											<CaisseItem
												montant={caisseValues[j++]} 
												item={item} 
												indexItem={indexItem} 
												key={indexRow + " " + indexItem}
											/>
									);
								})
							}
							</div>
						))
					}
				</div>
				{
					userState === "Nabil" &&
						<div className="transfertFAB" style={style} onMouseLeave={() => setHovered(false)}>
							<Zoom in={hoveredState}>
								<div><HistoriqueFAB setHovered={setHovered}/></div>
							</Zoom>
							<div style={{ height: 20 }}/>
							<TransfertFAB setHovered={setHovered}/>
						</div>
				}
			</>
  );
}

const caisseItemList = [
	[
		{ icon: cashIcon, title: "Espèce" },
		{},
		{ icon: chequeIcon, title: "Chèque" },
		{},
	],
	[
		{},
		{ icon: tpeIcon, title: "TPE" },
		{},
		{ icon: virementIcon, title: "Virement" },
	]
]