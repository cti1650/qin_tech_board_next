import { useEffect, useState } from "react";
import ButtonItem from "./ButtonItem";

function LinkButtons(props) {
  const [items, setItems] = useState([]);
    useEffect(() => {
      setItems(props.items)
    });
    return (
      <>
        <ul className="flex flex-row flex-wrap">
          {
            items.map((item)=>{
              if(!keyword || ~keywordConv((item['ツール名'] + item['分類'])).indexOf(keyword)){
                return (
                  <div className="w-full sm:w-1/2 lg:w-1/4 p-1">
                  <ButtonItem item="item">
                    <GrayButton url={item['URL']} title={item['ツール名']} summary={item['分類']} />
                  </ButtonItem>
                  </div>
                )
              }
            })
          }
        </ul>
      </>
    )
}

export default LinkButtons

