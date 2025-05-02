import Input from '@/components/shared/Input';
import SectionContainer from '@/components/shared/SectionContainer';
import SectionHeading from '@/components/shared/SectionHeading';
import Button from '@/components/ui/Button';
import FileSelector from '@/components/ui/FileSelector';
import TextArea from '@/components/ui/TextArea';
import { FaPlus } from 'react-icons/fa6';

const AddDocument = () => {
  return (
    <div className="w-full">
      <SectionHeading className={"flex gap-3 items-center"}>
        <FaPlus className="text-lg text-turquoise" />
        Add Document
      </SectionHeading>
      <SectionContainer>
        <div className="w-full mt-4 space-y-1">
          <TextArea
            label="Success TextArea"
            placeholder="Enter text..."
            value={"hello sir"}
            onChange={(event) => console.log("hello")}
            color="success"
            size="lg"
            className="additional-custom-class"
            rows={2}
          />
          <div className="max-w-full over">
            <FileSelector />
          </div>
        </div>
        <div className="w-full grid gap-2 grid-col-1 md:grid-cols-2 lg:grid-cols-3 mt-10">
          <Button
            color="lime"
            size="lg"
            onClick={() => alert("Secondary Button Clicked")}
            className=""
          >
            Submit
          </Button>
        </div>
      </SectionContainer>
    </div>
  );
}

export default AddDocument