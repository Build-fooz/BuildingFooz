/* eslint-disable react/prop-types */
import { Options } from "@/config";
import { Fragment } from "react";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { Separator } from "../ui/separator";

function ProductFilter({ filters, handleFilter }) {
  return (
    <div className="bg-white shadow-lg rounded-lg w-full md:w-64 p-5 space-y-6">    
    <div className="pb-3 px-3 bg-[#F5F5F5] rounded-md flex items-center justify-between border-b border-gray-300">
      <h2 className="text-3xl font- py-2 font-semibold text-gray-800">Filters</h2>
    </div>
    <div className="space-y-6">
      {Object.keys(Options).map((keyItem) => (
        <Fragment key={keyItem}>
          <div>
            <h3 className="text-2xl py-4 font-bold text-gray-700">{keyItem}</h3>
            <div className="grid text-xl gap-6 mt-2">
              {Options[keyItem].map((option) => (
                <Label key={option.id} className="flex text-xl items-center gap-3">
                  <Checkbox
                    checked={
                      filters &&
                      Object.keys(filters).length > 0 &&
                      filters[keyItem] &&
                      filters[keyItem].indexOf(option.id) > -1
                    }
                    onCheckedChange={() => handleFilter(keyItem, option.id)}
                    className="text-primary border-gray-300 focus:ring-0 focus:border-primary"
                  />
                  <span className="text-gray-600 hover:text-gray-800 transition-colors">
                    {option.label}
                  </span>
                </Label>
              ))}
            </div>
          </div>
          <Separator className="my-3" />
        </Fragment>
      ))}
    </div>
  </div>
  );
}

export default ProductFilter;
