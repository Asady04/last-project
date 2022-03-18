import React, { useEffect } from "react";
import Section from "./section";
import Sidebar from "./sidebar";

const Materi = () => {
  const [isi, setIsi] = React.useState()
  const [tipe, setTipe] = React.useState()
  const [id, setId] = React.useState(0)
  const [length, setLength] = React.useState()

  useEffect(() => {
    console.log(length)
  }, [])
  
  return (
    <div>
      <div className="grid grid-cols-4 w-full">
        <div className="col-span-1">
          <Sidebar setIsi={setIsi} setTipe={setTipe} setId={setId} id={id} setLength={setLength}/>
        </div>
        <div className="col-span-3 py-5 px-8">
          <Section isi={isi} tipe={tipe} setId={setId} id={id} length={length}/>
        </div>
      </div>
    </div>
  );
};
export default Materi;
