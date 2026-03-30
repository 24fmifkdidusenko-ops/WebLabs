import React from 'react';

interface ListProps<T extends { id: number | string }> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
}

export const List = <T extends { id: number | string }>({ items, renderItem }: ListProps<T>) => {
  return <div>{items.map((item) => <div key={item.id}>{renderItem(item)}</div>)}</div>;
};