import NvoccHero from "./NvoccHero";
import NvoccValueProps from "./NvoccValueProps";
import NvoccQuoteForm from "./NvoccQuoteForm";

const NvoccPageContent = () => {
  return (
    <>
      <div className="px-4 md:px-8 lg:px-16 pt-8">
        <NvoccHero />
      </div>
      <NvoccValueProps />
      <NvoccQuoteForm />
    </>
  );
};

export default NvoccPageContent;
