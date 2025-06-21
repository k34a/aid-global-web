"use client";

import {
	AllCommunityModule,
	ModuleRegistry,
	themeAlpine,
} from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { GridProps } from "./griddatatypes";
import { setupAgGridColumnDefinitions, setupGridData } from "./gridfns";

ModuleRegistry.registerModules([AllCommunityModule]);

const Grid = (props: GridProps) => {
	const {
		gridData,
		colDisplayNames = {},
		columnDefs = {},
		defaultColDef = {},
		uniqueColumnName = "",
		reformatColumns = {},
		defaultSorted,
		initialColsToShow = [...new Set(gridData.flatMap(Object.keys))],
		...customGridOptions
	} = props;

	const columnNames = [...new Set(gridData.flatMap(Object.keys))];
	const gridColDef = setupAgGridColumnDefinitions(
		columnNames,
		columnDefs,
		initialColsToShow,
		colDisplayNames,
	);
	const gridRowData = setupGridData(gridData, reformatColumns);
	return (
		<AgGridReact
			columnDefs={gridColDef}
			rowData={gridRowData}
			domLayout="autoHeight"
			theme={themeAlpine}
			{...customGridOptions}
		/>
	);
};

export default Grid;
