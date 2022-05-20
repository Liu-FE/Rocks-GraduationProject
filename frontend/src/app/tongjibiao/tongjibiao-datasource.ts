import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';

// TODO: Replace this with your own data model type
export interface TongjibiaoItem {
  name: string;
  id: number;
  num1: number;
  num2: number;
}

// TODO: replace this with real data from your application
const EXAMPLE_DATA: TongjibiaoItem[] = [
  {id: 1, name: '粉质粘土', num1:1000, num2:100,},
  {id: 2, name: '淤泥质粉质粘土', num1:1000, num2:100,},
  {id: 3, name: '粘土', num1:1000, num2:100,},
  {id: 4, name: '粘质粉土', num1:1000, num2:100,},
  {id: 5, name: '淤泥质粘土', num1:1000, num2:100,},
  {id: 6, name: '圆砾（角砾）', num1:1000, num2:100,},
  {id: 7, name: '中砂', num1:1000, num2:100,},
  {id: 8, name: '有机质土', num1:1000, num2:100,},
  {id: 9, name: '泥炭质土A', num1:1000, num2:100,},
  {id: 10, name: '泥炭质土B', num1:1000, num2:100,},
  {id: 11, name: '砂质粉土', num1:1000, num2:100,},
  {id: 12, name: '粉砂', num1:1000, num2:100,},
  {id: 13, name: '细砂', num1:1000, num2:100,},
  {id: 14, name: '粗砂', num1:1000, num2:100,},
  {id: 15, name: '砾砂', num1:1000, num2:100,},
  {id: 16, name: '卵石（碎石）', num1:1000, num2:100,},
  {id: 17, name: '漂石（块石）', num1:1000, num2:100,},
];

/**
 * Data source for the Tongjibiao view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class TongjibiaoDataSource extends DataSource<TongjibiaoItem> {
  data: TongjibiaoItem[] = EXAMPLE_DATA;
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;

  constructor() {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<TongjibiaoItem[]> {
    if (this.paginator && this.sort) {
      // Combine everything that affects the rendered data into one update
      // stream for the data-table to consume.
      return merge(observableOf(this.data), this.paginator.page, this.sort.sortChange)
        .pipe(map(() => {
          return this.getPagedData(this.getSortedData([...this.data ]));
        }));
    } else {
      throw Error('Please set the paginator and sort on the data source before connecting.');
    }
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect(): void {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: TongjibiaoItem[]): TongjibiaoItem[] {
    if (this.paginator) {
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      return data.splice(startIndex, this.paginator.pageSize);
    } else {
      return data;
    }
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: TongjibiaoItem[]): TongjibiaoItem[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort?.direction === 'asc';
      switch (this.sort?.active) {
        case 'name': return compare(a.name, b.name, isAsc);
        case 'id': return compare(+a.id, +b.id, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
