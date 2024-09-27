"use client";
import { getTests } from "@/context/TestContext";
import Link from "next/link";
import { Tag, TagGroup } from "rsuite";

const Tags = () => {
  const { tests, removeTest } = getTests();

  // const handleClose = (test) => removeTest(test);

  const handleSubmit = () => alert(`this will start ${tests}, are you sure ?`);

  return (
    <>
      <div className="min-h-96 text-2xl">
        <TagGroup>
          {tests.map((test, index) => (
            <Tag
              key={index}
              // closable
              // onClose={() => handleClose(test)}
            >
              {test}
            </Tag>
          ))}
        </TagGroup>
      </div>
      <Link href="exam">
        <button className="btn btn-primary" onClick={handleSubmit}>
          Start Test
        </button>
      </Link>
    </>
  );
};

export default Tags;
