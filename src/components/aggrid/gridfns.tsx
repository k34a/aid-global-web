import { ColDef } from "ag-grid-community";
import {
	GridColDefs,
	GridColumnsReformatting,
	GridData,
} from "./griddatatypes";
import { commonReformatColumnFields } from "./gridcfg";

function setupAgGridColumnDefinitions(
	columnNames: string[],
	columnDefs: GridColDefs,
	initialColsToShow: string[],
	colDisplayNames: Record<string, string>,
) {
	return columnNames.map((columnName) => {
		const hide = !initialColsToShow.includes(columnName);
		const headerName =
			colDisplayNames[columnName] ??
			columnDefs[columnName]?.headerName ??
			columnName;
		const columnDef: ColDef = {
			field: columnName,
			headerName,
			headerTooltip: headerName,
			tooltipField: columnName,
			filterParams: {
				excelMode: "windows",
			},
			hide,
			...(columnDefs[columnName] ?? {}),
		};
		return columnDef;
	});
}

function setupGridData(
	rowData: GridData,
	customReformattableFields: GridColumnsReformatting = {},
) {
	const allReformattableFields: GridColumnsReformatting = {
		...commonReformatColumnFields,
	};
	Object.keys(allReformattableFields).forEach((fieldType) => {
		allReformattableFields[fieldType] = [
			...allReformattableFields[fieldType],
			...(customReformattableFields[fieldType] ?? []),
		];
	});

	return rowData.map((data) => {
		const updatedData = {
			...data,
		};
		Object.keys(data).forEach((columnName) => {
			try {
				if (allReformattableFields["datetime"]?.includes(columnName)) {
					if (typeof data[columnName] === "number") {
						updatedData[columnName] = new Date(data[columnName])
							.toISOString()
							.replace("T", "")
							.split(".")[0];
						return;
					}
					if (typeof data[columnName] === "string") {
						updatedData[columnName] = data[columnName].replace(
							"T",
							"",
						);
						return;
					}

					if (data[columnName] instanceof Date) {
						updatedData[columnName] = data[columnName]
							.toISOString()
							.replace("T", "")
							.split(".")[0];
						return;
					}

					updatedData[columnName] = data[columnName];
					return;
				}
				if (allReformattableFields["date"]?.includes(columnName)) {
					if (typeof data[columnName] === "number") {
						updatedData[columnName] = new Date(data[columnName])
							.toISOString()
							.split("T")[0];
						return;
					}
					if (typeof data[columnName] === "string") {
						updatedData[columnName] =
							data[columnName].split("T")[0];
						return;
					}

					if (data[columnName] instanceof Date) {
						updatedData[columnName] = data[columnName]
							.toISOString()
							.split("T")[0];
						return;
					}

					updatedData[columnName] = data[columnName];
					return;
				}

				updatedData[columnName] = data[columnName];
			} catch (error) {
				console.error(error);
				updatedData[columnName] = data[columnName];
			}
		});
		return updatedData;
	});
}

export { setupAgGridColumnDefinitions, setupGridData };
