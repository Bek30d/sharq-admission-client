import React from "react";
import { ItemType } from "../reports/page";

const ReportItem = ({
  id,
  education_direction,
  applications_number,
}: ItemType) => {
  return (
    <div className="py-[22px] bg-white rounded-lg flex justify-between mb-2">
      <div className=" flex items-center">
        <p className="w-[60px] text-center text-[#24292F] text-sm font-medium">
          {id}
        </p>

        <p className="w-[292px] pl-5 text-[#24292F] text-sm font-medium">
          {education_direction}
        </p>
      </div>

      <p className="w-[562px] pl-5 text-[#24292F] text-sm font-medium">
        {applications_number}
      </p>
    </div>
  );
};

export default ReportItem;
