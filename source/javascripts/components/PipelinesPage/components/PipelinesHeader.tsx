import { Box, Button, Select } from '@bitrise/bitkit';
import { Panel } from 'reactflow';
import { Pipelines } from '../PipelinesPage.types';
import usePipelineSelector from '../hooks/usePipelineSelector';

type Props = {
  pipelines?: Pipelines;
};

const PipelinesHeader = ({ pipelines }: Props) => {
  const { options, selectedPipeline, onSelectPipeline } = usePipelineSelector(pipelines);

  const optionKeys = Object.keys(options);
  const hasOptions = optionKeys.length > 0;

  return (
    <Box
      as={Panel}
      p="12"
      gap="12"
      display="flex"
      bg="background/primary"
      borderBottom="1px solid"
      borderColor="border/regular"
      position={'top-left' as never}
      justifyContent="space-between"
    >
      <Select
        size="md"
        flex={['1', '0']}
        value={selectedPipeline}
        isDisabled={!hasOptions}
        minW={['unset', '320px']}
        onChange={(e) => onSelectPipeline(e.target.value)}
        placeholder={!hasOptions ? `You've no pipelines in your bitrise.yml...` : undefined}
      >
        {optionKeys.map((key) => {
          return (
            <option value={key} key={key}>
              {options[key]}
            </option>
          );
        })}
      </Select>
      <Button rightIconName="ArrowNorthEast" variant="tertiary" size="md">
        View bitrise.yml
      </Button>
    </Box>
  );
};

export default PipelinesHeader;
