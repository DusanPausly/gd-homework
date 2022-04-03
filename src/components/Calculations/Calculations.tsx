import { IMeasure, IMeasureDefinition } from "@gooddata/sdk-model";

interface Props {
    measures: IMeasure<IMeasureDefinition>[];
}
const Calculations = ({ measures }: Props) => {
    console.log(measures);
    return <></>;
};

export default Calculations;
