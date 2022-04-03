import { idRef, IMeasure, IMeasureDefinition, newMeasure } from "@gooddata/sdk-model";
import { useExecutionDataView } from "@gooddata/sdk-ui";
import { useState } from "react";
import Select from "react-select";
import styled from "styled-components";

interface Props {
    measure: IMeasure<IMeasureDefinition>;
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    border: solid #b5b5b5;
    border-width: 0 0 1px 1px;
    margin-left: 2rem;
`;

const Title = styled.h2`
    display: flex;
    flex-direction: row;
    margin: 0;
    align-self: center;
    margin: 0 2rem 2rem 2rem;
    flex-grow: 1;
`;

const SelectWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-self: center;
    width: 30%;
    margin: 0 2rem 5rem 2rem;
`;

const SelectBox = styled(Select)`
    width: 100%;
`;

const CalculationSelector = ({ measure }: Props) => {
    const [value, setValue] = useState("N/A");

    const maxFilter = newMeasure((measure.measure.localIdentifier, "fact"), (m) => m.aggregation("max"));
    const minFilter = newMeasure(idRef(measure.measure.localIdentifier, "fact"), (m) => m.aggregation("min"));
    const medianFilter = newMeasure(idRef(measure.measure.localIdentifier, "fact"), (m) =>
        m.aggregation("median"),
    );
    //     const { result, error, status } = useExecutionDataView({ execution: { "measure" } });

    const applyMeasureFilter = (measure: any) => {
        // get values from measure somehow
        if (measure) {
            setValue("Set filtered measure value here");
        } else {
            setValue("N/A");
        }
    };

    const options = [
        { value: maxFilter, label: maxFilter.measure.title || "Max value" },
        { value: minFilter, label: minFilter.measure.title || "Min value" },
        { value: medianFilter, label: medianFilter.measure.title || "Median" },
    ];

    return (
        <Container>
            <Title>{value}</Title>
            <SelectWrapper>
                <SelectBox options={options} onChange={applyMeasureFilter} />
            </SelectWrapper>
        </Container>
    );
};

export default CalculationSelector;
