import React from 'react'
import { HotTable } from "@handsontable/react";

function HotTableMemo(props) {
  return <HotTable {...props}/>
}

export default React.memo(HotTableMemo)
