import { DateFilter } from "@gooddata/sdk-ui-filters";
import React, { useState } from "react";
import styled from "styled-components";
import Page from "../components/Page";
import { availableGranularities, defaultDateFilterOptions } from "../mock/initialDateData";

const FilterBar = styled.div`
    padding: 1rem;
    display: flex;
`;

const Dashboard: React.FC = () => {
    const [selectedDateOption, setSelectedDateOption] = useState(defaultDateFilterOptions.allTime);
    const [excludedPeriod, setExcludedPeriod] = useState<boolean>(false);

    const onApply = (dateFilterOption: any, excludeCurrentPeriod: boolean) => {
        setSelectedDateOption(dateFilterOption);
        setExcludedPeriod(excludeCurrentPeriod);
    };

    return (
        <Page>
            {selectedDateOption?.name && (
                <h1>{`My Dashboard${
                    selectedDateOption.name.length > 0 ? ` for ${selectedDateOption?.name}` : ""
                }`}</h1>
            )}

            <FilterBar>
                <DateFilter
                    excludeCurrentPeriod={excludedPeriod}
                    selectedFilterOption={selectedDateOption}
                    filterOptions={defaultDateFilterOptions}
                    availableGranularities={availableGranularities}
                    customFilterName="Date Filter"
                    dateFilterMode="active"
                    dateFormat="M/d/yy"
                    onApply={onApply}
                />
            </FilterBar>
        </Page>
    );
};

export default Dashboard;
