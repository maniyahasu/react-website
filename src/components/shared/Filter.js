import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    filterProducts,
    resetProductFilters,
} from "../../redux/actions/ProductActions";

const Filter = () => {
    const masterProduct = useSelector(
        (state) => state.allProducts.masterProducts
    );
    const isFilteredApplied = useSelector(
        (state) => state.allProducts.isProductFiltered
    );
    const productCategory = useSelector(
        (state) => state.allProducts.productCategory
    );
    const dispatch = useDispatch();
    const handleFilterChange = (e) => {
        if (e.target.value !== "select-category") {
            dispatch(filterProducts(e.target.value));
        } else {
            dispatch(resetProductFilters(masterProduct));
        }
    };

    return (
        <>
            {/* {isFilteredApplied && <button className="btn btn-sm btn-outline-danger mr-2">Clear Filter</button>} */}
            <span className="font-weight-bolder mr-1">Category</span>
            <select onChange={(e) => handleFilterChange(e)}>
                <option value="select-category" className="font-italic">
                    Select Category
                </option>
                {productCategory.map((el) => (
                    <option defaultValue={el} key={el}>
                        {el}
                    </option>
                ))}
            </select>
        </>
    );
};

export default Filter;
