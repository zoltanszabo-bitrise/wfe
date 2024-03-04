import { Avatar, Box, ButtonGroup, Icon, IconButton, Tab, TabList, Tabs, Text } from "@bitrise/bitkit";

import { TabPanel, TabPanels } from "@chakra-ui/react";
import { Step, StepOutputVariable } from "../models";
import StepItemBadge from "./StepItem/StepItemBadge";
import StepConfiguration from "./StepConfiguration";
import StepProperties from "./StepProperties";
import StepOutputVariables from "./StepOutputVariables";

type Props = {
	step: Step;
	highlightVersionUpdate?: boolean;
	outputVariables: Array<StepOutputVariable>;
	onClone: VoidFunction;
	onRemove: VoidFunction;
};

const StepConfig = ({ step, highlightVersionUpdate, outputVariables, onClone, onRemove }: Props): JSX.Element => {
	const showOutputVariables = step.isConfigured() && outputVariables.length > 0;

	return (
		<Box display="flex" flexDirection="column" gap="8">
			<Box as="header" display="flex" px="24" pt="24" gap="16">
				<Avatar name="ci" size="48" src={step.iconURL()} />

				<Box flex="1" minW={0}>
					<Box display="flex" gap="4" alignItems="center">
						<Text size="4" fontWeight="bold" hasEllipsis>
							{step.displayName()}
						</Text>
						<StepItemBadge step={step} />
					</Box>

					<Box display="flex" gap="4" alignItems="center">
						<Text size="2" color="text.secondary">
							{step.version || step.defaultStepConfig.version}
						</Text>
						{highlightVersionUpdate && <Icon size="16" name="WarningColored" aria-label="New version available" />}
					</Box>
				</Box>

				<ButtonGroup>
					<IconButton
						onClick={onClone}
						size="sm"
						variant="secondary"
						iconName="Duplicate"
						aria-label="Clone this step"
					/>
					<IconButton
						onClick={onRemove}
						size="sm"
						variant="secondary"
						iconName="MinusRemove"
						aria-label="Remove this step"
						isDanger
					/>
				</ButtonGroup>
			</Box>

			<Tabs>
				<TabList paddingX="8">
					<Tab id="configuration">Configuration</Tab>
					<Tab id="properties">Properties</Tab>
					{showOutputVariables && <Tab id="output-variables">Output variables</Tab>}
				</TabList>
				<TabPanels>
					<TabPanel id="configuration">
						<StepConfiguration step={step} />
					</TabPanel>
					<TabPanel id="properties">
						<StepProperties step={step} />
					</TabPanel>
					{showOutputVariables && (
						<TabPanel id="output-variables">
							<StepOutputVariables outputVariables={outputVariables} />
						</TabPanel>
					)}
				</TabPanels>
			</Tabs>
		</Box>
	);
};

export default StepConfig;
