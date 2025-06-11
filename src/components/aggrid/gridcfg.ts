import { ColDef, GridOptions } from "ag-grid-community";
import { GridColumnsReformatting } from "./griddatatypes";

const defaultColDef: ColDef = {
	filter: "agSetColumnFilter",
	filterParams: {
		applyMiniFilterWhileTyping: false,
		excelMode: "windows",
	},
	resizable: true,
	sortable: true,
};

const defaultGridOptions: GridOptions = {
	rowSelection: {
		mode: "singleRow",
		enableClickSelection: true,
		copySelectedRows: false,
	},
	pagination: true,
	paginationPageSize: 400,
	enableCellTextSelection: false,
	rowStyle: {
		fontSize: "12px",
	},
};

const commonReformatColumnFields: GridColumnsReformatting = {
	date: ["created_at", "updated_at"],
};

export { defaultGridOptions, commonReformatColumnFields, defaultColDef };
