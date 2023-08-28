import { Item } from "./Item.js";
import { InfinityLoad } from "./InfinityLoad.js";
import { Load } from "./Load.js";

export function List({load, items, loadMore, total}) {
    if (load && items.length === 0) {
      return <Load/>;
    }
    if (!load && items.length === 0) {
      return (
        <div className="py-10 text-sm text-center text-slate-500">No Data</div>
      );
    }
  
    return (
      <>
        <div className="flex items-center justify-around flex-wrap mx-2">
          {items.map((item, index) => {
            return (
              <Item
                data={item}
                key={`${item.id}-${index}`}
                indexKey={index + 1}
              />
            );
          })}
        </div>
        <InfinityLoad
          load={items.length != 0 && items.length < total && !error}
          loadMore={loadMore}
        />
      </>
    );
  }