
import React, { useEffect, useState } from "react";
import UrlPath from "../../../../components/shared/UrlPath";
import PageHeading from "../../../../components/shared/PageHeading";
import DefineUnitHandler from "../../../../handlers/DefineUnitHandler";
import ReusableTable from "../../../../components/shared/ReusableTable";

const UnitList = () => {

  const { getUnitsHandler } = DefineUnitHandler();
  
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [data, setData] = useState([]);

  

  useEffect(() => {
    const fetchData = async () => {
      const res = await getUnitsHandler({ page: pageIndex, pageSize });
      if (res) {
        console.log("API Data:", res);
        setData(res.data || []);
        setTotalCount(res.total || 0);
        setTotalPages(res.totalPages || 0);
      } else {
        setData([]);
      }
    };
  
    fetchData();
  }, [pageIndex, pageSize]);

  const columns = [
    { Header: "UNIT NAME", accessor: "unitName" },
    { Header: "UNIT NUMBER", accessor: "unitNumber" },
    { Header: "UNIT SIZE", accessor: "unitsize" },
    { Header: "FLOOR NAME", accessor: "floor.floorName" },
    { Header: "UNIT TYPE", accessor: "unitType.unitTypeName" },
  ];

  return (
    <div>
      <UrlPath paths={["Building Management", "Unit List"]} />
      <PageHeading heading={["Unit List"]} />

      <div className="flex flex-row my-3 font-sans text-lg font-medium text-gray-700">
        TOTAL {totalCount} UNITS
      </div>
      
      <ReusableTable
        columns={columns}
        data={data}
        pageIndex={pageIndex}
        pageSize={pageSize}
        totalCount={totalCount}
        totalPages={totalPages}
        setPageIndex={setPageIndex}
        setPageSize={setPageSize}
      />
    </div>
  );
};

export default UnitList;
