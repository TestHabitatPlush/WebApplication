import AddDocument from "./AddDocument";
import DocumentsList from "./DocumentsList";
import SectionHeading from "@/components/shared/SectionHeading";

const Document = () => {
  return (
    <section>
      <SectionHeading>Document</SectionHeading>
      <div className="space-y-3">
        <DocumentsList />
        <AddDocument />
      </div>
    </section>
  );
};
export default Document;
