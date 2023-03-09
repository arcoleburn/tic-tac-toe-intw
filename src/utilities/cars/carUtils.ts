import data from "./carData";

const years = [2015, 2016, 2017, 2018, 2019, 2020];

const getByYear = (year: any) => {
  console.log(year);
  let list: any[] = [];
  data.filter((x) => {
    if (x.year == year) {
      if (list.indexOf(x.make) < 0) {
        list.push(x.make);
      }
    }
  });
  return list;
};

const getByYearAndMake = (year: any, make: string) => {
  const filterYear = getByYear(year);
  make = make[0].toUpperCase()+make.slice(1)
  let list : any = [];
  data.filter((x) => {
    if (x.year==year && x.make == make) {
      if (list.indexOf(x.model) < 0) {
        list.push(x.model);
      }
    }
  });
  return list;
};

export { years, getByYear, getByYearAndMake };
