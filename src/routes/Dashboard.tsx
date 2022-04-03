import { modifyMeasure } from "@gooddata/sdk-model";
import { LineChart } from "@gooddata/sdk-ui-charts";
import { DateFilter, DateFilterHelpers, DateFilterOption } from "@gooddata/sdk-ui-filters";
import { useState } from "react";
import styled from "styled-components";
import Page from "../components/Page";
import { availableGranularities, defaultDateFilterOptions } from "../mock/initialDateData";
import * as Md from "../md/full";
import CalculationSelector from "../components/CalculationSelector/CalculationSelector";

const FilterBar = styled.div`
    padding: 1rem;
    display: block;
    width: 200px;
`;

const Row = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
`;

const Column = styled.div`
    display: flex;
    flex-direction: column;
    flex: 50%;
    min-height: 400px;

    @media (max-width: 800px) {
        flex: 100%;
        max-width: 100%;
    }
`;

const Revenue = modifyMeasure(Md.Revenue, (m) => m.format("#,##0"));

const Dashboard = () => {
    const [selectedDateOption, setSelectedDateOption] = useState(defaultDateFilterOptions.allTime);
    const [excludedPeriod, setExcludedPeriod] = useState<boolean>(false);

    const measures = [Revenue];
    const dateFilter = DateFilterHelpers.mapOptionToAfm(
        selectedDateOption as DateFilterOption,
        Md.DateDatasets.Date.ref,
        excludedPeriod,
    );

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

            <Row>
                <Column>
                    <LineChart
                        measures={measures}
                        segmentBy={Md.Product.Default}
                        trendBy={Md.DateDatasets.Date.Month.Short}
                        filters={dateFilter ? [dateFilter] : []}
                    />
                </Column>
                <Column>
                    <CalculationSelector measure={Revenue} />
                </Column>
            </Row>
        </Page>
    );
};

export default Dashboard;
