import type {
	ColDef,
	GridOptions,
	AgGridEvent,
	GridState,
} from "ag-grid-community";

type GridCellValueDataType = string | number | Date | boolean | null;

type RowDoubleClickFunctionType = (data: GridCellValueDataType) => void;

type GridColDefs = Record<string, ColDef>;

type GridData = Array<Record<string, GridCellValueDataType>>;

type GridColumnsReformatting = Record<string, Array<string>>;

interface GridProps
	extends Omit<GridOptions, "columnDefs" | "defaultColDef" | "rowData"> {
	gridData: GridData;
	colDisplayNames?: Record<string, string>;
	columnDefs?: GridColDefs;
	defaultColDef?: ColDef;
	uniqueColumnName?: string;
	reformatColumns?: GridColumnsReformatting;
	onRowDoubleClick?: RowDoubleClickFunctionType;
	defaultSorted?: {
		columnKeyName: string;
		sort: "asc" | "desc";
	};
	initialColsToShow?: string[];
	saveGridStateBeforeDestroy?: (state: GridState) => void;
}

type GridEventHandler = (params: AgGridEvent) => void;

export type {
	GridProps,
	GridColumnsReformatting,
	RowDoubleClickFunctionType,
	GridCellValueDataType,
	GridColDefs,
	GridEventHandler,
	GridData,
};
