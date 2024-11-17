
/* eslint-disable react/prop-types */
import { filterOptions } from "@/config";
import { Fragment } from "react";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { Separator } from "../ui/separator";

function ProductFilter({ filters, handleFilter }) {
  return (
    <div className="bg-white shadow-md rounded-lg w-64">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-extrabold text-gray-700">Filters</h2>
      </div>
      <div className="p-4 space-y-4">
        {Object.keys(filterOptions).map((keyItem) => (
          <Fragment key={keyItem}> {/* Unique key added here */}
            <div>
              <h3 className="text-base font-bold text-gray-600">{keyItem}</h3>
              <div className="grid gap-2 mt-2">
                {filterOptions[keyItem].map((option) => (
                  <Label key={option.id} className="flex items-center gap-2"> {/* Unique key added here */}
                    <Checkbox
                      checked={
                        filters &&
                        Object.keys(filters).length > 0 &&
                        filters[keyItem] &&
                        filters[keyItem].indexOf(option.id) > -1
                      }
                      onCheckedChange={() => handleFilter(keyItem, option.id)}
                    />
                    <span className="text-gray-700">{option.label}</span>
                  </Label>
                ))}
              </div>
            </div>
            <Separator className="my-4" />
          </Fragment>
        ))}
      </div>
    </div>
  );
}

export default ProductFilter;
