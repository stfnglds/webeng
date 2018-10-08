import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'groupBy'
})
export class GroupByPipe implements PipeTransform {



  transform(collection: Array<any>, property: string): Array<any> {
    console.log("collection",collection);
    // prevents the application from breaking if the array of objects doesn't exist yet
    if(!collection) {
      return null;
    }

    const groupedCollection = collection.reduce((previous, current)=> {
      if(!previous[current[property]]) {
        previous[current[property]] = [current];
      } else {
        previous[current[property]].push(current);
      }

      return previous;
    }, {});

    // this will return an array of objects, each object containing a group of objects
    return Object.keys(groupedCollection).map(key => ({ key, value: groupedCollection[key] }));
  }

  // transform(value: Array<any>, field: string): Array<any> {
  //   try{
  //     const groupedObj = value.reduce((prev, cur)=> {
  //     if(!prev[cur[field]]) {
  //       prev[cur[field]] = [cur];
  //     } else {
  //       prev[cur[field]].push(cur);
  //     }
  //     return prev;
  //   }, {});
  //   return Object.keys(groupedObj).map(key => ({ key, value: groupedObj[key] }));
  //   }catch(error){
  //
  //   }
  //
  // }

}
